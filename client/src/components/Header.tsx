import { Button } from '@progress/kendo-react-buttons';

export default function Header() {
  return (
    <header className="d-flex justify-content-between border p-2 align-items-center">
      <img className="logo" src="logo.jpg" alt="logo" />
      <Button className="bg-success text-white py-1 btn-sm">Sign In</Button>
    </header>
  );
}
