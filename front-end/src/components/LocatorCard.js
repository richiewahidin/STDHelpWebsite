import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const Card = ({
  google,
  id,
  name,
  address,
  website,
  phonenumber,
  imageUrl,
  searchTerm,
}) => {
  const nav = useNavigate();
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const location = useLocation();
  const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchCoordinates = async () => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setCoordinates({ lat: lat(), lng: lng() });
          if (mapRef.current) {
            const service = new google.maps.places.PlacesService(
              mapRef.current.map,
            );
            var request = {
              query: name + " , " + results[0].formatted_address,
              fields: [
                "name",
                "formatted_address",
                "business_status",
                "photos",
              ],
            };
          }
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status,
          );
        }
      });
    };

    fetchCoordinates();
  }, []);

  const handleClick = () => {
    nav(`/locator/${id}`, {
      state: { id, name, address, website, phonenumber },
    });
  };

// Function to highlight the matched search term
const highlightMatch = (text) => {
  if (!searchTerm) return text;

  // Split the searchTerm into words and trim spaces
  const searchWords = searchTerm.toLowerCase().split(" ").map(word => word.trim()).filter(word => word !== "");

  // Create a regex pattern for each word
  const patterns = searchWords.map(word => `(${word})`).join("|");
  const regex = new RegExp(patterns, "gi");

  // Replace each match with <mark> tag
  return text.replace(regex, (match) => `<mark>${match}</mark>`);
};


  return (
    <div onClick={handleClick} className="card">
      <div className="card-content">
        <div
          id="map"
          style={{ position: "relative", width: "100%", height: "300px" }}
        >
          <Map
            google={google}
            zoom={15}
            center={coordinates}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            ref={mapRef}
          >
            <Marker position={coordinates} />
          </Map>
        </div>
        <h5>
          <strong dangerouslySetInnerHTML={{ __html: highlightMatch(name) }} />
        </h5>
        <p>
          <strong>Address: </strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: highlightMatch(address) }} />
        </p>
        <p>
          <strong>Website: </strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: highlightMatch(website) }} />
        </p>
        <p>
          <strong>Phone: </strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: highlightMatch(phonenumber) }} />
        </p>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(Card);
