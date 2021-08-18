import React, { useState } from "react";
import { IconButton, Menu, MenuSurfaceAnchor, Typography } from "rmwc";
import styled from "styled-components";
import { Restaurant } from "../../types";
import NumberInput from "../NumberInput";

type MapPinProps = {
  restaurant: Restaurant;
  lat: number;
  lng: number;
  onDirectionClick: (restaurant: Restaurant) => void;
  onVisitChange?: (visits: number, placeId: string) => void;
};

const Container = styled.div`
  margin-left: -24px;
  margin-top: -36px;
`;

const TextContainer = styled.div`
  width: 250px;
  background: white;
  border-radius: 3px;
  padding: 8px;
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
`;

const VisitContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

export function MapPin(props: MapPinProps) {
  const { restaurant, onDirectionClick, onVisitChange } = props;

  const [menu, setMenu] = useState<boolean>(false);
  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <MenuSurfaceAnchor>
        <Menu open={menu} onClose={() => setMenu(false)}>
          <TextContainer>
            <MenuHeader>
              <Typography use="headline6">{restaurant.name}</Typography>
              <div style={{ flex: 1 }} />
              <IconButton
                icon="assistant_direction"
                onClick={() => {
                  onDirectionClick(restaurant);
                  setMenu(false);
                }}
              />
              <IconButton icon="close" onClick={() => setMenu(false)} />
            </MenuHeader>
            <VisitContainer>
              <NumberInput
                value={restaurant.visits || 0}
                onValueChange={(visits: number) => {
                  if (onVisitChange) {
                    return onVisitChange(visits, restaurant.placeId);
                  }
                }}
              />
              <Typography use="subtitle2" style={{ marginRight: 8 }}>
                Visits:{" "}
              </Typography>
            </VisitContainer>
            <hr />
            {restaurant.specialties && restaurant.specialties.length > 0 && (
              <>
                <Typography use="subtitle2">
                  Specialty: {restaurant.specialties.join(", ")}
                </Typography>
                <br />
              </>
            )}

            <Typography use="caption" style={{ paddingTop: 16 }}>
              {restaurant.address}
            </Typography>
          </TextContainer>
        </Menu>
        <IconButton
          icon="place"
          style={{ color: "#ea4335" }}
          onClick={(e) => {
            e.stopPropagation();
            setMenu(!menu);
          }}
        />
      </MenuSurfaceAnchor>
    </Container>
  );
}
