const path= require('path');
const fs= require('fs');

fs.readFile(path.join(__dirname,'text.txt'), 'utf-8', (error, content)=>{
    if(error){
        throw error;
    }
    console.log(content)
})