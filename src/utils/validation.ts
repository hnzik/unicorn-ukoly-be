import { validationResult } from "express-validator";
import { IReq, IRes } from "./type";

const validate = (req: IReq<any>, res: IRes) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return false;
  }

  return true;
};

export default validate;
