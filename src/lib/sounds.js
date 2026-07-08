let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume()
  }
  return audioCtx
}

export function playHover(muted) {
  if (muted) return
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "square"
    osc.frequency.setValueAtTime(850, ctx.currentTime)
    
    gain.gain.setValueAtTime(0.012, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.05)
  } catch (e) {
    console.warn("Audio Context Error:", e)
  }
}

export function playClick(muted) {
  if (muted) return
  try {
    const ctx = getAudioContext()
    
    // Note 1
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = "square"
    osc1.frequency.setValueAtTime(580, ctx.currentTime)
    gain1.gain.setValueAtTime(0.02, ctx.currentTime)
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start()
    osc1.stop(ctx.currentTime + 0.08)

    // Note 2
    setTimeout(() => {
      try {
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.type = "square"
        osc2.frequency.setValueAtTime(880, ctx.currentTime)
        gain2.gain.setValueAtTime(0.02, ctx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.start()
        osc2.stop(ctx.currentTime + 0.12)
      } catch (err) {}
    }, 65)
  } catch (e) {
    console.warn("Audio Context Error:", e)
  }
}

export function playTractorBeam(muted) {
  if (muted) return
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sawtooth"
    osc.frequency.setValueAtTime(1100, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 1.6)

    gain.gain.setValueAtTime(0.035, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 1.6)
  } catch (e) {
    console.warn("Audio Context Error:", e)
  }
}
