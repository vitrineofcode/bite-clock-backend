import jwt from "jsonwebtoken";
import { User} from "../models/user.js";
import bcrypt from "bcrypt";


const signIn = async (req, res) => {
  console.log('Signin route hit');
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password.");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password.");
    }
    
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_PRIVATE_KEY);
  
    res.json({ token, message: "Sign in successful" });
  } catch(err) {
    console.error(err);
    res.status(500).send("Server error");
  } 
}

export default signIn;