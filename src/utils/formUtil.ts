import * as React from 'react';

export const getFormData = <T>(e: React.FormEvent): T =>{
    e.preventDefault();
    const form = (e.target as HTMLFormElement);
    const formData = [].reduce.call(form.elements, (data: T, element: HTMLInputElement) => {
        data[element.name] = element.value;
        return data;
      }, {});
    return formData;
}

export default getFormData;