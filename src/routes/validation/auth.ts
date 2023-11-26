import { body } from "express-validator";

const authValidation = [
  body("email").isString().isLength({ min: 3 }),
  body("password").isString().isLength({ min: 3 }),
];

export { authValidation };
