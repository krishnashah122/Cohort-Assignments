let count = 0;

const counter = () => {
    count++;
    console.log(count);
}

setInterval(counter, 1000);