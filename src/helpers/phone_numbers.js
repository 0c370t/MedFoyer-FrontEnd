export const phoneClean = (value) => {
    let phone = value.replace(/\D/g, '');
    const match = phone.match(/(\d{1,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
        phone = `(${match[1]})${match[2] ? '-' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
    }
    return phone
};