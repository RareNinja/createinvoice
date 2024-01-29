"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [formData, setFormData] = useState({
    exporter: {
      name: "",
      address: "",
      zipCode: "",
      phone: "",
      cnpj: "",
    },
    importer: {
      name: "",
      address: "",
      zipCode: "",
      phone: "",
      email: "",
    },
    paymentTerms: "",
    countryOfShipment: "",
    incoterms: "",
    shippingDate: "",
    countryOfOrigin: "",
    sizeContainer: "",
    items: [],
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // Enviar dados do formulário para o servidor
    console.log(data);
  };

  const handleAddItem = () => {
    // Adicionar um novo campo de item ao formulário
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Invoice</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Cabeçalho da Fatura */}
        <section className="bg-gray-200 p-4 mb-4">
          <h2>Exportador</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="exporter.name"
              // ref={register({ required: true })}
              placeholder="Nome"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="exporter.address"
              // ref={register({ required: true })}
              placeholder="Endereço"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="exporter.zipCode"
              // ref={register({ required: true })}
              placeholder="CEP"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="exporter.phone"
              // ref={register({ required: true })}
              placeholder="Telefone"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="exporter.cnpj"
              // ref={register({ required: true })}
              placeholder="CNPJ"
              className="border-gray-300 rounded-md p-2"
            />
          </div>

          <h2>Importador</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="importer.name"
              // ref={register({ required: true })}
              placeholder="Nome"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="importer.address"
              // ref={register({ required: true })}
              placeholder="Endereço"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="importer.zipCode"
              // ref={register({ required: true })}
              placeholder="CEP"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="importer.phone"
              // ref={register({ required: true })}
              placeholder="Telefone"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="importer.Email"
              // ref={register({ required: true })}
              placeholder="Email"
              className="border-gray-300 rounded-md p-2"
            />
          </div>

          <h2>Detalhes da Fatura</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="paymentTerms"
              // ref={register()}
              placeholder="Termos de Pagamento"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="countryOfShipment"
              // ref={register()}
              placeholder="País de Embarque"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="incoterms"
              // ref={register()}
              placeholder="Incoterms"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="date"
              name="shippingDate"
              // ref={register()}
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="countryOfOrigin"
              // ref={register()}
              placeholder="País de Origem"
              className="border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="sizeContainer"
              // ref={register()}
              placeholder="Tamanho do Container"
              className="border-gray-300 rounded-md p-2"
            />
          </div>
        </section>
        <h2>Itens da Fatura</h2>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Quantidade</th>
                  <th className="border px-4 py-2">Unit</th>
                  <th className="border px-4 py-2">NCM/SH</th>
                  <th className="border px-4 py-2">Descrição</th>
                  <th className="border px-4 py-2">País de Fabricação</th>
                  <th className="border px-4 py-2">Moeda</th>
                  <th className="border px-4 py-2">Preço Unitário</th>
                  <th className="border px-4 py-2">Preço Total</th>
                  <th className="border px-4 py-2">Peso Líquido Total (Kg)</th>
                  <th className="border px-4 py-2">Peso Bruto Total (Kg)</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name={`formData.items[${index}].description`}
                        value={item.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            items: formData.items.map((i) =>
                              i.id === item.id
                                ? { ...i, description: e.target.value }
                                : i
                            ),
                          })
                        }
                        className="border-gray-300 rounded-md p-2"
                      />
                    </td>

                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        name={`formData.items[${index}].quantity`}
                        value={String(item.quantity)} // Convertendo para string
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            items: formData.items.map((i) =>
                              i.id === item.id
                                ? { ...i, quantity: e.target.value }
                                : i
                            ),
                          })
                        }
                        className="border-gray-300 rounded-md p-2"
                      />
                    </td>

                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        name={`formData.items[${index}].unitPrice`}
                        value={String(item.unitPrice)} // Convertendo para string
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            items: formData.items.map((i) =>
                              i.id === item.id
                                ? { ...i, unitPrice: e.target.value }
                                : i
                            ),
                          })
                        }
                        className="border-gray-300 rounded-md p-2"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      {/* Exibir o total de cada item */}
                      {item.quantity * item.unitPrice}
                    </td>

                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-2">
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Adicionar Item
            </button>
          </div>

          <h2>Total da Fatura</h2>
          <div className="bg-gray-200 p-4">
            {/* <p className="font-bold">Total: R$ {calculateTotal()}</p> */}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Enviar Fatura
          </button>
        </div>
      </form>
    </div>
  );
}
