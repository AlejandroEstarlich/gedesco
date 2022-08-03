import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useForm } from "../../hooks/useForm";
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { TableService } from "../../services/TableService";
import { FormContext } from "../../context";
import { Category } from "../../models";

const formFields = {
    title: "",
    price: "",
    description: "",
    images: {},
    category: {},
};

const formValidations = {
    title: [(value: string) => value?.length > 0, "Product title is mandatory"],
    price: [(value: number) => value > 0, "Product price is mandatory"],
    description: [
        (value: string) => value?.length > 0,
        "Product description is mandatory",
    ],
    images: [(value: File) => value?.name?.length > 0, "Product image is mandatory"],
    category: [(value: Category) => value?.id, "Product category is mandatory"],
};

export const Form = () => {
    const { form, setForm, isOpen, setOpen } = useContext(FormContext);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        title,
        price,
        description,
        images,
        category,
        onInputChange,
        formState,
        titleValid,
        priceValid,
        imagesValid,
        descriptionValid,
        categoryValid,
        isFormValid,
    } = useForm(form, formValidations);
    const { categories, getCategories, postProduct } = TableService();
    useEffect(() => {
        getCategories();
    }, []);
    const onFileInputChange = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        if (e.target!.files === 0) return;
        setForm({
            ...formState,
            images: e.target.files[0],
        });
    };

    const onHide = () => {
        form.id && setForm(formFields);
        setOpen(false);
        setFormSubmitted(false);
    };

    const onSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        postProduct(form, form.id);
        setForm(formFields);
        setFormSubmitted(false);
        onHide();
    };

    return (
        <Dialog
            header={form.title || "Create new product"}
            visible={isOpen}
            style={{ width: "50vw" }}
            onHide={onHide}
        >
            <form onSubmit={onSubmit}>
                <span className="p-float-label mt-2">
                    <InputText
                        className="w-full"
                        id="title"
                        name="title"
                        value={title || ''}
                        onChange={onInputChange}
                    />
                    <label htmlFor="title">Title</label>
                    {!!titleValid && formSubmitted && <span>{titleValid}</span>}
                </span>
                <span className="p-float-label mt-2">
                    <Dropdown
                        className="w-full"
                        inputId="category"
                        placeholder={category?.name}
                        value={category}
                        options={categories}
                        onChange={onInputChange}
                        optionLabel="name"
                        name="category"
                    />
                    <label htmlFor="cateogry">Category</label>
                    {!!categoryValid && formSubmitted && <span>{categoryValid}</span>}
                </span>
                <span className="p-float-label mt-2">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-dollar"></i>
                        </span>
                        <span className="p-float-label">
                            <InputText
                                id="price"
                                type="number"
                                className="w-full"
                                value={price}
                                style={{ display: 'block' }}
                                name="price"
                                onChange={onInputChange}
                            />
                            <label htmlFor="price">Price</label>
                        </span>
                    </div>
                    {!!priceValid && formSubmitted && <span>{priceValid}</span>}
                </span>
                <span className="p-float-label mt-2">
                    <InputTextarea
                        className="w-full"
                        id="description"
                        style={{ display: 'block' }}
                        value={description}
                        onChange={onInputChange}
                        name="description"
                        rows={3}
                    />
                    <label htmlFor="textarea">Textarea</label>
                    {
                        (!!descriptionValid && formSubmitted) && <span>{descriptionValid}</span>
                    }
                </span>

                <span className="p-float-label my-2">
                    <input
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        name="images"
                        onChange={onFileInputChange}
                    />
                    {
                        (!!imagesValid && formSubmitted) && <span>{imagesValid}</span>
                    }
                </span>
 

                <Button
                    type="submit"
                    label="Save"
                    className="w-full p-button-success mt-2"
                />
            </form>
        </Dialog>
    );
};
