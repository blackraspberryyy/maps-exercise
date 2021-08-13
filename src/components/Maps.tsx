import React, { useState } from "react";
import useCookie from "react-use-cookie";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import AddRestaurantDialog from "./AddRestaurantDialog";
import { MapPin } from ".";
import { useEffect } from "react";
import { Restaurant } from "../types";
import { List, ListItem } from "rmwc";

const API_KEY = "AIzaSyCrWA0GMWAD5vVLl1z6fmwlNgQoTINGm34";

type MapsProps = {
  className?: string;
};

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const SideNav = styled.div`
  width: 500px;
  background: white;
`;

export function Maps(props: MapsProps) {
  const { className } = props;

  const [mapsApi, setMapApi] = useState<{
    map: any;
    maps: any;
    ref: Element | null;
  } | null>(null);
  const [restaurantDialog, setRestaurantDialog] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useCookie("restaurants", "[]");
  const [clickedLocation, setClickedLocation] =
    useState<GoogleMapReact.ClickEventValue | null>(null);

  const apiIsLoaded = (map: any, maps: any, ref: Element | null) => {
    setMapApi({ map, maps, ref });
  };

  const addRestaurant = (e: GoogleMapReact.ClickEventValue) => {
    setRestaurantDialog(true);
    setClickedLocation(e);
  };

  useEffect(() => {}, [restaurants]);

  return (
    <Container className={className}>
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: API_KEY,
            libraries: ["places", "geocoder"],
          }}
          center={
            (clickedLocation && {
              lat: clickedLocation.lat,
              lng: clickedLocation.lng,
            }) || {
              lat: 10.3005178,
              lng: 123.8861904,
            }
          }
          defaultZoom={14}
          onGoogleApiLoaded={({ map, maps, ref }) =>
            apiIsLoaded(map, maps, ref)
          }
          yesIWantToUseGoogleMapApiInternals
          onClick={addRestaurant}
        >
          {restaurants &&
            JSON.parse(restaurants).map((restaurant: any, index: number) => (
              <MapPin
                key={"restaurant-" + index}
                restaurant={restaurant}
                lat={restaurant.location.lat}
                lng={restaurant.location.lng}
              />
            ))}
        </GoogleMapReact>
      </MapContainer>
      <SideNav>
        <List>
          <ListItem>Cookies</ListItem>
          <ListItem>Pizza</ListItem>
          <ListItem>Icecream</ListItem>
        </List>
      </SideNav>
      <AddRestaurantDialog
        open={restaurantDialog}
        location={clickedLocation}
        mapsApi={mapsApi}
        onRegisterRestaurant={({
          name,
          specialty,
          address,
          location,
        }: Restaurant) => {
          // add restaurants to cookies
          const values = JSON.parse(restaurants);
          values.push({
            name,
            specialty,
            address,
            location: { lat: location?.lat, lng: location?.lng },
          });
          setRestaurants(JSON.stringify(values));
        }}
        onClose={() => {
          setRestaurantDialog(false);
        }}
      />
    </Container>
  );
}
