import { ClickEventValue } from "google-map-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
} from "rmwc";
import styled from "styled-components";
import { Restaurant } from "../types";

type AddRestaurantDialogProps = {
  location?: ClickEventValue | null;
  mapsApi?: {
    map: any;
    maps: any;
    ref: Element | null;
  } | null;
  onRegisterRestaurant: (restaurant: Restaurant) => void;
} & DialogProps;

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function AddRestaurantDialog(props: AddRestaurantDialogProps) {
  const [name, setName] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const { location, mapsApi, onRegisterRestaurant, ...rest } = props;

  useEffect(() => {
    async function geoCodeLocation() {
      if (mapsApi && location) {
        const GeoCoder = new mapsApi.maps.Geocoder();
        const { results } = await GeoCoder.geocode({
          location: {
            lat: location?.lat,
            lng: location?.lng,
          },
        });

        setAddress(results[0].formatted_address);
      }
    }

    geoCodeLocation();
  }, [location, location?.lat, location?.lng, mapsApi]);

  return (
    <>
      <Dialog {...rest}>
        <DialogTitle>Register Restaurant</DialogTitle>
        <DialogContent>
          <StyledFormContainer>
            <TextField
              name="name"
              label="Name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              outlined
              style={{ margin: 8 }}
            />
            <TextField
              name="specialty"
              label="Specialty"
              value={specialty}
              onChange={(e: any) => setSpecialty(e.target.value)}
              outlined
              style={{ margin: 8 }}
            />
            <p>
              <span>
                <strong>Address: </strong> {address}
              </span>
              <br />
            </p>
          </StyledFormContainer>
        </DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton
            action="accept"
            unelevated
            isDefaultAction
            onClick={() => {
              onRegisterRestaurant({ name, specialty, address, location });
            }}
          >
            Register
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
