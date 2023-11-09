import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [weatherData, setWeatherData] = useState();

  const getWeather = async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=37.5612533&lon=126.7985384&appid=f9cd232dbbb4ca1f4cf80eb8468af216"
    );

    setWeatherData(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="bg-purple-100">
      {weatherData ? (
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        />
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
};

export default App;
