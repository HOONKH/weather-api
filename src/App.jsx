import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaCertificate,
  FaCloud,
  FaCloudBolt,
  FaCloudMeatball,
  FaCloudShowersHeavy,
  FaCloudSun,
  FaCloudSunRain,
  FaEyeLowVision,
} from "react-icons/fa6";

const weatherIcon = {
  "01": {
    textColor: "text-orange-400",
    icon: <FaCertificate size={100} />,
  },
  "02": {
    textColor: "text-gray-600",
    icon: <FaCloudSun size={100} />,
  },
  "03": {
    textColor: "text-purple-400",
    icon: <FaCloud size={100} />,
  },
  "04": {
    textColor: "text-purple-700",
    icon: <FaCloud size={100} />,
  },
  "09": {
    textColor: "text-blue-400",
    icon: <FaCloudShowersHeavy size={100} />,
  },
  10: {
    textColor: "text-amber-300",
    icon: <FaCloudSunRain size={100} />,
  },
  11: {
    textColor: "text-blue-600",
    icon: <FaCloudBolt size={100} />,
  },
  13: {
    textColor: "text-blue-200",
    icon: <FaEyeLowVision size={100} />,
  },
  50: {
    textColor: "text-purple-200",
    icon: <ri RiFO size={100} />,
  },
};

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLonggitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLonggitude(position.coords.longitude);
    });
  };

  const getWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f9cd232dbbb4ca1f4cf80eb8468af216&units=metric`
    );

    setWeatherData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;
    getWeather();
  }, [latitude, longitude]);

  return (
    <div className="bg-purple-100 min-h-screen flex flex-col justify-center items-center text-2xl">
      {weatherData ? (
        <div
          className={`flex items-center flex-col gap-4 ${
            weatherIcon[weatherData.weather[0].icon.substring(0, 2)].textColor
          }`}
        >
          {weatherIcon[weatherData.weather[0].icon.substring(0, 2)].icon}
          <div>
            {weatherData.name},{weatherData.main.temp}
          </div>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default App;
