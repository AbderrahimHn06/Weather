import { Stack, Grid, Typography, Button, IconButton } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import ReplayIcon from "@mui/icons-material/Replay";

export default function Index() {
  return (
    <div className="background">
      <div className="buttons">
        <IconButton aria-label="reload">
          <ReplayIcon />
        </IconButton>
        <Button variant="contained">English</Button>
      </div>
      <Stack direction="column" spacing={2} className="weatherCard">
        {/* Heading */}
        <Grid container spacing={4}>
          <Grid size={8} className="cityGrid">
            <h1 className="cityTitle">وهران</h1>
          </Grid>
          <Grid size={4} className="dateGrid">
            <Typography variant="h5" className="dateText">
              17/12/2025
            </Typography>
          </Grid>
        </Grid>
        <hr />
        <div className="weatherCardBody">
          {/* Rhs */}
          <Stack className="rhs" direction="column" spacing={2}>
            {/* degree */}
            <div className="degree">
              <Typography variant="h3" className="degreeValue">
                38°
              </Typography>
              <CloudIcon className="degreeIcon" />
            </div>
            {/* status */}
            <Typography variant="h4" className="weatherStatus">
              broken clouds
            </Typography>
            {/* lines */}

            <div className="lines">
              <Typography variant="h5" className="line">
                الصغرى : <span>38</span>
              </Typography>
              <Typography variant="h5" className="line">
                الكبرى : <span>38</span>
              </Typography>
            </div>
          </Stack>

          {/* Lhs */}
          <CloudIcon className="cloudIcon" />
        </div>
      </Stack>
    </div>
  );
}
