<template>
  <div class="flex items-center gap-3 select-none">
    <canvas
      ref="canvasRef"
      :width="width"
      :height="height"
      class="rounded border border-gray-300 shadow-sm bg-white"
      :aria-label="`CAPTCHA image: ${code}`"
    />
    <button
      type="button"
      class="inline-flex items-center justify-center rounded border px-2 py-1 text-sm hover:bg-gray-50"
      @click="refresh"
      :title="`Refresh CAPTCHA`"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5a5 5 0 0 1-8.66 3.54 1 1 0 1 0-1.41 1.41A7 7 0 0 0 19 13c0-3.86-3.14-7-7-7Z"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineExpose } from 'vue'

const props = defineProps({
  length: { type: Number, default: 5 },
  width: { type: Number, default: 160 },
  height: { type: Number, default: 56 },
  caseInsensitive: { type: Boolean, default: true },
  noiseLines: { type: Number, default: 3 },
  noiseDots: { type: Number, default: 60 },
  expiresInMs: { type: Number, default: 0 }, // 0 = never expires
})

const emit = defineEmits(['refreshed', 'expired'])

const canvasRef = ref(null)
const code = ref('')
let expireTimer = null

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789' // tanpa 0,O,1,l

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function randomFloat(min, max) { return Math.random() * (max - min) + min }

function generateCode(len) {
  let s = ''
  for (let i = 0; i < len; i++) {
    s += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
  }
  return s
}

function clearExpireTimer() {
  if (expireTimer) { clearTimeout(expireTimer); expireTimer = null }
}

function startExpireTimer() {
  clearExpireTimer()
  if (props.expiresInMs > 0) {
    expireTimer = setTimeout(() => {
      emit('expired')
      refresh() // regenerate on expire
    }, props.expiresInMs)
  }
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const { width, height } = canvas

  // background
  ctx.clearRect(0, 0, width, height)
  const bgGradient = ctx.createLinearGradient(0, 0, width, height)
  bgGradient.addColorStop(0, `hsl(${randomInt(180, 240)} 40% 96%)`)
  bgGradient.addColorStop(1, `hsl(${randomInt(180, 240)} 40% 88%)`)
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)

  // noise lines
  for (let i = 0; i < props.noiseLines; i++) {
    ctx.beginPath()
    ctx.strokeStyle = `rgba(0,0,0,${randomFloat(0.05, 0.15)})`
    ctx.lineWidth = randomFloat(0.5, 1.5)
    const x1 = randomInt(0, width), y1 = randomInt(0, height)
    const x2 = randomInt(0, width), y2 = randomInt(0, height)
    const cx1 = randomInt(0, width), cy1 = randomInt(0, height)
    const cx2 = randomInt(0, width), cy2 = randomInt(0, height)
    ctx.moveTo(x1, y1)
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2)
    ctx.stroke()
  }

  // draw characters with slight transforms
  const chars = code.value.split('')
  const charArea = width / (chars.length + 1)

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]
    const fontSize = randomInt(Math.floor(height * 0.55), Math.floor(height * 0.75))
    const angle = randomFloat(-0.35, 0.35) // rad ~ -20..20 deg
    const x = charArea * (i + 1)
    const y = randomInt(Math.floor(height * 0.65), Math.floor(height * 0.85))

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)

    // subtle shadow
    ctx.shadowColor = 'rgba(0,0,0,0.15)'
    ctx.shadowBlur = 2
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1

    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
    ctx.fillStyle = `hsl(${randomInt(200, 260)} 65% ${randomInt(25, 40)}%)`
    ctx.fillText(ch, 0, 0)

    ctx.restore()
  }

  // noise dots
  for (let i = 0; i < props.noiseDots; i++) {
    ctx.fillStyle = `rgba(0,0,0,${randomFloat(0.04, 0.10)})`
    ctx.beginPath()
    ctx.arc(randomInt(0, width), randomInt(0, height), randomFloat(0.5, 1.2), 0, Math.PI * 2)
    ctx.fill()
  }
}

function refresh() {
  code.value = generateCode(props.length)
  draw()
  emit('refreshed', code.value)
  startExpireTimer()
}

function getCode() {
  return code.value
}

function validate(input) {
  if (input == null) return false
  const a = String(input)
  const b = String(code.value)
  return props.caseInsensitive ? a.toLowerCase() === b.toLowerCase() : a === b
}

onMounted(() => {
  refresh()
})

watch(() => props.length, () => refresh())

// expose public API
defineExpose({ refresh, validate, getCode })
</script>

<style scoped>
/* no-op: keep styles minimal */
</style>
