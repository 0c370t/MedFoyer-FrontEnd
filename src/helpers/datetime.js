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

export const padMinutes = (minutes) => {
    if(minutes < 10){
        return `0${minutes}`;
    } else {
        return `${minutes}`;
    }
}

export const formatTime = (date) => {
    try{
        if(!(date instanceof Date) || !date){
            return "Invalid Date";
        }
        let ampm = "pm";
        if(date.getHours() < 12){
            ampm = "am";
        }
        let minutes = padMinutes(date.getMinutes());

        return `${date.getHours() % 12}:${minutes} ${ampm}`;
    } catch{

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

export const formatForDisplay = (dateString, includeTime = false) => {
    if(!dateString) return '';
    let dateobj;
    if(dateString instanceof Date) {
        dateobj = new Date(dateString.getTime());
    } else {
        dateobj = new Date();
        let [year, month, date] = dateString.split('-');
        dateobj.setFullYear(year);
        dateobj.setMonth(month-1);
        dateobj.setDate(date);
    }
    let output = daysOfWeek[dateobj.getDay()] + ", ";
    output += months[dateobj.getMonth()] + " ";
    output += dateobj.getDate();
    if(includeTime) {
        output += ` @ ${dateobj.getHours() % 12}:${padMinutes(dateobj.getMinutes())} ${dateobj.getHours() > 12 ? "pm" : "am"}`
    }
    return output;
};


export const toAWSDate = (date) => {
    if(!date instanceof Date) return "";
    let output = `${date.getFullYear()}-${padMinutes(date.getMonth()+1)}-${padMinutes(date.getDate()+1)}`;
    return output;
};

export const isToday = (d1) => sameDay(d1, new Date());

export const sameDay = (d1, d2) => {
    if(!(d1 instanceof Date) || !(d2 instanceof Date)) return false;
    return (
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
    )
}