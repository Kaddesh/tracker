import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/map.scss';

// Import your red marker icon
import blackMarkerIcon from '../../image/marker-32.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: blackMarkerIcon,
  shadowUrl: markerShadow,
  iconSize: [40, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = ({ lat, lng }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>
          IP Location
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;




/* 
import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "./map/map";
import { MdKeyboardArrowRight } from "react-icons/md";
import '../styles/home.scss';

const Home = () => {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLocation = async (ip) => {
    try {
      const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_MZucrv2azzy8o4ztDia6AUy6jY7eZ&ipAddress=${ip}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch location data:", error);
    }
  };

  useEffect(() => {
    const fetchInitialIP = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const userIP = response.data.ip;
        const locationData = await fetchLocation(userIP);
        setLocation(locationData);
      } catch (error) {
        console.error("Failed to fetch user's IP address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialIP();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await fetchLocation(ip);
      setLocation(data);
    } catch (error) {
      console.error("Failed to fetch location data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="search-background">
        <h1>IP Address Tracker</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Search for any IP address or domain"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : <MdKeyboardArrowRight />}
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
            <div>
              <p>LOCATION</p>
              <h3>
                {location.location.city}, {location.location.region},{" "}
                {location.location.country}
              </h3>
            </div>
            <div>
              <p>TIMEZONE</p>
              <h3>{location.location.timezone}</h3>
            </div>
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

*/
