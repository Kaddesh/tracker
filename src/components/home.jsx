import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "./map/map";
import IPFetcher from "./utils/fetch";
import { MdKeyboardArrowRight } from "react-icons/md";
import '../styles/home.scss';

const Home = () => {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userIP, setUserIP] = useState(""); 
  const [placeholder, setPlaceholder] = useState("Search for any IP address or domain"); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPlaceholder(userIP); 
      } else {
        setPlaceholder("Search for any IP address or domain");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [userIP]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_AsnkcIneYJoEbA2beua0m1ANVIiOK&ipAddress=${ip}`);
      const data = response.data;
      setLocation(data);
    } catch (error) {
      console.error("Failed to fetch location data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <IPFetcher setLocation={setLocation} setUserIP={setUserIP} setLoading={setLoading} />
      <div className="search-background">
        <h1>IP Address Tracker</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder={placeholder}
            className="ip-input"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : <MdKeyboardArrowRight className="arrow-icon" />}
          </button>
        </form>
      </div>

      {location && (
        <div className="bar-map">
          <Map lat={location.location.lat} lng={location.location.lng} />
          <div className="details-bar">
            <div>
              <p>IP ADDRESS</p>
              <h3>{location.ip}</h3>
            </div>

            <hr />
            <div>
              <p>LOCATION</p>
              <h3>
                {location.location.city}, {location.location.region},{" "}
                {location.location.country}
              </h3>
            </div>
            <hr />
            <div>
              <p>TIMEZONE</p>
              <h3>{location.location.timezone}</h3>
            </div>
            <hr />
            <div>
              <p>ISP</p>
              <h3>{location.isp}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
