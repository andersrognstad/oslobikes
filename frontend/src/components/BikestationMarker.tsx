import { Marker, Popup } from "react-leaflet";
import { Bikestation } from "../types/bikestation.ts";

interface Props {
  bikestation: Bikestation
}

export const BikestationMarker = ({ bikestation }: Props) => {
  const { lat, lon, name, availableLocks, availableBikes } =  bikestation

  return <Marker position={[lat, lon]}>
    <Popup>
      <b>{name}</b>
      <p>Ledige sykler: {availableBikes}</p>
      <p>Ledige låser: {availableLocks}</p>
    </Popup>
  </Marker>
}