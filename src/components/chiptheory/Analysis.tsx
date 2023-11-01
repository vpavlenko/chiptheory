import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { Note, Span, secondsToX } from "./Chiptheory";
import { MeasuresAndBeats, getPhrasingMeasures } from "./measures";
import {
  MeasureOfRomanNumerals,
  getModulations,
  getRelativeModulations,
  romanNumeralsToArray,
  updateRomanNumerals,
} from "./romanNumerals";

export const RESOLUTION_DUMPS_PER_SECOND = 100;
export const RESOLUTION_MS = 1 / RESOLUTION_DUMPS_PER_SECOND;

const TAGS = [
  "scale:blues",
  "scale:pentatonic",
  "scale:major_pentatonic",
  "scale:tetratonic",
  "scale:chromatic",
  "scale:phrygian",
  "scale:dorian",
  "scale:mixolydian",
  "scale:lydian",
  "scale:hijaz",
  "scale:atonal",
  "scale:octatonic",
  "scale:natural_minor",
  "scale:melodic_minor",
  "scale:harmonic_minor",
  "scale:harmonic_major",
  "scale:hexatonic_minor_no6",
  "scale:whole-tone",
  "scale:nikriz",
  "scale:saba",
  "scale:mixed_minor",
  "scale:hemitonic_pentatonic",
  "scale:demo",
  "scale:dorian_over_pentatonic",
  "scale:mixed_major",
  "harmony:stasis",
  "harmony:parallel_keys",
  "harmony:power_chords",
  "harmony:diatonic_seventh_chords",
  "harmony:blues_seventh_chords",
  "harmony:constant_structures",
  "harmony:quartal",
  "harmony:neo-riemannian",
  "harmony:diminished_seventh_chords",
  "harmony:shuttle",
  "harmony:mixolydian_shuttle",
  "harmony:lydian_shuttle", // all ambiguous cases are marked as mixolydian shuttle
  "harmony:plagal_shuttle",
  "harmony:phrygian_shuttle",
  "harmony:dorian_shuttle",
  "harmony:blues_shuttle",
  "harmony:I-vi shuttle",
  "harmony:i-VI shuttle",
  "harmony:i-VII shuttle",
  "harmony:I-III shuttle",
  "harmony:i-bvii shuttle",
  "harmony:diminished_chord_modulation",
  "harmony:weird",
  "harmony:weird_alterations",
  "harmony:pure_I-V",
  "harmony:pure_i-V",
  "harmony:57_chord_no3",
  "harmony:parallel",
  "harmony:tonic_added-sixth_chord",
  "harmony:unison",
  "harmony:rich_common_practice",
  "harmony:far-out_point",
  "harmony:weird_chord",
  "harmony:turnaround_coda",
  "harmony:picardy_third",
  "harmony:rich",
  "harmony:upper_structure",
  "harmony:I-IV-V",
  "harmony:V7b9",
  "harmony:Vsus4",
  "harmony:implied",
  "rhythm:syncopation",
  "rhythm:interesting",
  "rhythm:swing",
  "rhythm:latin",
  "rhythm:3+3+2",
  "rhythm:1+2+2+2",
  "rhythm:3+3+3+3+2+2",
  "rhythm:4 against 3",
  "rhythm:3 against 2",
  "tempo:accelerando",
  "tempo:ritardando",
  "tempo:uneven",
  "tempo:twice_as_fast",
  "beats:unclear_measure_onsets",
  "beats:incomplete_measure_on_transition",
  "beats:extra_beat", // these two tags are probably the same
  "beats:division_change",
  "tonic:ambiguous", // when pitch class set is uniform 7 notes, but no certain tonic
  "location:scary",
  "location:launch_screen",
  "location:menu",
  "location:intro", // it's a story film
  "location:level_start",
  "location:level",
  "location:boss",
  "location:final_boss",
  "location:level_completed",
  "location:lost",
  "location:game_won",
  "location:credits",
  "location:after_credits",
  "location:jingle",
  "location:shop",
  "location:password",
  "location:sport_level",
  "location:sport_half_time",
  "location:sport_points_scored",
  "location:pause",
  "chip:extensions",
  "chip:tonal_DMC",
  "chip:toms_DMC",
  "chip:vocal_DMC",
  "voice_leading:descending_chromatic_bass",
  "voice_leading:descending_diatonic_bass",
  "voice_leading:ascending_bass",
  "voice_leading:descending_chromatic_melody",
  "voice_leading:ascending_chromatic",
  "voice_leading:Isus4",
  "voice_leading:Cad64",
  "voice_leading:Ger+6",
  "voice_leading:triple_suspension",
  "voice_leading:W-arpeggio",
  "voice_leading:rich_ornamentation",
  "voice_leading:three_parallel_voices",
  "voice_leading:three_independent_voices",
  "non-chord_tones:neighbor",
  "non-chord_tones:double_neighbor",
  "non-chord_tones:chromatic_passing",
  "non-chord_tones:mordent",
  "form:ABA",
  "form:AABA",
  "form:ABABC",
  "form:ABAC",
  "form:ABACA",
  "form:B_part_triple_shuttle",
  "form:12-bar_blues",
  "form:16-bar_blues",
  "form:basso_ostinato",
  "form:fermata_between_sections",
  "form:extra_measure",
  "form:stasis_vs_progression", // contrast between A and B
  "form:period",
  "form:uniform_period",
  "form:reversed_period",
  "form:tag",
  "form:accumulative",
  "form:solo",
  "form:abrupt_ending",
  "form:verse-chorus",
  "form:development_through_timbre",
  "form:sentence",
  "form:not_looped", // this tag is needed because sometimes annotation lacks looping even when it's present. jingles aren't annotated, only long forms
  "form:progression",
  "form:EDM",
  "form:complex",
  "form:binary",
  "form:binary_with_intro",
  "timbre:ultra_fast_notes",
  "timbre:rich",
  "timbre:layered",
  "timbre:wide_vibrato",
  "timbre:oscillator_as_percussion",
  "timbre:unexpected_detune",
  "timbre:silence",
  "timbre:chirp",
  "timbre:portamento",
  "timbre:one-channel delay",
  "timbre:minor_seconds",
  "timbre:chorus",
  "timbre:tremolo",
  "timbre:many_instruments_same_oscillator",
  "timbre:variable_duty_cycle",
  "melody:riff",
  "melody:transposed_riff",
  "melody:chromatic_embellishments",
  "melody:basic_idea_x3",
  "melody:basic_idea_x4",
  "melody:fills_at_rests",
  "melody:fill_after_cadence",
  "melody:stepwise",
  "melody:chord_tones",
  "melody:development_via_rhythmic_shift",
  "melody:chord_tones_as_motive",
  "bass:drone",
  "bass:transposed_riff",
  "bass:riff",
  "bass:walking",
  "bass:melody",
  "bass:alberti",
  "bass:pedal_point",
  "bass:counterpoint",
  "bass:root_octaves",
  "bass:mixed_octaves",
  "bass:root",
  "bass:root_third",
  "bass:root_fifth",
  "bass:root_third_fifth",
  "bass:root_third_fifth_seventh",
  "bass:creative_chord_tones",
  "bass:absent",
  "bass:inversions",
  "bass:different_strategies",
  "bass:smooth_chord_tones",
  "bass:doubles_melody",
  "style:common_practice",
  "style:ragtime",
  "style:waltz",
  "style:arabic",
  "style:functional_blues",
  "style:chinese",
  "style:major_chord_jingle",
  "style:single_chord_jingle",
  "style:bagpipe",
  "style:bossa_nova",
  "style:boogie-woogie",
  "middle_voice:melody_echo",
  "middle_voice:doubles_bass",
  "middle_voice:parallel_octaves",
  "middle_voice:parallel_fourths",
  "middle_voice:parallel_fifths",
  "middle_voice:parallel_thirds",
  "middle_voice:parallel_thirds_with_bass",
  "middle_voice:mixed_parallel",
  "middle_voice:thirds_and_sixths",
  "middle_voice:parallel_sixths",
  "middle_voice:thirds_and_chord_tones",
  "middle_voice:lower_chord_tones",
  "middle_voice:creative_chord_tones", // TODO: check that it's not used for bass
  "middle_voice:root",
  "middle_voice:static_chord_tones",
  "middle_voice:drone",
  "middle_voice:riff",
  "middle_voice:transposed_riff",
  // four most typical cases:
  "middle_voice:absent",
  "middle_voice:melody_below_arpeggio",
  "middle_voice:arpeggio", // that implicitly means "upper_voice:melody"
  "melody:arpeggio", // that implicitly means "no melody anywhere"
  "melody:reharmonization",
  "reference:previous_subtune",
  "motive:natural_horn_call",
  "motive:telephone_call",
  "motive:cadential",
  "middle_voice:counterpoint",
  "upper_voices:arpeggio",
  "upper_voices:absent",
  "upper_voices:legato_melody",
  "upper_voices:different_strategies",
  "upper_voices:same_range",
  "middle_voice:two_notes",
  "upper_voice:riff", // when melody is in middle_voice
  "percussion:layered",
  "analyzed_in:hopkins",
  "analyzed_in:the common cold",
  "anomaly:strange_offset",
  "lower_voices:double_parallel",
  "lower_voices:same_range",
  "origin:demoscene",
  "origin:russia",
  "game_genre:baseball",
  "lego:pullback",
];

const STRIPE_HEIGHT = 20;
const CATEGORIES_IN_STRIPES = [
  "melody",
  "middle_voice",
  "bass",
  "form",
  "everything_else",
];
export const STRIPES_HEIGHT = STRIPE_HEIGHT * CATEGORIES_IN_STRIPES.length;
export const ANALYSIS_HEIGHT = STRIPES_HEIGHT + 70;

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

type TagSpan = {
  tag: string;
  span: Span;
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

// These two don't propagate to Firestore because they tweak transient state.
export const prevStep = (analysis, setAnalysis) =>
  setAnalysis({ ...analysis, step: STEPS[STEPS.indexOf(analysis.step) - 1] });

export const nextStep = (analysis, setAnalysis) =>
  setAnalysis({ ...analysis, step: STEPS[STEPS.indexOf(analysis.step) + 1] });

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
  saveAnalysis,
  setAnalysis,
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
  saveAnalysis(newAnalysis);
  setAnalysis(newAnalysis);
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
      const width = secondsToX(to - from);
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

function stringToHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function hashToColor(hash) {
  // Mask the hash to get a 6 digit hexadecimal number (for a color)
  const color = (hash & 0xffffff).toString(16).toUpperCase();

  // Ensure it's 6 digits
  return "000000".substr(0, 6 - color.length) + color;
}

function luminosityFromRGB(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ensureLowLuminosity(color) {
  const r = parseInt(color.slice(0, 2), 16) / 255;
  const g = parseInt(color.slice(2, 4), 16) / 255;
  const b = parseInt(color.slice(4, 6), 16) / 255;

  const lum = luminosityFromRGB(r, g, b);

  if (lum > 0.5) {
    // 0.5 is a mid-point, you can adjust for your needs
    // Invert the color if luminosity is too high
    const invertedR = (255 - r * 255).toString(16).padStart(2, "0");
    const invertedG = (255 - g * 255).toString(16).padStart(2, "0");
    const invertedB = (255 - b * 255).toString(16).padStart(2, "0");

    return invertedR + invertedG + invertedB;
  }

  return color;
}

function stringToColor(str) {
  return "#" + ensureLowLuminosity(hashToColor(stringToHash(str)));
}

const StripeTag = ({
  left,
  width,
  widthInMeasures,
  tag,
  removeTag,
  onMouseEnter,
  onMouseLeave,
}) => (
  <div
    style={{
      position: "absolute",
      left,
      width,
      backgroundColor: stringToColor(tag),
      color: "white",
      padding: "0 5px 0 5px",
      boxSizing: "border-box",
      height: STRIPE_HEIGHT,
      zIndex: 400 - widthInMeasures,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderRight: "1px solid black",
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <span style={{ overflow: "hidden", fontSize: STRIPE_HEIGHT }}>
      {tag.split(":")[1].replace(/_/g, " ")}
    </span>
    {removeTag && (
      <button
        onClick={removeTag}
        style={{
          backgroundColor: "transparent",
          color: "white",
          fontSize: STRIPE_HEIGHT,
        }}
      >
        [x]
      </button>
    )}
  </div>
);

const Stripes: React.FC<{
  tagSpans: TagSpan[];
  measuresAndBeats: MeasuresAndBeats;
  analysis: Analysis;
  saveAnalysis: (analysis: Analysis) => void;
  setAnalysis: (analysis: Analysis) => void;
  // voiceMask: boolean[];
  setVoiceMask: (voiceMask: boolean[]) => void;
  loggedIn: boolean;
}> = React.memo(
  ({
    tagSpans,
    measuresAndBeats,
    analysis,
    saveAnalysis,
    setAnalysis,
    // voiceMask,
    setVoiceMask,
    loggedIn,
  }) => {
    const stripeTags = new Array(CATEGORIES_IN_STRIPES.length)
      .fill(null)
      .map(() => []);
    tagSpans.map(({ tag, span }, tagIndex) => {
      const [category, content] = tag.split(":");
      let categoryIndex = CATEGORIES_IN_STRIPES.indexOf(category);
      if (categoryIndex === -1) {
        categoryIndex = CATEGORIES_IN_STRIPES.length - 1;
      }
      const stripeTagNode = (
        <StripeTag
          left={secondsToX(measuresAndBeats.measures[span[0] - 1])}
          width={secondsToX(
            measuresAndBeats.measures[
              Math.min(span[1], measuresAndBeats.measures.length - 1)
            ] - measuresAndBeats.measures[span[0] - 1],
          )}
          widthInMeasures={span[1] - span[0]}
          tag={tag}
          removeTag={
            loggedIn &&
            (() => {
              const newTagSpans = [...tagSpans];
              newTagSpans.splice(tagIndex, 1);

              const newAnalysis = {
                ...analysis,
                tagSpans: newTagSpans,
              };

              saveAnalysis(newAnalysis);
              setAnalysis(newAnalysis);
            })
          }
          onMouseEnter={() => {
            if (category === "bass") {
              // TODO: actually store the bass voice in tagSpan object in the DB
              const newVoiceMask = [false, false, true, false, false];
              setVoiceMask(newVoiceMask);
            }
          }}
          onMouseLeave={() => {
            if (category === "bass") {
              setVoiceMask([true, true, true, true, true]);
            }
          }}
        />
      );
      stripeTags[categoryIndex].push(
        <a href={`/search/${category}/${content}`} target="_blank">
          {stripeTagNode}
        </a>,
      );
    });

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: CATEGORIES_IN_STRIPES.length * STRIPE_HEIGHT,
          zIndex: 1000,
        }}
      >
        {stripeTags.map((bucket, index) => (
          <div
            style={{
              height: STRIPE_HEIGHT,
              position: "absolute",
              top: index * STRIPE_HEIGHT,
              left: 0,
              width: "100%",
            }}
          >
            <div
              style={{
                position: "absolute",
                fontSize: STRIPE_HEIGHT,
                padding: "0 5px 0 5px",
              }}
            >
              {CATEGORIES_IN_STRIPES[index]}
            </div>
            {bucket}
          </div>
        ))}
      </div>
    );
  },
);

export const AnalysisGrid: React.FC<{
  analysis: Analysis;
  allNotes: Note[];
  measuresAndBeats: MeasuresAndBeats;
  midiNumberToY: (number: number) => number;
  noteHeight: number;
  previouslySelectedDownbeat: number;
  selectedDownbeat: number;
  selectDownbeat: (number: number) => void;
  saveAnalysis: (analysis: Analysis) => void;
  setAnalysis: (analysis: Analysis) => void;
  // a callback for stripes to tweak voiceMask on hover
  // voiceMask: boolean[];
  setVoiceMask: (voiceMask: boolean[]) => void;
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
    saveAnalysis,
    setAnalysis,
    // voiceMask,
    setVoiceMask,
    loggedIn,
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
          saveAnalysis={saveAnalysis}
          setAnalysis={setAnalysis}
          // voiceMask={voiceMask}
          setVoiceMask={setVoiceMask}
          loggedIn={loggedIn}
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
              zIndex: 100,
              width: "5000px",
            }}
          >
            <div style={{ margin: "50px", color: "white" }}>Loop</div>
          </div>
        )}
      </>
    );
  },
);

export const AnalysisBox: React.FC<{
  analysis: Analysis;
  saveAnalysis: (analysis: Analysis) => void;
  setAnalysis: (analysis: Analysis) => void;
  previouslySelectedDownbeat: number;
  selectedDownbeat: number;
  selectDownbeat: (downbeat: number | null) => void;
}> = React.memo(
  ({
    analysis,
    saveAnalysis,
    setAnalysis,
    previouslySelectedDownbeat,
    selectedDownbeat,
    selectDownbeat,
  }) => {
    const useInputField = (
      initialValue,
      analysisFieldName,
      label,
      width = "95%",
      mergeValueIntoAnalysis = null,
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
          const newAnalysis = mergeValueIntoAnalysis
            ? mergeValueIntoAnalysis(analysis, value)
            : {
                ...analysis,
                [analysisFieldName]:
                  typeof initialValue === "number"
                    ? parseInt(value, 10)
                    : value,
              };

          saveAnalysis(newAnalysis);
          setAnalysis(newAnalysis);
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
          ...analysis,
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
                onClick={() => prevStep(analysis, setAnalysis)}
              >
                &lt;
              </button>{" "}
              <button
                className="box-button"
                disabled={analysis.step === STEPS[STEPS.length - 1]}
                onClick={() => nextStep(analysis, setAnalysis)}
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
                      const newAnalysis = {
                        ...analysis,
                        loop: selectedDownbeat,
                      };

                      selectDownbeat(null);
                      saveAnalysis(newAnalysis);
                      setAnalysis(newAnalysis);
                    }}
                  >
                    Mark loop start
                  </button>
                </li>
                <li>
                  <button
                    className="box-button"
                    onClick={() => {
                      const newAnalysis = {
                        ...analysis,
                        fourMeasurePhrasingReferences: [selectedDownbeat],
                      };

                      selectDownbeat(null);
                      saveAnalysis(newAnalysis);
                      setAnalysis(newAnalysis);
                    }}
                  >
                    Mark start of 4-measure phrasing
                  </button>
                </li>
                <li>
                  <button
                    className="box-button"
                    onClick={() => {
                      const newAnalysis = {
                        ...analysis,
                        fourMeasurePhrasingReferences: [
                          ...(analysis.fourMeasurePhrasingReferences || []),
                          selectedDownbeat,
                        ].sort((a, b) => a - b),
                      };

                      selectDownbeat(null);
                      saveAnalysis(newAnalysis);
                      setAnalysis(newAnalysis);
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
                        const newAnalysis = {
                          ...analysis,
                          tagSpans: [
                            ...(analysis.tagSpans ?? []),
                            {
                              tag: tag.value,
                              span: [
                                previouslySelectedDownbeat ?? selectedDownbeat,
                                selectedDownbeat,
                              ] as Span,
                            },
                          ],
                          tags: (analysis.tags ?? []).filter(
                            (item) => item !== tag.value,
                          ),
                        };

                        selectDownbeat(null);
                        saveAnalysis(newAnalysis);
                        setAnalysis(newAnalysis);
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
                          const newAnalysis = {
                            ...analysis,
                            form: {
                              ...analysis.form,
                              [selectedDownbeat]: formSection,
                            },
                          };

                          selectDownbeat(null);
                          saveAnalysis(newAnalysis);
                          setAnalysis(newAnalysis);
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
                      const newAnalysis = {
                        ...analysis,
                        disableSnapToNotes: !analysis.disableSnapToNotes,
                      };

                      saveAnalysis(newAnalysis);
                      setAnalysis(newAnalysis);
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
                    const newAnalysis = {
                      ...analysis,
                      tags: tags.map((tag) => tag.value),
                    };

                    saveAnalysis(newAnalysis);
                    setAnalysis(newAnalysis);
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
