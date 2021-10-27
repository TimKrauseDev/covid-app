import React from "react";
import CountryInfoCard from "./CountryInfoCard";

const CountryInformationPage = ({
  countriesCurrentData,
  countriesDeathHistoricalData,
  countriesVaccinatedData,
}) => {
  const globeImg = require("../imgs/globe.png");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={`https://www.countryflags.io/${countriesCurrentData[0].abbreviation}/flat/64.png`}
          alt="country flag"
        />
        <h1>{countriesCurrentData[0].country}</h1>
      </div>
      <h2>Population: {countriesCurrentData[0].population}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridGap: "20px",
        }}
      >
        <CountryInfoCard
          title="Total Cases"
          color="gray"
          symbol={globeImg.default}
          count={countriesCurrentData[0].confirmed}
          secondaryText={`${(
            (countriesCurrentData[0].confirmed /
              countriesCurrentData[0].population) *
            100
          ).toFixed(2)}% of Population `}
          secondaryColor="red"
        />
        <CountryInfoCard
          title="Active Cases"
          color="blue"
          symbol={globeImg.default}
          count={
            countriesCurrentData[0].confirmed -
            countriesCurrentData[0].recovered
          }
          secondaryText={`${(
            ((countriesCurrentData[0].confirmed -
              countriesCurrentData[0].recovered) /
              countriesCurrentData[0].population) *
            100
          ).toFixed(2)}% of Population `}
          secondaryColor="blue"
        />
        <CountryInfoCard
          title="Recovered"
          color="green"
          symbol={globeImg.default}
          count={countriesCurrentData[0].recovered}
          secondaryText={`${(
            (countriesCurrentData[0].recovered /
              countriesCurrentData[0].confirmed) *
            100
          ).toFixed(2)}% of Total Cases `}
          secondaryColor="green"
        />
        <CountryInfoCard
          title="Deaths"
          color="red"
          symbol={globeImg.default}
          count={countriesCurrentData[0].deaths}
          secondaryText={`${(
            (countriesCurrentData[0].deaths /
              countriesCurrentData[0].confirmed) *
            100
          ).toFixed(2)}% of Total Cases `}
          secondaryColor="red"
        />
      </div>
    </div>
  );
};

export default CountryInformationPage;
