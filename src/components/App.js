import React, { useState, useEffect } from "react";
import covidapi from "../apis/covidapi";
import diseaseapi from "../apis/diseaseapi";
import SearchPage from "./SearchPage";
import Header from "./Header";
import Footer from "./Footer";
import GlobalDisplay from "./GlobalDisplay";
import CountryDisplay from "./CountryDisplay";

const App = () => {
  const [selectedCountrySearch, setSelectedCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countriesCurrentData, setCountriesCurrentData] = useState([]);
  const [countriesVaccinatedData, setCountriesVaccinatedData] = useState([]);
  const [diseaseApiData, setDiseaseApiData] = useState([]);

  //GET all country current cases data from covidapi
  const getCasesData = async () => {
    const { data } = await covidapi.get("/cases", {});
    let dataArr = [];

    for (const country in data) {
      if (data[country].All.country) {
        dataArr.push(data[country].All);
      }
    }

    setCountriesCurrentData(dataArr);
  };

  //GET all country vaccinated cases data from covidapi
  const getVaccinatedData = async () => {
    const { data } = await covidapi.get("/vaccines", {});
    let dataArr = [];

    for (const country in data) {
      if (data[country].All.country) {
        dataArr.push(data[country].All);
      }
    }

    setCountriesVaccinatedData(dataArr);
  };

  //GET all country data from disease api
  const getDiseaseData = async () => {
    const { data } = await diseaseapi.get("/countries", {});

    setDiseaseApiData(data);
  };

  //on mount, pull all needed data from both apis
  useEffect(() => {
    getCasesData();
    getVaccinatedData();
    getDiseaseData();
  }, []);

  return (
    <div id="app-content-wrapper">
      <Header
        selectedCountrySearch={selectedCountrySearch}
        setSelectedCountrySearch={setSelectedCountrySearch}
        diseaseApiData={diseaseApiData}
        setSelectedCountry={setSelectedCountry}
      />
      {!selectedCountrySearch && !selectedCountry && (
        <GlobalDisplay
          countriesCurrentData={countriesCurrentData}
          countriesVaccinatedData={countriesVaccinatedData}
          selectedCountry={selectedCountry}
          diseaseApiData={diseaseApiData}
        />
      )}
      {!selectedCountrySearch && selectedCountry && (
        <CountryDisplay
          countriesCurrentData={countriesCurrentData}
          countriesVaccinatedData={countriesVaccinatedData}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          diseaseApiData={diseaseApiData}
        />
      )}
      {selectedCountrySearch && (
        <SearchPage
          countriesCurrentData={countriesCurrentData}
          selectedCountrySearch={selectedCountrySearch}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          setSelectedCountrySearch={setSelectedCountrySearch}
          diseaseApiData={diseaseApiData}
        />
      )}
      <Footer countriesCurrentData={countriesCurrentData} />
    </div>
  );
};

export default App;
