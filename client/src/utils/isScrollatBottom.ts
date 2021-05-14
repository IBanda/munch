export default function isScrollatBottom(event: any) {
  return (
    event.target.scrollTop + event.target.clientHeight >=
    event.target.scrollHeight
  );
}
