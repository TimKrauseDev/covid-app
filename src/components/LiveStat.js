import React, { useState } from "react";
import CaseRankingList from "./CaseRankingList";

const LiveStatList = ({ diseaseApiData, color, title }) => {
  const [selectedRanking, setSelectedRanking] = useState("highTotal");

  const countryCount = 8;

  const mergeSort = (data, isPercentage) => {
    if (data.length < 2) {
      return data;
    }

    let middle = parseInt(data.length / 2);
    let left = data.slice(0, middle);
    let right = data.slice(middle, data.length);

    return merge(
      mergeSort(left, isPercentage),
      mergeSort(right, isPercentage),
      isPercentage
    );
  };
  const merge = (left, right, isPercentage) => {
    let results = [];

    while (left.length && right.length) {
      //sort by total case or sort by percentage
      if (!isPercentage) {
        if (left[0].cases <= right[0].cases) {
          results.push(left.shift());
        } else {
          results.push(right.shift());
        }
      } else {
        if (
          left[0].cases / left[0].population <=
          right[0].cases / right[0].population
        ) {
          results.push(left.shift());
        } else {
          results.push(right.shift());
        }
      }
    }

    while (left.length) {
      results.push(left.shift());
    }

    while (right.length) {
      results.push(right.shift());
    }

    return results;
  };

  return (
    <div id="live-stat-wrapper">
      <div id="live-stat-title">
        <h2>{title}</h2>
      </div>

      <div id="live-stat-dropdown">
        <div className="select-box">
          <div className="select-box__current" tabIndex="1">
            <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id="0"
                value="1"
                name="Ben"
                defaultChecked
              />
              <p className="select-box__input-text">Highest Total Cases </p>
            </div>
            <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id="1"
                value="2"
                name="Ben"
              />
              <p className="select-box__input-text">
                Highest Percentage of Cases
              </p>
            </div>
            <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id="2"
                value="3"
                name="Ben"
              />
              <p className="select-box__input-text">Lowest Total Cases </p>
            </div>
            <div className="select-box__value">
              <input
                className="select-box__input"
                type="radio"
                id="3"
                value="4"
                name="Ben"
              />
              <p className="select-box__input-text">
                Lowest Percentage of Cases
              </p>
            </div>
            <img
              className="select-box__icon"
              src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
              alt="Arrow Icon"
              aria-hidden="true"
            />
          </div>
          <ul className="select-box__list">
            <li>
              <label
                className="select-box__option"
                htmlFor="0"
                onClick={() => setSelectedRanking("highTotal")}
              >
                Highest Total Cases
              </label>
            </li>
            <li>
              <label
                className="select-box__option"
                htmlFor="1"
                onClick={() => setSelectedRanking("highPerc")}
              >
                Highest Percentage of Cases
              </label>
            </li>
            <li>
              <label
                className="select-box__option"
                htmlFor="2"
                onClick={() => setSelectedRanking("lowTotal")}
              >
                Lowest Total Cases
              </label>
            </li>
            <li>
              <label
                className="select-box__option"
                htmlFor="3"
                onClick={() => setSelectedRanking("lowPerc")}
              >
                Lowest Percentage of Cases
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {/* Show Highest Total Cases */}
        {selectedRanking === "highTotal" && (
          <CaseRankingList
            sortedData={mergeSort(diseaseApiData, false)}
            percentage={false}
            highest={true}
            countryCount={countryCount}
          />
        )}
        {/* Show Highest Percentage of Cases */}
        {selectedRanking === "highPerc" && (
          <CaseRankingList
            sortedData={mergeSort(diseaseApiData, true)}
            percentage={true}
            highest={true}
            countryCount={countryCount}
          />
        )}
        {/* Show Lowest Total Cases */}
        {selectedRanking === "lowTotal" && (
          <CaseRankingList
            sortedData={mergeSort(diseaseApiData, false)}
            percentage={false}
            highest={false}
            countryCount={countryCount}
          />
        )}
        {/* Show Lowest Percentage of Cases */}
        {selectedRanking === "lowPerc" && (
          <CaseRankingList
            sortedData={mergeSort(diseaseApiData, true)}
            percentage={true}
            highest={false}
            countryCount={countryCount}
          />
        )}
      </div>
    </div>
  );
};

export default LiveStatList;
