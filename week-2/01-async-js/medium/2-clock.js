let time = new Date();

let hour = time.getHours();
let minute = time.getMinutes();
let second = time.getSeconds();

const counter = () => {
    second++;
    if(second > 59){
        minute++;
        second = 0;
        if(minute > 59){
            hour++;
            minute = 0;
            if(hour > 24){
                hour = 0;
            }
        }
    }

    console.log(`24-Hour Format : ${hour < 10? "0"+hour : hour}:${minute < 10? "0"+minute : minute}:${second < 10? "0"+second : second}`);

    let format = 'AM';
    let hr = hour;
    if(hr > 12){
        hr = hr % 12;
        format = 'PM';
    }

    console.log(`12-Hour Format : ${hr < 10? "0"+hr : hr}:${minute < 10? "0"+minute : minute}:${second < 10? "0"+second : second} ${format}`);
    
    setTimeout(counter, 1000);
}

counter();