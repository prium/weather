import { LocationType } from "../types/LocationType";

type ClickPropType = {
  handleLocation: (index: number, name?: string) => void;
  locations: LocationType[];
};

export default ({ handleLocation, locations }: ClickPropType) => {
  const navDom = locations.map((location, i) => {
    return (
      <li key={i} className="nav-item">
        <a
          href="#"
          className={`nav-link ${location.active}`}
          onClick={(e) => {
            handleLocation(i, location.name);
          }}
          title={location.name} //Used this title for preventing the text from jumping on click when the font-weight chagne using sudo style in SCSS
        >
          {location.name}
        </a>
      </li>
    );
  });

  return (
    <nav className="navbar">
      <ul className="nav">{navDom}</ul>
    </nav>
  );
};
