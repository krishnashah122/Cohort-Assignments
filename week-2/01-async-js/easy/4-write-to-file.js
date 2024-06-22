const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'file.txt');
const data = 'I am writing into this file.';

fs.writeFile(filePath, data, 'utf8', (err) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log("Successfully written into the file.");
});