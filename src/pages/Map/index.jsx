import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function MapOpen({ latitude, longitude, currentVenue }) {
  return (
    <>
      {latitude && longitude && currentVenue &&
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={true}
          className=""
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              {currentVenue.address} <br /> {currentVenue.phone_number}
            </Popup>
          </Marker>
        </MapContainer>}
      {!latitude && !longitude && currentVenue &&
        <MapContainer
          center={["48.8566969", "2.3514616"]}
          zoom={13}
          scrollWheelZoom={true}
          className=""
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={["48.8566969", "2.3514616"]}>
            <Popup>
              {currentVenue.address} <br /> {currentVenue.phone_number}
            </Popup>
          </Marker>
        </MapContainer>}
    </>
  )
}

export default MapOpen
