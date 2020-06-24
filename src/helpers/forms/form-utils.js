export const getFieldValue = (form, name) => {
    let field = form.filter(field => field.name === name)[0];
    if(field.type === "phone"){
        return field.value.replace(/[^\d\-]/g, '');
    } else {
        console.log(field);
        return field.value || null;
    }
};
export const setFieldValue = (form, name, value) => {
    let field = form.filter(field => field.name === name)[0];
    field.value = value;
}
export const setFieldMessage = (form, name, message) => {
    let field = form.filter(field => field.name === name)[0];
    field.message = message;
};
export const cloneForm = (form) => {
    return form.map(field => Object.assign({}, field));
};
export const questionIsFlagged = (question) => {
    if(question.flags) {
        return question.flags.some(f => f.flaggable_answers.includes(question.value));
    }
    return false;
};
export const addHiddenField = (form, name, value) => {
    form.push({
        name,
        value,
        type: "hidden"
    });
};
export const containsField = (form, name) => {
    return form.some(q => q.name === name);
}