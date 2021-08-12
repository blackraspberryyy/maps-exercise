type MapPinProps = {
  lat?: number;
  lng?: number;
  text: string;
};

export function MapPin(props: MapPinProps) {
  const { text } = props;
  return (
    <div>
      {/* <Icon icon={locationIcon} className="pin-icon" /> */}
      <p className="pin-text">{text}</p>
    </div>
  );
}
