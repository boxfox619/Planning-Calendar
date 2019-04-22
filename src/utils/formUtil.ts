import * as React from 'react';

export const getFormData = <T>(e: React.FormEvent): T =>{
    e.preventDefault();
    const form = (e.target as HTMLFormElement);
    const formData = new FormData(form);
    const data = {} as T;
    formData.forEach((value, key) => {
        data[key] = value;
    });
    return data;
}

export default getFormData;