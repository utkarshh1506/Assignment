const db = require('./db.js');
function createSchoolTable(){
    const createTable = `
        CREATE TABLE IF NOT EXISTS schools(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL
        )
    `;

    db.query(createTable, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Table is created");
        }
    });

}

module.exports=createSchoolTable;