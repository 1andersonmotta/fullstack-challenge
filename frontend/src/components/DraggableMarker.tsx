import { useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { Order } from "../App";

interface DraggableMarkerProps {
  position: [number, number];
  draggable: boolean;
  order?: Order;
  setPosition: (position: [number, number]) => void;
}

export default function DraggableMarker(props: DraggableMarkerProps) {
  const markerRef = useRef(null);

  const eventHandlers = () => {
    const marker = markerRef.current as any;
    if (marker != null) {
      const { lat, lng } = marker.contextValue.popupContainer._latlng as {
        lat: number;
        lng: number;
      };
      props.setPosition([lat, lng]);
    }
  };

  return (
    <Marker
      draggable={props.draggable}
      ondragend={eventHandlers}
      position={props.position}
      opacity={props.draggable ? 1 : 0.7}
      title={props?.order?.name}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        {props.draggable ? (
          <span>Arraste o marcador para a localização desejada</span>
        ) : (
          props?.order && (
            <div>
              <span>Cliente: {props?.order.name}</span>
              <br />
              <span>
                {props?.order.address.street}, {props?.order.address.number}
              </span>
              <br />
              <span>Peso da Entrega: {props?.order.productWeight} Kg</span>
            </div>
          )
        )}
      </Popup>
    </Marker>
  );
}
