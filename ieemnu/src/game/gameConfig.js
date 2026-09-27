/**
 * ============================================================
 *  GAME CONFIGURATION — Edit levels & puzzles here!
 * ============================================================
 *
 * MAP LEGEND:
 *   .  = Floor
 *   #  = Barrier / Wall
 *   P  = Player start position
 *   T  = Main Terminal (puzzle challenge — required)
 *   S  = Side Terminal (bonus puzzle — optional, +50 pts)
 *   C  = Chest (locked, enter code to open)
 *   K  = Chest (open) — set by engine, don't place manually
 *   D  = Door (closed, need key)
 *   O  = Door (open)  — set by engine, don't place manually
 *
 * PUZZLE FIELDS:
 *   difficulty  : 'easy' | 'medium' | 'hard'
 *   type        : 'software' | 'arduino' | 'mass3d' | 'side'
 *   circuitVariant (arduino only): see ArduinoPuzzle.jsx
 *   shapeHint  (mass3d only): 'rect'|'L'|'triangle'|'circle'|'T'|null
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────────
//  SOFTWARE PUZZLES
//  Show a Python snippet → player types the expected output.
// ─────────────────────────────────────────────────────────────────
export const SOFTWARE_CHALLENGES = [
  // ── EASY ─────────────────────────────────────────────────────
  {
    type: 'software',
    difficulty: 'easy',
    discipline: 'SOFTWARE',
    code: "x = 5\ny = x * 2 + 1\nprint(y)",
    simulatedOutput: "11",
    answer: "11",
    hint: "y = 5 × 2 + 1 = 11",
  },
  {
    type: 'software',
    difficulty: 'easy',
    discipline: 'SOFTWARE',
    code: "a = [1, 2, 3]\nprint(len(a))",
    simulatedOutput: "3",
    answer: "3",
    hint: "len() returns the number of elements in the list.",
  },
  {
    type: 'software',
    difficulty: 'easy',
    discipline: 'SOFTWARE',
    code: "x = \"Hi\"\nprint(x * 2)",
    simulatedOutput: "HiHi",
    answer: "HiHi",
    hint: "Multiplying a string repeats it.",
  },
  {
    type: 'software',
    difficulty: 'easy',
    discipline: 'SOFTWARE',
    code: "print(2 ** 3)",
    simulatedOutput: "8",
    answer: "8",
    hint: "** is the power operator. 2³ = 8.",
  },
  // ── MEDIUM ───────────────────────────────────────────────────
  {
    type: 'software',
    difficulty: 'medium',
    discipline: 'SOFTWARE',
    code: "for i in range(3):\n    print(i)",
    simulatedOutput: "0\n1\n2",
    answer: "0,1,2",
    hint: "range(3) gives 0, 1, 2. Each prints on its own line.",
  },
  {
    type: 'software',
    difficulty: 'medium',
    discipline: 'SOFTWARE',
    code: "def f(n):\n    return n ** 2\nprint(f(4))",
    simulatedOutput: "16",
    answer: "16",
    hint: "f(4) returns 4² = 16.",
  },
  {
    type: 'software',
    difficulty: 'medium',
    discipline: 'SOFTWARE',
    code: "x = 10\nx += 5\nx //= 3\nprint(x)",
    simulatedOutput: "5",
    answer: "5",
    hint: "x = 10 → 15 → 15 // 3 = 5. // is integer division.",
  },
  {
    type: 'software',
    difficulty: 'medium',
    discipline: 'SOFTWARE',
    code: "a = [1, 2, 3]\na.append(4)\nprint(a[-1])",
    simulatedOutput: "4",
    answer: "4",
    hint: "append() adds 4 to the end. a[-1] is the last element.",
  },
  // ── HARD ─────────────────────────────────────────────────────
  {
    type: 'software',
    difficulty: 'hard',
    discipline: 'SOFTWARE',
    code: "s = \"hello\"\nprint(s[1:3])",
    simulatedOutput: "el",
    answer: "el",
    hint: "s[1:3] slices from index 1 (inclusive) to 3 (exclusive).",
  },
  {
    type: 'software',
    difficulty: 'hard',
    discipline: 'SOFTWARE',
    code: "x = True\nprint(not x and False)",
    simulatedOutput: "False",
    answer: "False",
    hint: "not True = False. False and False = False.",
  },
  {
    type: 'software',
    difficulty: 'hard',
    discipline: 'SOFTWARE',
    code: "d = {\"a\": 1, \"b\": 2}\nprint(d.get(\"c\", 0))",
    simulatedOutput: "0",
    answer: "0",
    hint: "dict.get(key, default) returns default if key not found.",
  },
  {
    type: 'software',
    difficulty: 'hard',
    discipline: 'SOFTWARE',
    code: "result = [x*2 for x in range(4) if x%2==0]\nprint(result)",
    simulatedOutput: "[0, 4]",
    answer: "[0, 4]",
    hint: "Filter even x in 0..3 (→ 0,2), then multiply by 2 → [0,4].",
  },
];

// ─────────────────────────────────────────────────────────────────
//  HARDWARE PUZZLES
//  Drag-and-drop circuit wiring puzzles (ArduinoPuzzle component).
//  circuitVariant controls which SVG scene is rendered.
// ─────────────────────────────────────────────────────────────────
export const HARDWARE_CHALLENGES = [
  // ── EASY ─────────────────────────────────────────────────────
  {
    type: 'arduino',
    difficulty: 'easy',
    discipline: 'HARDWARE',
    circuitVariant: 'led_gnd',
    correctPin: 'GND',
    answer: 'GND',
    hint: 'The cathode (−) of an LED always connects to GND.',
  },
  {
    type: 'arduino',
    difficulty: 'easy',
    discipline: 'HARDWARE',
    circuitVariant: 'led_5v',
    correctPin: 'FIVE',
    answer: '5V',
    hint: 'The anode (+) of an LED connects to the positive rail (5V) through a resistor.',
  },
  {
    type: 'arduino',
    difficulty: 'easy',
    discipline: 'HARDWARE',
    circuitVariant: 'diode_cathode',
    correctPin: 'GND',
    answer: 'GND',
    hint: 'The cathode (striped end) of a diode connects to GND.',
  },
  // ── MEDIUM ───────────────────────────────────────────────────
  {
    type: 'arduino',
    difficulty: 'medium',
    discipline: 'HARDWARE',
    circuitVariant: 'motor_dc',
    correctPin: 'GND',
    answer: 'GND',
    hint: 'One motor terminal connects to 5V, the other to GND to complete the circuit.',
  },
  {
    type: 'arduino',
    difficulty: 'medium',
    discipline: 'HARDWARE',
    circuitVariant: 'lcd_vss',
    correctPin: 'GND',
    answer: 'GND',
    hint: 'LCD pin 1 (VSS) is the ground pin — connects to GND.',
  },
  {
    type: 'arduino',
    difficulty: 'medium',
    discipline: 'HARDWARE',
    circuitVariant: 'lcd_vdd',
    correctPin: 'FIVE',
    answer: '5V',
    hint: 'LCD pin 2 (VDD) is the power supply pin — connects to 5V.',
  },
  // ── HARD ─────────────────────────────────────────────────────
  {
    type: 'arduino',
    difficulty: 'hard',
    discipline: 'HARDWARE',
    circuitVariant: 'keypad_row',
    correctPin: 'D2',
    answer: 'D2',
    hint: 'Matrix keypad ROW0 connects to the first digital pin used — D2 on Arduino Uno.',
  },
  {
    type: 'arduino',
    difficulty: 'hard',
    discipline: 'HARDWARE',
    circuitVariant: 'ldr_circuit',
    correctPin: 'A0',
    answer: 'A0',
    hint: 'An LDR in a voltage divider outputs analog voltage — read it with analog pin A0.',
  },
  {
    type: 'arduino',
    difficulty: 'hard',
    discipline: 'HARDWARE',
    circuitVariant: 'rfid_sda',
    correctPin: 'D10',
    answer: 'D10',
    hint: 'The RC522 RFID SDA pin is the SPI Slave Select — pin 10 on Arduino Uno.',
  },
];

// ─────────────────────────────────────────────────────────────────
//  MECHANICAL PUZZLES
//  Canvas drawing puzzles with target mass calculation.
//  shapeHint draws a dashed guide on the canvas.
// ─────────────────────────────────────────────────────────────────
export const MECHANICAL_CHALLENGES = [
  // ── EASY ─────────────────────────────────────────────────────
  {
    type: 'mass3d',
    difficulty: 'easy',
    discipline: 'MECHANICAL',
    answer: '480',
    targetMass: 480,
    density: 2.7,
    tolerance: 30,
    shapeHint: null,
    dimensionsText: "Draw any custom shape with an area ~ 35 cm²",
    hint: "Mass = Area × Depth × Density. Try an L-shape or rectangle.",
  },
  {
    type: 'mass3d',
    difficulty: 'easy',
    discipline: 'MECHANICAL',
    answer: '624',
    targetMass: 624,
    density: 7.8,
    tolerance: 40,
    shapeHint: 'rect',
    dimensionsText: "Draw a Rectangle  ~8×5 cm  (Steel part)",
    hint: "Rectangle area = width × height. Try 8cm × 5cm = 40 cm².",
  },
  // ── MEDIUM ───────────────────────────────────────────────────
  {
    type: 'mass3d',
    difficulty: 'medium',
    discipline: 'MECHANICAL',
    answer: '162',
    targetMass: 162,
    density: 2.7,
    tolerance: 20,
    shapeHint: 'L',
    dimensionsText: "Draw an L-Shape with area ~ 20 cm²  (Aluminium)",
    hint: "L-shape = big rect minus small rect. Aim for ~20 cm² total area.",
  },
  {
    type: 'mass3d',
    difficulty: 'medium',
    discipline: 'MECHANICAL',
    answer: '320',
    targetMass: 320,
    density: 8.9,
    tolerance: 25,
    shapeHint: 'triangle',
    dimensionsText: "Draw a Triangle with area ~ 18 cm²  (Copper)",
    hint: "Triangle area = ½ × base × height. Try base 6 cm, height 6 cm.",
  },
  // ── HARD ─────────────────────────────────────────────────────
  {
    type: 'mass3d',
    difficulty: 'hard',
    discipline: 'MECHANICAL',
    answer: '302',
    targetMass: 302,
    density: 2.7,
    tolerance: 20,
    shapeHint: 'circle',
    dimensionsText: "Draw a Circle with radius ~ 3 cm  (Aluminium)",
    hint: "Circle area = π × r². At r=3 → ~28.3 cm². Draw a round shape!",
  },
  {
    type: 'mass3d',
    difficulty: 'hard',
    discipline: 'MECHANICAL',
    answer: '312',
    targetMass: 312,
    density: 7.8,
    tolerance: 25,
    shapeHint: 'T',
    dimensionsText: "Draw a T-Shape with area ~ 20 cm²  (Steel)",
    hint: "T-shape = horizontal bar + vertical stem. Aim for ~20 cm² combined.",
  },
];

// ─────────────────────────────────────────────────────────────────
//  SIDE CHALLENGES  (tile 'S' — optional bonus puzzles)
//  15-second countdown, +50 pts reward (+25 speed bonus if <5s)
// ─────────────────────────────────────────────────────────────────
export const SIDE_CHALLENGES = [
  {
    type: 'side',
    category: 'MATH',
    question: "7 × 8 = ?",
    answer: "56",
    hint: "7 × 8 = 56",
  },
  {
    type: 'side',
    category: 'MATH',
    question: "√144 = ?",
    answer: "12",
    hint: "12 × 12 = 144",
  },
  {
    type: 'side',
    category: 'MATH',
    question: "15% of 200 = ?",
    answer: "30",
    hint: "200 × 0.15 = 30",
  },
  {
    type: 'side',
    category: 'MATH',
    question: "2 ^ 8 = ?",
    answer: "256",
    hint: "2⁸ = 256",
  },
  {
    type: 'side',
    category: 'MATH',
    question: "Area of circle r=5? (round to whole)",
    answer: "79",
    hint: "π × 5² ≈ 78.54 → 79",
  },
  {
    type: 'side',
    category: 'IEEE',
    question: "What year was IEEE founded?",
    answer: "1963",
    hint: "IEEE was formed in 1963 by merging AIEE and IRE.",
  },
  {
    type: 'side',
    category: 'ENGINEERING',
    question: "Ohm's Law: V=12V, R=3Ω → I=? (A)",
    answer: "4",
    hint: "I = V / R = 12 / 3 = 4A",
  },
  {
    type: 'side',
    category: 'ENGINEERING',
    question: "SI unit of power?",
    answer: "Watt",
    hint: "Power is measured in Watts (W).",
  },
  {
    type: 'side',
    category: 'ENGINEERING',
    question: "Full form of CPU",
    answer: "Central Processing Unit",
    hint: "CPU = Central Processing Unit",
  },
  {
    type: 'side',
    category: 'ENGINEERING',
    question: "What year was the first Arduino released?",
    answer: "2005",
    hint: "Arduino was first released in 2005 at IDII, Ivrea, Italy.",
  },
];


// ─────────────────────────────────────────────────────────────────
//  LEVEL MAPS
//  3 post-tutorial levels with maze layouts and difficulty tags.
//  difficulty drives which puzzle pool subset is drawn.
// ─────────────────────────────────────────────────────────────────
export const MAPS = [
  {
    name: "GRID A: EASY ACCESS",
    timeLimit: 90,
    totalPuzzles: 3,
    difficulty: 'easy',
    shaderTint: 'hue-rotate(140deg)',   // green tint
    layout: [
      "###########",
      "#P....#...#",
      "#.###.#.T.#",
      "#.#T..#...#",
      "#.#.###.###",
      "#.........#",
      "#.###.###.#",
      "#...#...S.#",
      "#.T.#.###.#",
      "#S....C..D#",
      "###########"
    ]
  },
  {
    name: "GRID B: THE LABYRINTH",
    timeLimit: 75,
    totalPuzzles: 3,
    difficulty: 'medium',
    shaderTint: 'hue-rotate(200deg)',   // blue tint
    layout: [
      "#############",
      "#P........T.#",
      "#.#########.#",
      "#.#S......#.#",
      "#.#.#####.#.#",
      "#.#.#T......#",
      "#.#.###.#####",
      "#.#...#...S.#",
      "#.###.###.###",
      "#...#...#T..#",
      "###.###.#...#",
      "#.......C..D#",
      "#############"
    ]
  },
  {
    name: "GRID C: SERVER CORE",
    timeLimit: 60,
    totalPuzzles: 4,
    difficulty: 'hard',
    shaderTint: 'hue-rotate(320deg)',   // red/purple tint
    layout: [
      "#############",
      "#P...S#T....#",
      "#.###.#####.#",
      "#.#.......#.#",
      "#.#T###.#.S.#",
      "#.#...#.#.###",
      "#.###.#.#T..#",
      "#...#.#.###.#",
      "###.#.#...#.#",
      "#T..#.#.#.#.#",
      "#.###.###.#.#",
      "#S........CD#",
      "#############"
    ]
  },
];

// ─────────────────────────────────────────────────────────────────
//  TUTORIAL MAPS  (unchanged — small intro rooms, Infinity timer)
// ─────────────────────────────────────────────────────────────────
export const TUTORIAL_MAPS = [
  {
    name: "TRAINING ROOM A: SOFTWARE",
    timeLimit: Infinity,
    totalPuzzles: 1,
    shaderTint: 'hue-rotate(140deg)',
    tutorialPuzzleType: 'software',
    layout: [
      "#########",
      "#P......#",
      "#.##.##.#",
      "#.#...#.#",
      "#.#.T.#.#",
      "#.#...#.#",
      "#.#####.#",
      "#...C...#",
      "####D####",
    ]
  },
  {
    name: "TRAINING ROOM B: HARDWARE",
    timeLimit: Infinity,
    totalPuzzles: 1,
    shaderTint: 'hue-rotate(200deg)',
    tutorialPuzzleType: 'arduino',
    layout: [
      "#########",
      "#......P#",
      "#.##.##.#",
      "#.#...#.#",
      "#.#.T.#.#",
      "#.#...#.#",
      "#.#####.#",
      "#...C...#",
      "####D####",
    ]
  },
  {
    name: "TRAINING ROOM C: MECHANICAL",
    timeLimit: Infinity,
    totalPuzzles: 1,
    shaderTint: 'hue-rotate(320deg)',
    tutorialPuzzleType: 'mass3d',
    layout: [
      "#########",
      "#P......#",
      "#.##.##.#",
      "#.#...#.#",
      "#.#.T.#.#",
      "#.#...#.#",
      "#.#####.#",
      "#...C...#",
      "####D####",
    ]
  },
];

// ─────────────────────────────────────────────────────────────────
//  INTERACTIVE CUTSCENE ROOM (replaces static intro screens)
// ─────────────────────────────────────────────────────────────────
export const TUTORIAL_CUTSCENE_MAP = {
  name: "THE ARCHIVES",
  timeLimit: Infinity,
  shaderTint: 'hue-rotate(60deg)',
  layout: [
    "#############",
    "#P....#....B#",
    "#.....#.....#",
    "#####.###.###",
    "#...........#",
    "###.#####.###",
    "#B....#....B#",
    "#.....#.....#",
    "#####.#######",
    "#B..........#",
    "######D######",
  ]
};

export const CUTSCENE_ITEMS = [
  {
    id: 'intro_1',
    image: '/cutsceneImg/1.webp',
    title: 'HARDWARE ENGINEERING',
    text: 'Become a systems expert. Wire up microcontrollers, complete electronic circuits, and handle sensor inputs.',
  },
  {
    id: 'intro_2',
    image: '/cutsceneImg/2.webp',
    title: 'SOFTWARE ENGINEERING',
    text: 'Test your logic. Analyze algorithms, debug code snippets, and determine the correct execution output.',
  },
  {
    id: 'intro_3',
    image: '/cutsceneImg/3.webp',
    title: 'MECHANICAL ENGINEERING',
    text: 'Calculate mass, area, and density. Build precise 3D mechanical parts with given specifications.',
  },
  {
    id: 'intro_4',
    image: '/cutsceneImg/4.webp',
    title: 'NON-TECH PUZZLES',
    text: 'Look out for yellow bonus terminals! Solve quick knowledge-based and math puzzles for bonus points and extra time.',
  }
];

// ─────────────────────────────────────────────────────────────────
//  TUTORIAL CHALLENGES  (one per room type, used during tutorial)
// ─────────────────────────────────────────────────────────────────
export const TUTORIAL_CHALLENGES = [
  {
    type: 'software',
    discipline: 'SOFTWARE',
    difficulty: 'easy',
    code: "x = 5\ny = x * 2 + 1\nprint(y)",
    simulatedOutput: "11",
    answer: "11",
    hint: "y = 5 × 2 + 1 = 11",
  },
  {
    type: 'arduino',
    discipline: 'HARDWARE',
    difficulty: 'easy',
    circuitVariant: 'led_gnd',
    correctPin: 'GND',
    answer: 'GND',
    hint: "The cathode (−) of an LED always connects to GND.",
  },
  {
    type: 'mass3d',
    discipline: 'MECHANICAL',
    difficulty: 'easy',
    answer: '480',
    targetMass: 480,
    density: 2.7,
    tolerance: 30,
    shapeHint: null,
    dimensionsText: "Draw a custom shape with an area ~ 35 cm²",
    hint: "Mass = Area × Depth × Density. Try drawing an L-Shape or circle.",
  },
];

// Legacy export kept for any existing imports
export const CHALLENGES = [...SOFTWARE_CHALLENGES, ...HARDWARE_CHALLENGES, ...MECHANICAL_CHALLENGES];
