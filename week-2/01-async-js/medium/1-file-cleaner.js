const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'file.txt');

fs.readFile(filePath, 'utf8', function(err, data) {
    if(err) {
        console.log(err);
    }

    let content = data.toString();
    console.log(content);

    let updatedContent = '';
    for(let i = 0; i < content.length; i++){
        if(content[i] === ' '){
            if(content[i+1] !== ' ' && i+1 < content.length){
                updatedContent += content[i];
            }
            continue;
        }else{
            updatedContent += content[i];
        }
    }

    fs.writeFile(filePath, updatedContent, 'utf8', function(err) {
        if(err){
            console.log(err);
        }

        console.log('Successfully wriiten into the file.');
    });
});