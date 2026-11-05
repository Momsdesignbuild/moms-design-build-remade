/** Static contour lines, teal on cream. Pure SVG, drawn once at build; nothing reacts to the mouse. */
export default function Topo({ className = '' }: { className?: string }) {
  const paths: string[] = []
  for (let k = 1; k <= 16; k++) {
    const pts: string[] = []
    for (let a = 0; a <= 120; a++) {
      const t = (a / 120) * Math.PI * 2
      const r = 42 * k * (1 + 0.1 * Math.sin(3 * t + k * 0.55) + 0.06 * Math.sin(5 * t - k * 0.8) + 0.04 * Math.sin(2 * t + k))
      pts.push(`${(900 + r * 1.55 * Math.cos(t)).toFixed(1)},${(520 + r * 0.9 * Math.sin(t)).toFixed(1)}`)
    }
    paths.push('M' + pts.join('L') + 'Z')
  }
  return (
    <svg className={className} viewBox="0 0 1800 1040" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} fill="none" stroke="#00AEC7" strokeOpacity={0.09 + (i % 4) * 0.015} strokeWidth="1.2" />)}
    </svg>
  )
}
