/**
 * Production Tech Trainer - Lesson Store Mockup
 *
 * This file demonstrates the data structure for lessons in the
 * lights/sounds training application. Based on the NETRUNNER
 * network trainer lesson system.
 */

import { create } from 'zustand';

// =============================================================================
// LESSON DEFINITIONS
// =============================================================================

export const LESSONS = {
  // ---------------------------------------------------------------------------
  // MODULE 1: AUDIO FUNDAMENTALS
  // ---------------------------------------------------------------------------
  'audio-mixing-fundamentals': {
    id: 'audio-mixing-fundamentals',
    module: 1,
    title: 'Audio Mixing Fundamentals',
    icon: '🎚️',
    difficulty: 'beginner',
    duration: '15 min',
    description: 'Learn the basics of audio signal flow, gain staging, and channel strip controls',
    steps: [
      {
        id: 1,
        title: 'What is an Audio Signal?',
        content: `Audio signals are electrical representations of sound waves.

**Key concepts:**
• Analog signals are continuous electrical voltages
• Digital signals are discrete numerical samples
• Signal level is measured in decibels (dB)
• Professional audio uses balanced connections to reject noise`,
        action: null
      },
      {
        id: 2,
        title: 'Understanding Signal Flow',
        content: `Every audio system follows a basic signal chain:

**Source → Preamp → Processing → Output**

In a live sound context:
• **Source**: Microphone or instrument
• **Preamp**: Boosts weak mic signals
• **Processing**: EQ, compression, effects
• **Output**: Amplifier and speakers`,
        action: {
          type: 'add-devices',
          required: ['microphone', 'mixer', 'amplifier', 'speaker'],
          hint: 'Drag a microphone, mixer, amplifier, and speaker onto the canvas'
        }
      },
      {
        id: 3,
        title: 'Building the Audio Path',
        content: `Connect your devices to create a complete signal path.

**Connection order:**
• Microphone → Mixer (input)
• Mixer (output) → Amplifier (input)
• Amplifier (output) → Speaker`,
        action: {
          type: 'create-connection',
          required: [
            { from: 'microphone', to: 'mixer' },
            { from: 'mixer', to: 'amplifier' },
            { from: 'amplifier', to: 'speaker' }
          ],
          hint: 'Click on ports to connect devices in order'
        }
      },
      {
        id: 4,
        title: 'The Art of Gain Staging',
        content: `Gain staging is setting proper signal levels at each stage.

**The goal:** Maximize signal-to-noise ratio without clipping

**Visual indicators on the canvas:**
• 🟢 Green: Healthy signal (-18 to -12 dB)
• 🟡 Yellow: Hot signal (-12 to -6 dB)
• 🔴 Red: Clipping! (0 dB and above)`,
        action: {
          type: 'configure-gain',
          target: 'mixer',
          hint: 'Adjust the gain on the mixer until the meter shows green'
        }
      },
      // ... additional steps
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 2: WIRELESS SYSTEMS
  // ---------------------------------------------------------------------------
  'uhf-frequency-coordination': {
    id: 'uhf-frequency-coordination',
    module: 2,
    title: 'UHF Frequency Coordination',
    icon: '📡',
    difficulty: 'intermediate',
    duration: '20 min',
    description: 'Learn to coordinate wireless frequencies, avoid interference, and calculate safe frequency spacing',
    steps: [
      {
        id: 1,
        title: 'The Radio Frequency Landscape',
        content: `Wireless audio devices operate in the UHF spectrum.

**Key frequency bands:**
• **470-608 MHz**: Primary band (post-repack)
• **902-928 MHz**: ISM band (shared)
• **1.9 GHz / 2.4 GHz**: DECT and WiFi bands`,
        action: null
      },
      {
        id: 2,
        title: 'Reading the Spectrum',
        content: `The spectrum analyzer shows RF activity in your venue.

**Reading the display:**
• X-axis: Frequency (MHz)
• Y-axis: Signal strength (dBm)
• Peaks: Active transmitters or interference`,
        action: {
          type: 'view-spectrum',
          hint: 'Click on the spectrum analyzer to expand'
        }
      },
      // ... additional steps
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 3: AUDIO NETWORKING
  // ---------------------------------------------------------------------------
  'audio-over-ip-basics': {
    id: 'audio-over-ip-basics',
    module: 3,
    title: 'Audio over IP: Dante & AES67',
    icon: '🌐',
    difficulty: 'intermediate',
    duration: '25 min',
    description: 'Learn network audio routing, device discovery, channel subscriptions, and clock synchronization',
    steps: [
      {
        id: 1,
        title: 'Audio Networking Revolution',
        content: `Audio over IP transmits digital audio over Ethernet.

**Why AoIP?**
• Reduced cabling
• Flexibility in routing
• Scalability
• Integration with other systems`,
        action: null
      },
      // ... additional steps
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 4: LIGHTING CONTROL
  // ---------------------------------------------------------------------------
  'dmx-lighting-fundamentals': {
    id: 'dmx-lighting-fundamentals',
    module: 4,
    title: 'DMX Lighting & Addressing',
    icon: '💡',
    difficulty: 'beginner',
    duration: '20 min',
    description: 'Learn DMX512 protocol, fixture addressing, universes, and basic lighting control',
    steps: [
      {
        id: 1,
        title: 'Introduction to DMX',
        content: `DMX512 is the standard protocol for controlling stage lighting.

**DMX stands for:**
• **D**igital
• **M**ultiplex
• **512** channels per universe`,
        action: null
      },
      // ... additional steps
    ]
  },

  // ---------------------------------------------------------------------------
  // MODULE 5: SYSTEM INTEGRATION
  // ---------------------------------------------------------------------------
  'stage-signal-flow': {
    id: 'stage-signal-flow',
    module: 5,
    title: 'Stage Signal Flow & Patching',
    icon: '🔀',
    difficulty: 'intermediate',
    duration: '25 min',
    description: 'Master signal paths from stage to speakers, including splits and system design',
    steps: [
      {
        id: 1,
        title: 'Understanding Complete Signal Flow',
        content: `A live production has many stages between source and audience.

**Complete audio signal path:**
Stage → Stage Box → Split → FOH/Monitors/Recording`,
        action: null
      },
      // ... additional steps
    ]
  }
};

// =============================================================================
// CHALLENGE DEFINITIONS
// =============================================================================

export const CHALLENGES = {
  'basic-pa-setup': {
    id: 'basic-pa-setup',
    title: 'Basic PA Setup',
    difficulty: 'easy',
    description: 'Build a simple PA system from scratch',
    objectives: [
      {
        id: 1,
        text: 'Add a microphone to the canvas',
        check: (deviceState) =>
          deviceState.devices.some(d => d.type === 'microphone')
      },
      {
        id: 2,
        text: 'Add a mixer to the canvas',
        check: (deviceState) =>
          deviceState.devices.some(d => d.type === 'mixer')
      },
      {
        id: 3,
        text: 'Connect the microphone to the mixer',
        check: (deviceState) =>
          deviceState.connections.some(c =>
            c.fromDevice.type === 'microphone' && c.toDevice.type === 'mixer'
          )
      },
      {
        id: 4,
        text: 'Set proper gain staging (green meter)',
        check: (deviceState) => {
          const mixer = deviceState.devices.find(d => d.type === 'mixer');
          return mixer?.gainLevel >= -18 && mixer?.gainLevel <= -6;
        }
      }
    ],
    hints: [
      'Start by dragging a microphone from the device palette',
      'Every signal needs a destination - add a mixer',
      'Click and drag from port to port to create connections'
    ]
  },

  'frequency-coordination-4ch': {
    id: 'frequency-coordination-4ch',
    title: '4-Channel Wireless Setup',
    difficulty: 'medium',
    description: 'Coordinate frequencies for 4 wireless microphones',
    objectives: [
      {
        id: 1,
        text: 'Add 4 wireless receivers',
        check: (deviceState) =>
          deviceState.devices.filter(d => d.type === 'wireless_rx').length >= 4
      },
      {
        id: 2,
        text: 'Assign unique frequencies with no conflicts',
        check: (deviceState) => {
          const receivers = deviceState.devices.filter(d => d.type === 'wireless_rx');
          const frequencies = receivers.map(r => r.frequency);
          const uniqueFreqs = new Set(frequencies);
          return uniqueFreqs.size === receivers.length;
        }
      },
      {
        id: 3,
        text: 'Avoid TV channel interference',
        check: (deviceState, spectrumState) => {
          const receivers = deviceState.devices.filter(d => d.type === 'wireless_rx');
          return receivers.every(r => !spectrumState.tvChannels.includes(r.frequency));
        }
      },
      {
        id: 4,
        text: 'Pass intermodulation check',
        check: (deviceState, rfState) =>
          rfState.intermodProducts.every(im => im.conflict === false)
      }
    ],
    hints: [
      'Use the spectrum analyzer to find clear frequencies',
      'Check the IM calculator before finalizing frequencies',
      'Maintain at least 400kHz between adjacent channels'
    ]
  },

  'dante-network-build': {
    id: 'dante-network-build',
    title: 'Build a Dante Network',
    difficulty: 'medium',
    description: 'Create a working Dante audio network',
    objectives: [
      {
        id: 1,
        text: 'Add a Dante switch',
        check: (deviceState) =>
          deviceState.devices.some(d => d.type === 'dante_switch')
      },
      {
        id: 2,
        text: 'Connect 3 Dante devices',
        check: (deviceState) => {
          const danteDevices = deviceState.devices.filter(d => d.danteEnabled);
          return danteDevices.length >= 3;
        }
      },
      {
        id: 3,
        text: 'Establish clock synchronization',
        check: (deviceState) => {
          const danteDevices = deviceState.devices.filter(d => d.danteEnabled);
          return danteDevices.every(d => d.clockSynced);
        }
      },
      {
        id: 4,
        text: 'Create successful audio subscriptions',
        check: (deviceState) =>
          deviceState.danteSubscriptions.some(s => s.status === 'active')
      }
    ],
    hints: [
      'All Dante devices must connect to the switch',
      'One device must be the clock master',
      'Use the Dante Controller to create subscriptions'
    ]
  },

  'dmx-address-challenge': {
    id: 'dmx-address-challenge',
    title: 'Address a Lighting Rig',
    difficulty: 'easy',
    description: 'Correctly address 8 fixtures without conflicts',
    objectives: [
      {
        id: 1,
        text: 'Add 8 lighting fixtures',
        check: (deviceState) =>
          deviceState.devices.filter(d => d.category === 'lighting').length >= 8
      },
      {
        id: 2,
        text: 'Assign unique DMX addresses',
        check: (deviceState) => {
          const fixtures = deviceState.devices.filter(d => d.dmxAddress);
          return !hasAddressConflicts(fixtures);
        }
      },
      {
        id: 3,
        text: 'Connect all fixtures to DMX chain',
        check: (deviceState) => {
          const fixtures = deviceState.devices.filter(d => d.category === 'lighting');
          return fixtures.every(f => f.dmxConnected);
        }
      },
      {
        id: 4,
        text: 'All fixtures respond to console',
        check: (deviceState, simState) =>
          simState.dmxTest.allResponding
      }
    ],
    hints: [
      'Remember each fixture uses multiple channels',
      'Leave gaps between fixture types for expansion',
      'The address calculator shows conflicts in red'
    ]
  },

  'full-system-design': {
    id: 'full-system-design',
    title: 'Festival Stage Build',
    difficulty: 'hard',
    description: 'Design a complete festival stage audio system',
    objectives: [
      {
        id: 1,
        text: 'Create 16 input sources',
        check: (deviceState) =>
          deviceState.devices.filter(d => d.category === 'input').length >= 16
      },
      {
        id: 2,
        text: 'Add stage box with 3-way split',
        check: (deviceState) =>
          deviceState.devices.some(d => d.type === 'stagebox') &&
          deviceState.devices.some(d => d.type === 'audio_split' && d.ways >= 3)
      },
      {
        id: 3,
        text: 'Build FOH signal path to main PA',
        check: (deviceState) =>
          hasCompletePath(deviceState, 'split', 'main_pa', 'foh')
      },
      {
        id: 4,
        text: 'Build monitor path with 4 mixes',
        check: (deviceState) =>
          deviceState.devices.filter(d => d.type === 'wedge_monitor').length >= 4
      },
      {
        id: 5,
        text: 'Add recording path',
        check: (deviceState) =>
          hasCompletePath(deviceState, 'split', 'recording_interface', 'rec')
      },
      {
        id: 6,
        text: 'Pass full system test',
        check: (deviceState, simState) =>
          simState.systemTest.foh && simState.systemTest.mon && simState.systemTest.rec
      }
    ],
    hints: [
      'Start with input sources and work your way out',
      'The split is the heart of the system',
      'Don\'t forget returns to stage monitors',
      'Test each path individually before the full test'
    ]
  }
};

// =============================================================================
// DEVICE TYPE DEFINITIONS
// =============================================================================

export const DEVICE_TYPES = {
  // Audio Input Devices
  microphone: {
    name: 'Microphone',
    icon: 'Mic',
    category: 'input',
    color: 'microphone',
    ports: { outputs: 1, inputs: 0 },
    config: {
      phantomPower: { type: 'boolean', default: false },
      type: { type: 'select', options: ['dynamic', 'condenser', 'ribbon'], default: 'dynamic' }
    }
  },
  di_box: {
    name: 'DI Box',
    icon: 'ArrowRightLeft',
    category: 'input',
    color: 'di',
    ports: { outputs: 1, inputs: 1 },
    config: {
      groundLift: { type: 'boolean', default: false },
      padDb: { type: 'select', options: [0, -15, -30], default: 0 }
    }
  },
  wireless_rx: {
    name: 'Wireless Receiver',
    icon: 'Radio',
    category: 'input',
    color: 'wireless',
    ports: { outputs: 1, inputs: 0, rf: 1 },
    config: {
      frequency: { type: 'frequency', min: 470, max: 608, default: 518.4 },
      group: { type: 'string', default: 'A' },
      channel: { type: 'number', min: 1, max: 64, default: 1 }
    }
  },
  wireless_tx: {
    name: 'Wireless Transmitter',
    icon: 'RadioTower',
    category: 'input',
    color: 'wireless',
    ports: { outputs: 0, inputs: 1, rf: 1 },
    config: {
      frequency: { type: 'frequency', min: 470, max: 608, default: 518.4 },
      txPower: { type: 'select', options: ['low', 'medium', 'high'], default: 'high' }
    }
  },

  // Audio Processing
  mixer: {
    name: 'Mixing Console',
    icon: 'Sliders',
    category: 'processing',
    color: 'mixer',
    ports: { outputs: 16, inputs: 32 },
    config: {
      channels: { type: 'number', default: 32 },
      danteEnabled: { type: 'boolean', default: false }
    }
  },
  stagebox: {
    name: 'Stage Box',
    icon: 'RectangleVertical',
    category: 'processing',
    color: 'stagebox',
    ports: { outputs: 8, inputs: 32 },
    config: {
      channels: { type: 'number', default: 32 },
      returns: { type: 'number', default: 8 },
      danteEnabled: { type: 'boolean', default: false }
    }
  },
  audio_split: {
    name: 'Audio Split',
    icon: 'Split',
    category: 'processing',
    color: 'split',
    ports: { outputs: 96, inputs: 32 }, // 32 inputs x 3 ways
    config: {
      ways: { type: 'number', default: 3 },
      type: { type: 'select', options: ['passive', 'active'], default: 'active' }
    }
  },

  // Audio Output
  amplifier: {
    name: 'Power Amplifier',
    icon: 'Volume2',
    category: 'output',
    color: 'amplifier',
    ports: { outputs: 4, inputs: 4 },
    config: {
      watts: { type: 'number', default: 2000 },
      channels: { type: 'number', default: 4 }
    }
  },
  speaker: {
    name: 'Speaker/PA',
    icon: 'Speaker',
    category: 'output',
    color: 'speaker',
    ports: { outputs: 1, inputs: 1 },
    config: {
      type: { type: 'select', options: ['main', 'sub', 'fill'], default: 'main' }
    }
  },
  wedge_monitor: {
    name: 'Wedge Monitor',
    icon: 'Speaker',
    category: 'output',
    color: 'monitor',
    ports: { outputs: 1, inputs: 1 },
    config: {
      mixAssignment: { type: 'number', min: 1, max: 16, default: 1 }
    }
  },

  // Network Audio
  dante_switch: {
    name: 'Dante Switch',
    icon: 'Network',
    category: 'network',
    color: 'network',
    ports: { network: 24 },
    config: {
      qosEnabled: { type: 'boolean', default: true }
    }
  },
  dante_interface: {
    name: 'Dante Interface',
    icon: 'AudioLines',
    category: 'network',
    color: 'dante',
    ports: { network: 2, outputs: 8, inputs: 8 },
    config: {
      sampleRate: { type: 'select', options: [44100, 48000, 96000], default: 48000 },
      latency: { type: 'select', options: [0.25, 0.5, 1.0, 5.0], default: 0.5 }
    }
  },

  // Lighting Devices
  light_console: {
    name: 'Lighting Console',
    icon: 'MonitorCog',
    category: 'lighting',
    color: 'console',
    ports: { dmx_out: 4 },
    config: {
      universes: { type: 'number', default: 4 }
    }
  },
  dmx_splitter: {
    name: 'DMX Splitter',
    icon: 'Split',
    category: 'lighting',
    color: 'dmx',
    ports: { dmx_in: 1, dmx_out: 6 },
    config: {
      isolated: { type: 'boolean', default: true }
    }
  },
  led_par: {
    name: 'LED Par',
    icon: 'CircleDot',
    category: 'lighting',
    color: 'fixture',
    ports: { dmx_in: 1, dmx_out: 1 },
    config: {
      dmxAddress: { type: 'number', min: 1, max: 512, default: 1 },
      dmxMode: { type: 'select', options: ['3ch-RGB', '4ch-RGBW', '5ch-RGBWD'], default: '5ch-RGBWD' },
      universe: { type: 'number', min: 1, max: 64, default: 1 }
    }
  },
  moving_head: {
    name: 'Moving Head',
    icon: 'Disc3',
    category: 'lighting',
    color: 'fixture',
    ports: { dmx_in: 1, dmx_out: 1 },
    config: {
      dmxAddress: { type: 'number', min: 1, max: 512, default: 1 },
      dmxMode: { type: 'select', options: ['16ch-basic', '24ch-standard', '40ch-extended'], default: '16ch-basic' },
      universe: { type: 'number', min: 1, max: 64, default: 1 }
    }
  }
};

// =============================================================================
// CONNECTION TYPES
// =============================================================================

export const CONNECTION_TYPES = {
  xlr: {
    name: 'XLR (Analog Audio)',
    color: '#4CAF50',
    dashed: false,
    animated: true,
    category: 'audio'
  },
  speakon: {
    name: 'Speakon (Speaker)',
    color: '#FF5722',
    dashed: false,
    animated: true,
    category: 'audio'
  },
  dante: {
    name: 'Dante (Network Audio)',
    color: '#2196F3',
    dashed: false,
    animated: true,
    category: 'network'
  },
  ethernet: {
    name: 'Ethernet',
    color: '#607D8B',
    dashed: false,
    animated: false,
    category: 'network'
  },
  dmx: {
    name: 'DMX (Lighting)',
    color: '#9C27B0',
    dashed: false,
    animated: true,
    category: 'lighting'
  },
  wireless: {
    name: 'Wireless RF',
    color: '#00BCD4',
    dashed: true,
    animated: true,
    category: 'rf'
  }
};

// =============================================================================
// LESSON STORE
// =============================================================================

const useLessonStore = create((set, get) => ({
  // Current lesson state
  currentLesson: null,
  currentStep: 0,
  lessonProgress: {},

  // Challenge state
  currentChallenge: null,
  challengeProgress: {},

  // Actions
  startLesson: (lessonId) => {
    const lesson = LESSONS[lessonId];
    if (!lesson) return;

    set({
      currentLesson: lesson,
      currentStep: 0
    });
  },

  nextStep: () => {
    const { currentLesson, currentStep } = get();
    if (!currentLesson) return;

    if (currentStep < currentLesson.steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    }
  },

  previousStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },

  completeLesson: () => {
    const { currentLesson, lessonProgress } = get();
    if (!currentLesson) return;

    set({
      lessonProgress: {
        ...lessonProgress,
        [currentLesson.id]: { completed: true, completedAt: Date.now() }
      },
      currentLesson: null,
      currentStep: 0
    });
  },

  startChallenge: (challengeId) => {
    const challenge = CHALLENGES[challengeId];
    if (!challenge) return;

    set({
      currentChallenge: challenge,
      challengeProgress: {
        ...get().challengeProgress,
        [challengeId]: { started: true, objectives: {} }
      }
    });
  },

  checkObjectives: (deviceState, simState) => {
    const { currentChallenge, challengeProgress } = get();
    if (!currentChallenge) return;

    const objectives = {};
    currentChallenge.objectives.forEach(obj => {
      objectives[obj.id] = obj.check(deviceState, simState);
    });

    const allComplete = Object.values(objectives).every(v => v);

    set({
      challengeProgress: {
        ...challengeProgress,
        [currentChallenge.id]: {
          ...challengeProgress[currentChallenge.id],
          objectives,
          completed: allComplete
        }
      }
    });

    return allComplete;
  },

  exitLesson: () => {
    set({
      currentLesson: null,
      currentStep: 0
    });
  },

  exitChallenge: () => {
    set({
      currentChallenge: null
    });
  }
}));

export default useLessonStore;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function hasAddressConflicts(fixtures) {
  for (let i = 0; i < fixtures.length; i++) {
    for (let j = i + 1; j < fixtures.length; j++) {
      const a = fixtures[i];
      const b = fixtures[j];

      if (a.universe !== b.universe) continue;

      const aEnd = a.dmxAddress + a.dmxFootprint - 1;
      const bEnd = b.dmxAddress + b.dmxFootprint - 1;

      if (a.dmxAddress <= bEnd && b.dmxAddress <= aEnd) {
        return true; // Overlap detected
      }
    }
  }
  return false;
}

function hasCompletePath(deviceState, startType, endType, pathName) {
  // Simplified path checking - in real implementation would trace connections
  const hasStart = deviceState.devices.some(d => d.type === startType);
  const hasEnd = deviceState.devices.some(d => d.type === endType);
  const hasConnections = deviceState.connections.some(c => c.path === pathName);

  return hasStart && hasEnd && hasConnections;
}
