import { body } from 'express-validator';

export const signUpValidator = [
    body('name').isLength({ min: 5 ,max:15}),
    body('email').isEmail(),
  body('password').isLength({ min: 5 })
];

export const signInValidator = [
  body('email').isEmail(),
body('password').isLength({ min: 5 })
];
