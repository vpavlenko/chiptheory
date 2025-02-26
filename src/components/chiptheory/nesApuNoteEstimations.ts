export type nesApuNoteEstimation = {
    name: string;
    midiNumber: number;
    frequency: number;
    pianoNumber: number | null;
    apuIndex: number | null;
    pulsePeriod: number | null;
    pulseFrequency: number | null;
    pulseTuningError: number | null;
    trianglePeriod: number | null;
    triangleFrequency: number | null;
    triangleTuningError: number | null;
};

export const PAUSE = {
    "name": "PP",  // pause
    "midiNumber": -1,
    "frequency": 20,
    "pianoNumber": null,
    "apuIndex": null,
    "pulsePeriod": null,
    "pulseFrequency": null,
    "pulseTuningError": null,
    "trianglePeriod": null,
    "triangleFrequency": null,
    "triangleTuningError": null
}

export const NES_APU_NOTE_ESTIMATIONS: nesApuNoteEstimation[] = [
    PAUSE,
    {
        "name": "A0",
        "midiNumber": 21,
        "frequency": 27.5,
        "pianoNumber": 1,
        "apuIndex": null,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 2033,
        "triangleFrequency": 27.4977,
        "triangleTuningError": 0
    },
    {
        "name": "A#0",
        "midiNumber": 22,
        "frequency": 29.1352,
        "pianoNumber": 2,
        "apuIndex": null,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1919,
        "triangleFrequency": 29.1304,
        "triangleTuningError": 0
    },
    {
        "name": "B0",
        "midiNumber": 23,
        "frequency": 30.8677,
        "pianoNumber": 3,
        "apuIndex": null,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1811,
        "triangleFrequency": 30.8666,
        "triangleTuningError": 0
    },
    {
        "name": "C1",
        "midiNumber": 24,
        "frequency": 32.7031,
        "pianoNumber": 4,
        "apuIndex": 0,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1709,
        "triangleFrequency": 32.7078,
        "triangleTuningError": 0
    },
    {
        "name": "C#1",
        "midiNumber": 25,
        "frequency": 34.6478,
        "pianoNumber": 5,
        "apuIndex": 1,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1613,
        "triangleFrequency": 34.6532,
        "triangleTuningError": 0
    },
    {
        "name": "D1",
        "midiNumber": 26,
        "frequency": 36.708,
        "pianoNumber": 6,
        "apuIndex": 2,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1523,
        "triangleFrequency": 36.6997,
        "triangleTuningError": 0
    },
    {
        "name": "D#1",
        "midiNumber": 27,
        "frequency": 38.8908,
        "pianoNumber": 7,
        "apuIndex": 3,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1437,
        "triangleFrequency": 38.8945,
        "triangleTuningError": 0
    },
    {
        "name": "E1",
        "midiNumber": 28,
        "frequency": 41.2034,
        "pianoNumber": 8,
        "apuIndex": 4,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1356,
        "triangleFrequency": 41.2162,
        "triangleTuningError": 1
    },
    {
        "name": "F1",
        "midiNumber": 29,
        "frequency": 43.6535,
        "pianoNumber": 9,
        "apuIndex": 5,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1280,
        "triangleFrequency": 43.6615,
        "triangleTuningError": 0
    },
    {
        "name": "F#1",
        "midiNumber": 30,
        "frequency": 46.2493,
        "pianoNumber": 10,
        "apuIndex": 6,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1208,
        "triangleFrequency": 46.2617,
        "triangleTuningError": 0
    },
    {
        "name": "G1",
        "midiNumber": 31,
        "frequency": 48.9994,
        "pianoNumber": 11,
        "apuIndex": 7,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1140,
        "triangleFrequency": 49.0187,
        "triangleTuningError": 1
    },
    {
        "name": "G#1",
        "midiNumber": 32,
        "frequency": 51.913,
        "pianoNumber": 12,
        "apuIndex": 8,
        "pulsePeriod": null,
        "pulseFrequency": null,
        "pulseTuningError": null,
        "trianglePeriod": 1076,
        "triangleFrequency": 51.9316,
        "triangleTuningError": 1
    },
    {
        "name": "A1",
        "midiNumber": 33,
        "frequency": 55,
        "pianoNumber": 13,
        "apuIndex": 9,
        "pulsePeriod": 2033,
        "pulseFrequency": 54.9954,
        "pulseTuningError": 0,
        "trianglePeriod": 1016,
        "triangleFrequency": 54.9954,
        "triangleTuningError": 0
    },
    {
        "name": "A#1",
        "midiNumber": 34,
        "frequency": 58.2704,
        "pianoNumber": 14,
        "apuIndex": 10,
        "pulsePeriod": 1919,
        "pulseFrequency": 58.2608,
        "pulseTuningError": 0,
        "trianglePeriod": 959,
        "triangleFrequency": 58.2608,
        "triangleTuningError": 0
    },
    {
        "name": "B1",
        "midiNumber": 35,
        "frequency": 61.7354,
        "pianoNumber": 15,
        "apuIndex": 11,
        "pulsePeriod": 1811,
        "pulseFrequency": 61.7333,
        "pulseTuningError": 0,
        "trianglePeriod": 905,
        "triangleFrequency": 61.7333,
        "triangleTuningError": 0
    },
    {
        "name": "C2",
        "midiNumber": 36,
        "frequency": 65.4063,
        "pianoNumber": 16,
        "apuIndex": 12,
        "pulsePeriod": 1709,
        "pulseFrequency": 65.4156,
        "pulseTuningError": 0,
        "trianglePeriod": 854,
        "triangleFrequency": 65.4156,
        "triangleTuningError": 0
    },
    {
        "name": "C#2",
        "midiNumber": 37,
        "frequency": 69.2956,
        "pianoNumber": 17,
        "apuIndex": 13,
        "pulsePeriod": 1613,
        "pulseFrequency": 69.3065,
        "pulseTuningError": 0,
        "trianglePeriod": 806,
        "triangleFrequency": 69.3065,
        "triangleTuningError": 0
    },
    {
        "name": "D2",
        "midiNumber": 38,
        "frequency": 73.4161,
        "pianoNumber": 18,
        "apuIndex": 14,
        "pulsePeriod": 1523,
        "pulseFrequency": 73.3994,
        "pulseTuningError": 0,
        "trianglePeriod": 761,
        "triangleFrequency": 73.3994,
        "triangleTuningError": 0
    },
    {
        "name": "D#2",
        "midiNumber": 39,
        "frequency": 77.7817,
        "pianoNumber": 19,
        "apuIndex": 15,
        "pulsePeriod": 1437,
        "pulseFrequency": 77.7891,
        "pulseTuningError": 0,
        "trianglePeriod": 718,
        "triangleFrequency": 77.7891,
        "triangleTuningError": 0
    },
    {
        "name": "E2",
        "midiNumber": 40,
        "frequency": 82.4068,
        "pianoNumber": 20,
        "apuIndex": 16,
        "pulsePeriod": 1356,
        "pulseFrequency": 82.4324,
        "pulseTuningError": 1,
        "trianglePeriod": 678,
        "triangleFrequency": 82.3717,
        "triangleTuningError": -1
    },
    {
        "name": "F2",
        "midiNumber": 41,
        "frequency": 87.307,
        "pianoNumber": 21,
        "apuIndex": 17,
        "pulsePeriod": 1280,
        "pulseFrequency": 87.323,
        "pulseTuningError": 0,
        "trianglePeriod": 640,
        "triangleFrequency": 87.2549,
        "triangleTuningError": -1
    },
    {
        "name": "F#2",
        "midiNumber": 42,
        "frequency": 92.4986,
        "pianoNumber": 22,
        "apuIndex": 18,
        "pulsePeriod": 1208,
        "pulseFrequency": 92.5234,
        "pulseTuningError": 0,
        "trianglePeriod": 604,
        "triangleFrequency": 92.4469,
        "triangleTuningError": -1
    },
    {
        "name": "G2",
        "midiNumber": 43,
        "frequency": 97.9988,
        "pianoNumber": 23,
        "apuIndex": 19,
        "pulsePeriod": 1140,
        "pulseFrequency": 98.0375,
        "pulseTuningError": 1,
        "trianglePeriod": 570,
        "triangleFrequency": 97.9516,
        "triangleTuningError": -1
    },
    {
        "name": "G#2",
        "midiNumber": 44,
        "frequency": 103.8261,
        "pianoNumber": 24,
        "apuIndex": 20,
        "pulsePeriod": 1076,
        "pulseFrequency": 103.8633,
        "pulseTuningError": 1,
        "trianglePeriod": 538,
        "triangleFrequency": 103.7669,
        "triangleTuningError": -1
    },
    {
        "name": "A2",
        "midiNumber": 45,
        "frequency": 110,
        "pianoNumber": 25,
        "apuIndex": 21,
        "pulsePeriod": 1016,
        "pulseFrequency": 109.9909,
        "pulseTuningError": 0,
        "trianglePeriod": 507,
        "triangleFrequency": 110.0992,
        "triangleTuningError": 2
    },
    {
        "name": "A#2",
        "midiNumber": 46,
        "frequency": 116.5409,
        "pianoNumber": 26,
        "apuIndex": 22,
        "pulsePeriod": 959,
        "pulseFrequency": 116.5216,
        "pulseTuningError": 0,
        "trianglePeriod": 479,
        "triangleFrequency": 116.5216,
        "triangleTuningError": 0
    },
    {
        "name": "B2",
        "midiNumber": 47,
        "frequency": 123.4708,
        "pianoNumber": 27,
        "apuIndex": 23,
        "pulsePeriod": 905,
        "pulseFrequency": 123.4666,
        "pulseTuningError": 0,
        "trianglePeriod": 452,
        "triangleFrequency": 123.4666,
        "triangleTuningError": 0
    },
    {
        "name": "C3",
        "midiNumber": 48,
        "frequency": 130.8127,
        "pianoNumber": 28,
        "apuIndex": 24,
        "pulsePeriod": 854,
        "pulseFrequency": 130.8313,
        "pulseTuningError": 0,
        "trianglePeriod": 427,
        "triangleFrequency": 130.6785,
        "triangleTuningError": -2
    },
    {
        "name": "C#3",
        "midiNumber": 49,
        "frequency": 138.5913,
        "pianoNumber": 29,
        "apuIndex": 25,
        "pulsePeriod": 806,
        "pulseFrequency": 138.6131,
        "pulseTuningError": 0,
        "trianglePeriod": 403,
        "triangleFrequency": 138.4415,
        "triangleTuningError": -2
    },
    {
        "name": "D3",
        "midiNumber": 50,
        "frequency": 146.8323,
        "pianoNumber": 30,
        "apuIndex": 26,
        "pulsePeriod": 761,
        "pulseFrequency": 146.7989,
        "pulseTuningError": 0,
        "trianglePeriod": 380,
        "triangleFrequency": 146.7989,
        "triangleTuningError": 0
    },
    {
        "name": "D#3",
        "midiNumber": 51,
        "frequency": 155.5634,
        "pianoNumber": 31,
        "apuIndex": 27,
        "pulsePeriod": 718,
        "pulseFrequency": 155.5783,
        "pulseTuningError": 0,
        "trianglePeriod": 359,
        "triangleFrequency": 155.3622,
        "triangleTuningError": -2
    },
    {
        "name": "E3",
        "midiNumber": 52,
        "frequency": 164.8137,
        "pianoNumber": 32,
        "apuIndex": 28,
        "pulsePeriod": 678,
        "pulseFrequency": 164.7434,
        "pulseTuningError": -1,
        "trianglePeriod": 338,
        "triangleFrequency": 164.9864,
        "triangleTuningError": 2
    },
    {
        "name": "F3",
        "midiNumber": 53,
        "frequency": 174.6141,
        "pianoNumber": 33,
        "apuIndex": 29,
        "pulsePeriod": 640,
        "pulseFrequency": 174.5098,
        "pulseTuningError": -1,
        "trianglePeriod": 319,
        "triangleFrequency": 174.7825,
        "triangleTuningError": 2
    },
    {
        "name": "F#3",
        "midiNumber": 54,
        "frequency": 184.9972,
        "pianoNumber": 34,
        "apuIndex": 30,
        "pulsePeriod": 604,
        "pulseFrequency": 184.8939,
        "pulseTuningError": -1,
        "trianglePeriod": 301,
        "triangleFrequency": 185.2,
        "triangleTuningError": 2
    },
    {
        "name": "G3",
        "midiNumber": 55,
        "frequency": 195.9977,
        "pianoNumber": 35,
        "apuIndex": 31,
        "pulsePeriod": 570,
        "pulseFrequency": 195.9033,
        "pulseTuningError": -1,
        "trianglePeriod": 284,
        "triangleFrequency": 196.247,
        "triangleTuningError": 2
    },
    {
        "name": "G#3",
        "midiNumber": 56,
        "frequency": 207.6523,
        "pianoNumber": 36,
        "apuIndex": 32,
        "pulsePeriod": 538,
        "pulseFrequency": 207.5339,
        "pulseTuningError": -1,
        "trianglePeriod": 268,
        "triangleFrequency": 207.9197,
        "triangleTuningError": 2
    },
    {
        "name": "A3",
        "midiNumber": 57,
        "frequency": 220,
        "pianoNumber": 37,
        "apuIndex": 33,
        "pulsePeriod": 507,
        "pulseFrequency": 220.1984,
        "pulseTuningError": 2,
        "trianglePeriod": 253,
        "triangleFrequency": 220.1984,
        "triangleTuningError": 2
    },
    {
        "name": "A#3",
        "midiNumber": 58,
        "frequency": 233.0818,
        "pianoNumber": 38,
        "apuIndex": 34,
        "pulsePeriod": 479,
        "pulseFrequency": 233.0433,
        "pulseTuningError": 0,
        "trianglePeriod": 239,
        "triangleFrequency": 233.0433,
        "triangleTuningError": 0
    },
    {
        "name": "B3",
        "midiNumber": 59,
        "frequency": 246.9416,
        "pianoNumber": 39,
        "apuIndex": 35,
        "pulsePeriod": 452,
        "pulseFrequency": 246.9333,
        "pulseTuningError": 0,
        "trianglePeriod": 225,
        "triangleFrequency": 247.4796,
        "triangleTuningError": 4
    },
    {
        "name": "C4",
        "midiNumber": 60,
        "frequency": 261.6255,
        "pianoNumber": 40,
        "apuIndex": 36,
        "pulsePeriod": 427,
        "pulseFrequency": 261.357,
        "pulseTuningError": -2,
        "trianglePeriod": 213,
        "triangleFrequency": 261.357,
        "triangleTuningError": -2
    },
    {
        "name": "C#4",
        "midiNumber": 61,
        "frequency": 277.1826,
        "pianoNumber": 41,
        "apuIndex": 37,
        "pulsePeriod": 403,
        "pulseFrequency": 276.8831,
        "pulseTuningError": -2,
        "trianglePeriod": 201,
        "triangleFrequency": 276.8831,
        "triangleTuningError": -2
    },
    {
        "name": "D4",
        "midiNumber": 62,
        "frequency": 293.6647,
        "pianoNumber": 42,
        "apuIndex": 38,
        "pulsePeriod": 380,
        "pulseFrequency": 293.5979,
        "pulseTuningError": 0,
        "trianglePeriod": 189,
        "triangleFrequency": 294.3705,
        "triangleTuningError": 4
    },
    {
        "name": "D#4",
        "midiNumber": 63,
        "frequency": 311.1269,
        "pianoNumber": 43,
        "apuIndex": 39,
        "pulsePeriod": 359,
        "pulseFrequency": 310.7244,
        "pulseTuningError": -2,
        "trianglePeriod": 179,
        "triangleFrequency": 310.7244,
        "triangleTuningError": -2
    },
    {
        "name": "E4",
        "midiNumber": 64,
        "frequency": 329.6275,
        "pianoNumber": 44,
        "apuIndex": 40,
        "pulsePeriod": 338,
        "pulseFrequency": 329.9728,
        "pulseTuningError": 2,
        "trianglePeriod": 169,
        "triangleFrequency": 329.0023,
        "triangleTuningError": -3
    },
    {
        "name": "F4",
        "midiNumber": 65,
        "frequency": 349.2282,
        "pianoNumber": 45,
        "apuIndex": 41,
        "pulsePeriod": 319,
        "pulseFrequency": 349.565,
        "pulseTuningError": 2,
        "trianglePeriod": 159,
        "triangleFrequency": 349.565,
        "triangleTuningError": 2
    },
    {
        "name": "F#4",
        "midiNumber": 66,
        "frequency": 369.9944,
        "pianoNumber": 46,
        "apuIndex": 42,
        "pulsePeriod": 301,
        "pulseFrequency": 370.4,
        "pulseTuningError": 2,
        "trianglePeriod": 150,
        "triangleFrequency": 370.4,
        "triangleTuningError": 2
    },
    {
        "name": "G4",
        "midiNumber": 67,
        "frequency": 391.9954,
        "pianoNumber": 47,
        "apuIndex": 43,
        "pulsePeriod": 284,
        "pulseFrequency": 392.494,
        "pulseTuningError": 2,
        "trianglePeriod": 142,
        "triangleFrequency": 391.1217,
        "triangleTuningError": -4
    },
    {
        "name": "G#4",
        "midiNumber": 68,
        "frequency": 415.3046,
        "pianoNumber": 48,
        "apuIndex": 44,
        "pulsePeriod": 268,
        "pulseFrequency": 415.8394,
        "pulseTuningError": 2,
        "trianglePeriod": 134,
        "triangleFrequency": 414.2993,
        "triangleTuningError": -4
    },
    {
        "name": "A4",
        "midiNumber": 69,
        "frequency": 440,
        "pianoNumber": 49,
        "apuIndex": 45,
        "pulsePeriod": 253,
        "pulseFrequency": 440.3968,
        "pulseTuningError": 2,
        "trianglePeriod": 126,
        "triangleFrequency": 440.3968,
        "triangleTuningError": 2
    },
    {
        "name": "A#4",
        "midiNumber": 70,
        "frequency": 466.1637,
        "pianoNumber": 50,
        "apuIndex": 46,
        "pulsePeriod": 239,
        "pulseFrequency": 466.0867,
        "pulseTuningError": 0,
        "trianglePeriod": 119,
        "triangleFrequency": 466.0867,
        "triangleTuningError": 0
    },
    {
        "name": "B4",
        "midiNumber": 71,
        "frequency": 493.8833,
        "pianoNumber": 51,
        "apuIndex": 47,
        "pulsePeriod": 225,
        "pulseFrequency": 494.9593,
        "pulseTuningError": 4,
        "trianglePeriod": 112,
        "triangleFrequency": 494.9593,
        "triangleTuningError": 4
    },
    {
        "name": "C5",
        "midiNumber": 72,
        "frequency": 523.2511,
        "pianoNumber": 52,
        "apuIndex": 48,
        "pulsePeriod": 213,
        "pulseFrequency": 522.714,
        "pulseTuningError": -2,
        "trianglePeriod": 106,
        "triangleFrequency": 522.714,
        "triangleTuningError": -2
    },
    {
        "name": "C#5",
        "midiNumber": 73,
        "frequency": 554.3652,
        "pianoNumber": 53,
        "apuIndex": 49,
        "pulsePeriod": 201,
        "pulseFrequency": 553.7663,
        "pulseTuningError": -2,
        "trianglePeriod": 100,
        "triangleFrequency": 553.7663,
        "triangleTuningError": -2
    },
    {
        "name": "D5",
        "midiNumber": 74,
        "frequency": 587.3295,
        "pianoNumber": 54,
        "apuIndex": 50,
        "pulsePeriod": 189,
        "pulseFrequency": 588.7411,
        "pulseTuningError": 4,
        "trianglePeriod": 94,
        "triangleFrequency": 588.7411,
        "triangleTuningError": 4
    },
    {
        "name": "D#5",
        "midiNumber": 75,
        "frequency": 622.2539,
        "pianoNumber": 55,
        "apuIndex": 51,
        "pulsePeriod": 179,
        "pulseFrequency": 621.4489,
        "pulseTuningError": -2,
        "trianglePeriod": 89,
        "triangleFrequency": 621.4489,
        "triangleTuningError": -2
    },
    {
        "name": "E5",
        "midiNumber": 76,
        "frequency": 659.2551,
        "pianoNumber": 56,
        "apuIndex": 52,
        "pulsePeriod": 169,
        "pulseFrequency": 658.0047,
        "pulseTuningError": -3,
        "trianglePeriod": 84,
        "triangleFrequency": 658.0047,
        "triangleTuningError": -3
    },
    {
        "name": "F5",
        "midiNumber": 77,
        "frequency": 698.4564,
        "pianoNumber": 57,
        "apuIndex": 53,
        "pulsePeriod": 159,
        "pulseFrequency": 699.13,
        "pulseTuningError": 2,
        "trianglePeriod": 79,
        "triangleFrequency": 699.13,
        "triangleTuningError": 2
    },
    {
        "name": "F#5",
        "midiNumber": 78,
        "frequency": 739.9888,
        "pianoNumber": 58,
        "apuIndex": 54,
        "pulsePeriod": 150,
        "pulseFrequency": 740.8,
        "pulseTuningError": 2,
        "trianglePeriod": 75,
        "triangleFrequency": 735.9263,
        "triangleTuningError": -10
    },
    {
        "name": "G5",
        "midiNumber": 79,
        "frequency": 783.9908,
        "pianoNumber": 59,
        "apuIndex": 55,
        "pulsePeriod": 142,
        "pulseFrequency": 782.2434,
        "pulseTuningError": -4,
        "trianglePeriod": 70,
        "triangleFrequency": 787.7522,
        "triangleTuningError": 8
    },
    {
        "name": "G#5",
        "midiNumber": 80,
        "frequency": 830.6093,
        "pianoNumber": 60,
        "apuIndex": 56,
        "pulsePeriod": 134,
        "pulseFrequency": 828.5986,
        "pulseTuningError": -4,
        "trianglePeriod": 66,
        "triangleFrequency": 834.7821,
        "triangleTuningError": 9
    },
    {
        "name": "A5",
        "midiNumber": 81,
        "frequency": 880,
        "pianoNumber": 61,
        "apuIndex": 57,
        "pulsePeriod": 126,
        "pulseFrequency": 880.7937,
        "pulseTuningError": 2,
        "trianglePeriod": 63,
        "triangleFrequency": 873.9125,
        "triangleTuningError": -12
    },
    {
        "name": "A#5",
        "midiNumber": 82,
        "frequency": 932.3275,
        "pianoNumber": 62,
        "apuIndex": 58,
        "pulsePeriod": 119,
        "pulseFrequency": 932.1734,
        "pulseTuningError": 0,
        "trianglePeriod": 59,
        "triangleFrequency": 932.1734,
        "triangleTuningError": 0
    },
    {
        "name": "B5",
        "midiNumber": 83,
        "frequency": 987.7666,
        "pianoNumber": 63,
        "apuIndex": 59,
        "pulsePeriod": 112,
        "pulseFrequency": 989.9186,
        "pulseTuningError": 4,
        "trianglePeriod": 56,
        "triangleFrequency": 981.2351,
        "triangleTuningError": -11
    },
    {
        "name": "C6",
        "midiNumber": 84,
        "frequency": 1046.5022,
        "pianoNumber": 64,
        "apuIndex": 60,
        "pulsePeriod": 106,
        "pulseFrequency": 1045.4281,
        "pulseTuningError": -2,
        "trianglePeriod": 52,
        "triangleFrequency": 1055.2906,
        "triangleTuningError": 14
    },
    {
        "name": "C#6",
        "midiNumber": 85,
        "frequency": 1108.7305,
        "pianoNumber": 65,
        "apuIndex": 61,
        "pulsePeriod": 100,
        "pulseFrequency": 1107.5327,
        "pulseTuningError": -2,
        "trianglePeriod": 49,
        "triangleFrequency": 1118.6081,
        "triangleTuningError": 15
    },
    {
        "name": "D6",
        "midiNumber": 86,
        "frequency": 1174.659,
        "pianoNumber": 66,
        "apuIndex": 62,
        "pulsePeriod": 94,
        "pulseFrequency": 1177.4822,
        "pulseTuningError": 4,
        "trianglePeriod": 47,
        "triangleFrequency": 1165.2167,
        "triangleTuningError": -14
    },
    {
        "name": "D#6",
        "midiNumber": 87,
        "frequency": 1244.5079,
        "pianoNumber": 67,
        "apuIndex": 63,
        "pulsePeriod": 89,
        "pulseFrequency": 1242.8979,
        "pulseTuningError": -2,
        "trianglePeriod": 44,
        "triangleFrequency": 1242.8979,
        "triangleTuningError": -2
    },
    {
        "name": "E6",
        "midiNumber": 88,
        "frequency": 1318.5102,
        "pianoNumber": 68,
        "apuIndex": 64,
        "pulsePeriod": 84,
        "pulseFrequency": 1316.0095,
        "pulseTuningError": -3,
        "trianglePeriod": 41,
        "triangleFrequency": 1331.6763,
        "triangleTuningError": 17
    },
    {
        "name": "F6",
        "midiNumber": 89,
        "frequency": 1396.9129,
        "pianoNumber": 69,
        "apuIndex": 65,
        "pulsePeriod": 79,
        "pulseFrequency": 1398.2601,
        "pulseTuningError": 2,
        "trianglePeriod": 39,
        "triangleFrequency": 1398.2601,
        "triangleTuningError": 2
    },
    {
        "name": "F#6",
        "midiNumber": 90,
        "frequency": 1479.9776,
        "pianoNumber": 70,
        "apuIndex": 66,
        "pulsePeriod": 75,
        "pulseFrequency": 1471.8527,
        "pulseTuningError": -10,
        "trianglePeriod": 37,
        "triangleFrequency": 1471.8527,
        "triangleTuningError": -10
    },
    {
        "name": "G6",
        "midiNumber": 91,
        "frequency": 1567.9817,
        "pianoNumber": 71,
        "apuIndex": 67,
        "pulsePeriod": 70,
        "pulseFrequency": 1575.5044,
        "pulseTuningError": 8,
        "trianglePeriod": 35,
        "triangleFrequency": 1553.6223,
        "triangleTuningError": -16
    },
    {
        "name": "G#6",
        "midiNumber": 92,
        "frequency": 1661.2187,
        "pianoNumber": 72,
        "apuIndex": 68,
        "pulsePeriod": 66,
        "pulseFrequency": 1669.5643,
        "pulseTuningError": 9,
        "trianglePeriod": 33,
        "triangleFrequency": 1645.0119,
        "triangleTuningError": -17
    },
    {
        "name": "A6",
        "midiNumber": 93,
        "frequency": 1760,
        "pianoNumber": 73,
        "apuIndex": 69,
        "pulsePeriod": 63,
        "pulseFrequency": 1747.8251,
        "pulseTuningError": -12,
        "trianglePeriod": 31,
        "triangleFrequency": 1747.8251,
        "triangleTuningError": -12
    },
    {
        "name": "A#6",
        "midiNumber": 94,
        "frequency": 1864.655,
        "pianoNumber": 74,
        "apuIndex": 70,
        "pulsePeriod": 59,
        "pulseFrequency": 1864.3468,
        "pulseTuningError": 0,
        "trianglePeriod": 29,
        "triangleFrequency": 1864.3468,
        "triangleTuningError": 0
    },
    {
        "name": "B6",
        "midiNumber": 95,
        "frequency": 1975.5332,
        "pianoNumber": 75,
        "apuIndex": 71,
        "pulsePeriod": 56,
        "pulseFrequency": 1962.4703,
        "pulseTuningError": -11,
        "trianglePeriod": 27,
        "triangleFrequency": 1997.5145,
        "triangleTuningError": 19
    },
    {
        "name": "C7",
        "midiNumber": 96,
        "frequency": 2093.0045,
        "pianoNumber": 76,
        "apuIndex": 72,
        "pulsePeriod": 52,
        "pulseFrequency": 2110.5813,
        "pulseTuningError": 14,
        "trianglePeriod": 26,
        "triangleFrequency": 2071.4965,
        "triangleTuningError": -18
    },
    {
        "name": "C#7",
        "midiNumber": 97,
        "frequency": 2217.461,
        "pianoNumber": 77,
        "apuIndex": 73,
        "pulsePeriod": 49,
        "pulseFrequency": 2237.2162,
        "pulseTuningError": 15,
        "trianglePeriod": 24,
        "triangleFrequency": 2237.2162,
        "triangleTuningError": 15
    },
    {
        "name": "D7",
        "midiNumber": 98,
        "frequency": 2349.3181,
        "pianoNumber": 78,
        "apuIndex": 74,
        "pulsePeriod": 47,
        "pulseFrequency": 2330.4335,
        "pulseTuningError": -14,
        "trianglePeriod": 23,
        "triangleFrequency": 2330.4335,
        "triangleTuningError": -14
    },
    {
        "name": "D#7",
        "midiNumber": 99,
        "frequency": 2489.0158,
        "pianoNumber": 79,
        "apuIndex": 75,
        "pulsePeriod": 44,
        "pulseFrequency": 2485.7958,
        "pulseTuningError": -2,
        "trianglePeriod": 21,
        "triangleFrequency": 2542.2911,
        "triangleTuningError": 37
    },
    {
        "name": "E7",
        "midiNumber": 100,
        "frequency": 2637.0204,
        "pianoNumber": 80,
        "apuIndex": 76,
        "pulsePeriod": 41,
        "pulseFrequency": 2663.3526,
        "pulseTuningError": 17,
        "trianglePeriod": 20,
        "triangleFrequency": 2663.3526,
        "triangleTuningError": 17
    },
    {
        "name": "F7",
        "midiNumber": 101,
        "frequency": 2793.8258,
        "pianoNumber": 81,
        "apuIndex": 77,
        "pulsePeriod": 39,
        "pulseFrequency": 2796.5203,
        "pulseTuningError": 2,
        "trianglePeriod": 19,
        "triangleFrequency": 2796.5203,
        "triangleTuningError": 2
    },
    {
        "name": "F#7",
        "midiNumber": 102,
        "frequency": 2959.9553,
        "pianoNumber": 82,
        "apuIndex": 78,
        "pulsePeriod": 37,
        "pulseFrequency": 2943.7055,
        "pulseTuningError": -10,
        "trianglePeriod": 18,
        "triangleFrequency": 2943.7055,
        "triangleTuningError": -10
    },
    {
        "name": "G7",
        "midiNumber": 103,
        "frequency": 3135.9634,
        "pianoNumber": 83,
        "apuIndex": 79,
        "pulsePeriod": 35,
        "pulseFrequency": 3107.2447,
        "pulseTuningError": -16,
        "trianglePeriod": 17,
        "triangleFrequency": 3107.2447,
        "triangleTuningError": -16
    },
    {
        "name": "G#7",
        "midiNumber": 104,
        "frequency": 3322.4375,
        "pianoNumber": 84,
        "apuIndex": 80,
        "pulsePeriod": 33,
        "pulseFrequency": 3290.0238,
        "pulseTuningError": -17,
        "trianglePeriod": 16,
        "triangleFrequency": 3290.0238,
        "triangleTuningError": -17
    },
    {
        "name": "A7",
        "midiNumber": 105,
        "frequency": 3520,
        "pianoNumber": 85,
        "apuIndex": 81,
        "pulsePeriod": 31,
        "pulseFrequency": 3495.6503,
        "pulseTuningError": -12,
        "trianglePeriod": 15,
        "triangleFrequency": 3495.6503,
        "triangleTuningError": -12
    },
    {
        "name": "A#7",
        "midiNumber": 106,
        "frequency": 3729.31,
        "pianoNumber": 86,
        "apuIndex": 82,
        "pulsePeriod": 29,
        "pulseFrequency": 3728.6937,
        "pulseTuningError": 0,
        "trianglePeriod": 14,
        "triangleFrequency": 3728.6937,
        "triangleTuningError": 0
    },
    {
        "name": "B7",
        "midiNumber": 107,
        "frequency": 3951.0664,
        "pianoNumber": 87,
        "apuIndex": 83,
        "pulsePeriod": 27,
        "pulseFrequency": 3995.029,
        "pulseTuningError": 19,
        "trianglePeriod": 13,
        "triangleFrequency": 3995.029,
        "triangleTuningError": 19
    },
    {
        "name": "C8",
        "midiNumber": 108,
        "frequency": 4186.009,
        "pianoNumber": 88,
        "apuIndex": 84,
        "pulsePeriod": 26,
        "pulseFrequency": 4142.993,
        "pulseTuningError": -18,
        "trianglePeriod": 12,
        "triangleFrequency": 4302.3389,
        "triangleTuningError": 47
    },
    {
        "name": "C#8",
        "midiNumber": 109,
        "frequency": 4434.922,
        "pianoNumber": null,
        "apuIndex": 85,
        "pulsePeriod": 24,
        "pulseFrequency": 4474.4325,
        "pulseTuningError": 15,
        "trianglePeriod": null,
        "triangleFrequency": null,
        "triangleTuningError": null
    },
    {
        "name": "D8",
        "midiNumber": 110,
        "frequency": 4698.6362,
        "pianoNumber": null,
        "apuIndex": 86,
        "pulsePeriod": 23,
        "pulseFrequency": 4660.8671,
        "pulseTuningError": -14,
        "trianglePeriod": 11,
        "triangleFrequency": 4660.8671,
        "triangleTuningError": -14
    },
    {
        "name": "D#8",
        "midiNumber": 111,
        "frequency": 4978.0317,
        "pianoNumber": null,
        "apuIndex": 87,
        "pulsePeriod": 21,
        "pulseFrequency": 5084.5823,
        "pulseTuningError": 37,
        "trianglePeriod": 10,
        "triangleFrequency": 5084.5823,
        "triangleTuningError": 37
    },
    {
        "name": "E8",
        "midiNumber": 112,
        "frequency": 5274.0409,
        "pianoNumber": null,
        "apuIndex": 88,
        "pulsePeriod": 20,
        "pulseFrequency": 5326.7053,
        "pulseTuningError": 17,
        "trianglePeriod": null,
        "triangleFrequency": null,
        "triangleTuningError": null
    },
    {
        "name": "F8",
        "midiNumber": 113,
        "frequency": 5587.6517,
        "pianoNumber": null,
        "apuIndex": 89,
        "pulsePeriod": 19,
        "pulseFrequency": 5593.0406,
        "pulseTuningError": 2,
        "trianglePeriod": 9,
        "triangleFrequency": 5593.0406,
        "triangleTuningError": 2
    },
    {
        "name": "F#8",
        "midiNumber": 114,
        "frequency": 5919.9107,
        "pianoNumber": null,
        "apuIndex": 90,
        "pulsePeriod": 18,
        "pulseFrequency": 5887.4111,
        "pulseTuningError": -10,
        "trianglePeriod": null,
        "triangleFrequency": null,
        "triangleTuningError": null
    },
    {
        "name": "G8",
        "midiNumber": 115,
        "frequency": 6271.9269,
        "pianoNumber": null,
        "apuIndex": 91,
        "pulsePeriod": 17,
        "pulseFrequency": 6214.4895,
        "pulseTuningError": -16,
        "trianglePeriod": 8,
        "triangleFrequency": 6214.4895,
        "triangleTuningError": -16
    },
    {
        "name": "G#8",
        "midiNumber": 116,
        "frequency": 6644.8751,
        "pianoNumber": null,
        "apuIndex": 92,
        "pulsePeriod": 16,
        "pulseFrequency": 6580.0477,
        "pulseTuningError": -17,
        "trianglePeriod": null,
        "triangleFrequency": null,
        "triangleTuningError": null
    },
    {
        "name": "A8",
        "midiNumber": 117,
        "frequency": 7040,
        "pianoNumber": null,
        "apuIndex": 93,
        "pulsePeriod": 15,
        "pulseFrequency": 6991.3007,
        "pulseTuningError": -12,
        "trianglePeriod": null,
        "triangleFrequency": null,
        "triangleTuningError": null
    },
    {
        "name": "A#8",
        "midiNumber": 118,
        "frequency": 7458.6201,
        "pianoNumber": null,
        "apuIndex": 94,
        "pulsePeriod": 14,
        "pulseFrequency": 7457.3875,
        "pulseTuningError": 0,
        "trianglePeriod": null,
        "triangleFrequency": null,
        "triangleTuningError": null
    },
    {
        "name": "B8",
        "midiNumber": 119,
        "frequency": 7902.1328,
        "pianoNumber": null,
        "apuIndex": 95,
        "pulsePeriod": 13,
        "pulseFrequency": 7990.058,
        "pulseTuningError": 19,
        "trianglePeriod": null,
        "triangleFrequency": null,
        "triangleTuningError": null
    }
]
