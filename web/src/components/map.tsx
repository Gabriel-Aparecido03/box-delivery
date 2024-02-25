import { useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface MapPropsType {
  coordinates?: [number, number]
  onMarkerChange?: ({ lat, lng }: { lat: number, lng: number }) => void
}

export function Map({ coordinates, onMarkerChange }: MapPropsType) {

  const markerRef = useRef(null)

  return (
    <div className="h-96 mb-10">
      <MapContainer
        attributionControl
        center={coordinates ?? [0, 0]}
        zoom={24}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={coordinates ?? [0, 0]}
          draggable
          ref={markerRef}
          eventHandlers={{
            dragend: e => {
              if (markerRef.current && onMarkerChange) {
                const { lat, lng } = markerRef.current.getLatLng()
                onMarkerChange({ lat, lng })
              }
            }
          }}
        >
        </Marker>
      </MapContainer>
    </div>
  )
}