import React from "react";
import Avatar from "@material-ui/core/Avatar";

const CountryCard = ({
  subtitle,
  country,
  flag,
  count,
  setSelectedCountry,
  setSelectedCountrySearch,
  countriesCurrentData,
}) => {
  return (
    <div
      id="country-card-wrapper"
      onClick={() => {
        if (countriesCurrentData.find((c) => c.country === country)) {
          setSelectedCountry(country);
          setSelectedCountrySearch("");
        }
      }}
    >
      <div id="country-flag">
        <Avatar src={flag} />
      </div>
      <div id="country-info">
        <div id="country-title">
          <h3>{country}</h3>
        </div>
        <div id="country-subtitle">
          <h3>{subtitle}</h3>
          <h2>{count}</h2>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
