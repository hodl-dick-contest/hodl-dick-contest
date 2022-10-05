export function convertSecondsToString(secondsToConvert: number) {

    var days = Math.floor(secondsToConvert / ( 3600 * 24 ) ); 
    var hours = Math.floor( ( secondsToConvert % ( 3600 * 24 ) ) / 3600 );
    var minutes = Math.floor(secondsToConvert % 3600 / 60);
    var seconds = Math.floor(secondsToConvert % 3600 % 60);

    var daysDisplay = days >= 1 ? days + ( days === 1 ? " day" : " days") : " ";
    var hoursDisplay = hours >= 1 ? hours + (hours === 1 ? " hour " : " hours ") : "";
    var minutesDisplay = minutes >= 1 ? minutes + (minutes === 1 ? " minute " : " minutes ") : "";
    var secondsDisplay = seconds >= 1 ? seconds + (seconds === 1 ? " second" : " seconds") : "";

    return daysDisplay + hoursDisplay + minutesDisplay + secondsDisplay; 
}