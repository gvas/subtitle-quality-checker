export function lengthWithoutCRLF (s) {
  return s.replace(/\r|\n/g, '').length
}

export function padLeft(s, totalWidth, paddingChar) {
  const mask = Array(totalWidth + 1).join(paddingChar)
  const str = String(s)
  return String(mask + str).slice(-Math.max(totalWidth, str.length))
}

export function formatTime(ms) {
  const d = new Date(ms)
  return `${padLeft(d.getHours(), 2, '0')}:${padLeft(d.getMinutes(), 2, '0')}:${padLeft(d.getSeconds(), 2, '0')},${padLeft(d.getMilliseconds(), 3, '0')}`
}
