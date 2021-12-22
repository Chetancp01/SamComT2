const Register = require('../models/userRegistration');
const bcrypt = require('bcryptjs');

module.exports.signIn = async (req, res) => {

    try {
        //get data from login page
        const email = req.body.email;
        const password = req.body.passsword;
        
        //get data from database usind emailid
        const userEmail = await Register.findOne({email : email});

        //check password 
        const isMatch = await bcrypt.compare(password,userEmail.passsword);

        //generate token
        const token = await userEmail.tokengenerateAuthTosken();
        
        //set cookie on browser
        res.cookie("jwt",token,{
            expires: new Date(Date.now() + 60000000),
            httpOnly:true
        }); 

        //check if password are match then login user
        if (isMatch) {
            res.status(201).json({"name" : userEmail.name,"email" :  userEmail.email});
        }else{
            res.json({"error" : "Invalid login Details"});
        }

    }catch (err) {
        res.status(400).json({"error" : err});
    }

}

module.exports.signUp = async (req,res) => {
    try {
        //get value from register page
        const name = req.body.firstname;
        const lname = req.body.lastname;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.passsword;
        const confpasssword = req.body.confpasssword;

        //check conditions if password and confpasssword are match
        if (password === confpasssword) {

            //get model register schema
            const user = new Register(req.body);

            //generate token
            const token = await user.tokengenerateAuthTosken();

            console.log(token);

            //set cookie on browser
            res.cookie("jwt",token,{
                expires: new Date(Date.now() + 60000000),
                httpOnly:true
            });

            //save date and return response
            await user.save();
            res.status(200).json({"name" : name});

        }else{
            res.status(404).json({"error" : "Password does not match"});
        }
        
    }catch (err) {
        res.status(400).json({"error" : err});
    }


}

module.exports.getAllUsers = async (req,res) => {

    try {
        await Register.find()
        .then((result) => {
            return res.status(200).json({
                message: result == "" ? "Data Not Found" : "Get allUsers successfully",
                data: result
            })
        });
    }catch (err){
        res.status(401).json({"error" : err});
    }

}
