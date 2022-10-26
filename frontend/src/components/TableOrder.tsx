// function TableOrder: table with fields name, road, city, state, country, weight, latitude, longitude

import { Order, OrderDetails } from "../App";

interface TableOrderProps {
  orderDetails: OrderDetails;
  orders: Order[];
  getOrders: (page: number, per_page: number) => void;
}

function TableOrder(props: TableOrderProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row justify-between">
        <div className="flex gap-4">
          <span className="text-gray-700 font-bold">Total de clientes</span>
          <span className="text-gray-700 font-bold">
            {props.orderDetails?.total}
          </span>
        </div>
        <div className="flex gap-4">
          <span className="text-gray-700 font-bold">Total de peso</span>
          <span className="text-gray-700 font-bold">
            {props.orderDetails?.weigh_total} Kg
          </span>
        </div>
        <div className="flex gap-4">
          <span className="text-gray-700 font-bold">Ticket médio</span>
          <span className="text-gray-700 font-bold">
            {props.orderDetails?.averageTicket} Kg
          </span>
        </div>
      </div>

      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr className="border-b">
            <th className="text-left p-3 px-5">Nome</th>
            <th className="text-left p-3 px-5 table-cell">Rua</th>
            <th className="text-left p-3 px-5 hidden md:table-cell">Cidade</th>
            <th className="text-left p-3 px-5 hidden md:table-cell">Estado</th>
            <th className="text-left p-3 px-5 hidden md:table-cell">País</th>
            <th className="text-left p-3 px-5">Peso</th>
            <th className="text-left p-3 px-5 hidden md:table-cell">Latitude</th>
            <th className="text-left p-3 px-5 hidden md:table-cell">Longitude</th>
          </tr>
          {props.orders.map((order) => {
            Number( order.address.location?.latitude).toFixed(4)
            return (
           
            
            <tr className="border-b hover:bg-orange-100 bg-gray-100">
              <td className="p-3 px-5">{order.name}</td>
              <td className="p-3 px-5 ">{order.address.street}</td>
              <td className="p-3 px-5 hidden md:table-cell">{order.address.city}</td>
              <td className="p-3 px-5 hidden md:table-cell">{order.address.state}</td>
              <td className="p-3 px-5 hidden md:table-cell">{order.address.country}</td>
              <td className="p-3 px-5">{order.productWeight}</td>
              <td className="p-3 px-5 hidden md:table-cell">{Number( order.address.location?.latitude).toFixed(4)}</td>
              <td className="p-3 px-5 hidden md:table-cell">{Number(order.address.location?.longitude).toFixed(4)}</td>
            </tr>
          )})}
        </tbody>
      </table>

      <div className="w-full">
        <div className="flex gap-4 justify-between">
          <button
            className="bg-gray-300  hover:bg-gray-400 text-gray-800 font-bold p-2  rounded-full"
            onClick={() => {    
              if (props.orderDetails?.page <= 1) return;
              props.getOrders(
                props.orderDetails?.page! - 1,
                props.orderDetails?.per_page!
              );
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex flex-row justify-between">
            <div className="flex gap-4">
              <span className="text-gray-700 font-bold">Página</span>
              <span className="text-gray-700 font-bold">
                {props.orderDetails?.page}
              </span>

              <span className="text-gray-700 font-bold">de</span>
              <span className="text-gray-700 font-bold">
                {props.orderDetails?.total_pages}
              </span>
            </div>
          </div>

          <button
            className="bg-gray-300  hover:bg-gray-400 text-gray-800 font-bold p-2  rounded-full"
            onClick={() => {
                if(props.orderDetails?.total_pages < 1) return;
              if (props.orderDetails?.page === props.orderDetails?.total_pages)
                return;
              if (props?.orderDetails?.page > props?.orderDetails?.total_pages)
                return;
              props.getOrders(
                +props.orderDetails?.page! + 1,
                props.orderDetails?.per_page!
              );
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableOrder;
