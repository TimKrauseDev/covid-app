import React from "react";
import CountryCard from "./CountryCard";

const SearchPage = ({
  countriesCurrentData,
  selectedCountrySearch,
  setSelectedCountrySearch,
  setSelectedCountry,
  diseaseApiData,
}) => {
  const countriesCurrentDataList = diseaseApiData.map((countryData) => {
    if (
      countryData.country
        .toLowerCase()
        .includes(selectedCountrySearch.toLowerCase()) &&
      selectedCountrySearch
    ) {
      return (
        <div id="search-result-item" key={countryData.country}>
          <CountryCard
            key={countryData.country}
            country={countryData.country}
            flag={countryData.countryInfo.flag}
            subtitle="Confirmed Cases: "
            count={countryData.cases.toLocaleString("en-US")}
            setSelectedCountry={setSelectedCountry}
            setSelectedCountrySearch={setSelectedCountrySearch}
            countriesCurrentData={countriesCurrentData}
          />
        </div>
      );
    }
    return <React.Fragment />;
  });

  return (
    <div id="search-page-wrapper">
      <div id="search-page-title">
        <h2>Search Results</h2>
      </div>
      <div id="search-results-list">{countriesCurrentDataList}</div>
    </div>
  );
};

export default SearchPage;
