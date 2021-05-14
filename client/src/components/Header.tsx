import { Button } from '@progress/kendo-react-buttons';

export default function Header() {
  return (
    <header className="d-flex justify-content-between border p-2 align-items-center">
      <img className="logo" src="logo.jpg" alt="logo" />
      <div>
        <Button className="bg-success text-white  btn-sm">Sign up</Button>
        <Button look="outline" className=" ml-1  btn-sm">
          Sign in
        </Button>
      </div>
    </header>
  );
}
