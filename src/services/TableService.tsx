import { useContext, useState } from "react";
import { tableApi } from "../api";
import { FormContext } from "../context";
import { Category, Product, ProductOUT, SortSearch } from "../models";

export const TableService = () => {

	const { productsList, setProductsList, stateMessage, setStateMessage } = useContext( FormContext );
	const [categories, setCategories] = useState<Category[]>([]);
	const [totalRecords, setTotalRecords] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [sortParams, setSortParams] = useState<SortSearch>({
		first: 0,
		rows: 10,
		page: 1,
		sortField: '',
		sortOrder: 1,
	});

	const getProducts = async() => {
		try {
			setIsLoading(true);
			const { data } = await tableApi.get('/products')
			setProductsList(data);
			setTotalRecords(data.length);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setStateMessage({
				...stateMessage,
				status: 'error',
				message: 'Error in the request'
			});
		}
	};

	const getProductsSort = async( params?: SortSearch ) => {
		try {
			params ? setSortParams(params) : {};
			setIsLoading(true);

			await tableApi.get(`/products?offset=${ sortParams.first }&limit=10`);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setStateMessage({
				...stateMessage,
				status: 'error',
				message: 'Error in the request'
			});
			setIsLoading(false);
		}
	}

	const getCategories = async() => {
		try {
			setIsLoading(true);
			const { data } = await tableApi.get(`/categories`);
			setIsLoading(false);
			setCategories(data);
		} catch (error) {
			console.log(error);
			setStateMessage({
				...stateMessage,
				status: 'error',
				message: 'Error in the request'
			});
			setIsLoading(false);
		}
	}

	const deleteProduct = async(product: Product) => {
		try {
			setIsLoading(true);
			const { id } = product;
			await tableApi.delete(`/products/${id}`);
			const updatedProducts = productsList.filter((productElement: Product) => productElement.id !== id );
			setStateMessage({
				...stateMessage,
				status: 'success',
				message: 'Product deleted succesfully'
			});
			setProductsList(updatedProducts);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setStateMessage({
				...stateMessage,
				status: 'error',
				message: 'Error updating stock'
			});
			setIsLoading(false);
		}
	}

	const postProduct = async(product: ProductOUT, id?: number) => {
		try {

			setIsLoading(true);

			product = {
				...product,
				categoryId: product.category.id
			}

			if(product.images?.name) {
				const img = await uploadImage(product.images);
				product = {
					...product,
					images: [img.location]
				}
			}

			if(id) {
				const { data } = await tableApi.put(`/products/${id}`, product);
				const updatedProducts = productsList.map( (productElement: Product) => {
					if(productElement.id === data.id ) {
						return data;
					}
					return productElement;
				});
				setStateMessage({
					...stateMessage,
					status: 'success',
					message: 'Product updated successfully'
				});
				setIsLoading(false);
				setProductsList([...updatedProducts]);
				return;
			}
			
			const { data } = await tableApi.post(`/products/`, product);
			setStateMessage({
				...stateMessage,
				status: 'success',
				message: 'Product created successfully'
			});
			setIsLoading(false);
			setProductsList([...productsList, data]);
		} catch (error) {
			console.log(error);
			setStateMessage({
				...stateMessage,
				status: 'error',
				message: 'Error updating stock'
			});
			setIsLoading(false);
		}
	}

	const uploadImage = async(file: File) => {
		setIsLoading(true);
		try {
			const object = {
				"file": file
			}

			const { data } = await tableApi.post(`/files/upload`, object, {
				headers: {
				  'content-type': 'multipart/form-data',
				}
			});
			return data;
			
		} catch (error) {
			console.log(error)
			setStateMessage({
				...stateMessage,
				status: 'error',
				message: 'Error uploading image'
			});
			setIsLoading(false);
		}
	}

	return {
		// Data
		productsList,
		totalRecords,
		isLoading,
		sortParams,
		categories,
		stateMessage,
		// Methods
		getProducts,
		getCategories,
		getProductsSort,
		postProduct,
		deleteProduct,
		setStateMessage
	};
};
