const userService= require('../services/confirmation.service');
const userTable=require('../services/userTable.service')
const { createToken, decodeToken } = require('../utils/jwt');
const { handleAsyncError } = require('../utils/crudutil');

const Register = handleAsyncError(async (req, res) => {
  try {
    const { email, name } = req.body.document;
    
    // Finding user in confirmation table
    const options = {
      where: { email },
    };

    const existingUserResult = await userService.getUserByFilter(options);

    if (existingUserResult.success) {
      // If user exists, check for status
      if (existingUserResult.success?.user?.status) {
        return res.status(400).json({ success: false, error: 'User already exists' });
      } else {
        const expiresIn = '2h';
        const token = createToken({ email: email }, expiresIn);
        return res.status(201).json({ success: true, token: token });
      }
    }

    // If user doesn't exist, create a new user
    const result = await userService.createUser({ email, name });

    if (result.success) {
      const expiresIn = '2h';
      const token = createToken({ email: result.user.email }, expiresIn);
      res.status(201).json({ success: true, user: result.user, token });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('Error in user registration:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const Verify = handleAsyncError(async (req, res) => {
  const token = req.query?.token;
  const decoded = decodeToken(token);
  const options = {
    where: {email:decoded?.email },
         };
      console.log(decoded?.email)
  const existingUserResult = await userService.getUserByFilter(options); 
  console.log("exec",existingUserResult.user.dataValues.status)
  if(!(existingUserResult.user.dataValues.status)){
    let  user=existingUserResult.user.dataValues
    user.password="dcwjgfvyt";
    const response= await userTable.createUser(user)
    if(true){
     const filter = { email:decoded?.email }; 
   const updatedData = { status:true };
    let updatedConfirmationTable= await userService.updateUser(filter,updatedData)
    console.log("lo",updatedConfirmationTable)
    if(updatedConfirmationTable.success){
     return res.status(201).json({success: true,data:updatedConfirmationTable})
    }else{
     return res.status(201).json({ success: false, msg:"something went wroung in update" });
    }
    
   }else{
    return res.status(201).json({ success: false, msg:"something went wroung" });
   }
  }
else{
  res.status(400).json({ success: false, error:"user already verified" });

}});

module.exports = { Register, Verify };
