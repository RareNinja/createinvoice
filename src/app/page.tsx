"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
    type InvoiceItem = {
        quantity: string;
        description: string;
        unitPrice: string;
    };
    
    const [fields, setFields] = useState({}) as any;
    const [colorInvoice, setColorInvoice] = useState('bg-gray-400')

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
        items: [{} as InvoiceItem],
    });

    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        // Enviar dados do formulário para o servidor
        console.log(data);
    };

    const handleAddItem = () => {
        setFormData({
            ...formData,
            items: [
                ...formData.items,
                {
                    description: "",
                    quantity: "",
                    unitPrice: "",
                },
            ],
        });
    };

    const handleUpdateFields = (field: any) => {
        setFields((prevValues) => ({...prevValues, [field.target.name]: field.target.value}))
    }

    const handleRemoveItem = (index: any) => {
        const updatedItems = [...formData.items];
        updatedItems.splice(index, 1);

        setFormData({
            ...formData,
            items: updatedItems,
        });
    };

    const changeColorInvoice = (className: string) => {
        setColorInvoice(className);
    }

    return (
        <div className="container max-w-7xl mx-auto flex p-5 flex-col text-xs">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Gerador de Invoice e Fatura</h1>
                <div className="justify-end">logo aqui</div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 gap-5 rounded-lg flex flex-row w-full overflow-hidden">
                {/* Cabeçalho da Fatura */}
                    <div className="flex flex-col gap-5 w-1/2">
                        <h2 className="text-xl font-semibold">Exportador</h2>
                        <div className="flex flex-row gap-5">
                            <input
                                type="text"
                                name="exporter.name"
                                // ref={register({ required: true })}
                                placeholder="Nome"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            <input
                                type="text"
                                name="exporter.address"
                                // ref={register({ required: true })}
                                placeholder="Endereço"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            
                        </div>
                        <div className="flex flex-row gap-5">
                            <input
                                type="text"
                                name="exporter.zipCode"
                                // ref={register({ required: true })}
                                placeholder="CEP"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            <input
                                type="text"
                                name="exporter.phone"
                                // ref={register({ required: true })}
                                placeholder="Telefone"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            <input
                                type="text"
                                name="exporter.cnpj"
                                // ref={register({ required: true })}
                                placeholder="CNPJ"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2"
                            />
                        </div>
                        <h2 className="text-xl font-semibold">Importador</h2>
                        <div className="flex flex-row gap-5">
                            <input
                                type="text"
                                name="importer.name"
                                // ref={register({ required: true })}
                                placeholder="Nome"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            <input
                                type="text"
                                name="importer.address"
                                // ref={register({ required: true })}
                                placeholder="Endereço"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-row gap-5">
                            <input
                                type="text"
                                name="importer.zipCode"
                                // ref={register({ required: true })}
                                placeholder="CEP"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            <input
                                type="text"
                                name="importer.phone"
                                // ref={register({ required: true })}
                                placeholder="Telefone"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            <input
                                type="text"
                                name="importer.email"
                                // ref={register({ required: true })}
                                placeholder="Email"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                        </div>
                        <h2 className="text-xl font-semibold">Detalhes da Fatura</h2>
                        <div className="flex flex-row gap-5">
                            <input
                                type="text"
                                name="paymentTerms"
                                // ref={register()}
                                placeholder="Termos de Pagamento"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            <input
                                type="text"
                                name="countryOfShipment"
                                // ref={register()}
                                placeholder="País de Embarque"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-row gap-5">
                            <input
                                type="text"
                                name="incoterms"
                                // ref={register()}
                                placeholder="Incoterms"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            <input
                                type="date"
                                name="shippingDate"
                                // ref={register()}
                                placeholder="Data"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                        </div>
                        <div className="flex flex-row gap-5">
                            <input
                                type="text"
                                name="countryOfOrigin"
                                // ref={register()}
                                placeholder="País de Origem"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                            <input
                                type="text"
                                name="sizeContainer"
                                // ref={register()}
                                placeholder="Tamanho do Container"
                                onChange={(e) => {handleUpdateFields(e)}}
                                className="border-gray-300 border rounded-md p-2 w-full"
                            />
                        </div>
                        <h2 className="text-xl font-semibold">Itens da Fatura</h2>
                        <div className="grid grid-cols-2 gap-4 w-full overflow-x-auto">
                            <div className="col-span-2">
                                <table className="table-auto">
                                    <thead>
                                        <tr className="border-2 px-4 py-2 text-black">
                                            <th className="border-2">Quantidade</th>
                                            <th className="border-2">Unit</th>
                                            <th className="border-2">NCM/SH</th>
                                            <th className="border-2">Descrição</th>
                                            <th className="border-2">País de Fabricação</th>
                                            <th className="border-2">Moeda</th>
                                            <th className="border-2">Preço Unitário</th>
                                            <th className="border-2">Preço Total</th>
                                            <th className="border-2">Peso Líquido Total (Kg)</th>
                                            <th className="border-2">Peso Bruto Total (Kg)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="number"
                                                        name={`formData.items[${index}].quantity`}
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                items: formData.items.map((i, idx) =>
                                                                    idx === index
                                                                        ? { ...i, quantity: e.target.value }
                                                                        : i
                                                                ),
                                                            })
                                                        }
                                                        className="border-gray-300 border rounded-md p-2 text-black"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="number"
                                                        className="border-gray-300 border rounded-md p-2 text-black"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="number"
                                                        className="border-gray-300 border rounded-md p-2 text-black"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="text"
                                                        name={`formData.items[${index}].description`}
                                                        value={item.description}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                items: formData.items.map((i) =>
                                                                    i === item
                                                                        ? { ...i, description: e.target.value }
                                                                        : i
                                                                ),
                                                            })
                                                        }
                                                        className="border-gray-300 border rounded-md p-2"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="text"
                                                        className="border-gray-300 border rounded-md p-2 text-black"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="text"
                                                        className="border-gray-300 border rounded-md p-2 text-black"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="number"
                                                        className="border-gray-300 border rounded-md p-2 text-black"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="number"
                                                        className="border-gray-300 border rounded-md p-2 text-black"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="number"
                                                        className="border-gray-300 border rounded-md p-2 text-black"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2 text-black">
                                                    <input
                                                        type="number"
                                                        className="border-gray-300 border rounded-md p-2 text-black"
                                                    />
                                                </td>

                                                <td className="border-2 px-4 py-2">
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

                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                                Enviar Fatura
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-1/2">
                        <div className="flex flex-row gap-2 justify-end items-center h-5">
                            <button
                                type="button"
                                onClick={() => {changeColorInvoice('bg-indigo-400')}}
                                className={`rounded-md bg-indigo-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('indigo') ? 'w-6 h-6' : ''}`}
                            ></button>
                            <button
                                type="button"
                                onClick={() => {changeColorInvoice('bg-green-400')}}
                                className={`rounded-md bg-green-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('green') ? 'w-6 h-6' : ''}`}
                            ></button>
                            <button
                                type="button"
                                onClick={() => {changeColorInvoice('bg-red-400')}}
                                className={`rounded-md bg-red-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('red') ? 'w-6 h-6' : ''}`}
                            ></button>
                            <button
                                type="button"
                                onClick={() => {changeColorInvoice('bg-blue-400')}}
                                className={`rounded-md bg-blue-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('blue') ? 'w-6 h-6' : ''}`}
                            ></button>
                            <button
                                type="button"
                                onClick={() => {changeColorInvoice('bg-orange-400')}}
                                className={`rounded-md bg-orange-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('orange') ? 'w-6 h-6' : ''}`}
                            ></button>
                            <button 
                                type="button" 
                                className={`rounded-md bg-gray-400 w-5 h-5 ${colorInvoice.includes('gray') ? 'w-6 h-6' : ''}`}
                                onClick={() => {changeColorInvoice('bg-gray-400')}}>  
                            </button>
                        </div>

                        <div className="invoice flex flex-col w-full rounded-lg overflow-hidden">
                            <div className={`flex w-full flex-col p-5 gap-3 ${colorInvoice}`}>
                                <div className="flex w-full justify-end">
                                    <h3 className="flex text-xl font-bold">INVOICE</h3>
                                </div>
                                <div className="flex flex-col text-xs uppercase">
                                    <h4 className="text-lg uppercase font-semibold">Dados do Exportador</h4>
                                    <div className="flex flex-col gap-1">
                                        <p>{fields["exporter.name"]}</p>
                                        <p>{fields["exporter.address"]}</p>
                                        <p>{fields["exporter.zipCode"]}</p>
                                        <p>{fields["exporter.phone"]}</p>
                                        <p>{fields["exporter.cnpj"]}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col text-xs uppercase">
                                    <h4 className="text-lg uppercase font-semibold">Dados do Importador</h4>
                                    <div className="flex flex-col gap-1">
                                        <p>{fields["importer.name"]}</p>
                                        <p>{fields["importer.address"]}</p>
                                        <p>{fields["importer.zipCode"]}</p>
                                        <p>{fields["importer.phone"]}</p>
                                        <p>{fields["importer.email"]}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 text-xs uppercase p-5 border bg-white">
                                <div className="flex flex-col gap-4">
                                    <label className="text-lg mb-3 font-semibold">Detalhes da Fatura</label>
                                    <div className="flex flex-row gap-2 w-full">
                                        <div className="flex flex-col w-1/2">
                                            <label className="font-semibold">Termos de Pagamento</label>
                                            <p>{fields["paymentTerms"]}</p>
                                        </div>
                                        <div className="flex flex-col w-1/2">
                                            <label className="font-semibold">País de Embarque</label>
                                            <p>{fields["countryOfShipment"]}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-2 w-full">
                                        <div className="flex flex-col w-1/2">
                                            <label className="font-semibold">Incoterms</label>
                                            <p>{fields["incoterms"]}</p>
                                        </div>
                                        <div className="flex flex-col w-1/2">
                                            <label className="font-semibold">Shipping Date</label>
                                            <p>{fields["shippingDate"]}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-2 w-full">
                                        <div className="flex flex-col w-1/2">
                                            <label className="font-semibold">País de Origem</label>
                                            <p>{fields["countryOfOrigin"]}</p>
                                        </div>
                                        <div className="flex flex-col w-1/2">
                                            <label className="font-semibold">Tamanho do Container</label>
                                            <p>{fields["sizeContainer"]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </form>
        </div>
    );
}
