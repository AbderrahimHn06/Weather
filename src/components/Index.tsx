import { useLanguage } from "../providers/LanguageProvider";
import { useEffect } from "react";

// MUI
import { Stack, Typography, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import CloudIcon from "@mui/icons-material/Cloud";
import ReplayIcon from "@mui/icons-material/Replay";
import LinearProgress from "@mui/material/LinearProgress";

// Others
import moment from "moment";
import { useTranslation } from "react-i18next";

// Redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchWeatherData, type WeatherData } from "../store/slices/apiSlice";

export default function Index() {
  const weatherDispatch = useDispatch<AppDispatch>();
  const data: WeatherData = useSelector(
    (state: RootState) => state.weatherFetch
  );

  const { t, i18n } = useTranslation();
  const { language, dispatch } = useLanguage();

  const now = moment().format("DD/MM/YYYY");

  useEffect(() => {
    weatherDispatch(fetchWeatherData());
  }, [weatherDispatch]);

  const handleLanguageButtonClick = () => {
    dispatch({ type: "setLanguage" });
    i18n.changeLanguage(language.name === "العربية" ? "en" : "ar");
  };

  return (
    <div className="background" dir={language.direction}>
      {data.loading && (
        <LinearProgress
          sx={{ position: "fixed", top: 0, left: 0, width: "100%" }}
        />
      )}

      {/* Buttons */}
      <div className="buttons" dir="rtl">
        <IconButton onClick={() => weatherDispatch(fetchWeatherData())}>
          <ReplayIcon />
        </IconButton>

        <Button variant="contained" onClick={handleLanguageButtonClick}>
          {language.name}
        </Button>
      </div>

      <Stack className="weatherCard" spacing={3}>
        {/* Header */}
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography className="cityTitle">
              {data.location === "waiting"
                ? t("common.waiting")
                : data.location}
            </Typography>
          </Grid>

          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ textAlign: { xs: "left", md: "right" } }}
          >
            <Typography className="dateText">{now}</Typography>
          </Grid>
        </Grid>

        <hr className="divider" />

        {/* Body */}
        <div className="weatherCardBody">
          <Stack spacing={2}>
            <div className="degree">
              <Typography className="degreeValue">{data.temp}°</Typography>

              {data.icon && (
                <img src={data.icon} alt="weather" className="degreeIcon" />
              )}
            </div>

            <Typography className="weatherStatus">
              {data.status === "waiting"
                ? t("weather.status.waiting")
                : data.status}
            </Typography>

            <div className="lines">
              <Typography className="line">
                {t("weather.min")} : {data.min}
              </Typography>
              <Typography className="line">
                {t("weather.max")} : {data.max}
              </Typography>
            </div>
          </Stack>

          <CloudIcon className="cloudIcon" />
        </div>
      </Stack>
    </div>
  );
}
