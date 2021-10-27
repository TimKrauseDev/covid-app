import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

const CaseRankingList = ({ sortedData, percentage, highest, countryCount }) => {
  const listRanking = () => {
    const max = sortedData.length - 1;
    const min = max - countryCount;
    const topData = sortedData.slice(min, max);
    const bottomData = sortedData.slice(0, countryCount);
    const dataToUse = highest ? topData.reverse() : bottomData;

    const listData = dataToUse.map((data) => {
      return (
        <ListItem key={data.country} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Country Flag" src={data.countryInfo.flag} />
          </ListItemAvatar>
          <ListItemText
            primary={data.country}
            secondary={
              percentage
                ? ((data.cases / data.population) * 100).toFixed(3) + "%"
                : data.cases.toLocaleString("en-US")
            }
          ></ListItemText>
        </ListItem>
      );
    });

    return listData;
  };

  return (
    <div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {listRanking()}
      </List>
    </div>
  );
};

export default CaseRankingList;
