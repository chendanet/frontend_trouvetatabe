import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function MapOpen({lattitude,longitude,currentVenue}) {
    return (
        <MapContainer
        center={[lattitude, longitude]}
        zoom={13}
        scrollWheelZoom={true}
        className=""
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lattitude, longitude]}>
          <Popup>
            {currentVenue.name} <br /> {currentVenue.phone_number}
          </Popup>
        </Marker>
      </MapContainer>
      
    )
}

export default MapOpen
