export type InvoiceItem = {
    quantity: number;
    description: string;
    unitPrice: number;
};

export type FaturaItens = {
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
