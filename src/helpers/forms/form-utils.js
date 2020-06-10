export const getFieldValue = (form, name) => {
    return form.filter(field => field.name === name)[0].value || null;
};