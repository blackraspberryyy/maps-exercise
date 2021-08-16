import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { usePosition } from "use-position";
import { Button } from "rmwc";
import { Restaurant } from "../../types";
import { MapPin } from ".";

const API_KEY = "AIzaSyCrWA0GMWAD5vVLl1z6fmwlNgQoTINGm34";

const CEBU_COORDINATE = {
  lat: 10.3005178,
  lng: 123.8861904,
};

type GoogleMapsApiType = {
  map: any;
  maps: any;
  ref: Element | null;
};

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
  display: flex;
  flex-direction: column;
`;

export function Maps(props: MapsProps) {
  const { className } = props;

  const [mapsApi, setMapApi] = useState<GoogleMapsApiType | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [drawMode, setDrawMode] = useState<boolean>(false);
  const [PlacesService, setPlacesService] = useState<any>();
  const [DirectionsService, setDirectionsService] = useState<any>();
  const [DirectionsRenderer, setDirectionsRenderer] = useState<any>();
  const [drawingManager, setDrawingManager] = useState<any>();
  const { latitude, longitude } = usePosition(true);

  const apiIsLoaded = (api: GoogleMapsApiType) => {
    setMapApi(api);

    if (api && api.map && api.maps) {
      const { map, maps } = api;

      // Set PlacesService
      setPlacesService(new maps.places.PlacesService(map));

      // Set DirectionsService
      setDirectionsService(new maps.DirectionsService());

      // Set DirectionsRenderer
      setDirectionsRenderer(new maps.DirectionsRenderer());

      // set DrawingManger
      setDrawingManager(
        new maps.drawing.DrawingManager({
          drawingMode: maps.drawing.OverlayType.CIRCLE,
          drawingControl: true,
          drawingControlOptions: {
            position: maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              maps.drawing.OverlayType.CIRCLE,
              maps.drawing.OverlayType.RECTANGLE,
            ],
          },
        })
      );
    }
  };

  const showRestaurants = async () => {
    if (mapsApi && mapsApi.maps && PlacesService) {
      const { maps } = mapsApi;

      PlacesService.textSearch(
        {
          query: "Restaurants in Cebu City",
          type: "restaurant",
        },
        function (response: any, status: any) {
          let results: any[] = [];
          if (status === maps.places.PlacesServiceStatus.OK) {
            response.forEach((res: any) => {
              results.push({
                address: res.formatted_address,
                name: res.name,
                location: {
                  lat: res.geometry.location.lat(),
                  lng: res.geometry.location.lng(),
                },
                placeId: res.place_id,
              });
            });
          }
          setRestaurants(results);
        }
      );
    }
  };

  const drawPolygon = () => {
    setDrawMode(!drawMode);
  };

  const showRoute = (restaurant: Restaurant) => {
    if (mapsApi && mapsApi.maps && mapsApi.map) {
      DirectionsRenderer.setMap(mapsApi.map);
      const origin = new mapsApi.maps.LatLng(latitude, longitude);
      const destination = new mapsApi.maps.LatLng(
        restaurant.location.lat,
        restaurant.location.lng
      );
      const travelMode = "DRIVING";
      const request = { origin, destination, travelMode };

      DirectionsService.route(request, function (response: any, status: any) {
        if (status === "OK") {
          DirectionsRenderer.setDirections(response);
        }
      });
    }
  };

  useEffect(() => {
    if (drawingManager && mapsApi && mapsApi.map && mapsApi.maps) {
      const { map, maps } = mapsApi;

      if (drawMode) {
        drawingManager.setMap(map);
      } else {
        drawingManager.setMap(null);
      }

      maps.event.addListener(
        drawingManager,
        "overlaycomplete",
        function (overlay: any) {
          const bounds = overlay.overlay.getBounds();

          PlacesService.textSearch(
            {
              type: "restaurant",
              bounds,
            },
            function (response: any, status: any) {
              let results: any[] = [];
              if (status === maps.places.PlacesServiceStatus.OK) {
                response.forEach((res: any) => {
                  results.push({
                    address: res.formatted_address,
                    name: res.name,
                    location: {
                      lat: res.geometry.location.lat(),
                      lng: res.geometry.location.lng(),
                    },
                  });
                });
              }
              setRestaurants(results);

              // Remove Shape overlay
              overlay.overlay.setMap(null);
            }
          );
        }
      );
    }
  }, [
    drawMode,
    mapsApi,
    mapsApi?.map,
    mapsApi?.maps,
    drawingManager,
    PlacesService,
  ]);

  return (
    <Container className={className}>
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: API_KEY,
            libraries: ["places", "drawing"],
          }}
          center={CEBU_COORDINATE}
          defaultZoom={14}
          onGoogleApiLoaded={(api: GoogleMapsApiType) => apiIsLoaded(api)}
          yesIWantToUseGoogleMapApiInternals
        >
          {restaurants &&
            restaurants.map((restaurant: any, index: number) => (
              <MapPin
                key={"restaurant-" + index}
                restaurant={restaurant}
                lat={restaurant.location.lat}
                lng={restaurant.location.lng}
                onDirectionClick={showRoute}
              />
            ))}
        </GoogleMapReact>
      </MapContainer>
      <SideNav>
        <Button unelevated style={{ margin: 8 }} onClick={showRestaurants}>
          Show Restaurants in Cebu
        </Button>
        <Button
          unelevated={!drawMode}
          style={{ margin: 8 }}
          onClick={drawPolygon}
        >
          {!drawMode ? "Draw Polygon" : "Toggle off Draw Mode"}
        </Button>
        <div style={{ flex: 1 }}></div>
        <Button
          danger
          style={{ margin: 8 }}
          onClick={() => {
            DirectionsRenderer.setMap(null);
          }}
        >
          Remove any existing Directions Overlay
        </Button>
      </SideNav>
    </Container>
  );
}
