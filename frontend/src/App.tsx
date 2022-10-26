import { useEffect, useState } from "react";
import DraggableMarker from "./DraggableMarker";
import Form from "./Form";
import Map from "./Map";

function App() {
  const [position, setPosition] = useState<[number, number]>([
    -23.5064407, -47.4760743,
  ]);

  const [addressSearch, setAddressSearch] = useState("");

  useEffect(() => {
    searchLatLng()
  }, [position]);

  const searchLatLng = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/search-latlng?lat=" +
          position[0] +
          "&lng=" +
          position[1]
      );
      const body = await response.json();
      setAddressSearch(body.data);
    } catch (error) {
      alert("Não foi possível encontrar o endereço");
    }
  };

  return (
    <div className="flex ">
      <Form position={position} setPosition={setPosition} addressSearch={addressSearch} setAddressSearch={setAddressSearch} />
      <Map center={position} zoom={16}>
        <DraggableMarker position={position} setPosition={setPosition} />
      </Map>
    </div>
  );
}

export default App;
