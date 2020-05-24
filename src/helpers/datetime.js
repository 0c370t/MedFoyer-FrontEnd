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