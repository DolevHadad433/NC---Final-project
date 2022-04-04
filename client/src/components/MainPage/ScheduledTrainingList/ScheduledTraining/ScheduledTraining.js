//============ Imports start ============
import React from "react";
import { useUsersContext, Actions } from "../../../../contexts/UsersContext";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
//============ Imports end ============

//============ Component start ============
function ScheduledTraining({ scheduled, unsubscribeScheduledTraining }) {
  return (
    <div>
      <Card
        sx={{ minWidth: 450, marginBottom: 1, marginLeft: 5, marginTop: 2 }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {scheduled.trainingInfo.category}
          </Typography>
          <Typography variant="h5" component="div">
            {scheduled.trainingInfo.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {scheduled.trainingInfo.duration}
            <br />
            {scheduled.trainingInfo.groupSize}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Trainer: NAME
          </Typography>
        </CardContent>
        <CardActions>
          <Container>
            <Grid container direction="row-reverse">
              <Grid item sm={2} sx={{ marginBottom: 2, marginRight: 5 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    unsubscribeScheduledTraining(scheduled._id);
                  }}
                >
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
//============ Component end ============

export default ScheduledTraining;
