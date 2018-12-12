const express = require('express');
const router = express.Router();
const leftPad = require('left-pad');

router.post('/',(req,res,next)=>{
    
    let rcBad =JSON.stringify(req.body.rc);
    let rc = rcBad.replace(/\D/g,'').toString();

    var year = parseInt(rc.substr(0,2),10);
    var month = parseInt(rc.substr(2,2),10);
    var day = parseInt(rc.substr(4,2),10);
    var control = parseInt(rc.substr(6,4),10);
    

    if (rc.length < 10 ){
        res.status(400).json({
            message:"Wrong input/ born before 1954"
        });
    }
    else if(rc%11!=0){
        res.status(400).json({
            message:"Wrong input/ invalid number"
        });
    }
    else{
        year +=(year<54)?2000:1900;
        function between(month,min,max){
            return month>=min && month<=max;
        }
        function gender(month){
            if(between(month,1,12) || between(month,21,32))
            return "male";
            else if(between(month,51,62) || between(month,71,82))
            return "female";
            else
            return "Invalid Gender"
        }
        var genders = gender(month);
        var month = (month>50)? month-50 : month
        res.status(200).json({
            message:"Valid number",
            birth:day+"."+month+"."+year,
            gender:genders
        });
    }

});

module.exports = router;