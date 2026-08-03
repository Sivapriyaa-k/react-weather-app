import { useEffect, useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (city.trim() === "") {
      setError("Please Enter City");
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=8d97f96e75e442eba17102616260308&q=${city}`,
      );

      const data = await response.json();

      if (data.error) {
        console.log(data);
        setError(data.error.message);
        setReport(null);
        return;
      }
      setError("");
      setReport(data);

      console.log(report);
    } catch (error) {
      setError("Invalid City");
      console.log(error);
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
          <div className="w-12 h-12 border-4 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {report ? (
        <div className="text-center mt-4">
          <h3 className="text-amber-500  font-bold text-xl">
            Weather Report for {report.location.name}
          </h3>
          <p className="text-white">
            HUMIDITY: <span>{report.current.humidity}</span>
          </p>
          <p className="text-white transform-upper">
            Temperature: <span>{report.current.temp_c}°C</span>
          </p>
          <p className="text-white transform-upper">
            Condition: <span>{report.current.condition.text}</span>
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
