import { validationResult } from "express-validator";
import { IReq, IRes } from "./type";

const validate = (req: IReq<any>, res: IRes) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    //Re: Validace nevrací chyby (co je na dtoIn chybné).
    //Pole Result obsahuje všechny chyby, které v dtoIn byly oproti schématu. https://express-validator.github.io/docs/api/validation-result
    //Takže si nejsem úplně jistý, kde byl problém.
    res.status(400).json({ errors: result.array() });
    return false;
  }

  return true;
};

export default validate;
