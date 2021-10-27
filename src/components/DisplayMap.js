import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([1, 1000000])
  .range(["#ffedea", "#ff5233"]);

const DisplayMap = ({ diseaseApiData }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {diseaseApiData.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = diseaseApiData.find(
                (c) => c.countryInfo.iso2 === geo.properties.ISO_A2
              );

              return (
                <Tooltip title={tooltipContent} placement="top">
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d.cases) : "#F5F4F6"}
                    onMouseEnter={() => {
                      if (d) {
                        const { cases, country } = d;
                        const text = `${country} — Confirmed Cases: ${cases.toLocaleString(
                          "en-US"
                        )}`;
                        setTooltipContent(text);
                      }
                    }}
                    onMouseLeave={() => setTooltipContent("")}
                  />
                </Tooltip>
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default DisplayMap;
