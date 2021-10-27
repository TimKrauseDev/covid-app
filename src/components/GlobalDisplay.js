import React from "react";
import StatCard from "./StatCard";
import LiveStat from "./LiveStat";
import DisplayMap from "./DisplayMap";

const GlobalDisplay = ({
  countriesCurrentData,
  countriesVaccinatedData,
  diseaseApiData,
}) => {
  const getGlobalData = (countriesData, prop) =>
    countriesData.reduce((total, data) => total + data[prop], 0);

  return (
    <div id="global-display-wrapper">
      {/* Header Information */}
      <div id="global-display-header">
        <div id="global-display-title">
          <h1>Global</h1>
        </div>
        <div id="global-display-population">
          <h2>Total Population</h2>
          <h1>
            {getGlobalData(diseaseApiData, "population").toLocaleString(
              "en-US"
            )}
          </h1>
        </div>
        <div id="global-display-cases">
          <h2>Confirmed Cases</h2>
          <h1>
            {getGlobalData(diseaseApiData, "cases").toLocaleString("en-US")}
          </h1>
        </div>
      </div>
      {/* Map & Live Cases Row */}
      <div id="map-livecases-wrapper">
        <div id="global-map">
          <DisplayMap diseaseApiData={diseaseApiData} />
        </div>
        <div id="global-live-cases">
          <LiveStat
            countriesCurrentData={countriesCurrentData}
            diseaseApiData={diseaseApiData}
            title="Live Cases Rankings"
            color="#1876D2"
          />
        </div>
      </div>
      {/* Stats Row */}
      <div id="stats-wrapper">
        {/* Vaccinated */}
        <div id="stat-vaccinated" className="stat-card">
          <StatCard
            title="Vaccinated"
            count={getGlobalData(
              countriesVaccinatedData,
              "people_vaccinated"
            ).toLocaleString("en-US")}
            secondaryCount={`${(
              (getGlobalData(countriesVaccinatedData, "people_vaccinated") /
                getGlobalData(countriesCurrentData, "population")) *
              100
            ).toFixed(2)}% of Population`}
            color="blue"
          />
        </div>
        {/* Active */}
        <div id="stat-active" className="stat-card">
          <StatCard
            title="Active"
            count={getGlobalData(diseaseApiData, "active").toLocaleString(
              "en-US"
            )}
            secondaryCount={`${(
              (getGlobalData(diseaseApiData, "active") /
                getGlobalData(countriesCurrentData, "population")) *
              100
            ).toFixed(2)}% of Population`}
            color="grey"
          />
        </div>
        {/* Recovered */}
        <div id="stat-recovered" className="stat-card">
          <StatCard
            title="Recovered"
            count={getGlobalData(diseaseApiData, "recovered").toLocaleString(
              "en-US"
            )}
            secondaryCount={`${(
              (getGlobalData(diseaseApiData, "recovered") /
                getGlobalData(diseaseApiData, "cases")) *
              100
            ).toFixed(2)}% of Cases`}
            color="green"
          />
        </div>
        {/* Deaths */}
        <div id="stat-death" className="stat-card">
          <StatCard
            title="Deaths"
            count={getGlobalData(diseaseApiData, "deaths").toLocaleString(
              "en-US"
            )}
            secondaryCount={`${(
              (getGlobalData(diseaseApiData, "deaths") /
                getGlobalData(diseaseApiData, "cases")) *
              100
            ).toFixed(2)}% of Cases`}
            color="red"
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalDisplay;
