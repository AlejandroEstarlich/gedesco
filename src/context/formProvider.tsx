import { useState } from 'react'
import { FormContext } from './formContext'

export const FormProvider = ({ children }: any) => {


    const [form, setForm] = useState({});
    const [ isOpen, setOpen ] = useState(false);
    const [ productsList, setProductsList ] = useState([]);
    const [ stateMessage, setStateMessage ] = useState([]);

    return (
        <FormContext.Provider value={{ isOpen, setOpen, form, setForm, productsList, setProductsList, stateMessage, setStateMessage }}>
            { children }
        </FormContext.Provider>
    )
}
