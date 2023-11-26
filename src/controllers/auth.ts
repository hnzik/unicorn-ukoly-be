import { createJWT } from "../utils/authentication";
import { IReq, IRes, UserType } from "../utils/type";
import validate from "../utils/validation";
import User from '../db/schema/User';

const login = async (req: IReq<UserType>, res: IRes) => {
  if (!validate(req, res)) return;

  const user = await User.findOne({ email: req.body.email, password: req.body.password });

  if(!user) return res.status(401).send("Invalid email or password");

  const jwt = createJWT({email:user.email, id: user.id, password: ""});

  res.send({ token: jwt });
};

const register = async (req: IReq<UserType>, res: IRes) => {
  if (!validate(req, res)) return;

  const user = await User.findOne({ email: req.body.email});

  if(!user) return res.status(400).send("User already exists");

  var createdUser = await User.create({
      email: req.body.email,
      password: req.body.password,
  });

  const jwt = createJWT({email:createdUser.email, id: createdUser.id, password: ""});

  res.send({ token: jwt });
};

export { login, register };
