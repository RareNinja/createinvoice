"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/modal";
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import withAuth from "@/app/components/WithAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase";
import LoadingComponent from "@/app/components/Loading";

const Home = () => {
    type InvoiceItem = {
        quantity: number;
        description: string;
        unitPrice: number;
    };
    type FaturaItens = {
        itemList: number;
        quantity: number;
        unity: string;
        ncm: string;
        description: string;
        countryManufacture: string;
        currencyMoney: string;
        priceUnit: number;
        priceTotal: number;
        netWheightTotal: number;
        netWheightTotalUnit: number;
    }

    const [fields, setFields] = useState({}) as any;
    const [colorInvoice, setColorInvoice] = useState('bg-gray-400')
    const [openModal, setOpenModalState] = useState(false)
    const [faturaItensValues, setFaturaItensValues] = useState<FaturaItens[]>([])
    const [faturaItemValue, setFaturaItemValue] = useState<FaturaItens>()
    const [logoFileExpo, setLogoFileExpo] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [fileToSetFirestore, setFileToSetFirestore] = useState<File>();
    const [logoFileImpo, setLogoFileImpo] = useState(null);
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

    const inputLogo = useRef(null) as any

    const handleModal = () => {
        setOpenModalState(!openModal)
    }

    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        // Enviar dados do formulário para o servidor
        console.log(data);
    };

    const onSubmitItems = () => {
        const itemValue = document.getElementById('item').values as any
        const quantityValue = document.getElementById('quantity') as any
        const unit = document.getElementById('unit') as any
        const ncm = document.getElementById('ncm') as any
        const description = document.getElementById('description') as any
        const countryManufacture = document.getElementById('countryManufacture') as any
        const currencyMoney = document.getElementById('currencyMoney') as any
        const priceUnit = document.getElementById('priceUnit') as any
        // const priceTotal = document.getElementById('priceTotal') as any
        const netWheightTotal = document.getElementById('netWheightTotal') as any
        const netWheightTotalUnit = document.getElementById('netWheightTotalUnit') as any

        console.log(`qtd.: ${quantityValue.value} and price ${priceUnit.value}`)
        const totalPrice = quantityValue.value * priceUnit.value;

        const dataToSave = {
            itemList: Number(itemValue.value),
            quantity: Number(quantityValue.value),
            unity: `${unit.value}`,
            ncm: `${ncm.value}`,
            description: `${description.value}`,
            countryManufacture: `${countryManufacture.value}`,
            currencyMoney: `${currencyMoney.value}`,
            priceUnit: priceUnit.value,
            priceTotal: Number(totalPrice),
            netWheightTotal: Number(netWheightTotal.value),
            netWheightTotalUnit: Number(netWheightTotalUnit.value),
        }

        setFaturaItensValues((prevValues: any) => [...prevValues, dataToSave])
        handleModal()
    }
    const handleUpdateFields = (field: any) => {
        setFields((prevValues: any) => ({ ...prevValues, [field.target.name]: field.target.value }))
    }

    const handleFileChangeExpo = (eventExpo: any) => {
        const file = eventExpo.target.files[0];
        setLogoFileExpo(file);
    };


    const handleFileChangeImpo = (eventImpo: any) => {
        const file = eventImpo.target.files[0];
        setLogoFileImpo(file);
    };

    const handleUpload = () => {
        if (inputLogo.current) inputLogo.current.click();
    }
    const handleImageUploader = (file: File) => {
        setFileToSetFirestore(file);

        if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const dataUrl = event.target?.result as any;

                setFilePreview(dataUrl);
            };
        }
    };

    const handleSaveItemToFatura = () => {
        setFaturaItensValues((prevValue: any) => [...prevValue, faturaItemValue])
        setFaturaItemValue({
            itemList: 0,
            quantity: 0,
            unity: '',
            ncm: '',
            description: '',
            countryManufacture: '',
            currencyMoney: '',
            priceUnit: 0,
            priceTotal: 0,
            netWheightTotal: 0,
            netWheightTotalUnit: 0,
        })
    }

    const contentDocument: React.RefObject<HTMLDivElement> = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => {
            const content = contentDocument.current;
            if (content instanceof Element) {
                return content;
            } else {
                console.error("Conteúdo inválido para impressão");
                return null;
            }
        },
    });
    const changeColorInvoice = (className: string) => {
        setColorInvoice(className);
    }

    const calculateTotal = () => {
      const total = formData.items.reduce((accumulator, item) => {
          return accumulator + item.quantity * item.unitPrice;
      }, 0);
      return total;
  }

    return (
        <div className="container max-w-100 mx-auto flex p-5 flex-col text-xs">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Gerador de Invoice</h1>
                <div className="bg-blue-500 text-white px-5 py-2 rounded-md" onClick={() => signOut(auth)}>
                    Sair
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 gap-5 rounded-lg flex flex-row w-full overflow-hidden">
                <div className="flex flex-col gap-5 w-1/2">
                    <h2 className="text-xl font-semibold">Numero Invoice</h2>
                    <div className="flex flex-row gap-5">
                        <input
                            type="text"
                            name="invoice.numero"
                            placeholder="Numero da invoice"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                    </div>

                    <div className="flex flex-row justify-between text-center">
                        <h2 className="text-xl font-semibold">Dados Do Exportador</h2>

                        <label
                            onClick={handleUpload}
                            className="flex  cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-2 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                            <span className="flex items-center space-x-2">
                                <svg className="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
                                    <path
                                        d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"></path>
                                    <path
                                        d="M80,128a80,80,0,1,1,144,48"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"></path>
                                    <polyline
                                        points="118.1 161.9 152 128 185.9 161.9"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"></polyline>
                                    <line
                                        x1="152"
                                        y1="208"
                                        x2="152"
                                        y2="128"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"></line>
                                </svg>
                                <span className="text-xs font-medium text-gray-600">
                                    Insira o logo exportador
                                </span>
                            </span>
                            <input
                                type="file"
                                id="logoUpload"
                                accept="image/*"
                                onChange={handleFileChangeExpo}
                                hidden
                            />
                        </label>
                    </div>
                    <div className="flex flex-row gap-5">
                        <input
                            type="text"
                            name="exporter.name"
                            placeholder="Nome"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="exporter.address"
                            placeholder="Endereço"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />

                    </div>
                    <div className="flex flex-row gap-5">
                        <input
                            type="text"
                            name="exporter.zipCode"
                            placeholder="CEP"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="exporter.phone"
                            placeholder="Telefone"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="exporter.cnpj"
                            placeholder="CNPJ"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2"
                        />
                    </div>

                    <div className="flex flex-row justify-between text-center">
                        <h2 className="text-xl font-semibold">Dados Do Importador</h2>

                        <label
                            onClick={handleUpload}
                            className="flex  cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-2 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
                            <span className="flex items-center space-x-2">
                                <svg className="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
                                    <path
                                        d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"></path>
                                    <path
                                        d="M80,128a80,80,0,1,1,144,48"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"></path>
                                    <polyline
                                        points="118.1 161.9 152 128 185.9 161.9"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"></polyline>
                                    <line
                                        x1="152"
                                        y1="208"
                                        x2="152"
                                        y2="128"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="24"></line>
                                </svg>
                                <span className="text-xs font-medium text-gray-600">
                                    Insira o logo importador
                                </span>
                            </span>
                            <input
                                type="file"
                                id="logoUpload"
                                accept="image/*"
                                onChange={handleFileChangeImpo}
                                hidden
                            />
                        </label>
                    </div>
                    <div className="flex flex-row gap-5">
                        <input
                            type="text"
                            name="importer.name"
                            placeholder="Nome"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="importer.address"
                            placeholder="Endereço"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="flex flex-row gap-5">
                        <input
                            type="text"
                            name="importer.zipCode"
                            placeholder="CEP"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="importer.phone"
                            placeholder="Telefone"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="importer.email"
                            placeholder="Email"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                    </div>
                    <h2 className="text-xl font-semibold">Detalhes da Fatura</h2>
                    <div className="flex flex-row gap-5">
                        <input
                            type="text"
                            name="paymentTerms"
                            placeholder="Termos de Pagamento"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="countryOfShipment"
                            placeholder="País de Embarque"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="flex flex-row gap-5">
                        <input
                            type="text"
                            name="incoterms"
                            placeholder="Incoterms"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="date"
                            name="shippingDate"
                            placeholder="Data"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="flex flex-row gap-5">
                        <input
                            type="text"
                            name="countryOfOrigin"
                            placeholder="País de Origem"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="sizeContainer"
                            placeholder="Tamanho do Container"
                            onChange={(e) => { handleUpdateFields(e) }}
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold">Itens da Fatura</h2>
                        <div className="col-span-2">
                            <button
                                type="button"
                                onClick={() => setOpenModalState(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Adicionar Item
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-1/2">
                    <div className="flex flex-row gap-2 justify-end items-center h-5">
                        <button
                            type="button"
                            onClick={() => { changeColorInvoice('bg-indigo-400') }}
                            className={`rounded-md bg-indigo-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('indigo') ? 'w-6 h-6' : ''}`}
                        ></button>
                        <button
                            type="button"
                            onClick={() => { changeColorInvoice('bg-green-400') }}
                            className={`rounded-md bg-green-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('green') ? 'w-6 h-6' : ''}`}
                        ></button>
                        <button
                            type="button"
                            onClick={() => { changeColorInvoice('bg-red-400') }}
                            className={`rounded-md bg-red-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('red') ? 'w-6 h-6' : ''}`}
                        ></button>
                        <button
                            type="button"
                            onClick={() => { changeColorInvoice('bg-blue-400') }}
                            className={`rounded-md bg-blue-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('blue') ? 'w-6 h-6' : ''}`}
                        ></button>
                        <button
                            type="button"
                            onClick={() => { changeColorInvoice('bg-orange-400') }}
                            className={`rounded-md bg-orange-400 w-5 h-5 transition-all hover:scale-110 ease-linear ${colorInvoice.includes('orange') ? 'w-6 h-6' : ''}`}
                        ></button>
                        <button
                            type="button"
                            className={`rounded-md bg-gray-400 w-5 h-5 ${colorInvoice.includes('gray') ? 'w-6 h-6' : ''}`}
                            onClick={() => { changeColorInvoice('bg-gray-400') }}>
                        </button>
                    </div>

                    <div ref={contentDocument} className="flex flex-col w-full rounded-lg overflow-hidden">
                        <div className={`flex w-full flex-col p-5 gap-3 ${colorInvoice}`}>
                            <div className="flex w-full justify-end gap-3">
                                <h3 className="flex text-xl font-bold">INVOICE</h3>
                                <h3 className="flex text-xl font-bold">{fields["invoice.numero"]}</h3>
                            </div>
                            <div className="container flex justify-between">
                                <div className="flex flex-col text-xs uppercase">
                                    <h4 className="text-lg uppercase font-semibold">Exportador</h4>
                                    <div className="flex flex-col gap-1">
                                        <p>{fields["exporter.name"]}</p>
                                        <p>{fields["exporter.address"]}</p>
                                        <p>{fields["exporter.zipCode"]}</p>
                                        <p>{fields["exporter.phone"]}</p>
                                        <p>{fields["exporter.cnpj"]}</p>
                                    </div>
                                </div>
                                <div id="logo_import" className="flex justify-center p-10">
                                    {logoFileExpo && (
                                        <div>
                                            <Image
                                                src={`${URL.createObjectURL(logoFileExpo)}`}
                                                alt="Logo do Usuário"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="container flex justify-between">
                                <div className="flex flex-col text-xs uppercase">
                                    <h4 className="text-lg uppercase font-semibold">Importador</h4>
                                    <div className="flex flex-col gap-1">
                                        <p>{fields["importer.name"]}</p>
                                        <p>{fields["importer.address"]}</p>
                                        <p>{fields["importer.zipCode"]}</p>
                                        <p>{fields["importer.phone"]}</p>
                                        <p>{fields["importer.email"]}</p>
                                    </div>
                                </div>
                                <div id="logo_import" className="flex justify-center p-10">
                                    {logoFileImpo && (
                                        <div>
                                            <Image
                                                src={URL.createObjectURL(logoFileImpo)}
                                                alt="Logo do Usuário"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 text-xs uppercase p-5 border bg-white">
                            <div className="flex flex-col gap-4">
                                <label className="text-lg mb-3 font-semibold">Detalhes da Fatura</label>
                                <div className="flex flex-row w-full">
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
                            <div className="flex flex-col gap-4">
                                <table>
                                    <thead>
                                        <tr className="border-2 px-4 py-2 text-black">
                                            <th className="border-2">item</th>
                                            <th className="border-2">Quantidade</th>
                                            <th className="border-2">Unit</th>
                                            <th className="border-2">NCM/SH</th>
                                            <th className="border-2">Descrição</th>
                                            <th className="border-2">País de Fabricação</th>
                                            <th className="border-2">Moeda</th>
                                            <th className="border-2">Preço Unitário</th>
                                            <th className="border-2">Preço Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            faturaItensValues.length > 0 ? faturaItensValues.map((item: any) => {
                                                return (
                                                    <tr key={item.quantity}>
                                                        <td className="border-2 text-center">{item.itemList}</td>
                                                        <td className="border-2 text-center">{item.quantity}</td>
                                                        <td className="border-2 text-center">{item.unity}</td>
                                                        <td className="border-2 text-center">{item.ncm}</td>
                                                        <td className="border-2 text-center">{item.description}</td>
                                                        <td className="border-2 text-center">{item.countryManufacture}</td>
                                                        <td className="border-2 text-center">{item.currencyMoney}</td>
                                                        <td className="border-2 text-center">{item.priceUnit}</td>
                                                        <td className="border-2 text-center">{item.priceTotal}</td>
                                                    </tr>
                                                )
                                            }) : (
                                                <td colSpan={10} ><div className="flex justify-center m-10">Não existe items registrados</div></td>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-row justify-between align-center">
                                <label className="font-semibold">TOTAL USD CFR</label>
                                <p className="font-bold">{calculateTotal()}</p>
                            </div>
                            <div>
                              <table>
                                      <thead>
                                          <tr className="border-2 px-4 py-2 text-black">
                                              <th className="border-2">Peso Líquido Total (Kg)</th>
                                              <th className="border-2">Peso Bruto Total (Kg)</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                            {
                                              faturaItensValues.length > 0 ? faturaItensValues.map((item: any) => {
                                                  return (
                                                      <tr key={item.quantity}>
                                                          <td className="border-2 text-center">{item.netWheightTotal}</td>
                                                          <td className="border-2 text-center">{item.netWheightTotalUnit}</td>
                                                      </tr>
                                                  )
                                              }) : (
                                                  <td colSpan={10} ><div className="flex justify-center m-5"></div></td>
                                              )
                                            }
                                      </tbody>
                              </table>
                            </div>
                            <div className="flex justify-center text-center">
                              <p className="italic">
                                {fields["exporter.name"]} {fields["exporter.cnpj"]} {fields["shippingDate"]}
                              </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 justify-end items-center h-5">
                        <button type="submit" onClick={handlePrint} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                            Download Fatura
                        </button>
                    </div>
                </div>
            </form>
            <Modal isOpen={openModal} handleModal={handleModal}>
                <form onSubmit={handleSubmit(onSubmitItems)}>
                    <div className="container p-24">
                        <input
                            type="text"
                            name="item"
                            id="item"
                            placeholder="item"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="quantity"
                            id="quantity"
                            placeholder="Quantidade"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="unit"
                            id="unit"
                            placeholder="Unidade"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="ncm"
                            id="ncm"
                            placeholder="NCM"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Descrição"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="countryManufacture"
                            id="countryManufacture"
                            placeholder="Pais de Fabricante"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="currencyMoney"
                            id="currencyMoney"
                            placeholder="Moeda"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="priceUnit"
                            id="priceUnit"
                            placeholder="Preço Unitario"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        {/* <input
                            type="text"
                            name="priceTotal"
                            id="priceTotal"
                            placeholder="Preço total"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        /> */}
                        <input
                            type="text"
                            name="netWheightTotal"
                            id="netWheightTotal"
                            placeholder="Peso Líquido Total"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                        <input
                            type="text"
                            name="netWheightTotalUnit"
                            id="netWheightTotalUnit"
                            placeholder="Peso Bruto Total"
                            className="border-gray-300 border rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="container p-5">
                        <button type="submit" className="bg-blue-500 text-white px-7 py-2 rounded-md"> salvar </button>
                    </div>
                </form>

            </Modal>
        </div>
    );
}


export default withAuth(Home)