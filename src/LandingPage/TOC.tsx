import { Link } from "react-router-dom";

export default function TOC() {
    return (
      <ul>
        <li><Link to="/Labs">Labs</Link></li>
        <li><Link to="/Kanbas">Kanbas</Link></li>
        <li><Link to="https://github.com/ryanwitteck/kanbas-react-web-app">Link to Git Repository</Link></li>
      </ul>
    );
  }
  