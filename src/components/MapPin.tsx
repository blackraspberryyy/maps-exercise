import React from "react";
import { Icon } from "rmwc";

type MapPinProps = {
  lat?: number;
  lng?: number;
  text: string;
};

export function MapPin(props: MapPinProps) {
  const { text } = props;
  return (
    <div>
      <Icon icon="place" />
      <p>{text}</p>
    </div>
  );
}
