import { createJWT } from "../utils/authentication";
import { IReq, IRes, User } from "../utils/type";
import validate from "../utils/validation";

const login = async (req: IReq<User>, res: IRes) => {
  if (!validate(req, res)) return;

  const jwt = createJWT(req.body);

  res.send({ token: jwt });
};

const register = async (req: IReq<User>, res: IRes) => {
  const jwt = createJWT(req.body);

  res.send({ token: jwt });
};

export { login, register };
