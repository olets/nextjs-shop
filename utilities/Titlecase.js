export default function Titlecase(string) {
  return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}