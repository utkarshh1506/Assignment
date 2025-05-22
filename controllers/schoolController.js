const db = require('../db.js');

//to addSchool
exports.addSchool = (req,res)=>{
    const {name,address,latitude,longitude} = req.body;
    if(!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number'){
        return res.status(404).json({
            error: 'All fields are required with valid types.'
        });
    }

    const query = `
        INSERT INTO schools (name,address,latitude,longitude)
        VALUES (?,?,?,?)
    `;

    const values = [name,address,latitude,longitude];

    db.query(query,values,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(404).json({
                error: 'Failed to Add school'
            })
            
        }
        res.status(201).json({
            message:'School added successfully',
            schoolId:result.insertId
        });
    });

};


// to listSchools
exports.listSchools = (req,res)=>{
    const userLat = parseFloat(req.query.latitude);
    const userLong = parseFloat(req.query.longitude);

    if(isNaN(userLat) || isNaN(userLong)){
        return res.status(404).json({
            error: 'Provide Valid Latitude and Longitude'
        })
    }

    const query = `SELECT * FROM schools`;
    db.query(query,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(404).json({
                error:'Failed to fetch schools'
            })
        }

        const schoolsWithDistance = result.map((school)=>{
            const distance = getDistance(userLat, userLong, school.latitude, school.longitude);
            return {...school,distance};
        });

        schoolsWithDistance.sort((a,b)=>a.distance - b.distance);
        res.json(schoolsWithDistance);
    });
};


// function to calculate distance between two coordinates
function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in kms

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}