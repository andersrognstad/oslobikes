import { useBikestations } from "../queries/useBikestations.ts";
import { MapContainer, TileLayer } from "react-leaflet";
import { BikestationMarker } from "./BikestationMarker.tsx";
import { LatLngExpression } from "leaflet";

const osloPosition: LatLngExpression = [59.9139, 10.7522];

export const BikestationMap = () => {
  const { isLoading, isError, data } = useBikestations();

  if (isLoading) {
    return <>Laster...</>
  }

  if (isError || !data) {
    return <>Noe gikk galt...</>
  }

  return (
    <MapContainer center={osloPosition} zoom={13} scrollWheelZoom={true} className="h-[80vh] w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((bikestation) => (
        <BikestationMarker bikestation={bikestation} key={bikestation.id} />
      ))}
    </MapContainer>
  )
}