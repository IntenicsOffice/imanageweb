import date from 'date-and-time';
import moment from 'moment';

const CustomFunction  = {

    toCapitalize(sentence) {
        if (!sentence) return '';
        return sentence
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    toSentenceCase(str){
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    // backend functions here
    currentDate(){
        const now = new Date();
        const current_date = date.format(now, 'YYYY-MM-DD') // => '2015/01/02 23:14:05'
        return current_date;
    },
    // currentDate(){
    //     const now = new Date();
    //     const current_date = date.format(now, 'YYYY-MM-DD') // => '2015/01/02 23:14:05'
    //     return current_date;
    // },

    currentTime(){
        // let time_zone ;
        // let now ;
        // time_zone = new Date().toLocaleString("en-US", {timeZone: "Asia/kolkata"});
        // now = new Date(time_zone);
        // return date.format(now, 'hh:mm A'); // => '11:14 PM

        var time = new Date().toLocaleTimeString("en-US", {hour: '2-digit', minute: "2-digit", hour12: true, timeZone: "Asia/kolkata"});
        return time;
    },

    previousDate(inputDate){
        const date = new Date(inputDate);
        date.setDate(date.getDate() - 1);
        const dayBefore = date.toISOString().split('T')[0];
        return dayBefore;
    },

    currentYearMonthDay(date_format){
        const now = new Date();
        const year_month_day = date.format(now, date_format) // date_format = 'YYYY' or 'MM' or 'DD' // 'YYYY/MM/DD'
        return year_month_day;
    },

    specifyDateYearMonthDay(inputDate, date_format){
        const now = new Date(inputDate);
        const year_month_day = date.format(now, date_format) // date_format = 'YYYY' or 'MM' or 'DD' // 'YYYY/MM/DD'
        return year_month_day;
    },

    seperateYearMonthDay(inputDate){
        const now = new Date(inputDate);
        const year = date.format(now, "YYYY") // date_format = 'YYYY' or 'MM' or 'DD' // 'YYYY/MM/DD'
        const month = date.format(now, "MM") // date_format = 'YYYY' or 'MM' or 'DD' // 'YYYY/MM/DD'
        const day = date.format(now, "DD") // date_format = 'YYYY' or 'MM' or 'DD' // 'YYYY/MM/DD'

        return { year, month, day };
    },

    // getSpecifyDateYearMonthDay(inputDate, date_format){
    //     const now = new Date(inputDate);
    //     const year_month_day = date.format(now, date_format) // date_format = 'YYYY' or 'MM' or 'DD' // 'YYYY/MM/DD'
    //     return year_month_day;
    // },

    monthName(type='short'){
        const now = new Date();  
        const month_name = now.toLocaleString('en-us', { month: type }); // type = 'long', 'short' 
        return month_name;
    },

    specificMonthName(inputDate, type='short'){
        const now = new Date(inputDate);  
        const month_name = now.toLocaleString('en-us', { month: type }); // type = 'long', 'short' 
        return month_name;
    },

    dayName(date, type='long'){
        const now = new Date(date); 
        const day_name = now.toLocaleDateString('en-us', { weekday: type }); // type = 'long', 'short' 
        return day_name;
    },

    getMonthNameByCode(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString([], { month: 'long' });
    },
      
    currentYear(){
        const now = new Date();
        const year = now.getFullYear(); 
        return year;
    },

    currentMonth(){

        // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        // const d = new Date();
        // let name = month[d.getMonth()];

        const now = new Date();
        const month = now.getMonth() + 1; 

        return month;
    },

    dateFormat(inputDate){

        let day, month, year;
        var new_date = new Date(inputDate);

        day = new_date.getDate();
        month = new_date.getMonth() + 1;
        year = new_date.getFullYear();

        if(day < 10) {
            day = '0'+day;
        } 

        if(month < 10) {
            month='0'+month;
        }
        return `${year}-${month}-${day}`; 
    },

    getFormatedDate(inputDate, date_format='DD-MM-YYYY'){
        // const now = new Date(inputDate);
        // const result = date.format(now, date_format) // date_format = 'YYYY' or 'MM' or 'DD' // 'YYYY/MM/DD'
        const parsedDate = moment(inputDate, 'YYYY-MM-DD');
        const formattedDate = parsedDate.format(date_format);

        return formattedDate;
    },

    convertToDateYYYYMMDD(dateInput) {
        const date = moment(new Date(dateInput));
        return date.isValid() ? date.format('YYYY-MM-DD') : 'Invalid date';
    },

    timeFormat(value){
        const pattern = date.compile('hh:mm');
        const formated_time = date.format(new Date(value), pattern);

        return formated_time;
    },

    stringPassword(len){
        var gen_pass = "";
        var charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for( var i=0; i < len; i++ ){
            gen_pass +=charset.charAt(Math.floor(Math.random()*charset.length));
        }
        return gen_pass;
    },

    generateRandomId(length = 12) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    },

    randomString(len){
        var gen_pass = "";
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for( var i=0; i < len; i++ ){
            gen_pass +=charset.charAt(Math.floor(Math.random()*charset.length));
        }
        return gen_pass;
    },

    randomNumber() {
        var minm = 100000;
        var maxm = 999999;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    },

    randomNumberTenDigits() {
        var minm = 100000000;
        var maxm = 9999999999;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    },

    randomNumberFourDigits() {
        var minm = 1000;
        var maxm = 9999;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    },

    randomUserId(){
        var ustr = CustomFunction.randomString(2);
        var unum = CustomFunction.randomNumber();
        return ustr+unum;
    },

    capitalize(str){
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.slice(1);
        // return str[0].toUpperCase() + str.slice(1);
    },

    nextDayDate(currentDate, next_days=1){
        const date = new Date(currentDate)
        const nextDate = new Date(date)
        nextDate.setDate(date.getDate() + next_days)
        var next_day = CustomFunction.dateFormat(nextDate);
        return next_day;
    },

    nextMonthDate(current_date){
        var d = new Date(current_date);
        d.setMonth(d.getMonth() + 1);
        const next_date = CustomFunction.dateFormat(d);

        return next_date;
    },

    nextYearDate(current_date){
        const currentDate = new Date(current_date);
        const nextYearDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());

        return nextYearDate.toISOString().split('T')[0];
    },

    calculateTimeDifference(inTime, outTime) {
        const inDateTime = new Date(inTime);
        const outDateTime = new Date(outTime);

        // Calculate the time difference in milliseconds
        const timeDifference = outDateTime - inDateTime;
      
        // Convert the time difference to hours, minutes, and seconds
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      
        return { hours, minutes, seconds };
    },

    getTotalHoursMinuts(total_hours){
        const hours = Math.floor(total_hours);
        const minutes = Math.round((total_hours - hours) * 60);

        const hours_minuts = `${hours}:${minutes}` ;
        return hours_minuts;
    },

    convertMinutesToHours(total_minutes) {
        const hours = Math.floor(total_minutes / 60); // Get the integer part of the hours
        const minutes = total_minutes % 60; // Get the remaining minutes
        const hours_minutes_decimal = (hours + (minutes / 60)) ;
        const hours_minutes = `${hours}:${minutes}` ;

        return { hours_minutes , hours_minutes_decimal};
    },

    timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    },

    getLastDateOfMonth(year, month) {
        const lastDate = moment(`${year}-${month}`, 'YYYY-MM').endOf('month').format('YYYY-MM-DD');
        return lastDate;
    },

    weekoffDaysCount(year, month, weekOffDays) {
        const weekOffDates = [];
        let month_days = 0;
        const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
        
        // Loop through each day of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = moment(`${year}-${month}-${i}`, 'YYYY-MM-DD');
            const currentDayName = currentDate.format('dddd');

            // If the current day is a week off day, add it to the list
            if (weekOffDays.includes(currentDayName)) {
                // weekOffDates.push(i);
                weekOffDates.push({
                    weekoff_date:currentDate.format('YYYY-MM-DD')
                });
            }
            month_days = i;
        }
        const weekOffCount = weekOffDates.length;    
        return  {month_days, weekOffDates, weekOffCount} ;
    },

    convertTimeStringToISOString(date , timeString) {
        // Create a new Date object with an arbitrary date (e.g., "1970-01-01")
        const arbitraryDate = new Date(date + " " + timeString);
      
        // Use toISOString() to get the full ISO 8601 formatted date string
        const isoString = arbitraryDate.toISOString();
      
        return isoString;
    },

    checkFullHalfDays(first_date, in_time, out_time){
        let day_type;
        const date = new Date(first_date).toISOString().split('T')[0];
        const convert_intime_iso_format = CustomFunction.convertTimeStringToISOString(date, in_time);
        const convert_outtime_iso_format = CustomFunction.convertTimeStringToISOString(date, out_time);
        const working_hour_data = CustomFunction.calculateTimeDifference(convert_intime_iso_format, convert_outtime_iso_format);
        
        if (working_hour_data.hours >= 3 && working_hour_data.hours < 7) {
            day_type = "half day";
        }else if (working_hour_data.hours >= 7) {
            day_type = "full day";
        }

        return day_type;
    },


    convertHoursIntoMinutes(hours){
        const minutes = (hours * 60);
        return {hours, minutes};
    },

    parseTime(timeString) {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
    
        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }
    
        return { hours, minutes };
    },

    //calculateHoursWorked
    old_getCalculateTimeDifference(startTime, stopTime) {
        const start = this.parseTime(startTime);
        const stop = this.parseTime(stopTime);

        console.log("getCalculateTimeDifference", start, stop);

        // Create Date objects for start and stop times
        const startDate = new Date();
        startDate.setHours(start.hours, start.minutes, 0);

        const stopDate = new Date();
        stopDate.setHours(stop.hours, stop.minutes, 0);

        // If stop time is earlier in the day than start time, add one day to stop time
        if (stopDate <= startDate) {
            stopDate.setDate(stopDate.getDate() + 1);
        }
        const difference = stopDate - startDate;
        // Convert the difference to hours
        const hoursWorked = difference / (1000 * 60 * 60);

        const workedHoursMinutes = this.convertHoursIntoMinutes(hoursWorked);
        return workedHoursMinutes;
    },



    getCalculateTimeDifference(inTime, outTime){
        // const startTime = moment('8:00 AM', 'h:mm A');
        // const endTime = moment('5:20 PM', 'h:mm A');        

        const startTime = moment(inTime, 'h:mm A');
        const endTime = moment(outTime, 'h:mm A');

        // Calculate the difference in hours
        const duration = moment.duration(endTime.diff(startTime));
        const hours = duration.asHours();
        const minutes = duration.asMinutes();

        return {hours, minutes};
    },

    convertTimeTo24HourMinuts(time12h) {
        // const [timePart, modifier] = time.split(' ');

        const match = time12h.match(/(\d{1,2}:\d{2})\s?(AM|PM)/i);
        let timePart ;
        let rawModifier ;

        if (match) {
            timePart = match[1];
            rawModifier = match[2];
        } else {
            console.error('Unexpected time format:', time12h);
        }

        const modifier = rawModifier.toUpperCase();
        let [hours, minutes] = timePart.split(':');

        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
    },

    old_calculateShiftHoursExcludeLunch(){
        const startTime = new Date();
        const endTime = new Date();

        const in_time = "10:00 PM";
        const out_time = "6:00 AM";
        // const lunch_start = "1:00 AM";
        // const lunch_end = "1:30 AM";

        const start = this.convertTimeTo24HourMinuts(in_time);
        const end = this.convertTimeTo24HourMinuts(out_time);
        // startTime.setHours(10, 0, 0); // 10:30 PM
        // endTime.setHours(17, 30, 0); // 6:00 AM of the next day

        startTime.setHours(start.hours, start.minutes, 0);
        endTime.setHours(end.hours, end.minutes, 0);
       
        // Adjust end time to next day if it is before start time
        if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const lunchStart = new Date(startTime);
        lunchStart.setHours(1, 0, 0); // 1:00 PM

        const lunchEnd = new Date(lunchStart);
        lunchEnd.setHours(1, 30, 0); // 1:30 PM

        const totalShiftTime = (endTime - startTime) / (1000 * 60 * 60); // Total shift time in hours
        const lunchTime = (lunchEnd - lunchStart) / (1000 * 60 * 60); // Lunch time in hours
        const workingHours = totalShiftTime - lunchTime;
        const workingMinutes = (workingHours * 60);
        return { hours:workingHours, minutes:workingMinutes };

    },

    convertToTotalMinutes(time) {
        return time.hours * 60 + time.minutes;
    },
    
    calculateDelayLogin(start_time, stop_time, in_time, out_time, lunch_start_time, lunch_stop_time, late_attendance_duration){
        let delay_time = 0;
        const firstHalf = this.calculateShiftHours(start_time, lunch_start_time);
        const hoursMinutes = this.calculateShiftHours(start_time, in_time);

        if (hoursMinutes.minutes < firstHalf.minutes) {
            if (hoursMinutes.minutes > late_attendance_duration) {
                delay_time = hoursMinutes.minutes;
            }
        }
        if (delay_time === 0) {
            const secondHalf = this.calculateShiftHours(lunch_stop_time, stop_time);
            const secondHalfDelay = this.calculateShiftHours(lunch_stop_time, in_time);
            if (secondHalfDelay.minutes < secondHalf.minutes) {
                delay_time = secondHalfDelay.minutes;
            }
        }
        
        return  delay_time ;
    },

    calculateEarlyLogin(start_time, in_time, lunch_start_time){
        let early_login = 0;
        // const firstHalf = this.calculateShiftHours(start_time, lunch_start_time);
        // const hoursMinutes = this.calculateShiftHours(in_time, start_time);
        // if (hoursMinutes.minutes < firstHalf.minutes) {
        //     early_login = hoursMinutes.minutes;
        // }

        if (CustomFunction.convertTo24Hour(in_time) < CustomFunction.convertTo24Hour(start_time)) {
            const hoursMinutes = this.calculateShiftHours(in_time, start_time);
            early_login = hoursMinutes.minutes;
            
        }

        return early_login ;
    },

    calculateOverTime(stop_time, out_time){
        let over_time = 0;
        
        if (CustomFunction.convertTo24Hour(out_time) > CustomFunction.convertTo24Hour(stop_time) ) {
            const hoursMinutes = this.calculateShiftHours(stop_time, out_time);
            over_time = hoursMinutes.minutes;
        }
        return over_time ;
    },

    calculateEarlyLogout(start_time, stop_time, out_time, lunch_start_time, lunch_stop_time){
        let early_logout = 0;
        // CustomFunction.convertTo24Hour(out_time)
        
        const firstHalf = this.calculateShiftHours(start_time, lunch_start_time);
        const secondHalf = this.calculateShiftHours(lunch_stop_time, stop_time);

        const hoursMinutes = this.calculateShiftHours(out_time, stop_time);

        // const lunchMinutes = this.calculateShiftHours(out_time, lunch_stop_time);
        // console.log("lunchMinutes", lunchMinutes);
        // console.log("hoursMinutes", hoursMinutes);
        if (hoursMinutes.minutes < firstHalf.minutes) {
            early_logout = hoursMinutes.minutes;
        }

        if (early_logout === 0) {
            if (hoursMinutes.minutes < secondHalf.minutes) {
                early_logout = hoursMinutes.minutes;
            }
        }
        return early_logout;
    },

    calculateShiftHours(in_time, out_time){
        const startTime = new Date();
        const endTime = new Date();

        const start = this.convertTimeTo24HourMinuts(in_time);
        const end = this.convertTimeTo24HourMinuts(out_time);
        
        startTime.setHours(start.hours, start.minutes, 0);
        endTime.setHours(end.hours, end.minutes, 0);
        
        // Adjust end time to next day if it is before start time
        if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const totalShiftTime = (endTime - startTime) / (1000 * 60 * 60); // Total shift time in hours
        const workingHours = totalShiftTime ;
        const workingMinutes = (workingHours * 60);

        return { hours:workingHours, minutes:workingMinutes };
    },

    calculateShiftHoursExcludeLunch(in_time, out_time, lunch_start_time, lunch_stop_time){
        const startTime = new Date();
        const endTime = new Date();

        const start = this.convertTimeTo24HourMinuts(in_time);
        const end = this.convertTimeTo24HourMinuts(out_time);
        const lunchStart_data = this.convertTimeTo24HourMinuts(lunch_start_time);
        const lunchEnd_data = this.convertTimeTo24HourMinuts(lunch_stop_time);

        startTime.setHours(start.hours, start.minutes, 0);
        endTime.setHours(end.hours, end.minutes, 0);
        
        // Adjust end time to next day if it is before start time
        if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const lunchStart = new Date(startTime);
        // lunchStart.setHours(1, 0, 0); // 1:30 PM
        lunchStart.setHours(lunchStart_data.hours, lunchStart_data.minutes, 0); // 1:00 PM
        
        const lunchEnd = new Date(lunchStart);
        lunchEnd.setHours(lunchEnd_data.hours, lunchEnd_data.minutes, 0); // 1:00 PM
        // lunchEnd.setHours(1, 30, 0); // 1:30 PM

        const totalShiftTime = (endTime - startTime) / (1000 * 60 * 60); // Total shift time in hours
        const lunchTime = (lunchEnd - lunchStart) / (1000 * 60 * 60); // Lunch time in hours
        const workingHours = totalShiftTime - lunchTime;
        const workingMinutes = (workingHours * 60);

        // console.log("&&&&&&&&&&&&&&&&&&&&&&",this.calculateShiftHours(in_time, out_time));

        return { hours:workingHours, minutes:workingMinutes };
    },

    newgetCalculateTimeDifference(start, end) {
        const startDate = new Date();
        const endDate = new Date();

        startDate.setHours(start.hours, start.minutes, 0);
        endDate.setHours(end.hours, end.minutes, 0);

        // Adjust end time to the next day if it is before start time
        if (endDate < startDate) {
            endDate.setDate(endDate.getDate() + 1);
        }

        const diff = (endDate - startDate) / (1000 * 60); // Difference in minutes
        return {
            hours: Math.floor(diff / 60),
            minutes: diff % 60
        };
    },


    manageWorkingTime(workingMinutes, start_time, stop_time, lunch_start_time, lunch_stop_time, in_time, out_time, late_attendance_duration){
        let earlyLogin = 0;
        let delayLogin = 0;
        let overTime = 0;
        let earlyLogout = 0;

        earlyLogin = this.calculateEarlyLogin(start_time, in_time, lunch_start_time);
        // console.log("earlyLogin", earlyLogin);
        delayLogin = this.calculateDelayLogin(start_time, stop_time, in_time, out_time, lunch_start_time, lunch_stop_time, late_attendance_duration);
        // console.log("delayLogin", delayLogin);
        overTime = this.calculateOverTime(stop_time, out_time);
        // console.log("overTime", overTime);
        earlyLogout = this.calculateEarlyLogout(start_time, stop_time, out_time, lunch_start_time, lunch_stop_time);
        // console.log("earlyLogout", earlyLogout);
        
        return {
            early_login:earlyLogin,
            delay_time:delayLogin,
            early_leave_minutes:earlyLogout,
            over_time:overTime,
            present_minutes : (workingMinutes - (earlyLogout + delayLogin)),
        }
    },

    second_manageWorkingTime(workingMinutes, start_time, stop_time, lunch_start_time, lunch_stop_time, in_time, out_time, late_attendance_duration){
        
        let early_login = 0 ;
        let delay_time = 0 ;
        let over_time = 0 ;
        let early_leave_minutes = 0 ;

        // const da = this.calculateShiftHoursExcludeLunch( start_time, stop_time, lunch_start_time, lunch_stop_time, in_time, out_time, late_attendance_duration );
        // console.log("calculateShiftHours", da)

        if ( CustomFunction.convertTo24Hour(in_time) < CustomFunction.convertTo24Hour(lunch_start_time) ) {
            //First Half
            if (CustomFunction.convertTo24Hour(in_time) >= CustomFunction.convertTo24Hour(start_time)) {
                // delay login
                const hoursMinuts = CustomFunction.getCalculateTimeDifference(start_time, in_time);
                if (hoursMinuts.minutes > late_attendance_duration) {
                    delay_time = hoursMinuts.minutes;
                }
            }else{
                // early login
                const hoursMinuts = CustomFunction.getCalculateTimeDifference(in_time, start_time);
                early_login = hoursMinuts.minutes;
            }
        }else{
            //Second Half
            if ( CustomFunction.convertTo24Hour(in_time) > CustomFunction.convertTo24Hour(lunch_stop_time) ) {
                // delay login
                const hoursMinuts = CustomFunction.getCalculateTimeDifference(lunch_stop_time, in_time);
                delay_time = hoursMinuts.minutes;
            }
        }

        if (CustomFunction.convertTo24Hour(out_time) >= CustomFunction.convertTo24Hour(stop_time)) {
            const hoursMinuts = CustomFunction.getCalculateTimeDifference(stop_time, out_time);
            over_time = hoursMinuts.minutes;
        }else{
            if (CustomFunction.convertTo24Hour(out_time) <= CustomFunction.convertTo24Hour(lunch_start_time)) {
                const hoursMinuts = CustomFunction.getCalculateTimeDifference(out_time, stop_time);
                const lunchDuration = CustomFunction.getCalculateTimeDifference(lunch_start_time, lunch_stop_time);
                early_leave_minutes = (hoursMinuts.minutes - lunchDuration.minutes);
            }else if (CustomFunction.convertTo24Hour(out_time) <= CustomFunction.convertTo24Hour(lunch_stop_time)) {
                const hoursMinuts = CustomFunction.getCalculateTimeDifference(out_time, stop_time);
                const lunchDuration = CustomFunction.getCalculateTimeDifference(out_time, lunch_stop_time);
                early_leave_minutes = (hoursMinuts.minutes - lunchDuration.minutes);
            }else{
                const hoursMinuts = CustomFunction.getCalculateTimeDifference(out_time, stop_time);
                early_leave_minutes = hoursMinuts.minutes;
            }
        }
        
        return {
            early_login,
            delay_time,
            early_leave_minutes,
            over_time,
            present_minutes : (workingMinutes - (early_leave_minutes + delay_time)),
        }
    },

    old_manageWorkingTime(start_time, stop_time, lunch_start_time, lunch_stop_time, in_time, out_time, late_attendance_duration){

        let total_working_time = CustomFunction.getCalculateTimeDifference(start_time, stop_time);
        let total_present_time = CustomFunction.getCalculateTimeDifference(in_time, out_time);
        
        let delay_time = 0 ;
        let over_time = 0 ;
        let early_leave_minutes = 0 ;

        // exclude lunch time
        // const in_time_24_hours = CustomFunction.convertTo24Hour(in_time) ;
        // const out_time_24_hours = CustomFunction.convertTo24Hour(out_time);
        // const lunch_start_time_24_hours = CustomFunction.convertTo24Hour(lunch_start_time);
        // const lunch_stop_time_24_hours = CustomFunction.convertTo24Hour(lunch_stop_time);
        // let lunchData = 0
        // if ( (in_time_24_hours < lunch_start_time_24_hours) && (out_time_24_hours > lunch_stop_time_24_hours) ) {
        //     lunchData = CustomFunction.getCalculateTimeDifference(lunch_start_time, lunch_stop_time);
        // }else if( (in_time_24_hours < lunch_start_time_24_hours) && (out_time_24_hours <= lunch_stop_time_24_hours)){
        //     //first half
        //     console.log("first half");
        //     lunchData = CustomFunction.getCalculateTimeDifference(lunch_start_time, out_time);
        // }else if( (in_time_24_hours >= lunch_start_time_24_hours) && (in_time_24_hours <= lunch_stop_time_24_hours)){
        //     //second half
        //     console.log("second half");
        //     lunchData = CustomFunction.getCalculateTimeDifference(in_time, lunch_stop_time);
        // }
        // console.log("lunch_minuts", lunchData);

        if (CustomFunction.convertTo24Hour(in_time) < CustomFunction.convertTo24Hour(lunch_start_time)) {
            const hoursMinuts = CustomFunction.getCalculateTimeDifference(start_time, in_time);
            if (hoursMinuts.minutes > late_attendance_duration) {
                delay_time = hoursMinuts.minutes;
            }
        }else{
            const hoursMinuts = CustomFunction.getCalculateTimeDifference(lunch_stop_time, in_time);
            delay_time = hoursMinuts.minutes;
        }

        if (total_present_time.minutes > total_working_time.minutes ) {
            over_time = total_present_time.minutes - total_working_time.minutes;
        }else{
            early_leave_minutes = total_working_time.minutes - total_present_time.minutes ;
        }
        
        return {
            working_minutes : total_working_time.minutes,
            present_minutes : total_present_time.minutes - over_time,
            delay_time,
            over_time,
            early_leave_minutes,
            // lunch_minutes: lunchData.minutes,
        }
    },

    isBeforeLunchTime(inTime, lunchTime) {
        const inTimeParsed = this.parseTime(inTime);
        const lunchTimeParsed = this.parseTime(lunchTime);
    
        // Create Date objects for in_time and lunch_time
        const inDate = new Date();
        inDate.setHours(inTimeParsed.hours, inTimeParsed.minutes, 0);
    
        const lunchDate = new Date();
        lunchDate.setHours(lunchTimeParsed.hours, lunchTimeParsed.minutes, 0);
    
        // Compare the two Date objects
        return inDate < lunchDate;
    },

    convertTo24Hour(time12h) {
        const match = time12h.match(/(\d{1,2}:\d{2})\s?(AM|PM)/i);
        let time ;
        let rawModifier ;

        if (match) {
            time = match[1];
            rawModifier = match[2];
        } else {
            console.error('Unexpected time format:', time12h);
        }

        const modifier = rawModifier.toUpperCase();
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);
        
        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        }
        if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }
    
        // Format hours and minutes to be two digits
        hours = hours.toString().padStart(2, '0');
        minutes = minutes.padStart(2, '0');
    
        return `${hours}:${minutes}`;
    },

    timeToMinutes(time) {
        const [hours, minutes, period] = time.split(/:| /);
        let totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
        if (period === 'PM' || period === 'pm') {
            totalMinutes += 12 * 60; // Add 12 hours in minutes if PM
        }
        return totalMinutes;
    },

   


    checkValidEmail(email) {
        // Regular expression for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // #!/bin/sh
    // git --work-tree=/var/www/intolo/consoftpro --git-dir=/var/repo/consoftpro.git checkout -f
    // git remote add production ssh://ubuntu@107.20.37.104/var/repo/consoftpro.git

}

export default CustomFunction;

