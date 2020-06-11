export const getFieldValue = (form, name) => {
    let field = form.filter(field => field.name === name)[0];
    if(field.type === "phone"){
        return field.value.replace(/[^\d\-]/g, '');
    } else {
        return field.value || null;
    }
};
export const setFieldMessage = (form, name, message) => {
    let field = form.filter(field => field.name === name)[0];
    field.message = message;
};
export const cloneForm = (form) => {
    return form.map(field => Object.assign({}, field));
};