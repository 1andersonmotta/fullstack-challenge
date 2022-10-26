import { useEffect, useState } from "react";
import DraggableMarker from "./DraggableMarker";
import Form from "./Form";
import Map from "./Map";
import TableOrder from "./TableOrder";

export interface OrderDetails {
  page: number;
  per_page: number;
  total: number;
  averageTicket: number;
  weigh_total: number;
  total_pages: number;
}

export interface Order {
  id: number;
  name: string;
  productWeight: number;
  address: {
    street: string;
    number: number;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    neighborhood: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
}

function App() {
  const [position, setPosition] = useState<[number, number]>([
    -23.5064407, -47.4760743,
  ]);
  const [addressSearch, setAddressSearch] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersDetails, setOrdersDetails] = useState<OrderDetails>({} as OrderDetails);

  useEffect(() => {
    searchLatLng();
  }, [position]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async (page: number = 1, per_page: number = 5) => {
    const response = await fetch(
      `http://localhost:5000/api/v1/orders?page=${page}&per_page=${per_page}`
    );
    const body = await response.json();   
    setOrders(body.data);
    setOrdersDetails({
      page: body.page,
      per_page: body.per_page,
      total: body.total,
      averageTicket: body.averageTicket,
      weigh_total: body.weigh_total,
      total_pages: body.total_pages,
    });
  };

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
      <Form
        position={position}
        setPosition={setPosition}
        addressSearch={addressSearch}
        setAddressSearch={setAddressSearch}
        getOrders={getOrders}
      />
      <div className="border-l-2 flex flex-1 flex-col h-screen">
        <Map center={position} zoom={16}>
          {orders.length > 0 &&
          (
            orders.map((order) => (
              <DraggableMarker
                key={order.id}
                position={[order.address.location.latitude, order.address.location.longitude]}
                draggable={false}
                order={order}
                setPosition={setPosition}
              />
            ))
          )
          }
          <DraggableMarker position={position} setPosition={setPosition}  draggable={true} />
        </Map>
        <TableOrder  getOrders={getOrders} orderDetails={ordersDetails} orders={orders} />
      </div>
    </div>
  );
}

export default App;
