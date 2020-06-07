export const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const formatTime = (date) => {
    try{
        if(!(date instanceof Date) || !date){
            console.log(date);
            return "Invalid Date";
        }
        let ampm = "pm";
        if(date.getHours() < 12){
            ampm = "am";
        }
        let minutes = '';
        if(date.getMinutes() < 10){
            minutes = `0${date.getMinutes()}`;
        } else {
            minutes = `${date.getMinutes()}`;
        }
        return `${date.getHours() % 12}:${minutes} ${ampm}`;
    } catch{
        console.log(date);
    }
};

export const getCurrentDateForInput = () => {
    let output = '';
    let date = new Date();
    output += `${date.getFullYear()}-`;
    if(date.getMonth() < 9){
        output += "0" + (date.getMonth() + 1);
    } else {
        output += (date.getMonth() + 1);
    }
    output += "-";
    if(date.getDate().toString().length === 1){
        output += "0" + date.getDate();
    } else {
        output += date.getDate();
    }
    return output;
};

export const formatForDisplay = (dateString) => {
    if(!dateString) return '';
    let dateobj = new Date();
    let [year, month, date] = dateString.split('-');
    dateobj.setFullYear(year);
    dateobj.setMonth(month-1);
    dateobj.setDate(date);
    let output = daysOfWeek[dateobj.getDay()] + ", ";
    output += months[dateobj.getMonth()] + " ";
    output += dateobj.getDate();
    return output;
};