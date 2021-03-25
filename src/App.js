import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';

function App() {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      }, function () {
        alert("Allow location access to continue.");
      });

      console.log("Latitude is:", lat);
      console.log("Longitude is:", long);

      if (lat !== undefined && long !== undefined) {
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`, {
          method: "GET",
        }).then(res => res.json())
          .then(result => {
            setData(result)
            console.log(result);
            console.log("data: " + data);
          });
      }
    }
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
