import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { usePosition } from "use-position";
import { Button, CircularProgress, Typography } from "rmwc";
import { Restaurant } from "../../types";
import { MapPin } from ".";
import AddRestaurantDialog from "../AddRestaurantDialog";

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

const NotesContainer = styled.div`
  padding: 16px;
`;

export function Maps(props: MapsProps) {
  const { className } = props;

  const [mapsApi, setMapApi] = useState<GoogleMapsApiType | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [plotMode, setPlotMode] = useState<boolean>(false);
  const [restaurantDialog, setRestaurantDialog] = useState<boolean>(false);
  const [clickedLocation, setClickedLocation] =
    useState<GoogleMapReact.ClickEventValue | null>(null);
  const [isShowRestaurantLoading, setIsShowRestaurantLoading] =
    useState<boolean>(false);
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

  const addRestaurant = (e: GoogleMapReact.ClickEventValue) => {
    if (plotMode) {
      setRestaurantDialog(true);
      setClickedLocation(e);
    }
  };

  const showRestaurants = async () => {
    if (mapsApi && mapsApi.maps && PlacesService) {
      const { maps } = mapsApi;
      setIsShowRestaurantLoading(true);

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
                ...res,
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
          setRestaurants([...restaurants, ...results]);
          setIsShowRestaurantLoading(false);
        }
      );
    }
  };

  const drawPolygon = () => {
    setPlotMode(false);
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
        maps.event.addListener(
          drawingManager,
          "overlaycomplete",
          function (event: any) {
            const bounds = event.overlay.getBounds();

            const isWithinBounds = (latLng: any) => {
              switch (event.type) {
                case "circle": {
                  const circle = event.overlay;
                  return (
                    bounds.contains(latLng) &&
                    maps.geometry.spherical.computeDistanceBetween(
                      circle.getCenter(),
                      latLng
                    ) <= circle.getRadius()
                  );
                }

                case "rectangle": {
                  const rectangle = event.overlay;
                  return rectangle.getBounds().contains(latLng);
                }
              }
            };

            const boundedRestaurants = restaurants.filter((res) =>
              isWithinBounds(
                new mapsApi.maps.LatLng(res.location.lat, res.location.lng)
              )
            );

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
                      ...res,
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
                setRestaurants([...boundedRestaurants, ...results]);

                // Remove Shape overlay
                event.overlay.setMap(null);
              }
            );
          }
        );
      } else {
        drawingManager.setMap(null);
      }
    }
  }, [
    drawMode,
    mapsApi,
    mapsApi?.map,
    mapsApi?.maps,
    drawingManager,
    PlacesService,
    restaurants,
  ]);

  return (
    <Container className={className}>
      <MapContainer>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: API_KEY,
            libraries: ["places", "drawing", "geometry"],
          }}
          defaultZoom={14}
          center={
            (clickedLocation && {
              lat: clickedLocation.lat,
              lng: clickedLocation.lng,
            }) ||
            CEBU_COORDINATE
          }
          onGoogleApiLoaded={(api: GoogleMapsApiType) => apiIsLoaded(api)}
          yesIWantToUseGoogleMapApiInternals
          onClick={addRestaurant}
          layerTypes={["TrafficLayer"]}
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
        <Button
          unelevated={!plotMode}
          style={{ margin: 8 }}
          onClick={() => {
            setDrawMode(false);
            setPlotMode(!plotMode);
          }}
        >
          {plotMode ? "Turn Off " : ""}Plotting Restaruants
        </Button>
        {plotMode && (
          <Typography use="caption" style={{ textAlign: "center" }}>
            To start plotting a restaurant, click anywhere on the map
          </Typography>
        )}
        <Button
          unelevated
          disabled={isShowRestaurantLoading}
          style={{ margin: 8 }}
          onClick={showRestaurants}
          icon={isShowRestaurantLoading && <CircularProgress />}
        >
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
        <NotesContainer>
          <h5>Notes:</h5>
          <ul>
            <li>
              To get directions, click any restaurants, and click the direction
              icon. <br />
              You should allow the your browser to access your location first
              for the Directions to work.
            </li>
            <li>
              There are no configured database for this project so plotted
              restaurants are not persisted anywhere.
            </li>
          </ul>
        </NotesContainer>
        <Button
          style={{ margin: 8 }}
          onClick={() => {
            DirectionsRenderer.setMap(null);
          }}
        >
          Clear any existing Directions Overlay
        </Button>
      </SideNav>
      <AddRestaurantDialog
        open={restaurantDialog}
        location={clickedLocation}
        mapsApi={mapsApi}
        onRegisterRestaurant={(restaurant: Restaurant) => {
          setRestaurants([...restaurants, restaurant]);
        }}
        onClose={() => {
          setRestaurantDialog(false);
        }}
      />
    </Container>
  );
}
