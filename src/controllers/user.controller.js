 const userRegister = async (req,res) => {
	//get the user data from front end
  const {email} = req.body;

  console.log(`User Registration request received for ${email}`);
}
export default userRegister;