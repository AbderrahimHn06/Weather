import { useLanguage } from "../providers/LanguageProvider";
import { useEffect, useState } from "react";
import axios from "axios";

// MUI
import { Stack, Grid, Typography, Button, IconButton } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import ReplayIcon from "@mui/icons-material/Replay";

// Others
import moment from "moment";
import { useTranslation } from "react-i18next";

// ================= Types =================
type WeatherData = {
  temp: number;
  status: string;
  min: number;
  max: number;
  location: string;
  icon: string;
};

export default function Index() {
  const { t, i18n } = useTranslation();
  const { language, dispatch } = useLanguage();

  const initialData: WeatherData = {
    temp: 0,
    status: "waiting",
    min: 0,
    max: 0,
    location: t("common.waiting"),
    icon: "https://www.kindpng.com/picc/m/64-647012_png-example-transparent-png.png",
  };

  const [data, setData] = useState<WeatherData>(initialData);

  const coord = {
    lat: 36.4,
    lon: 6.6,
  };

  const API_KEY = "f181a3674143297fdb556914376ca6bb";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`;

  const now = moment().format("DD/MM/YYYY");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(apiUrl, { signal: controller.signal })
      .then((response) => {
        const icon = response.data.weather[0].icon;

        setData({
          temp: Math.round(response.data.main.temp),
          status: response.data.weather[0].description,
          min: Math.round(response.data.main.temp_min),
          max: Math.round(response.data.main.temp_max),
          location: response.data.name,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        });
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        console.error("Request Error:", err);
      });

    return () => controller.abort();
  }, [apiUrl]);

  const handleLanguageButtonClick = () => {
    dispatch({ type: "setLanguage" });
    i18n.changeLanguage(language.name === "العربية" ? "en" : "ar");
  };

  return (
    <div className="background" dir={language.direction}>
      {/* Buttons */}
      <div className="buttons" dir="rtl">
        <IconButton aria-label={t("common.reload")}>
          <ReplayIcon />
        </IconButton>
        <Button variant="contained" onClick={handleLanguageButtonClick}>
          {language.name}
        </Button>
      </div>

      <Stack direction="column" spacing={2} className="weatherCard">
        {/* Heading */}
        <Grid container spacing={4}>
          <Grid size={8} className="cityGrid">
            <h1 className="cityTitle">{data.location}</h1>
          </Grid>
          <Grid size={4} className="dateGrid">
            <Typography variant="h5" className="dateText">
              {now}
            </Typography>
          </Grid>
        </Grid>

        <hr />

        <div className="weatherCardBody">
          {/* RHS */}
          <Stack className="rhs" direction="column" spacing={2}>
            <div className="degree">
              <Typography variant="h3" className="degreeValue">
                {data.temp}°
              </Typography>
              <img src={data.icon} alt="weather" className="degreeIcon" />
            </div>

            <Typography variant="h4" className="weatherStatus">
              {data.status === "waiting"
                ? t("weather.status.waiting")
                : data.status}
            </Typography>

            <div
              className="lines"
              style={
                language.direction === "rtl" ? { right: 24 } : { left: 24 }
              }
            >
              <Typography variant="h5" className="line">
                {t("weather.min")} : <span>{data.min}</span>
              </Typography>
              <Typography variant="h5" className="line">
                {t("weather.max")} : <span>{data.max}</span>
              </Typography>
            </div>
          </Stack>

          {/* LHS */}
          <CloudIcon className="cloudIcon" />
        </div>
      </Stack>
    </div>
  );
}
