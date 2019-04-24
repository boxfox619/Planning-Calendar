import { getFormData } from '../formUtil';

interface FormType {
    test: string,
    test2: string
}

describe('<TaskModal task={task}/>', () => {

    it('should submit form', () => {
        const preventMock = jest.fn();
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'test';
        input.value = '4124';
        const input2 = document.createElement('input');
        input2.type = 'text';
        input2.name = 'test2';
        input2.value = '41242';
        form.appendChild(input);
        form.appendChild(input2);
        const formEvent = {
            target: form as HTMLFormElement,
            preventDefault: preventMock,
          } as unknown as React.FormEvent
        const formData = getFormData<FormType>(formEvent);
        expect(formData.test).toBe('4124');
        expect(formData.test2).toBe('41242');
        expect(preventMock.mock.calls.length).toBe(1);
    });

});