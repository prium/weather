import { NavLink } from "react-router-dom";
import {locations} from "../data/locations";

export default () => {
  const navDom = Array.from(locations.keys()).map((key) => {
    return (
      <li key={key} className="nav-item">
        <NavLink
          to={`/${key}`}
          className="nav-link"
          title={key} //Used this title for preventing the text from jumping on click when the font-weight chagne using sudo style in SCSS
        >
          {key}
        </NavLink>
      </li>
    );
  });

  return (
    <nav className="navbar">
      <ul className="nav">{navDom}</ul>
    </nav>
  );
};
