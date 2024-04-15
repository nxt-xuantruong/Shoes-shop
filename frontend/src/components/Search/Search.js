import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Search.css";

function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}&page=1`); // Điều hướng tới URL tìm kiếm với query và trang đầu tiên
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="Search">
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm của bạn..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="btnSearch" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}

export default Search;
