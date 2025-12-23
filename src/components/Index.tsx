import { useLanguage } from "../providers/LanguageProvider";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

// MUI
import { Stack, Grid, Typography, Button, IconButton } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import ReplayIcon from "@mui/icons-material/Replay";

// Others
import moment from "moment";
import { useTranslation } from "react-i18next";

// Redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

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
  const weatherDispatch = useDispatch<AppDispatch>();
  const weatherData = useSelector((state: RootState) => state.weatherFetch);

  const { t, i18n } = useTranslation();
  const { language, dispatch } = useLanguage();

  const [data, setData] = useState<WeatherData>({
    temp: 0,
    status: "waiting",
    min: 0,
    max: 0,
    location: "waiting",
    icon: "",
  });

  const coord = { lat: 36.4, lon: 6.6 };
  const API_KEY = "f181a3674143297fdb556914376ca6bb";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`;

  const now = moment().format("DD/MM/YYYY");

  // ================= Reusable Request (PURE) =================
  const fetchWeather = useCallback(
    async (signal?: AbortSignal): Promise<WeatherData> => {
      const response = await axios.get(apiUrl, { signal });

      const icon = response.data.weather[0].icon;

      return {
        temp: Math.round(response.data.main.temp),
        status: response.data.weather[0].description,
        min: Math.round(response.data.main.temp_min),
        max: Math.round(response.data.main.temp_max),
        location: response.data.name,
        icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      };
    },
    [apiUrl]
  );

  // ================= Initial Load =================
  useEffect(() => {
    const controller = new AbortController();

    fetchWeather(controller.signal)
      .then(setData)
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.error("Request Error:", err);
      });

    return () => controller.abort();
  }, [fetchWeather]);

  const handleLanguageButtonClick = () => {
    dispatch({ type: "setLanguage" });
    i18n.changeLanguage(language.name === "العربية" ? "en" : "ar");
  };

  return (
    <div className="background" dir={language.direction}>
      {/* Buttons */}
      <div className="buttons">
        <IconButton
          aria-label={t("common.reload")}
          onClick={() => fetchWeather().then(setData)}
        >
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
            <h1 className="cityTitle">
              {data.location === "waiting"
                ? t("common.waiting")
                : data.location}
            </h1>
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
              {data.icon && (
                <img src={data.icon} alt="weather" className="degreeIcon" />
              )}
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
