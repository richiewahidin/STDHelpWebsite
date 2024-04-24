import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const LocatorInstance = ({ google }) => {
  const location = useLocation();
  const { name, website, address, phonenumber } = location.state;
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [placeDetails, setPlaceDetails] = useState();
  const mapRef = useRef(null);
  const key = process.env.REACT_APP_API_KEY;
  const locatorInstance = {
    name: name,
    address: address,
    website: website,
    phonenumber: phonenumber,
  };

  const handleMapClick = (event) => {
    event.preventDefault();
    window.location.href = placeDetails.url;
  };

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
                "opening_hours",
                "rating",
                "user_ratings_total",
              ],
            };
            service.findPlaceFromQuery(request, function (place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                setPlaceDetails(place);
              }
            });
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

  useEffect(() => {
    console.log("Coordinates updated:", coordinates);
  }, [coordinates]);

  useEffect(() => {
    if (placeDetails && placeDetails.length > 0) {
      console.log("placeDetails updated:", placeDetails[0]);
    }
  }, [placeDetails]);

  return (
    <Container className="container" style={{ flexDirection: "column" }}>
      <Card className="Intro" style={{ marginBottom: "20px" }}>
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Text>Address: {address}</Card.Text>
          {/* Google Map Component */}
          <div
            id="map"
            style={{ position: "relative", width: "100%", height: "300px" }}
          >
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleMapClick}
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
            </a>
          </div>
          <Card.Text>Phone Number: {phonenumber}</Card.Text>
          <Card.Text>Website: {website}</Card.Text>
          <Card.Text>Status: {placeDetails && placeDetails.length > 0 && placeDetails[0].business_status}</Card.Text>
          <Card.Text>rating: {placeDetails && placeDetails.length > 0 && placeDetails[0].rating}</Card.Text>
          <Card.Text>total ratings: {placeDetails && placeDetails.length > 0 && placeDetails[0].user_ratings_total}</Card.Text>
          <div>
            <Card.Text>Images:</Card.Text>
            {placeDetails &&
            placeDetails.length > 0 &&
            placeDetails[0].photos ? (
              placeDetails[0].photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.getUrl()}
                  alt={`Place ${index + 1}`}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    marginRight: "10px",
                  }}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(LocatorInstance);
