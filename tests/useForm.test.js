/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import { useForm } from '../src/hooks/useForm';


describe('Pruebas en useForm', () => {

    const initialForm = {
        title: "Test",
        price: "100",
        description: "Its a test",
        image: {},
        category: {},
    }


    test('Should have return default values', () => {
        
        const { result } = renderHook( () => useForm(initialForm)  );
        expect(result.current).toEqual({
            title: initialForm.title,
            price: initialForm.price,
            description: initialForm.description,
            image: initialForm.image,
            category: initialForm.category,
            formState: initialForm,
            isFormValid: true,
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function ),
        });

    });


    test('Should change form title', () => {

        const newValue = 'New Product';
        const { result } = renderHook( () => useForm(initialForm)  );
        const { onInputChange } = result.current;
        
        act(()=>{
            onInputChange({ target: { name: 'title', value: newValue } })
        });    
        console.log(result)
        expect( result.current.title ).toBe( newValue );
        expect( result.current.formState.title ).toBe( newValue );

        
    });

    test('Should reset the form', () => {

        const newValue = 'New Value';
        const { result } = renderHook( () => useForm(initialForm)  );
        const { onInputChange, onResetForm } = result.current;
        
        act(()=>{
            onInputChange({ target: { title: 'title', value: newValue } });
            onResetForm();
        });
                
        expect( result.current.title ).toBe( initialForm.title );
        expect( result.current.formState.title ).toBe( initialForm.title );

        
    });


    
});