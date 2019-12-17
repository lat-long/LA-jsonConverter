/*
    Node app to convert JSON files to CSV
    Prompts for a directory, fetches all JSON files from that directory 
    Either converts the file contents directly, or plucks out a tp-level element to be converted to CSV.
    Uses JSON-2-CSV to convert, then save results to a new folder called 'CSV' in the source directory
*/

var fs = require('fs');
var converter = require('json-2-csv');
var inquirer = require('inquirer');
var path = require('path');


//ask where the JSON files are?
inquirer.prompt([
    {
        type: 'input',
        name: 'filePath',
        message: "What is the path to your files? (include trailing slash)"
    },
    {
        type: 'confirm',
        name: 'extract',
        message: "Should we extract the array from a nested field?"
    },
    {
        type: 'input',
        name: 'extractField',
        message: 'Which field contains the array?',
        when: function(answers) {
          return answers.extract;
        }
      },
]).then(answers => {
    if(answers.length == 0 || !answers.filePath){
        console.log("Unable to retreive JSON files");
        return;
    }


    //get all files from directory
    fs.readdir(answers.filePath, function(err,list){
        if(err) throw err;

        for(var i=0; i<list.length; i++){
            if(path.extname(list[i])==='.json'){

                const fileName = list[i];

                //Read contents of each file
                fs.readFile(answers.filePath+list[i], function(err, contents) {
                    if (err) throw err;
                    
                    let data = (function(raw){
                        try {
                            return JSON.parse(raw);
                        } catch(e) {
                            console.log('Error in file '+fileName);
                            console.log(e);
                            return false;
                        }
                    })(contents);
                    
                    if(!data)
                        return;
                    
                    //If we said to extract data from an element within the JSON, pull it out as our data
                        if(answers.extract && answers.extractField){
                            data = data[answers.extractField];
                        }

                    //Convert data to CSV
                    converter.json2csv(data,function(err,csv){
                        if (err) throw err;
                        saveCSV(csv,fileName,answers.filePath);
                    });
                });

            } //end extension check
        } //end for loop
    });
    
});

function saveCSV(csvData,fileName,path){
    
    if(!csvData || !fileName)
        return;
        
    resultsDir = path+'CSV';

    if (!fs.existsSync(resultsDir))
        fs.mkdirSync(resultsDir);


    fs.appendFile(resultsDir+'/'+fileName+'.csv',csvData, function (err) {
        if (err) throw err;
        console.log('Created '+fileName+'.csv');
    });
    return;
}