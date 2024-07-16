// src/components/IPFetcher.js
import { useEffect } from "react";
import axios from "axios";

const IPFetcher = ({ setLocation, setUserIP, setLoading }) => {
  const fetchLocation = async (ip) => {
    try {
      const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_AsnkcIneYJoEbA2beua0m1ANVIiOK&ipAddress=${ip}`);
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
        const userIpAddress = response.data.ip;
        setUserIP(userIpAddress);
        const locationData = await fetchLocation(userIpAddress);
        setLocation(locationData);
      } catch (error) {
        console.error("Failed to fetch user's IP address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialIP();
  }, [setLocation, setUserIP, setLoading]);

  return null;
};

export default IPFetcher;
