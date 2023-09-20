import * as React from "react";
import { Analysis, PitchClass } from "./Analysis";
import { Note, Span } from "./Chiptheory";

const getIntersectionTime = (i: Span, j: Span): number => {
  const [iStart, iEnd] = i;
  const [jStart, jEnd] = j;

  if (iEnd < jStart || jEnd < iStart) {
    return 0;
  }

  const startOverlap = Math.max(iStart, jStart);
  const endOverlap = Math.min(iEnd, jEnd);

  return endOverlap - startOverlap;
};

const sumPitchClassTimeInSpan = (
  pitchClass: PitchClass,
  span: Span,
  notes: Note[],
) => {
  let sum = 0;
  for (const note of notes) {
    if (note.note.midiNumber % 12 === pitchClass) {
      sum += getIntersectionTime(span, note.span);
    }
  }
  return sum;
};

const MINOR_CHORDS = [
  "i",
  "viio/ii",
  "ii",
  "biii",
  "iii",
  "iv",
  "viio/V",
  "v",
  "bvi",
  "vi",
  "vii",
  "viio",
];
const MAJOR_CHORDS = [
  "I",
  "bII",
  "V/V",
  "III",
  "V/vi",
  "IV",
  "#IV",
  "V",
  "VI",
  "V/ii",
  "VII",
  "#VII",
];

export const updateRomanNumerals = (
  analysis: Analysis,
  note: Note,
  notes: Note[],
  measures: number[],
  isHalfMeasure: boolean,
) => {
  const noteMiddle = (note.span[0] + note.span[1]) / 2;
  const measureIndex = measures.findIndex((time) => time >= noteMiddle) - 1;
  const measureSpan: Span = [
    measures[measureIndex],
    measures[measureIndex + 1],
  ];
  const measureMiddle = measureSpan[0] * 0.5 + measureSpan[1] * 0.5;
  const span: Span = isHalfMeasure
    ? noteMiddle < measureMiddle
      ? [measureSpan[0], measureMiddle]
      : [measureMiddle, measureSpan[1]]
    : measureSpan;

  const noteDegree = (note.note.midiNumber - analysis.tonic) % 12;
  const minorThirdWeight = sumPitchClassTimeInSpan(
    ((note.note.midiNumber + 3) % 12) as PitchClass,
    span,
    notes,
  );
  const majorThirdWeight = sumPitchClassTimeInSpan(
    ((note.note.midiNumber + 4) % 12) as PitchClass,
    span,
    notes,
  );
  const newRomanNumeral = (
    minorThirdWeight > majorThirdWeight ? MINOR_CHORDS : MAJOR_CHORDS
  )[noteDegree];

  const rnArray = romanNumeralsToArray(analysis.romanNumerals);

  while (rnArray.length <= measureIndex) {
    rnArray.push("_");
  }
  if (isHalfMeasure) {
    const dashedRN = dashedRnToArray(rnArray[measureIndex]);
    if (dashedRN.length < 2) {
      dashedRN.push(dashedRN[0]);
    }
    dashedRN[noteMiddle < measureMiddle ? 0 : 1] = newRomanNumeral;
    rnArray[measureIndex] = dashedRN.join("-");
  } else {
    rnArray[measureIndex] = newRomanNumeral;
  }

  return rnArray.join(" ");
};

const SIMPLE_RN_TO_CHROMATIC_DEGREE = {
  I: 0,
  bII: 1,
  II: 2,
  III: 3, // obviously will fail in minor mode
  IV: 5,
  V: 7,
  VI: 8,
  VII: 10,
  i: 0,
  ii: 2,
  iii: 4, // obviously will fail in minor mode
  iv: 5,
  v: 7,
  vi: 9,
  vii: 11,
  "-": 12,
  bvi: 8,
  "#IV": 6,
  "#iv": 6,
  biii: 3,
  "#VII": 11,
};

const split = (s: string, delimiter: string) =>
  (s || "").split(delimiter).filter((s) => s !== "");

export const romanNumeralsToArray = (romanNumerals: string): string[] =>
  split(romanNumerals, " ");

const dashedRnToArray = (dashedRN: string): string[] => split(dashedRN, "-");

const cleanupRn = (rn: string): string => rn.replace(/[\d|o|ø]+/, "");

export const romanNumeralToChromaticDegree = (romanNumeral: string): number => {
  if (typeof romanNumeral !== "string" || romanNumeral.length === 0) return 12; // wtf

  romanNumeral = cleanupRn(romanNumeral);
  const [applied, to] = romanNumeral.split("/");
  if (to) {
    return (
      (SIMPLE_RN_TO_CHROMATIC_DEGREE[applied] +
        SIMPLE_RN_TO_CHROMATIC_DEGREE[to]) %
      12
    );
  }
  return SIMPLE_RN_TO_CHROMATIC_DEGREE[romanNumeral];
};

export const TWELVE_TONE_COLORS = [
  "red",
  "brown", // CC5500
  "#FF8C00",
  "#dd0", // "#C1C100",
  "green",
  "#0EFFD0",
  "#787276",
  "blue",
  "#9F9FFF",
  "#9400D3",
  "#FF1493",
  "#ffaacc",
  "black",
];

export const RomanNumeral: React.FC<{
  romanNumeral: string;
  styleProps?: any;
}> = ({ romanNumeral, styleProps = {} }) => {
  const backgroundColor =
    TWELVE_TONE_COLORS[romanNumeralToChromaticDegree(romanNumeral)] ??
    "transparent";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        display: "grid",
        placeItems: "center",
      }}
    >
      <span
        style={{
          color:
            ["#dd0", "#9F9FFF", "#0EFFD0"].indexOf(backgroundColor) !== -1
              ? "black"
              : "white",
          ...styleProps,
        }}
      >
        {romanNumeral}
      </span>
    </div>
  );
};

export const RomanNumerals: React.FC<{ romanNumerals: string }> = ({
  romanNumerals,
}) => (
  <div style={{ display: "inline-block" }}>
    <div
      style={{
        display: "flex",
        // width: "100px",
        height: "18px",
        flexDirection: "row",
      }}
    >
      {romanNumeralsToArray(romanNumerals).map((s) => (
        <div
          style={{
            width: "15px",
            height: "18px",
            display: "grid",
            placeItems: "center",
            backgroundColor:
              TWELVE_TONE_COLORS[romanNumeralToChromaticDegree(s)],
          }}
        >
          <RomanNumeral
            romanNumeral={s}
            styleProps={{ fontFamily: "sans-serif", fontSize: "14px" }}
          />
        </div>
      ))}
    </div>
  </div>
);

export const MeasureOfRomanNumerals: React.FC<{ dashedRN: string }> = ({
  dashedRN,
}) => {
  const chords = dashedRnToArray(dashedRN);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
      }}
    >
      {chords.map((chord) => (
        <RomanNumeral romanNumeral={chord} />
      ))}
    </div>
  );
};

export const getChordNote = (
  note: Note,
  tonic: PitchClass | null,
  measures: number[] | null,
  romanNumerals?: string,
): string => {
  if (note.span[1] - note.span[0] < 0.1) return "";
  const noteMiddle = (note.span[0] + note.span[1]) / 2;
  if (!measures) return "";
  const measureIndex = measures.findIndex((time) => time >= noteMiddle);
  if (measureIndex === -1 || measureIndex === 0) return ""; // anacrusis can't have RN

  const dashedRnArray = dashedRnToArray(
    romanNumeralsToArray(romanNumerals)[measureIndex - 1],
  );
  const l = measures[measureIndex - 1];
  const r = measures[measureIndex];
  const n = dashedRnArray.length;
  let i = 0;
  while (i < n && noteMiddle > l + ((r - l) * (i + 1)) / n) {
    i++;
  }
  const romanNumeral = dashedRnArray[i];

  if (!romanNumeral) return "";
  const rootChromaticScaleDegree = romanNumeralToChromaticDegree(romanNumeral);
  if (rootChromaticScaleDegree === -1) return "";

  return ["r", "♭", "2", "m", "3", "4", "T", "5", "↓", "6", "7", "△"][
    (((note.note.midiNumber - tonic) % 12) + 12 - rootChromaticScaleDegree) % 12
  ];
};
