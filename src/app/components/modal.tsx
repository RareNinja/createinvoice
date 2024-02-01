// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// type InvoiceItem = {
//   quantity: string;
//   description: string;
//   unitPrice: string;
// };

// const [formData, setFormData] = useState({
//   exporter: {
//       name: "",
//       address: "",
//       zipCode: "",
//       phone: "",
//       cnpj: "",
//   },
//   importer: {
//       name: "",
//       address: "",
//       zipCode: "",
//       phone: "",
//       email: "",
//   },
//   paymentTerms: "",
//   countryOfShipment: "",
//   incoterms: "",
//   shippingDate: "",
//   countryOfOrigin: "",
//   sizeContainer: "",
//   items: [{} as InvoiceItem],
// });

// const handleAddItem = () => {
//   setFormData({
//     ...formData,
//     items: [
//       ...formData.items,
//       {
//         description: "",
//         quantity: "",
//         unitPrice: "",
//       },
//     ],
//   });
// };

// const handleRemoveItem = (index: any) => {
//   const updatedItems = [...formData.items];
//   updatedItems.splice(index, 1);

//   setFormData({
//     ...formData,
//     items: updatedItems,
//   });
// };
// const Windowsitem = ({}) => {
//   return (
//     <div className="grid grid-cols-2 gap-4 w-full overflow-x-auto">
//                         <div className="col-span-2">
//                             <table className="table-auto">
//                                 <thead>
//                                     <tr className="border-2 px-4 py-2 text-black">
//                                         <th className="border-2">Quantidade</th>
//                                         <th className="border-2">Unit</th>
//                                         <th className="border-2">NCM/SH</th>
//                                         <th className="border-2">Descrição</th>
//                                         <th className="border-2">País de Fabricação</th>
//                                         <th className="border-2">Moeda</th>
//                                         <th className="border-2">Preço Unitário</th>
//                                         <th className="border-2">Preço Total</th>
//                                         <th className="border-2">Peso Líquido Total (Kg)</th>
//                                         <th className="border-2">Peso Bruto Total (Kg)</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {formData.items.map((item, index) => (
//                                         <tr key={index}>
//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="number"
//                                                     name={`formData.items[${index}].quantity`}
//                                                     value={item.quantity}
//                                                     onChange={(e) =>
//                                                         setFormData({
//                                                             ...formData,
//                                                             items: formData.items.map((i, idx) =>
//                                                                 idx === index
//                                                                     ? { ...i, quantity: e.target.value }
//                                                                     : i
//                                                             ),
//                                                         })
//                                                     }
//                                                     className="border-gray-300 border rounded-md p-2 text-black"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="number"
//                                                     className="border-gray-300 border rounded-md p-2 text-black"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="number"
//                                                     className="border-gray-300 border rounded-md p-2 text-black"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="text"
//                                                     name={`formData.items[${index}].description`}
//                                                     value={item.description}
//                                                     onChange={(e) =>
//                                                         setFormData({
//                                                             ...formData,
//                                                             items: formData.items.map((i) =>
//                                                                 i === item
//                                                                     ? { ...i, description: e.target.value }
//                                                                     : i
//                                                             ),
//                                                         })
//                                                     }
//                                                     className="border-gray-300 border rounded-md p-2"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="text"
//                                                     className="border-gray-300 border rounded-md p-2 text-black"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="text"
//                                                     className="border-gray-300 border rounded-md p-2 text-black"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="number"
//                                                     name="formData.items.unitPrice"
//                                                     className="border-gray-300 border rounded-md p-2 text-black"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="number"
//                                                     className="border-gray-300 border rounded-md p-2 text-black"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="number"
//                                                     className="border-gray-300 border rounded-md p-2 text-black"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2 text-black">
//                                                 <input
//                                                     type="number"
//                                                     className="border-gray-300 border rounded-md p-2 text-black"
//                                                 />
//                                             </td>

//                                             <td className="border-2 px-4 py-2">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleRemoveItem(index)}
//                                                     className="bg-red-500 text-white px-4 py-2 rounded-md"
//                                                 >
//                                                     Remover
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                     <div className="col-span-2">
//                       <button
//                         type="button"
//                         onClick={handleAddItem}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                       >
//                         Adicionar Item
//                       </button>
//                     </div>
//   );
// };

// export default Windowsitem;
