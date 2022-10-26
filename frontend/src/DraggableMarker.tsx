import {  useRef } from "react";
import { Marker, Popup } from "react-leaflet";

interface DraggableMarkerProps {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
}

export default function DraggableMarker(props: DraggableMarkerProps) {
  const markerRef = useRef(null);

  const eventHandlers = () => {
    const marker = markerRef.current as any;
    if (marker != null) {
    const { lat, lng } = marker.contextValue.popupContainer._latlng as { lat: number, lng: number };
    props.setPosition([lat, lng]);
    }
  };

  return (
    <Marker
      draggable={true}
      ondragend={eventHandlers}
      position={props.position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span>
          Clique e segure para arrastar o marcador
        </span>
      </Popup>
    </Marker>
  );
}
