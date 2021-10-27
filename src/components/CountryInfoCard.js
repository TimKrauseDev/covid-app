import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const CountryInfoCard = ({
  title,
  color,
  symbol,
  count,
  secondaryText,
  secondaryColor,
}) => {
  return (
    <Card
      style={{
        border: "1px solid black",
        width: "250px",

        padding: "10px",
        borderTop: `5px solid ${color}`,
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardHeader title={title} />
        <img src={symbol} alt="img" style={{ height: "40px" }} />
      </div>

      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {count}
        </Typography>
        <p style={{ color: secondaryColor }}>{secondaryText}</p>
      </CardContent>
    </Card>
  );
};

export default CountryInfoCard;
