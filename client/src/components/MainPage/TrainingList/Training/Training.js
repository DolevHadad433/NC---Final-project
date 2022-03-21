import React from "react";
import "./Training.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Training({ title, category, description, duration, groupSize, id }) {
  return (
    <div className="Training">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {category}
          </Typography>
          <Typography variant="h5" component="div">
            {title}:
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Group size:
            {groupSize}
            <br />
            Duration:
            {duration}
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Trainer: NAME
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Subscribe</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Training;
