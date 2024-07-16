// ** Category => SubMenu____________
export interface ItemType {
    id: number;
    name: string;
};

export interface CategoryType {
    id: number;
    label: string;
    items?: ItemType[];
    products?: CardProductType[];
};
// ** Category => SubMenu____________

export type CardProductType = {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    quantity: number;
    selectedImg: SelectedImgType;
};

export type SelectedImgType = {
    color: string;
    colorCode: string;
    image: string;
};

// ** For Static Data
export interface ProductType {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    quantity: number;
    image: string;
}