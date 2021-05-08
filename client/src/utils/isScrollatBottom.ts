export default function isScrollatBottom(event: any) {
  return (
    event.target.scrollTop + event.target.clientHeight + 10 >
    event.target.scrollHeight
  );
}
