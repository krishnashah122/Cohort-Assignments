const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'file.txt');

fs.readFile(filePath, 'utf8', function(err, data) {
    if(err) {
        console.log(err);
        return;
    }

    console.log(data.toString());
});