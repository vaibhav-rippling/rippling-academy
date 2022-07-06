import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchTermContext from "./SearchTermContext";
import "./SearchBox.css";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = useContext(SearchTermContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    //console.log(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateSearchTerm(searchTerm);
    navigate("/");
  };

  return (
    <div className="searchBox-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchBox"
          name="searchBox"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
}

export default SearchBox;
