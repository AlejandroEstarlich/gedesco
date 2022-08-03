import { DataTableSortOrderType } from "primereact/datatable";

export interface Product {
    id?: number;
    title: string;
    category: Category;
    images?: string[];
    description: string;
    price: number;
}

export interface ProductOUT {
    id?: number;
    title: string;
    category: Category;
    categoryId: number;
    images?: any;
    description: string;
    price: number;
}

export interface Category {
    id: number;
    image: string;
    name: string;
}

export interface SortSearch {
    first: number;
    rows: number;
    page: number;
    sortField: string;
    sortOrder: DataTableSortOrderType;
}
