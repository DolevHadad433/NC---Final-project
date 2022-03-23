import React from "react";
import { useUsersContext, Actions } from "../../../../contexts/UsersContext";
import Button from "@mui/material/Button";
import { borderRadius, width } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";

function ScheduledTraining({
  _id,
  title,
  category,
  description,
  duration,
  groupSize,
}) {
  return (
    <div>
      <Card
        sx={{ minWidth: 450, marginBottom: 1, marginLeft: 10, marginTop: 2 }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {category}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {duration}
            <br />
            {groupSize}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Trainer: NAME
          </Typography>
        </CardContent>
        <CardActions>
          <Container>
            <Grid container direction="row-reverse">
              <Grid item sm={2} sx={{ marginBottom: 2, marginRight: 5 }}>
                <Button size="small" variant="contained">
                  Unsubscribe
                </Button>
              </Grid>
            </Grid>
          </Container>
        </CardActions>
      </Card>
    </div>
  );
}

export default ScheduledTraining;
