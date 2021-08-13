import React, { useState } from "react";
import { IconButton, Menu, MenuSurfaceAnchor, Typography } from "rmwc";
import styled from "styled-components";
import { Restaurant } from "../types";

type MapPinProps = {
  restaurant: Restaurant;
  lat: number;
  lng: number;
};

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
  const { restaurant } = props;

  const [menu, setMenu] = useState<boolean>(false);
  return (
    <div
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
              <IconButton icon="close" onClick={() => setMenu(false)} />
            </MenuHeader>
            <Typography use="subtitle2">{restaurant.name}</Typography>
            <hr />
            <Typography use="caption" style={{ paddingTop: 16 }}>
              {restaurant.address}
            </Typography>
          </TextContainer>
        </Menu>

        <IconButton
          icon="place"
          onClick={(e) => {
            e.stopPropagation();
            setMenu(!menu);
          }}
        />
      </MenuSurfaceAnchor>
    </div>
  );
}
