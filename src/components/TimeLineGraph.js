import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from "victory";

const TimeLineGraph = ({ data }) => {
  const datesToXY = () => {
    let datesXY = [];

    for (const day in data.dates) {
      datesXY.push({
        date: day,
        count: data.dates[day],
      });
    }
    return datesXY;
  };

  const datesXY = datesToXY();

  return (
    <div id="timeline-graph">
      <VictoryChart theme={VictoryTheme.material} padding={75}>
        <VictoryAxis
          fixLabelOverlap
          invertAxis
          style={{ tickLabels: { padding: 16, fontSize: 8 } }}
        />
        <VictoryAxis dependentAxis />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
          }}
          data={datesXY}
          x="date"
          y="count"
        />
      </VictoryChart>
    </div>
  );
};

export default TimeLineGraph;
