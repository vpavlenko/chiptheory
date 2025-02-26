import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ANALYSIS_STUB,
  Analysis,
  AnalysisBox,
  AnalysisGrid,
  Cursor,
  RESOLUTION_MS,
  advanceAnalysis,
  getNewAnalysis,
} from "./Analysis";
import { BookExample } from "./Book";
import { calculateMeasuresAndBeats } from "./measures";
import {
  NES_APU_NOTE_ESTIMATIONS,
  PAUSE,
  nesApuNoteEstimation,
} from "./nesApuNoteEstimations";
import {
  TWELVE_CHORD_TONES,
  TWELVE_TONE_COLORS,
  getChordNote,
  getNoteMeasure,
  getTonic,
} from "./romanNumerals";
import { ANALYSIS_HEIGHT } from "./tags";

type OscType = "pulse" | "triangle" | "noise";
export type Voice = "pulse1" | "pulse2" | "triangle" | "noise" | "under cursor";

// If not used, the playback cursor isn't exactly where the sound is
const LATENCY_CORRECTION_MS =
  (localStorage && parseInt(localStorage.getItem("latency"), 10)) || 70;

function findNoteWithClosestPeriod(
  period: number,
  oscType: OscType,
): nesApuNoteEstimation {
  if (period === -1) {
    return PAUSE;
  }
  if (oscType === "noise") {
    const noise = period % 4;
    return {
      name: `${noise}_`, // pause
      midiNumber: noise + 90,
      frequency: 0,
      pianoNumber: null,
      apuIndex: null,
      pulsePeriod: null,
      pulseFrequency: null,
      pulseTuningError: null,
      trianglePeriod: null,
      triangleFrequency: null,
      triangleTuningError: null,
    };
  }
  let closestNote: nesApuNoteEstimation | null = null;
  let smallestDifference = Infinity;

  for (const note of NES_APU_NOTE_ESTIMATIONS) {
    const currentPeriod =
      oscType === "pulse"
        ? Number(note.pulsePeriod)
        : Number(note.trianglePeriod);
    if (currentPeriod == null) continue;

    const diff = Math.abs(period - currentPeriod);

    if (diff < smallestDifference) {
      smallestDifference = diff;
      closestNote = note;
    }
  }

  return closestNote!;
}

export type SecondsSpan = [number, number];

export type Note = {
  note: {
    midiNumber: number;
    name: string;
  };
  span: SecondsSpan;
  chipState: any;
};

const calculateNotesFromPeriods = (periods, oscType) => {
  if (periods === undefined) return [];

  const notes: Note[] = [];
  let timeInSeconds = 0;
  const stepInSeconds = RESOLUTION_MS;

  for (const period of periods) {
    const newNoteEstimation = findNoteWithClosestPeriod(period, oscType);
    const lastNote = notes[notes.length - 1];
    if (
      notes.length === 0 ||
      lastNote.note.midiNumber !== newNoteEstimation.midiNumber
    ) {
      if (notes.length > 0) {
        lastNote.span[1] = timeInSeconds;
      }
      notes.push({
        note: {
          midiNumber: period === -1 ? -1 : newNoteEstimation.midiNumber,
          name: newNoteEstimation.name,
        },
        span: [timeInSeconds, 0],
        chipState: { period: period },
      });
    }

    timeInSeconds += stepInSeconds;
  }
  if (notes.length > 0) {
    notes[notes.length - 1].span[1] = timeInSeconds;
  }

  return notes.filter((note) => note.note.midiNumber !== -1);
};

const SECOND_WIDTH = 60;
const HORIZONTAL_HEADER_PADDING = 55;
export const secondsToX = (seconds) =>
  seconds * SECOND_WIDTH + HORIZONTAL_HEADER_PADDING;
const xToSeconds = (x) => x / SECOND_WIDTH;

const isNoteCurrentlyPlayed = (note, positionMs) => {
  const positionSeconds = positionMs / 1000;
  return note.span[0] <= positionSeconds && positionSeconds <= note.span[1];
};

// This is used when tonic isn't set yet.
const VOICE_TO_COLOR: { [key in Voice]: string } = {
  pulse1: "#26577C",
  pulse2: "#AE445A",
  triangle: "#63995a",
  noise: "white",
  "under cursor": "under cursor",
};

const getNoteColor = (
  voice: Voice,
  note: Note,
  analysis,
  measures: number[],
): string => {
  if (voice === "noise") {
    return "black";
  }

  if (analysis.tonic === null) {
    return VOICE_TO_COLOR[voice];
  }

  return TWELVE_TONE_COLORS[
    (note.note.midiNumber -
      getTonic(getNoteMeasure(note, measures), analysis)) %
      12
  ];
};

const isCenterInsideSpan = (note: Note, span: SecondsSpan) => {
  let center = (note.span[0] + note.span[1]) / 2;
  return span[0] < center && center < span[1];
};

const getIntervalBelow = (note: Note, allNotes: Note[]) => {
  let minDistance = Infinity;
  for (let n of allNotes) {
    if (
      n.note.midiNumber < note.note.midiNumber &&
      isCenterInsideSpan(note, n.span)
    ) {
      minDistance = Math.min(
        minDistance,
        note.note.midiNumber - n.note.midiNumber,
      );
    }
  }
  return minDistance;
};

const getNoteRectangles = (
  notes: Note[],
  voice: Voice,
  isActiveVoice: boolean,
  analysis: Analysis,
  midiNumberToY: (number: number) => number,
  noteHeight: number,
  handleNoteClick = (note: Note, altKey: boolean) => {},
  measures: number[] = null,
  handleMouseEnter = (note: Note, altKey: boolean) => {},
  handleMouseLeave = () => {},
  allNotes: Note[] = [],
  voiceMask = null,
  showIntervals = false,
) => {
  return notes.map((note) => {
    const top = midiNumberToY(note.note.midiNumber);
    const left = secondsToX(note.span[0]);
    const color = getNoteColor(voice, note, analysis, measures);
    const chordNote =
      voice !== "under cursor"
        ? getChordNote(note, analysis, measures, analysis.romanNumerals)
        : null;
    const noteElement = chordNote ? (
      <span
        className="noteText"
        style={{
          fontSize: `${Math.min(noteHeight + 2, 14)}px`,
          lineHeight: `${Math.min(noteHeight, 14)}px`,
          fontFamily: "Helvetica, sans-serif",
          fontWeight: 700,
          color:
            ["brown", "blue", "#9400D3", "#787276"].indexOf(color) !== -1
              ? "white"
              : "black",
        }}
      >
        {chordNote}
      </span>
    ) : null;
    const intervalBelow = showIntervals && getIntervalBelow(note, allNotes);

    return (
      <div
        className={"noteRectangleTonal"}
        style={{
          position: "absolute",
          height: `${noteHeight}px`,
          width: secondsToX(note.span[1]) - secondsToX(note.span[0]),
          backgroundColor: color,
          top,
          left,
          pointerEvents: voice === "under cursor" ? "none" : "auto",
          borderRadius:
            voice === "pulse1" ? "10px" : voice === "triangle" ? "3px" : "",
          cursor: "pointer",
          zIndex: 10,
          opacity: isActiveVoice ? 0.9 : 0.1,
          display: "grid",
          placeItems: "center",
          ...(voice === "under cursor"
            ? {
                boxShadow: "white 0px 1px",
                boxSizing: "border-box",
                backgroundColor: "transparent",
              }
            : {}),
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleNoteClick(note, e.altKey);
        }}
        onMouseEnter={(e) => handleMouseEnter(note, e.altKey)}
        onMouseLeave={handleMouseLeave}
      >
        {showIntervals && intervalBelow !== Infinity && isActiveVoice && (
          // voiceMask.filter(Boolean).length === 1 &&
          <div
            style={{
              position: "relative",
              top: noteHeight,
              color: "white",
              fontFamily: "sans-serif",
              fontSize: "12px",
            }}
          >
            {TWELVE_CHORD_TONES[intervalBelow % 12]}
          </div>
        )}
        {!showIntervals && noteElement}
      </div>
    );
  });
};

const findCurrentlyPlayedNotes = (notes, positionMs) => {
  const result = [];
  for (const note of notes) {
    if (isNoteCurrentlyPlayed(note, positionMs)) {
      result.push(note);
    }
  }
  return result;
};

const getMidiRange = (
  notes: Note[],
): { minMidiNumber: number; maxMidiNumber: number } => {
  let minMidiNumber = +Infinity;
  let maxMidiNumber = -Infinity;
  for (const note of notes) {
    const { midiNumber } = note.note;
    if (midiNumber < minMidiNumber) {
      minMidiNumber = midiNumber;
    }
    if (midiNumber > maxMidiNumber) {
      maxMidiNumber = midiNumber;
    }
  }
  return { minMidiNumber, maxMidiNumber };
};

const Chiptheory = ({
  chipStateDump,
  getCurrentPositionMs,
  savedAnalysis,
  saveAnalysis,
  voiceMask,
  setVoiceMask,
  analysisEnabled,
  seek,
  registerSeekCallback,
  bookPath,
  pause,
  paused,
  loggedIn,
}) => {
  const [analysis, setAnalysis] = useState<Analysis>(ANALYSIS_STUB);
  const [showIntervals, setShowIntervals] = useState(false);
  const [playEnd, setPlayEnd] = useState(null);

  const commitAnalysisUpdate = useCallback(
    (analysisUpdate: Partial<Analysis>) => {
      const updatedAnalysis = { ...analysis, ...analysisUpdate };
      saveAnalysis(updatedAnalysis);
      setAnalysis(updatedAnalysis);
    },
    [analysis, saveAnalysis],
  );

  useEffect(() => {
    if (savedAnalysis) {
      setAnalysis(savedAnalysis);
    } else {
      setAnalysis(ANALYSIS_STUB);
    }
  }, [savedAnalysis]);

  const [previouslySelectedDownbeat, setPreviouslySelectedDownbeat] = useState<
    number | null
  >(null);
  const [selectedDownbeat, setSelectedDownbeat] = useState<number | null>(null);
  const selectDownbeat = useCallback(
    (downbeat) => {
      if (downbeat === null) {
        setPreviouslySelectedDownbeat(null);
        setSelectedDownbeat(null);
      } else {
        setPreviouslySelectedDownbeat(selectedDownbeat);
        setSelectedDownbeat(downbeat);
      }
    },
    [selectedDownbeat],
  );

  const analysisRef = useRef(analysis);
  useEffect(() => {
    analysisRef.current = analysis;
  }, [analysis]);

  const selectedDownbeatRef = useRef(selectedDownbeat);
  useEffect(() => {
    selectedDownbeatRef.current = selectedDownbeat;
  }, [selectedDownbeat]);

  const notes = useMemo(() => {
    return {
      p1: calculateNotesFromPeriods(chipStateDump.p1, "pulse"),
      p2: calculateNotesFromPeriods(chipStateDump.p2, "pulse"),
      t: calculateNotesFromPeriods(chipStateDump.t, "triangle"),
      n: calculateNotesFromPeriods(chipStateDump.n, "noise"),
    };
  }, [chipStateDump]);

  const allNotes = useMemo(
    () => [...notes.t, ...notes.p1, ...notes.p2],
    [chipStateDump],
  );

  const allActiveNotes = useMemo(
    () => [
      ...(voiceMask[2] ? notes.t : []),
      ...(voiceMask[0] ? notes.p1 : []),
      ...(voiceMask[1] ? notes.p2 : []),
    ],
    [chipStateDump, voiceMask],
  );

  const { minMidiNumber, maxMidiNumber } = useMemo(
    () => getMidiRange([...notes.t, ...notes.p1, ...notes.p2]),
    [notes],
  );

  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef(null);
  useEffect(() => {
    const updateHeight = () => {
      if (divRef.current) {
        setDivHeight(divRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    new ResizeObserver(() => updateHeight()).observe(divRef.current);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    divRef.current.scrollLeft = 0;
  }, [chipStateDump]);

  const noteHeight =
    (divHeight - ANALYSIS_HEIGHT) / (maxMidiNumber - minMidiNumber + 7);
  const midiNumberToY = useMemo(
    () => (midiNumber) =>
      divHeight - (midiNumber - minMidiNumber + 4) * noteHeight,
    [noteHeight],
  );

  const [hoveredNote, setHoveredNote] = useState<Note | null>(null);
  const [hoveredAltKey, setHoveredAltKey] = useState<boolean>(false);
  const handleMouseEnter = (note: Note, altKey: boolean) => {
    setHoveredNote(note);
    setHoveredAltKey(altKey);
  };
  const handleMouseLeave = () => {
    setHoveredNote(null);
  };

  const futureAnalysis = useMemo(
    () =>
      hoveredNote
        ? getNewAnalysis(
            hoveredNote,
            selectedDownbeatRef.current,
            analysisRef.current,
            null,
            allNotes,
            calculateMeasuresAndBeats(analysis, allNotes).measures,
            hoveredAltKey,
          )
        : analysis,
    [hoveredNote, analysis],
  );
  const measuresAndBeats = useMemo(() => {
    return calculateMeasuresAndBeats(futureAnalysis, allNotes);
  }, [futureAnalysis, allNotes]);

  const handleNoteClick = (note: Note, altKey: boolean) => {
    advanceAnalysis(
      note,
      selectedDownbeatRef.current,
      setSelectedDownbeat,
      analysisRef.current,
      commitAnalysisUpdate,
      null,
      allNotes,
      measuresAndBeats.measures,
      altKey,
    );
  };

  const noteRectangles = useMemo(() => {
    const voices = [
      { notes: notes.p1, label: "pulse1", mask: voiceMask[0] },
      { notes: notes.p2, label: "pulse2", mask: voiceMask[1] },
      { notes: notes.t, label: "triangle", mask: voiceMask[2] },
    ];

    return voices.flatMap((voice) =>
      getNoteRectangles(
        voice.notes,
        voice.label as Voice,
        voice.mask,
        futureAnalysis,
        midiNumberToY,
        noteHeight,
        handleNoteClick,
        measuresAndBeats.measures,
        handleMouseEnter,
        handleMouseLeave,
        allActiveNotes,
        voiceMask,
        showIntervals,
      ),
    );
  }, [
    notes,
    analysis,
    measuresAndBeats,
    noteHeight,
    voiceMask,
    hoveredNote,
    hoveredAltKey,
    showIntervals,
  ]);

  const [positionMs, setPositionMs] = useState(0);
  const currentlyPlayedRectangles = getNoteRectangles(
    findCurrentlyPlayedNotes(allNotes, positionMs),
    "under cursor",
    true,
    analysis,
    midiNumberToY,
    noteHeight,
  );

  useEffect(() => {
    let running = true;

    const animate = () => {
      if (!running) {
        return;
      }

      setPositionMs(getCurrentPositionMs() - LATENCY_CORRECTION_MS);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      running = false;
    };
  }, []);

  useEffect(() => {
    const handleEscapePress = (event) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        selectDownbeat(null);
      }
    };

    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, []);

  const seekCallback = (seekMs) =>
    (divRef.current.scrollLeft = secondsToX(seekMs / 1000) - 100);

  useEffect(() => {
    registerSeekCallback(seekCallback);
  }, []);

  if (
    !paused &&
    bookPath &&
    analysis.loop &&
    (positionMs - 3000 > measuresAndBeats.measures[analysis.loop - 1] * 1000 ||
      (playEnd && positionMs > measuresAndBeats.measures[playEnd] * 1000))
  ) {
    pause();
  }

  return (
    <div className="App-main-content-and-settings">
      <div
        key="leftPanel"
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          backgroundColor: "black",
        }}
      >
        <div
          ref={divRef}
          style={{
            margin: 0,
            padding: 0,
            position: "relative",
            overflowX: "scroll",
            overflowY: "hidden",
            width: "100%",
            height: "100%",
            backgroundColor: "black",
          }}
          onClick={(e) => {
            const targetElement = e.target as HTMLElement;
            const rect = targetElement.getBoundingClientRect();
            const distance =
              e.clientX -
              rect.left +
              targetElement.scrollLeft -
              HORIZONTAL_HEADER_PADDING;
            const time = xToSeconds(distance);
            if (selectedDownbeat) {
              advanceAnalysis(
                null,
                selectedDownbeatRef.current,
                setSelectedDownbeat,
                analysisRef.current,
                commitAnalysisUpdate,
                time,
              );
            } else {
              seek(time * 1000);
            }
          }}
        >
          {noteRectangles}
          {currentlyPlayedRectangles}
          <Cursor style={{ left: secondsToX(positionMs / 1000) }} />
          <AnalysisGrid
            analysis={futureAnalysis}
            voices={[notes.p1, notes.p2, notes.t]}
            measuresAndBeats={measuresAndBeats}
            midiNumberToY={midiNumberToY}
            noteHeight={noteHeight}
            previouslySelectedDownbeat={previouslySelectedDownbeat}
            selectedDownbeat={selectedDownbeat}
            selectDownbeat={selectDownbeat}
            commitAnalysisUpdate={commitAnalysisUpdate}
            // voiceMask={voiceMask}
            setVoiceMask={setVoiceMask}
            loggedIn={loggedIn}
            seek={seek}
            showIntervals={setShowIntervals}
          />
          <div
            style={{
              position: "fixed",
              top: "50px",
              right: "20px",
              zIndex: "100",
            }}
          >
            <input
              title="Intervals"
              type="checkbox"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                e.stopPropagation();
                setShowIntervals(e.target.checked);
              }}
              checked={showIntervals}
            />
            Intervals
          </div>
        </div>
      </div>
      {analysisEnabled &&
        (bookPath ? (
          <BookExample
            path={bookPath}
            playSegment={(span, mask) => {
              const newVoiceMask = [...voiceMask];
              for (let i = 0; i < mask.length; ++i) {
                newVoiceMask[i] = mask[i] === "1";
              }
              setVoiceMask(newVoiceMask);
              setPlayEnd(span ? span[1] : null);
              const start = span
                ? measuresAndBeats.measures[span[0] - 1] * 1000
                : 0;
              seek(start);
              seekCallback(start);
            }}
            analysis={analysis}
          />
        ) : (
          <AnalysisBox
            analysis={analysis}
            commitAnalysisUpdate={commitAnalysisUpdate}
            previouslySelectedDownbeat={previouslySelectedDownbeat}
            selectedDownbeat={selectedDownbeat}
            selectDownbeat={selectDownbeat}
          />
        ))}
    </div>
  );
};

export default Chiptheory;
