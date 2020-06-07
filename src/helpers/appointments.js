import {within} from "./comparison";

export function sortByAppointmentTime(appt1, appt2){
    if(appt1.appointment_time < appt2.appointment_time){
        return -1;
    }
    if(appt1.appointment_time > appt2.appointment_time){
        return 1;
    }
    return 0;
}
export function sortByCheckInTime(appt1, appt2){
    if(appt1.checkin_time < appt2.checkin_time){
        return 1;
    }
    if(appt1.checkin_time > appt2.checkin_time){
        return -1;
    }
    return 0;
}

export function getFilterFunction(filterValues){
    let [year, month, date] = filterValues['date'].split('-');

    let fromTime = new Date();
    let fromHour = filterValues['from-time'].split(":")[0];
    let fromMinute = filterValues['from-time'].split(":")[1];
    fromTime.setHours(fromHour);
    fromTime.setMinutes(fromMinute);
    fromTime.setDate(date);
    fromTime.setMonth(month - 1);
    fromTime.setFullYear(year);

    let toTime = new Date();
    let toHour = filterValues['to-time'].split(":")[0];
    let toMinute = filterValues['to-time'].split(":")[1];
    toTime.setHours(toHour);
    toTime.setMinutes(toMinute);
    toTime.setDate(date);
    toTime.setMonth(month - 1);
    toTime.setFullYear(year);

    return function(appt){
        if(!within(fromTime, appt.appointment_time, toTime)){
            return false;
        }
        return true;
    }
}