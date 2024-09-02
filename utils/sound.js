export const initScoreSound = () => {
  // Define the scoring sound as a sequence of very short, quick notes
  const coinClinkSound = [
    { note: 'E5', duration: 'sixteenth' }, // High-pitched note
    { note: 'C5', duration: 'sixteenth' }, // Slightly lower note
    { note: 'G4', duration: 'sixteenth' }, // Even lower note, mimicking a series of falling coins
  ]

  // Map of note frequencies
  const noteFrequencies = {
    C5: 523.25, // Frequency for C5
    E5: 659.25, // Frequency for E5
    G4: 392.0, // Frequency for G4
    Rest: 0.0, // Rest note (silence)
  }

  // Map of note durations (relative to a whole note)
  const noteDurations = {
    sixteenth: 0.25,
  }

  // Base duration in seconds for a quarter note (adjust this to change the tempo)
  const baseDuration = 0.05 // Very fast tempo for a quick coin clink sound

  // Create the AudioContext
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  function playNoteAtTime(frequency, duration, startTime) {
    if (frequency === 0.0) return // Skip rests

    // Create an oscillator node
    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    // Set the oscillator frequency to the given note frequency
    oscillator.frequency.setValueAtTime(frequency, startTime)
    oscillator.type = 'square' // Square wave to add a percussive quality, like metal hitting metal

    // Quick ADSR envelope for the gain node
    const attackTime = 0.005 // Very quick attack
    const decayTime = 0.01
    const sustainLevel = 0.6
    const releaseTime = 0.02 // Short release to mimic a quick clink

    gainNode.gain.setValueAtTime(0, startTime) // Start at 0 gain
    gainNode.gain.linearRampToValueAtTime(1, startTime + attackTime) // Attack
    gainNode.gain.linearRampToValueAtTime(
      sustainLevel,
      startTime + attackTime + decayTime
    ) // Decay
    gainNode.gain.setValueAtTime(
      sustainLevel,
      startTime + duration - releaseTime
    ) // Sustain
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration) // Release

    // Connect the oscillator to the gain node and then to the audio context's destination (output)
    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    // Start the oscillator at the specified start time
    oscillator.start(startTime)

    // Stop the oscillator after the specified duration
    oscillator.stop(startTime + duration)
  }

  function playCoinClinkSound() {
    let currentTime = audioCtx.currentTime

    coinClinkSound.forEach((noteObject) => {
      const frequency = noteFrequencies[noteObject.note]
      const durationInSeconds =
        baseDuration * noteDurations[noteObject.duration]

      if (frequency !== undefined) {
        playNoteAtTime(frequency, durationInSeconds, currentTime)
        currentTime += durationInSeconds // Move to the next note's start time
      }
    })
  }

  // Pre-warm the AudioContext to reduce delay
  audioCtx.resume().then(() => {
    console.log('AudioContext is ready for playback')
  })

  return { playCoinClinkSound }
}

// // export const mainMelody = [
// //   // First Phrase (unchanged)
// //   { note: 'D', duration: 'quarter' },
// //   { note: 'F#', duration: 'eighth' },
// //   { note: 'A', duration: 'eighth' },
// //   { note: 'D', duration: 'half' },
// //   { note: 'C#', duration: 'quarter' },
// //   { note: 'A', duration: 'quarter' },
// //   { note: 'B', duration: 'quarter' },
// //   { note: 'D', duration: 'whole' },

// //   // Second Phrase (new version)
// //   { note: 'A', duration: 'half' },
// //   { note: 'G', duration: 'quarter' },
// //   { note: 'F#', duration: 'quarter' },
// //   { note: 'E', duration: 'half' },
// //   { note: 'F#', duration: 'quarter' },
// //   { note: 'G', duration: 'quarter' },
// //   { note: 'A', duration: 'whole' },

// //   // Third Phrase (Variation)
// //   { note: 'D', duration: 'quarter' },
// //   { note: 'F#', duration: 'eighth' },
// //   { note: 'A', duration: 'eighth' },
// //   { note: 'C', duration: 'half' },
// //   { note: 'B', duration: 'quarter' },
// //   { note: 'A', duration: 'quarter' },
// //   { note: 'G', duration: 'quarter' },
// //   { note: 'F#', duration: 'whole' },

// //   // Fourth Phrase
// //   { note: 'G', duration: 'quarter' },
// //   { note: 'A', duration: 'eighth' },
// //   { note: 'B', duration: 'eighth' },
// //   { note: 'C', duration: 'half' },
// //   { note: 'D', duration: 'quarter' },
// //   { note: 'C', duration: 'quarter' },
// //   { note: 'B', duration: 'quarter' },
// //   { note: 'A', duration: 'whole' },

// //   // Fifth Phrase (Development)
// //   { note: 'F#', duration: 'quarter' },
// //   { note: 'G', duration: 'eighth' },
// //   { note: 'A', duration: 'eighth' },
// //   { note: 'B', duration: 'half' },
// //   { note: 'A', duration: 'quarter' },
// //   { note: 'G', duration: 'quarter' },
// //   { note: 'F#', duration: 'quarter' },
// //   { note: 'E', duration: 'whole' },

// //   // Closing Phrase
// //   { note: 'D', duration: 'half' },
// //   { note: 'F#', duration: 'quarter' },
// //   { note: 'A', duration: 'quarter' },
// //   { note: 'G', duration: 'half' },
// //   { note: 'F#', duration: 'quarter' },
// //   { note: 'E', duration: 'quarter' },
// //   { note: 'D', duration: 'whole' },

// //   // Repeat Theme (First Phrase)
// //   { note: 'D', duration: 'quarter' },
// //   { note: 'F#', duration: 'eighth' },
// //   { note: 'A', duration: 'eighth' },
// //   { note: 'D', duration: 'half' },
// //   { note: 'C#', duration: 'quarter' },
// //   { note: 'A', duration: 'quarter' },
// //   { note: 'B', duration: 'quarter' },
// //   { note: 'D', duration: 'whole' },
// // ];

// // export const harmonyLayer = [
// //   { note: 'D', duration: 'whole' },
// //   { note: 'G', duration: 'whole' },
// //   { note: 'A', duration: 'whole' },
// //   { note: 'F#', duration: 'whole' },
// //   { note: 'G', duration: 'whole' },
// //   { note: 'D', duration: 'whole' },
// //   { note: 'B', duration: 'whole' },
// //   { note: 'A', duration: 'whole' },
// // ];
// export const score = [
//   { note: 'A', duration: 'sixteenth' }, // Second note (minor third above)
// ]

// export const dreamlikeMelody = [
//     // First Phrase (unchanged)
//     { note: 'D', duration: 'quarter' },
//     { note: 'F#', duration: 'eighth' },
//     { note: 'A', duration: 'eighth' },
//     { note: 'D', duration: 'half' },
//     { note: 'C#', duration: 'quarter' },
//     { note: 'A', duration: 'quarter' },
//     { note: 'B', duration: 'quarter' },
//     { note: 'D', duration: 'whole' },

//     // Second Phrase (new version)
//     { note: 'A', duration: 'half' },
//     { note: 'G', duration: 'quarter' },
//     { note: 'F#', duration: 'quarter' },
//     { note: 'E', duration: 'half' },
//     { note: 'F#', duration: 'quarter' },
//     { note: 'G', duration: 'quarter' },
//     { note: 'A', duration: 'whole' },

//     // Third Phrase (Variation)
//     { note: 'D', duration: 'quarter' },
//     { note: 'F#', duration: 'eighth' },
//     { note: 'A', duration: 'eighth' },
//     { note: 'C', duration: 'half' },
//     { note: 'B', duration: 'quarter' },
//     { note: 'A', duration: 'quarter' },
//     { note: 'G', duration: 'quarter' },
//     { note: 'F#', duration: 'whole' },

//     // Fourth Phrase
//     { note: 'G', duration: 'quarter' },
//     { note: 'A', duration: 'eighth' },
//     { note: 'B', duration: 'eighth' },
//     { note: 'C', duration: 'half' },
//     { note: 'D', duration: 'quarter' },
//     { note: 'C', duration: 'quarter' },
//     { note: 'B', duration: 'quarter' },
//     { note: 'A', duration: 'whole' },

//     // Fifth Phrase (Development)
//     { note: 'F#', duration: 'quarter' },
//     { note: 'G', duration: 'eighth' },
//     { note: 'A', duration: 'eighth' },
//     { note: 'B', duration: 'half' },
//     { note: 'A', duration: 'quarter' },
//     { note: 'G', duration: 'quarter' },
//     { note: 'F#', duration: 'quarter' },
//     { note: 'E', duration: 'whole' },

//     // Closing Phrase
//     { note: 'D', duration: 'half' },
//     { note: 'F#', duration: 'quarter' },
//     { note: 'A', duration: 'quarter' },
//     { note: 'G', duration: 'half' },
//     { note: 'F#', duration: 'quarter' },
//     { note: 'E', duration: 'quarter' },
//     { note: 'D', duration: 'whole' },

//     // Repeat Theme (First Phrase)
//     { note: 'D', duration: 'quarter' },
//     { note: 'F#', duration: 'eighth' },
//     { note: 'A', duration: 'eighth' },
//     { note: 'D', duration: 'half' },
//     { note: 'C#', duration: 'quarter' },
//     { note: 'A', duration: 'quarter' },
//     { note: 'B', duration: 'quarter' },
//     { note: 'D', duration: 'whole' },

//   // First Phrase (adjusted)
//   { note: 'D', duration: 'half' },
//   { note: 'F#', duration: 'quarter' },
//   { note: 'A', duration: 'quarter' },
//   { note: 'D', duration: 'whole' },
//   { note: 'C#', duration: 'half' },
//   { note: 'A', duration: 'half' },
//   { note: 'B', duration: 'half' },
//   { note: 'D', duration: 'whole' },

//   // Second Phrase (adjusted)
//   { note: 'A', duration: 'whole' },
//   { note: 'G', duration: 'half' },
//   { note: 'F#', duration: 'half' },
//   { note: 'E', duration: 'whole' },
//   { note: 'F#', duration: 'half' },
//   { note: 'G', duration: 'half' },
//   { note: 'A', duration: 'whole' },

//   // Third Phrase (Variation, adjusted)
//   { note: 'D', duration: 'half' },
//   { note: 'F#', duration: 'quarter' },
//   { note: 'A', duration: 'quarter' },
//   { note: 'C', duration: 'whole' },
//   { note: 'B', duration: 'half' },
//   { note: 'A', duration: 'half' },
//   { note: 'G', duration: 'half' },
//   { note: 'F#', duration: 'whole' },

//   // Fourth Phrase (adjusted)
//   { note: 'G', duration: 'half' },
//   { note: 'A', duration: 'quarter' },
//   { note: 'B', duration: 'quarter' },
//   { note: 'C', duration: 'whole' },
//   { note: 'D', duration: 'half' },
//   { note: 'C', duration: 'half' },
//   { note: 'B', duration: 'half' },
//   { note: 'A', duration: 'whole' },

//   // Fifth Phrase (Development, adjusted)
//   { note: 'F#', duration: 'half' },
//   { note: 'G', duration: 'quarter' },
//   { note: 'A', duration: 'quarter' },
//   { note: 'B', duration: 'whole' },
//   { note: 'A', duration: 'half' },
//   { note: 'G', duration: 'half' },
//   { note: 'F#', duration: 'half' },
//   { note: 'E', duration: 'whole' },

//   // Closing Phrase (adjusted)
//   { note: 'D', duration: 'whole' },
//   { note: 'F#', duration: 'half' },
//   { note: 'A', duration: 'half' },
//   { note: 'G', duration: 'whole' },
//   { note: 'F#', duration: 'half' },
//   { note: 'E', duration: 'half' },
//   { note: 'D', duration: 'whole' },

//   // Repeat Theme (First Phrase, adjusted)
//   { note: 'D', duration: 'half' },
//   { note: 'F#', duration: 'quarter' },
//   { note: 'A', duration: 'quarter' },
//   { note: 'D', duration: 'whole' },
//   { note: 'C#', duration: 'half' },
//   { note: 'A', duration: 'half' },
//   { note: 'B', duration: 'half' },
//   { note: 'D', duration: 'whole' },
// ];

// // Map of note frequencies (expanded to include harmonies and percussive tones)
// const noteFrequencies = {
//   'C': 261.63,   // Frequency for C4
//   'C#': 277.18,  // Frequency for C#4/Db4
//   'D': 293.66,   // Frequency for D4
//   'D5': 587.33,  // Frequency for D5 (higher octave for percussion)
//   'D#': 311.13,  // Frequency for D#4/Eb4
//   'E': 329.63,   // Frequency for E4
//   'F': 349.23,   // Frequency for F4
//   'F#': 369.99,  // Frequency for F#4/Gb4
//   'G': 392.00,   // Frequency for G4
//   'G#': 415.30,  // Frequency for G#4/Ab4
//   'A': 440.00,   // Frequency for A4
//   'A#': 466.16,  // Frequency for A#4/Bb4
//   'B': 493.88,   // Frequency for B4
//   'Rest': 0.00,  // Rest note (silence)
// };

// // Map of note durations (relative to a whole note)
// const noteDurations = {
//   'whole': 4,
//   'half': 2,
//   'quarter': 1,
//   'eighth': 0.5,
//   'sixteenth': 0.25
// };

// // Base duration in seconds for a quarter note (adjust this to change the tempo)
// const baseDuration = 1.0; // 1.0 seconds for a quarter note, slower tempo for a dreamlike quality

// // Create the AudioContext
// const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// function playNoteAtTime(frequency, duration, startTime) {
//   if (frequency === 0.00) return; // Skip rests

//   // Create an oscillator node
//   const oscillator = audioCtx.createOscillator();
//   const gainNode = audioCtx.createGain();

//   // Set the oscillator frequency to the given note frequency
//   oscillator.frequency.setValueAtTime(frequency, startTime);
//   oscillator.type = 'sine'; // Use sine wave for a smooth, pure tone

//   // Set up an ADSR envelope on the gain node
//   const attackTime = 0.2; // Longer attack for a more ethereal sound
//   const decayTime = 0.3;
//   const sustainLevel = 0.6;
//   const releaseTime = 0.5; // Longer release for a fading effect

//   gainNode.gain.setValueAtTime(0, startTime); // Start at 0 gain
//   gainNode.gain.linearRampToValueAtTime(1, startTime + attackTime); // Attack
//   gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime + decayTime); // Decay
//   gainNode.gain.setValueAtTime(sustainLevel, startTime + duration - releaseTime); // Sustain
//   gainNode.gain.linearRampToValueAtTime(0, startTime + duration); // Release

//   // Connect the oscillator to the gain node and then to the audio context's destination (output)
//   oscillator.connect(gainNode);
//   gainNode.connect(audioCtx.destination);

//   // Start the oscillator at the specified start time
//   oscillator.start(startTime);

//   // Stop the oscillator after the specified duration
//   oscillator.stop(startTime + duration);
// }

// export function playSong(song, startTimeOffset = 0) {
//   let currentTime = audioCtx.currentTime + startTimeOffset;

//   song.forEach(noteObject => {
//       const frequency = noteFrequencies[noteObject.note];
//       const durationInSeconds = baseDuration * noteDurations[noteObject.duration];

//       if (frequency !== undefined) {
//           playNoteAtTime(frequency, durationInSeconds, currentTime);
//           currentTime += durationInSeconds; // Move to the next note's start time
//       }
//   });
// }
