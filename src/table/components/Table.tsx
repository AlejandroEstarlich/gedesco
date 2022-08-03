import React, { createRef, useRef } from 'react';
import { useContext, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Column } from 'primereact/column';
import { Product } from '../../models';
import { TableService } from '../../services/TableService';
import { Form } from './Form';
import { FormContext } from '../../context';
import { Button } from 'primereact/button';

export const Table = () => {
    const toast = createRef<Toast>();
    const { productsList, isLoading, getProducts, getProductsSort, sortParams, totalRecords, deleteProduct, stateMessage, setStateMessage } = TableService();
    const { setOpen, setForm } = useContext( FormContext );
    useEffect(() => {
      getProducts();
    }, []);

    useEffect(() => {
      onToastHandle();
    }, [productsList]);


    const onOpenForm = (row?: Product) => {
        if(row?.id) {
            setForm(row)
        }
        setOpen(true);
    }

    const removeProduct = (row: Product) => {
        deleteProduct(row);
    }

    const onToastHandle = () => {
        if(!stateMessage.status){
            return;
        }
        toast.current!.show({severity:stateMessage.status, summary: 'Success', detail:stateMessage.message, life: 3000});
        setStateMessage({});

    }
    
    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    const onPage = (event: any) => {
        getProductsSort( event );
    }

    const imageBodyTemplate = (rowData: Product) => {
        return (
            <React.Fragment>
                <img alt={rowData.title} src={rowData.images![0]} width={64} style={{ verticalAlign: 'middle' }} />
            </React.Fragment>
        );
    }
    const priceBodyTemplate = (rowData: Product) => {
        return formatCurrency(rowData.price);
    }
    const categoryBodyTemplate = (rowData: Product) => {
        return rowData.category.name;
    }
    const actionsBodyTemplate = (rowData: Product) => {
        return (
            <React.Fragment>
                <Button label="Edit" onClick={ () => onOpenForm(rowData) } icon="pi pi-pencil" />
                <Button label="Delete" onClick={ () => removeProduct(rowData) } icon="pi pi-trash" className="p-button-danger" />
            </React.Fragment>
        )
    }

    return (
        <>
            <Button label="New Product" onClick={ () => setOpen(true) } />
            <div className="card w-11 m-auto">
                <DataTable 
                    value={productsList} 
                    responsiveLayout="scroll"
                    dataKey="id"
                    paginator 
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    first={sortParams.first} 
                    rows={10} 
                    totalRecords={totalRecords}
                    sortField={sortParams.sortField}
                    sortOrder={sortParams.sortOrder}
                    onPage={onPage}
                    loading={isLoading}>
                        <Column field="image" header="Image" body={imageBodyTemplate}  />
                        <Column field="title" header="Title" sortable />
                        <Column field="price" sortable header="Price" body={priceBodyTemplate}  />
                        <Column field="description" header="Description" sortable />
                        <Column field="category" header="Category" sortable body={ categoryBodyTemplate } />
                        <Column field="actions" header="Actions" body={ actionsBodyTemplate } />
                </DataTable>

            </div>
            <Form />
            <Toast ref={toast} />
        </>
    );
}
