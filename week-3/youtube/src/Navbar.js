import SearchBox from "./SearchBox";
import "./Navbar.css";
import yt_logo from "./yt-logo.jpg";
import { Link } from "react-router-dom";

function Navbar() {
  const img_src = "src/yt-logo.jpg";

  return (
    <div className="navbar-container">
      <div className="yt-logo">
        <Link to="/">
          <img className="yt-logo-img" src={yt_logo}></img>
        </Link>
      </div>

      <div className="search-div">
        <SearchBox />
      </div>
    </div>
  );
}

export default Navbar;
