import { useEffect, useState } from "react";
// import { FaTeperature } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faDroplet,
  faWind,
  faCloud,
  faLocationDot,
  faEye,
  faGaugeHigh,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

export default function Weather() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [city, setCity] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setReport(null);
    if (city.trim() === "") {
      setError("Please Enter City");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setReport(null);
        return;
      }
      setError("");
      setReport(data);
    } catch (error) {
      setError("Invalid City");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-amber-500 font-bold text-3xl">
        Weather App
      </h1>

      <div>
        <form
          onSubmit={handleSubmit}
          className="text-center flex justify-center pt-4 gap-2 relative flex-col md:flex-row"
        >
          <input
            type="text"
            placeholder="Enter City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className=" p-2 border-2 border-amber-300 text-amber-300"
          />
          <p className="error absolute left-0 -bottom-5.5">{error}</p>
          <button
            type="submit"
            className="font-bold  bg-amber-300 p-2 rounded-lg md:w-50 cursor-pointer hover:bg-amber-500 "
          >
            Check
          </button>
        </form>
      </div>
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="w-10 h-10 border-4 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {report ? (
        <div className="text-center mt-4">
          <h3 className="text-amber-500  font-bold text-2xl">
            Weather Report for {report.location.name}
          </h3>
          <div className="weatherContainer mt-4">
            <p className="text-white mb-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="me-2 text-red-500"
              />
              <strong>Location:</strong> {report.location.name},{" "}
              {report.location.country}
            </p>

            <p className="text-white mb-2">
              <FontAwesomeIcon
                icon={faTemperatureThreeQuarters}
                className="me-2 text-orange-500"
              />
              <strong>Temperature:</strong> {report.current.temp_c}°C
            </p>

            <p className="text-white mb-2">
              <FontAwesomeIcon
                icon={faDroplet}
                className="me-2 text-blue-500"
              />
              <strong>Humidity:</strong> {report.current.humidity}%
            </p>

            <p className="text-white mb-2">
              <FontAwesomeIcon icon={faWind} className="me-2 text-gray-400" />
              <strong>Wind:</strong> {report.current.wind_kph} km/h
            </p>

            <p className="text-white mb-2">
              <FontAwesomeIcon icon={faCloud} className="me-2 text-slate-400" />
              <strong>Condition:</strong> {report.current.condition.text}
            </p>

            <p className="text-white mb-2">
              <FontAwesomeIcon icon={faEye} className="me-2 text-green-400" />
              <strong>Visibility:</strong> {report.current.vis_km} km
            </p>

            <p className="text-white mb-2">
              <FontAwesomeIcon
                icon={faGaugeHigh}
                className="me-2 text-yellow-400"
              />
              <strong>Pressure:</strong> {report.current.pressure_mb} mb
            </p>

            <p className="text-white mb-2">
              <FontAwesomeIcon
                icon={report.current.is_day ? faSun : faMoon}
                className="me-2 text-amber-400"
              />
              <strong>Time:</strong> {report.current.is_day ? "Day" : "Night"}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
