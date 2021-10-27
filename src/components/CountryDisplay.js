import React, { useState, useEffect } from "react";
import covidapi from "../apis/covidapi";
import StatCard from "./StatCard";
import TimeLineGraph from "./TimeLineGraph";

const CountryDisplay = ({
  countriesCurrentData,
  countriesVaccinatedData,
  selectedCountry,
  setSelectedCountry,
  diseaseApiData,
}) => {
  const [confirmedHistoryData, setConfirmedHistoryData] = useState({});
  const [deathHistoryData, setDeathHistoryData] = useState({});
  useEffect(() => {
    const getConfirmedHistoryData = async () => {
      const { data } = await covidapi.get("/history", {
        params: {
          status: "confirmed",
          country: selectedCountry,
        },
      });

      setConfirmedHistoryData(data.All);
    };

    const getDeathHistoryData = async () => {
      const { data } = await covidapi.get("/history", {
        params: {
          status: "deaths",
          country: selectedCountry,
        },
      });

      setDeathHistoryData(data.All);
    };

    getConfirmedHistoryData();
    getDeathHistoryData();
  }, [selectedCountry]);

  const getCountryData = (countriesData, prop) =>
    countriesData.find((c) => c.country === selectedCountry)[prop];

  return (
    <div id="country-display-wrapper">
      <div id="country-display-header">
        <div id="country-display-title">
          <h1>{selectedCountry}</h1>
        </div>
        <div id="country-display-population">
          <h2>Total Population</h2>
          <h1>
            {getCountryData(diseaseApiData, "population").toLocaleString(
              "en-US"
            )}
          </h1>
        </div>
        <div id="country-display-cases">
          <h2>Confirmed Cases</h2>
          <h1>
            {getCountryData(diseaseApiData, "cases").toLocaleString("en-US")}
          </h1>
        </div>
      </div>
      <div id="timeline-graphs-wrapper">
        {/* Graph: Total Cases */}
        <div id="timeline-graph-confirmed">
          <h1>Confirmed Cases</h1>
          <TimeLineGraph data={confirmedHistoryData} />
        </div>
        {/* Graph: Total Deaths */}
        <div id="timeline-graph-deaths">
          <h1>Confirmed Deaths</h1>
          <TimeLineGraph data={deathHistoryData} />
        </div>
      </div>
      {/* Stats Row */}
      <div id="stats-wrapper">
        {/* Vaccinated */}
        <div id="stat-vaccinated" className="stat-card">
          <StatCard
            title="Vaccinated"
            count={getCountryData(
              countriesVaccinatedData,
              "people_vaccinated"
            ).toLocaleString("en-US")}
            secondaryCount={`${(
              (getCountryData(countriesVaccinatedData, "people_vaccinated") /
                getCountryData(countriesCurrentData, "population")) *
              100
            ).toFixed(2)}% of Population`}
            color="blue"
          />
        </div>
        {/* Active */}
        <div id="stat-active" className="stat-card">
          <StatCard
            title="Active"
            count={getCountryData(diseaseApiData, "active").toLocaleString(
              "en-US"
            )}
            secondaryCount={`${(
              (getCountryData(diseaseApiData, "recovered") /
                getCountryData(diseaseApiData, "cases")) *
              100
            ).toFixed(2)}% of Cases`}
            color="grey"
          />
        </div>
        {/* Recovered */}
        <div id="stat-recovered" className="stat-card">
          <StatCard
            title="Recovered"
            count={getCountryData(diseaseApiData, "recovered").toLocaleString(
              "en-US"
            )}
            secondaryCount={`${(
              (getCountryData(diseaseApiData, "recovered") /
                getCountryData(diseaseApiData, "cases")) *
              100
            ).toFixed(2)}% of Cases`}
            color="green"
          />
        </div>
        {/* Deaths */}
        <div id="stat-death" className="stat-card">
          <StatCard
            title="Deaths"
            count={getCountryData(diseaseApiData, "deaths").toLocaleString(
              "en-US"
            )}
            secondaryCount={`${(
              (getCountryData(diseaseApiData, "deaths") /
                getCountryData(diseaseApiData, "cases")) *
              100
            ).toFixed(2)}% of Cases`}
            color="red"
          />
        </div>
      </div>
    </div>
  );
};

export default CountryDisplay;
