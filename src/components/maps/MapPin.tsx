import React, { useState } from "react";
import { IconButton, Menu, MenuSurfaceAnchor, Typography } from "rmwc";
import styled from "styled-components";
import { Restaurant } from "../../types";

type MapPinProps = {
  restaurant: Restaurant;
  lat: number;
  lng: number;
  onDirectionClick: (restaurant: Restaurant) => void;
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
  align-items: stretch;
  justify-content: stretch;
`;

export function MapPin(props: MapPinProps) {
  const { restaurant, onDirectionClick } = props;

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
            <hr />
            {restaurant.specialties && restaurant.specialties.length > 0 && (
              <Typography use="subtitle2">
                Specialty: {restaurant.specialties.join(", ")}
              </Typography>
            )}
            <br />
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
