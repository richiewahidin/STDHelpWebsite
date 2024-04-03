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
            // service.findPlaceFromQuery(request, function (place, status) {
            //   if (status === google.maps.places.PlacesServiceStatus.OK) {
            //   }
            // });
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
          <strong>{name}</strong>
        </h5>
        <p>
          <strong>Address: </strong> {address}
        </p>
        <p>
          <strong>Website: </strong> {website}
        </p>
        <p>
          <strong>Phone: </strong>
          {phonenumber}
        </p>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(Card);

