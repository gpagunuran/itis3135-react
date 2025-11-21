import { Link } from "react-router";

export default function Navbar() {
  return (
    <>
      <nav className="primary"> 
        | <Link to="/">Home</Link> |
        <Link to="/introduction">Introduction</Link> |
        <Link to="/contract">Contract</Link> |
      </nav>
    </>
  );
}