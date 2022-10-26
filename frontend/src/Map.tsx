
import { Map as MapContainer, TileLayer } from "react-leaflet";

interface MapProps {
  center: [number, number];
  zoom: number;
  children: React.ReactNode;
}

function Map (props: MapProps){
  
    return (
      <div className="flex flex-1 p-8">
        <MapContainer center={props.center} zoom={props.zoom} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
          <TileLayer
            attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          />
          { props.children }
        </MapContainer>
      </div>
    );
}

export default Map;

