import React, { createContext } from "react";
import { Product } from "../models";

export const FormContext = createContext({} as ReturnType<typeof useValue>);

const useValue = () => {
    const [isOpen, setOpen] = React.useState<any>();
    const [form, setForm] = React.useState<any>({});
    const [productsList, setProductsList] = React.useState<any>({});
    const [stateMessage, setStateMessage] = React.useState<any>({});

    return {
        isOpen,
        setOpen,
        form,
        setForm,
        productsList,
        setProductsList,
        stateMessage,
        setStateMessage
    }
}