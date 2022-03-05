
import { validationResult, ValidationChain } from 'express-validator';
import { IAuthRequest } from '../../definitions';
import express from "express"
// can be reused by many routes

// parallel processing
const validateParallel = (validations: any[]) => {

  return async (req:IAuthRequest, res: express.Response, next: express.NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    console.log("There are errors")
    res.status(422).json({ errors: errors.array() });
  };
};

// sequential processing, stops running validations chain if the previous one have failed.
const validateSequential = (validations: any[]) => {
  return async (req:IAuthRequest, res: express.Response, next: express.NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};

export { validateParallel, validateSequential }