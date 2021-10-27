import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const Header = ({
  selectedCountrySearch,
  setSelectedCountrySearch,
  setSelectedCountry,
  diseaseApiData,
}) => {
  //go through array of country data and add up all data for specific prop
  const getGlobalData = (countriesData, prop) => {
    return countriesData.reduce((total, data) => total + data[prop], 0);
  };

  return (
    <header id="header">
      <div id="header-left">
        <h2
          id="header-title"
          onClick={() => {
            setSelectedCountry("");
            setSelectedCountrySearch("");
          }}
        >
          Covid-19 Tracker
        </h2>
      </div>
      <div id="header-center">
        <div>
          <h2>Cases Worldwide</h2>
          <h1>
            {getGlobalData(diseaseApiData, "cases").toLocaleString("en-US")}
          </h1>
        </div>
      </div>
      <div id="header-right">
        <SearchIcon />
        <TextField
          id="search-countries"
          label="Search Contries"
          variant="standard"
          value={selectedCountrySearch}
          onChange={(e) => setSelectedCountrySearch(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
