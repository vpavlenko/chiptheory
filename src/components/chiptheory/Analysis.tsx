import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { Note, secondsToX } from "./Chiptheory";
import { MeasuresAndBeats, getPhrasingMeasures } from "./measures";
import {
  MeasureOfRomanNumerals,
  getModulations,
  getRelativeModulations,
  romanNumeralsToArray,
  updateRomanNumerals,
} from "./romanNumerals";
import { CATEGORIES_IN_STRIPES, STRIPES_HEIGHT, Stripes, TAGS } from "./tags";

export const RESOLUTION_DUMPS_PER_SECOND = 100;
export const RESOLUTION_MS = 1 / RESOLUTION_DUMPS_PER_SECOND;

const FORM_SECTIONS = [
  "A",
  "A'",
  "B",
  "B'",
  "C",
  "C'",
  "D",
  "D'",
  "E",
  "E'",
  "intro",
  "intro (looped)",
  "intro (not looped)",
  "bridge",
  "verse",
  "chorus",
  "A:antecedent",
  "A:consequent",
  "B:antecedent",
  "B:consequent",
  "C:antecedent",
  "C:consequent",
  "antecedent",
  "consequent",
  "sentence. basic idea",
  "basic idea repeated",
  "fragmentation",
  "cadence",
  "extra measure",
];

export const STEPS = [
  "tonic",
  "first measure",
  "second measure",
  "end",
] as const;

export type Step = (typeof STEPS)[number];

const STEP_FONT_COLOR: {
  [key in Step]: string;
} = {
  "first measure": "#ffaaaa",
  "second measure": "#ffffaa",
  tonic: "#aaffaa",
  end: "white",
};

export const STEP_CALL_TO_ACTION: Record<Step, string> = {
  "first measure": "Click on a note at the start of the first measure",
  "second measure": "Click on a note at the start of the second measure",
  tonic: "Click on a main tonic",
  end: "Click on root notes to enter chords. Alt+click for half duration",
};

export type PitchClass = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type MeasuresSpan = [number, number]; // one-based numbering, last measure inclusive. [1, 8] is the first eight measures
export type TagSpan = {
  tag: string;
  span: MeasuresSpan;
  voices?: number[];
};

export type Analysis = {
  clickResolutionMs: number;
  step: Step;
  firstMeasure: number;
  secondMeasure: number;
  correctedMeasures: { [key: number]: number };
  fourMeasurePhrasingReferences: number[];
  beatsPerMeasure: number;
  loop: number | null;
  tonic: PitchClass | null;
  modulations: { [key: number]: PitchClass };
  basedOn: string;
  romanNumerals?: string;
  comment: string;
  tags: string[];
  disableSnapToNotes: boolean;
  form?: { [key: number]: string };
  tagSpans?: TagSpan[];
};

export const ANALYSIS_STUB: Analysis = {
  clickResolutionMs: RESOLUTION_MS,
  step: STEPS[0],
  firstMeasure: null,
  secondMeasure: null,
  correctedMeasures: [],
  fourMeasurePhrasingReferences: [],
  modulations: [],
  beatsPerMeasure: 4,
  loop: null,
  tonic: null,
  basedOn: null,
  romanNumerals: "",
  comment: "",
  tags: [],
  disableSnapToNotes: false,
  form: [],
};

export const prevStep = (analysis, commitAnalysisUpdate) =>
  commitAnalysisUpdate({
    step: STEPS[STEPS.indexOf(analysis.step) - 1],
  });

export const nextStep = (analysis, commitAnalysisUpdate) =>
  commitAnalysisUpdate({
    step: STEPS[STEPS.indexOf(analysis.step) + 1],
  });

export const getNewAnalysis = (
  note: Note | null,
  selectedDownbeat: number | null,
  analysis: Analysis,
  time: number = null,
  notes: Note[] = [],
  measures: number[] = [],
  altKey: boolean = false,
): Analysis => {
  let update: Partial<Analysis> = {};

  if (selectedDownbeat !== null) {
    if (altKey) {
      if (note) {
        update.modulations = { ...(analysis.modulations || []) };
        update.modulations[selectedDownbeat] = (note.note.midiNumber %
          12) as PitchClass;
      }
    } else {
      update.correctedMeasures = { ...(analysis.correctedMeasures || []) };
      update.correctedMeasures[selectedDownbeat] = note?.span[0] ?? time;
    }
  } else {
    const { step } = analysis;
    if (step !== "end") {
      update.step = STEPS[STEPS.indexOf(step) + 1];
    }

    if (step === "first measure") {
      update.firstMeasure = note.span[0];
    } else if (step === "second measure") {
      update.secondMeasure = note.span[0];
    } else if (step === "tonic") {
      update.tonic = (note.note.midiNumber % 12) as PitchClass;
    } else if (step === "end") {
      update.romanNumerals = updateRomanNumerals(
        analysis,
        note,
        notes,
        measures,
        altKey,
      );
    }
  }

  return { ...analysis, ...update };
};

export const advanceAnalysis = (
  note: Note | null,
  selectedDownbeat: number | null,
  selectDownbeat: (_: null) => void,
  analysis: Analysis,
  commitAnalysisUpdate: (analysisUpdate: Partial<Analysis>) => void,
  time: number = null,
  notes: Note[] = [],
  measures: number[] = [],
  altKey: boolean = false,
) => {
  const newAnalysis = getNewAnalysis(
    note,
    selectedDownbeat,
    analysis,
    time,
    notes,
    measures,
    altKey,
  );

  selectDownbeat(null);
  commitAnalysisUpdate(newAnalysis);
};

const VerticalBar = styled.div`
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 2;
  pointer-events: none;
`;

export const Cursor = styled(VerticalBar)`
  background-color: #ff6666;
  pointer-events: none;
`;

const Downbeat = styled(VerticalBar)`
  background-color: #444;
`;

const BeatBar = styled(VerticalBar)`
  border-left: 1px dashed #262626;
`;

const Measure: React.FC<{
  span: [number, number];
  number: number;
  isFourMeasureMark: boolean;
  previouslySelectedDownbeat: number;
  selectedDownbeat: number;
  selectDownbeat: (number: number) => void;
  romanNumeral: string;
  formSection: string;
  modulation: PitchClass | null;
}> = ({
  span,
  number,
  isFourMeasureMark,
  previouslySelectedDownbeat,
  selectedDownbeat,
  selectDownbeat,
  romanNumeral,
  formSection,
  modulation,
}) => {
  const left = secondsToX(span[0]) - 1;
  const width = secondsToX(span[1]) - left - 1;

  return (
    <>
      <Downbeat
        key={`db_${number}`}
        style={{
          left,
          ...(isFourMeasureMark && { backgroundColor: "#aaa" }),
        }}
      />
      <div
        key={`db_n_${number}`}
        style={{
          position: "absolute",
          top: 30 + STRIPES_HEIGHT,
          left: `${left + 7}px`,
          color:
            selectedDownbeat === number
              ? "red"
              : previouslySelectedDownbeat === number
              ? "green"
              : "white",
          zIndex: 5,
          cursor: "pointer",
          userSelect: "none",
          width,
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectDownbeat(number);
        }}
      >
        {number}
      </div>
      {formSection && (
        <div
          key={`form_section_${number}`}
          style={{
            position: "absolute",
            left: `${left + 1}px`,
            top: 55 + STRIPES_HEIGHT,
            zIndex: 10,
            backgroundColor: "#333",
            padding: "5px 10px 5px 10px",
            color: "#ffe",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {formSection}
        </div>
      )}
      <div
        key={`db_rn_${number}`}
        style={{
          position: "absolute",
          left: `${left}px`,
          width,
          top: STRIPES_HEIGHT,
          height: "25px",
          display: "grid",
          placeItems: "center",
          fontSize: "25px",
          zIndex: 5,
          borderLeft: "1px solid black",
        }}
      >
        <MeasureOfRomanNumerals
          dashedRN={romanNumeral}
          modulation={modulation}
        />
      </div>
    </>
  );
};

const Beat = ({ second }) => (
  <BeatBar
    style={{ left: secondsToX(second), zIndex: 2, pointerEvents: "none" }}
  />
);

const TonalGrid: React.FC<{
  analysis: Analysis;
  measures: number[];
  midiNumberToY: (number) => number;
  secondsToX: (number) => number;
  noteHeight: number;
}> = React.memo(
  ({ analysis, measures, midiNumberToY, secondsToX, noteHeight }) => {
    const modulations = getModulations(analysis);
    if (!modulations || !measures) return;
    modulations.push({ measure: measures.length, tonic: modulations[0].tonic });

    const result = [];
    for (let i = 0; i + 1 < modulations.length; ++i) {
      const from = measures[Math.max(modulations[i].measure, 0)];
      const to =
        measures[Math.min(modulations[i + 1].measure, measures.length - 1)];
      const { tonic } = modulations[i];
      const width = secondsToX(to) - secondsToX(from);
      if (!width) continue;
      for (let octave = 2; octave <= 9; ++octave) {
        const midiNumber = tonic + octave * 12;
        result.push(
          <>
            <div
              key={`gradient_${midiNumber}`}
              style={{
                position: "absolute",
                width,
                height: 12 * noteHeight,
                left: secondsToX(from),
                top: midiNumberToY(midiNumber - 1),
                pointerEvents: "none",
                background: `linear-gradient(to top, #222, transparent)`,
                zIndex: 1,
              }}
            />
          </>,
        );
      }
    }
    return result;
  },
);

export const AnalysisGrid: React.FC<{
  analysis: Analysis;
  voices: Note[][];
  measuresAndBeats: MeasuresAndBeats;
  midiNumberToY: (number: number) => number;
  noteHeight: number;
  previouslySelectedDownbeat: number;
  selectedDownbeat: number;
  selectDownbeat: (number: number) => void;
  commitAnalysisUpdate: (analysisUpdate: Partial<Analysis>) => void;
  // a callback for stripes to tweak voiceMask on hover
  // voiceMask: boolean[];
  setVoiceMask: (voiceMask: boolean[]) => void;
  seek: (ms: number) => void;
  showIntervals: (yes: boolean) => void;
  loggedIn: boolean;
}> = React.memo(
  ({
    analysis,
    measuresAndBeats,
    midiNumberToY,
    noteHeight,
    previouslySelectedDownbeat,
    selectedDownbeat,
    selectDownbeat,
    commitAnalysisUpdate,
    // voiceMask,
    setVoiceMask,
    loggedIn,
    voices,
    seek,
    showIntervals,
  }) => {
    const { measures, beats } = measuresAndBeats;
    let loopLeft = null;

    if (analysis.loop) {
      loopLeft = secondsToX(measures[analysis.loop - 1]);
    }

    const phrasingMeasures = getPhrasingMeasures(analysis, measures.length);
    const relativeModulations = getRelativeModulations(
      analysis.tonic,
      analysis.modulations,
    );
    return (
      <>
        {measures.map((time, i) => {
          const number = i + 1; // Caveat: measures are 1-indexed when stored in the DB .__.
          return (
            <Measure
              key={i}
              span={[time, measures[i + 1] ?? time]}
              isFourMeasureMark={phrasingMeasures.indexOf(number) !== -1}
              formSection={(analysis.form ?? {})[number]}
              number={number}
              previouslySelectedDownbeat={previouslySelectedDownbeat}
              selectedDownbeat={selectedDownbeat}
              selectDownbeat={selectDownbeat}
              romanNumeral={romanNumeralsToArray(analysis?.romanNumerals)[i]}
              modulation={
                number in relativeModulations
                  ? relativeModulations[number]
                  : null
              }
            />
          );
        })}
        {beats.map((time) => (
          <Beat key={time} second={time} />
        ))}
        <TonalGrid
          analysis={analysis}
          measures={measures}
          secondsToX={secondsToX}
          midiNumberToY={midiNumberToY}
          noteHeight={noteHeight}
        />
        <Stripes
          tagSpans={analysis.tagSpans || []}
          measuresAndBeats={measuresAndBeats}
          analysis={analysis}
          commitAnalysisUpdate={commitAnalysisUpdate}
          // voiceMask={voiceMask}
          setVoiceMask={setVoiceMask}
          loggedIn={loggedIn}
          voices={voices}
          seek={seek}
          showIntervals={showIntervals}
        />
        {loopLeft && (
          <div
            key="loop"
            style={{
              boxShadow: "inset 0px -5px 10px white",
              pointerEvents: "none",
              position: "absolute",
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0,0,0,0.9) 300px)",
              left: loopLeft,
              height: "100%",
              right: 0,
              zIndex: 1000,
              width: "5000px",
            }}
          >
            <div style={{ margin: "200px 50px 50px 20px", color: "white" }}>
              Loop
            </div>
          </div>
        )}
      </>
    );
  },
);

export const AnalysisBox: React.FC<{
  analysis: Analysis;
  commitAnalysisUpdate: (analysisUpdate: Partial<Analysis>) => void;
  previouslySelectedDownbeat: number;
  selectedDownbeat: number;
  selectDownbeat: (downbeat: number | null) => void;
}> = React.memo(
  ({
    analysis,
    commitAnalysisUpdate,
    previouslySelectedDownbeat,
    selectedDownbeat,
    selectDownbeat,
  }) => {
    const useInputField = (
      initialValue,
      analysisFieldName,
      label,
      width = "95%",
      createAnalysisUpdate = null,
    ) => {
      const [value, setValue] = useState(initialValue.toString());
      const [isSaved, setIsSaved] = useState(false);

      useEffect(() => {
        setValue(analysis[analysisFieldName] ?? initialValue.toString());
      }, [analysis[analysisFieldName]]); // TODO: doesn't work for formSection

      useEffect(() => {
        if (isSaved) {
          const timer = setTimeout(() => setIsSaved(false), 100);
          return () => clearTimeout(timer);
        }
      }, [isSaved]);

      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          commitAnalysisUpdate(
            createAnalysisUpdate
              ? createAnalysisUpdate(analysis, value)
              : {
                  [analysisFieldName]:
                    typeof initialValue === "number"
                      ? parseInt(value, 10)
                      : value,
                },
          );
          setIsSaved(true);
        }
      };

      return (
        <div key={`if_${analysisFieldName}`} style={{ marginTop: "10px" }}>
          {label}:{" "}
          <input
            type="text"
            value={value}
            style={{
              width,
              backgroundColor: isSaved ? "#66d" : "#aaa",
              transition: "background-color 0.1s",
            }}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      );
    };

    const tagSpanSelectRef = useRef(null);

    useEffect(() => {
      if (selectedDownbeat !== null) {
        tagSpanSelectRef.current.focus();
      }
    }, [selectedDownbeat]);

    const basedOn = useInputField("", "basedOn", "Based on");
    const beatsPerMeasure = useInputField(
      4,
      "beatsPerMeasure",
      "Beats per measure",
      "1em",
    );
    const romanNumerals = useInputField("", "romanNumerals", "Roman numerals");
    const comment = useInputField("", "comment", "Comment");
    const formSection = useInputField(
      "",
      null,
      "Form section",
      undefined,
      (analysis, value) => {
        selectDownbeat(null);
        return {
          form: { ...analysis.form, [selectedDownbeat]: value },
        };
      },
    );

    return (
      <div className="App-main-content-area settings" key="AnalysisBox">
        <div key="nav-buttons">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ marginBottom: "10px" }}>
              <button
                className="box-button"
                disabled={analysis.step === STEPS[0]}
                onClick={() => prevStep(analysis, commitAnalysisUpdate)}
              >
                &lt;
              </button>{" "}
              <button
                className="box-button"
                disabled={analysis.step === STEPS[STEPS.length - 1]}
                onClick={() => nextStep(analysis, commitAnalysisUpdate)}
              >
                &gt;
              </button>
            </div>
          </div>
          {"  "}
          {selectedDownbeat === null && (
            <div style={{ color: STEP_FONT_COLOR[analysis.step] }}>
              {STEP_CALL_TO_ACTION[analysis.step]}
            </div>
          )}
        </div>
        <div key="menu" style={{ marginTop: "20px" }}>
          {selectedDownbeat !== null ? (
            <div>
              <div>What to do with measure {selectedDownbeat}?</div>
              <ul className="vertical-list-of-buttons">
                <li>
                  <button
                    className="box-button"
                    onClick={() => {
                      selectDownbeat(null);
                      commitAnalysisUpdate({
                        loop: selectedDownbeat,
                      });
                    }}
                  >
                    Mark loop start
                  </button>
                </li>
                <li>
                  <button
                    className="box-button"
                    onClick={() => {
                      selectDownbeat(null);
                      commitAnalysisUpdate({
                        fourMeasurePhrasingReferences: [selectedDownbeat],
                      });
                    }}
                  >
                    Mark start of 4-measure phrasing
                  </button>
                </li>
                <li>
                  <button
                    className="box-button"
                    onClick={() => {
                      selectDownbeat(null);
                      commitAnalysisUpdate({
                        fourMeasurePhrasingReferences: [
                          ...(analysis.fourMeasurePhrasingReferences || []),
                          selectedDownbeat,
                        ].sort((a, b) => a - b),
                      });
                    }}
                  >
                    Add custom phrasing measure (manual mode)
                  </button>
                </li>
                <li>Adjust position: click anywhere</li>
                <li>Enter modulation: alt+click on a new tonic</li>
                <li>
                  <div>
                    Add tag to span: [
                    {previouslySelectedDownbeat ?? selectedDownbeat}-
                    {selectedDownbeat}]
                    <Select
                      ref={tagSpanSelectRef}
                      options={TAGS.map((tag) => ({ value: tag, label: tag }))}
                      onChange={(tag) => {
                        selectDownbeat(null);
                        commitAnalysisUpdate({
                          tagSpans: [
                            ...(analysis.tagSpans ?? []),
                            {
                              tag: tag.value,
                              span: [
                                previouslySelectedDownbeat ?? selectedDownbeat,
                                selectedDownbeat,
                              ] as MeasuresSpan,
                            },
                          ],
                          tags: (analysis.tags ?? []).filter(
                            (item) => item !== tag.value,
                          ),
                        });
                      }}
                    />
                  </div>
                </li>
                <li>
                  {formSection}
                  <div>
                    {FORM_SECTIONS.map((formSection) => (
                      <button
                        style={{ marginRight: "10px", marginTop: "10px" }}
                        className="box-button"
                        onClick={() => {
                          selectDownbeat(null);
                          commitAnalysisUpdate({
                            form: {
                              ...analysis.form,
                              [selectedDownbeat]: formSection,
                            },
                          });
                        }}
                      >
                        {formSection}
                      </button>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              {basedOn}
              {beatsPerMeasure}
              <div key="disable_snap" style={{ marginTop: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => {
                      commitAnalysisUpdate({
                        disableSnapToNotes: !analysis.disableSnapToNotes,
                      });
                    }}
                    checked={analysis.disableSnapToNotes}
                  />
                  Disable snap to notes
                </label>
              </div>
              {romanNumerals}
              {comment}
              <div key="tags" style={{ marginTop: "10px" }}>
                Tags:
                <Select
                  isMulti
                  options={TAGS.map((tag) => ({ value: tag, label: tag }))}
                  value={(analysis.tags || []).map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  onChange={(tags) => {
                    commitAnalysisUpdate({
                      tags: tags.map((tag) => tag.value),
                    });
                  }}
                />
              </div>
              {analysis.tagSpans && (
                <div key="tagSpans" style={{ marginTop: "10px" }}>
                  Tag spans:
                  {analysis.tagSpans
                    .filter(
                      ({ tag }) =>
                        CATEGORIES_IN_STRIPES.indexOf(tag.split(":")[0]) === -1,
                    )
                    .map(({ tag, span }, index) => (
                      <div>
                        {tag}: [{span[0]}, {span[1]}]{" "}
                        <button
                          style={{ marginRight: "10px", marginTop: "10px" }}
                          className="box-button"
                          onClick={() => {
                            // const newTagSpans = [...analysis.tagSpans];
                            // newTagSpans.splice(index, 1);

                            // const newAnalysis = {
                            //   ...analysis,
                            //   tagSpans: newTagSpans,
                            // };

                            // saveAnalysis(newAnalysis);
                            // setAnalysis(newAnalysis);
                            alert("broken, fix");
                          }}
                        >
                          x
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);
