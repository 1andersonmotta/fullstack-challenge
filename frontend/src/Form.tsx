import { useState } from "react";

interface FormProps {
  position: [number, number];
  addressSearch: string;
  setPosition: (position: [number, number]) => void;
  setAddressSearch: (addressSearch: string) => void;
  getOrders: () => void;
}

function Form(props: FormProps) {
  const [nameClient, setNameClient] = useState("");
  const [weightProduct, setWeightProduct] = useState("");

  const searchAddress = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/search-address?address=" +
          props.addressSearch
      );
      const data = await response.json();
      props.setPosition([data.latitude, data.longitude]);
    } catch (error) {
      alert("Não foi possível encontrar o endereço");
    }
  };

  const saveClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameClient,
          latitude: props.position[0],
          longitude: props.position[1],
          productWeight: weightProduct,
        }),
      });
      await response.json();
      setNameClient("");
      setWeightProduct("");
      props.setAddressSearch("");
      props.getOrders();
    } catch (error) {
      alert("Não foi possível cadastrar o cliente");
    }
  };

  return (
    <div className="flex flex-col flex-1 p-4 ">
      <form
        onSubmit={saveClient}
        className="flex flex-col p-8 gap-4 w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-2"
      >
        <h1 className="text-2xl font-bold text-gray-700">Cadastro de entrega</h1>
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          required
          placeholder="Nome do cliente"
          value={nameClient}
          onChange={(e) => setNameClient(e.target.value)}
        />
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          required
          placeholder="Peso da entrega"
          value={weightProduct}
          onChange={(e) => {
            const weight = e.target.value.replace(/[^0-9.]/g, "");
            setWeightProduct(String(+weight));
          }}
        />
        <div className="flex gap-4 w-full">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            name="search-address"
            type="text"
            placeholder="Digite o endereço"
            value={props.addressSearch}
            onChange={(e) => props.setAddressSearch(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={searchAddress}
          >
            Buscar
          </button>
        </div>
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          required
          placeholder="Latitude"
          value={props.position[0]}
          disabled
        />
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          required
          placeholder="Longitude"
          value={props.position[1]}
          disabled
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Cadastrar Cliente
        </button>
      </form>
      <form className="flex flex-col p-8 gap-4 w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-2">
        <button
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={async () => {
            await fetch("http://localhost:5000/api/v1/orders-all", {
              method: "DELETE",
            });
            alert("Todos os clientes foram deletados");
          }}
        >
          Resetar Cadastro
        </button>
      </form>
    </div>
  );
}

export default Form;
