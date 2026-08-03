import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [report, setReport] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=8d97f96e75e442eba17102616260308&q=${city}`,
      );

      const data = await response.json();
      setReport(data);
      console.log(report);
    } catch (error) {
      console.log(error);
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
          <p className="error absolute left-0 -bottom-5.5"></p>
          <button
            type="submit"
            className="font-bold  bg-amber-300 p-2 rounded-lg md:w-50 cursor-pointer hover:bg-amber-500 "
          >
            Check
          </button>
        </form>
      </div>

      {report && (
        <div className="text-center mt-4">
          <h3 className="text-amber-500 font-12">Weather Report for {city}</h3>
          <p className="text-white">
            HUMIDITY: <span>{[report.current.humidity]}</span>
          </p>
          <p className="text-white transform-upper">
            Temperature: <span>{report.current.temp_c}°C</span>
          </p>
          <p className="text-white transform-upper">
            Condition: <span>{report.current.condition.text}</span>
          </p>
        </div>
      )}
    </>
  );
}
