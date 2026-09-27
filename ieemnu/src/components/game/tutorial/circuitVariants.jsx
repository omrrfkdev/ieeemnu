/**
 * circuitVariants.js
 * SVG scene definitions for ArduinoPuzzle.
 * Each variant returns JSX-compatible SVG content via a render function.
 * The render function receives: { solved, wrongPin, nearPin, isDragging, PINS }
 */

// ── Shared Arduino board used by most variants ─────────────────────────────
export function ArduinoBoard({ solved, accentColor = '#38bdf8' }) {
  return (
    <>
      {/* Board */}
      <rect x="252" y="16" width="116" height="200" rx="6" fill="#1a5c3a" stroke="#22774d" strokeWidth="1.5"/>
      <rect x="256" y="20" width="108" height="192" rx="4" fill="#1e6b44" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
      <text x="310" y="35" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace" fontWeight="bold" letterSpacing="1">ARDUINO</text>
      <text x="310" y="44" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="4.5" fontFamily="monospace">UNO R3</text>
      {/* ATMEGA chip */}
      <rect x="276" y="90" width="54" height="60" rx="2" fill="#111" stroke="#374151" strokeWidth="1"/>
      <path d="M294 90 A8 8 0 0 1 310 90" fill="none" stroke="#374151" strokeWidth="0.8"/>
      {[0,1,2,3,4,5,6,7].map(i=>(
        <rect key={`cl${i}`} x="271" y={94+i*7} width="5" height="4" rx="0.5" fill="#9ca3af"/>
      ))}
      {[0,1,2,3,4,5,6,7].map(i=>(
        <rect key={`cr${i}`} x="330" y={94+i*7} width="5" height="4" rx="0.5" fill="#9ca3af"/>
      ))}
      <text x="303" y="118" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="3.8" fontFamily="monospace">ATMEGA</text>
      <text x="303" y="125" textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize="3.8" fontFamily="monospace">328P-PU</text>
      {/* Crystal */}
      <rect x="274" y="74" width="24" height="11" rx="5" fill="#9ca3af" stroke="#e5e7eb" strokeWidth="0.6"/>
      <text x="286" y="82" textAnchor="middle" fill="#374151" fontSize="3.8" fontFamily="monospace">16MHz</text>
      {/* USB */}
      <rect x="270" y="182" width="32" height="24" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1.2"/>
      <rect x="274" y="185" width="24" height="18" rx="1" fill="#0f172a" stroke="#334155" strokeWidth="0.8"/>
      <text x="286" y="197" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="3.5" fontFamily="monospace">USB</text>
      {/* Power LED */}
      <circle cx="354" cy="92" r="4" fill="#16a34a">
        <animate attributeName="opacity" values="0.75;1;0.75" dur="2.2s" repeatCount="indefinite"/>
      </circle>
    </>
  );
}

// ── Shared Breadboard ──────────────────────────────────────────────────────
export function Breadboard() {
  return (
    <>
      <rect x="24" y="48" width="156" height="140" rx="3" fill="#141414" stroke="#2d3748" strokeWidth="1.5"/>
      <text x="102" y="60" textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="4" fontFamily="monospace">BREADBOARD</text>
      {/* Rails */}
      <rect x="32" y="64" width="140" height="11" rx="1" fill="#1a0000" stroke="#3f1515" strokeWidth="0.5"/>
      <text x="29" y="72" textAnchor="end" fill="#ef4444" fontSize="7" fontFamily="monospace" fontWeight="bold">−</text>
      <rect x="32" y="157" width="140" height="11" rx="1" fill="#00001a" stroke="#153f3f" strokeWidth="0.5"/>
      <text x="29" y="165" textAnchor="end" fill="#3b82f6" fontSize="7" fontFamily="monospace" fontWeight="bold">+</text>
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>(
        <circle key={`tr${i}`} cx={38+i*11} cy={70} r="2.2" fill="#0a0000" stroke="#4b1c1c" strokeWidth="0.5"/>
      ))}
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>(
        <circle key={`br${i}`} cx={38+i*11} cy={163} r="2.2" fill="#00000a" stroke="#1e3a5f" strokeWidth="0.5"/>
      ))}
      <line x1="32" y1="118" x2="172" y2="118" stroke="#2d3748" strokeWidth="0.6" strokeDasharray="3 2"/>
      {/* Holes */}
      {[0,1,2,3,4].map(col=>[0,1,2,3,4,5].map(row=>(
        <circle key={`h-${col}-${row}`} cx={46+col*22} cy={88+row*10} r="2.5" fill="#0d0d0d" stroke="#374151" strokeWidth="0.6"/>
      )))}
    </>
  );
}

// ── PIN LAYOUTS per variant ────────────────────────────────────────────────
export const VARIANT_CONFIGS = {
  led_gnd: {
    pins: {
      D13:  { x:248, y:72,  label:'D13' },
      GND:  { x:248, y:96,  label:'GND' },
      FIVE: { x:248, y:120, label:'5V'  },
      D12:  { x:248, y:144, label:'D12' },
    },
    wireStart: { x:104, y:148 },
    correctPin: 'GND',
    instruction: 'Connect the LED cathode (−) to the correct Arduino pin.',
    steps: ['① Trace the yellow signal wire from D13', '② Find the cathode (−) leg of the LED', '③ Drag the loose wire to the correct pin'],
  },
  led_5v: {
    pins: {
      D13:  { x:248, y:72,  label:'D13' },
      GND:  { x:248, y:96,  label:'GND' },
      FIVE: { x:248, y:120, label:'5V'  },
      D12:  { x:248, y:144, label:'D12' },
    },
    wireStart: { x:68, y:120 },
    correctPin: 'FIVE',
    instruction: 'Connect the LED anode (+) through the resistor to the correct power pin.',
    steps: ['① The anode (+) side needs positive voltage', '② A resistor limits current from the power rail', '③ Drag the wire to 5V'],
  },
  diode_cathode: {
    pins: {
      D13:  { x:248, y:72,  label:'D13' },
      GND:  { x:248, y:96,  label:'GND' },
      FIVE: { x:248, y:120, label:'5V'  },
      D12:  { x:248, y:144, label:'D12' },
    },
    wireStart: { x:110, y:130 },
    correctPin: 'GND',
    instruction: 'Connect the diode cathode (striped end) to the correct pin.',
    steps: ['① A diode has a stripe on its cathode end', '② Current flows Anode → Cathode', '③ The cathode connects to GND'],
  },
  motor_dc: {
    pins: {
      FIVE: { x:248, y:72,  label:'5V'  },
      GND:  { x:248, y:96,  label:'GND' },
      D9:   { x:248, y:120, label:'D9'  },
      D8:   { x:248, y:144, label:'D8'  },
    },
    wireStart: { x:100, y:160 },
    correctPin: 'GND',
    instruction: 'Complete the DC motor circuit — connect the return wire to GND.',
    steps: ['① Motor positive terminal connects to 5V', '② The second terminal is the return wire', '③ Return wire always goes to GND'],
  },
  lcd_vss: {
    pins: {
      FIVE: { x:248, y:60,  label:'5V'  },
      GND:  { x:248, y:84,  label:'GND' },
      D12:  { x:248, y:108, label:'D12' },
      D11:  { x:248, y:132, label:'D11' },
    },
    wireStart: { x:60, y:160 },
    correctPin: 'GND',
    instruction: 'Connect LCD pin 1 (VSS) to the correct Arduino pin.',
    steps: ['① LCD pin 1 = VSS = Ground reference', '② Pin 2 = VDD = Power (5V)', '③ VSS always connects to GND'],
  },
  lcd_vdd: {
    pins: {
      FIVE: { x:248, y:60,  label:'5V'  },
      GND:  { x:248, y:84,  label:'GND' },
      D12:  { x:248, y:108, label:'D12' },
      D11:  { x:248, y:132, label:'D11' },
    },
    wireStart: { x:80, y:155 },
    correctPin: 'FIVE',
    instruction: 'Connect LCD pin 2 (VDD) to the correct power pin.',
    steps: ['① LCD pin 1 (VSS) is already grounded', '② Pin 2 = VDD = power supply input', '③ VDD connects to +5V'],
  },
  keypad_row: {
    pins: {
      D2:  { x:248, y:60,  label:'D2'  },
      D3:  { x:248, y:84,  label:'D3'  },
      D4:  { x:248, y:108, label:'D4'  },
      D5:  { x:248, y:132, label:'D5'  },
    },
    wireStart: { x:80, y:170 },
    correctPin: 'D2',
    instruction: 'Connect keypad ROW0 to the first row digital pin.',
    steps: ['① 4×4 keypads use 4 ROW + 4 COL pins', '② ROW pins connect to consecutive digital pins', '③ ROW0 → D2 (first in sequence)'],
  },
  ldr_circuit: {
    pins: {
      A0:   { x:248, y:60,  label:'A0'  },
      A1:   { x:248, y:84,  label:'A1'  },
      FIVE: { x:248, y:108, label:'5V'  },
      GND:  { x:248, y:132, label:'GND' },
    },
    wireStart: { x:110, y:140 },
    correctPin: 'A0',
    instruction: 'Connect the LDR voltage divider output to the correct analog pin.',
    steps: ['① LDR + resistor form a voltage divider', '② The midpoint voltage varies with light', '③ Read this analog signal on pin A0'],
  },
  rfid_sda: {
    pins: {
      D10:  { x:248, y:60,  label:'D10' },
      D11:  { x:248, y:84,  label:'D11' },
      D12:  { x:248, y:108, label:'D12' },
      D13:  { x:248, y:132, label:'D13' },
    },
    wireStart: { x:90, y:160 },
    correctPin: 'D10',
    instruction: 'Connect RC522 RFID SDA (Slave Select) to the correct SPI pin.',
    steps: ['① RC522 uses SPI: SCK=D13, MOSI=D11, MISO=D12', '② SDA = SS (Slave Select) — not shared', '③ SS on Arduino Uno = D10'],
  },
};
