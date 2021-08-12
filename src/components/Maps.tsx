import GoogleMapReact from "google-map-react";
import React from "react";
import styled from "styled-components";
import { MapPin } from ".";

type MapsProps = {
  className?: string;
};

const Container = styled.div`
  border: 1px solid red;
  width: 500px;
  height: 500px;
`;

export function Maps(props: MapsProps) {
  const { className } = props;
  const API_KEY = "AIzaSyCrWA0GMWAD5vVLl1z6fmwlNgQoTINGm34";
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  };

  return (
    <Container className={className}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={location}
        defaultZoom={15}
      >
        <MapPin lat={location.lat} lng={location.lng} text={location.address} />
      </GoogleMapReact>
    </Container>
  );
}
