import express from "express";
import User from "../models/user";

// authenticated request
export interface IAuthRequest extends express.Request {
    user: User
}

// casts an object to a type
export function castToType<T>(input: any): T {
    // @ts-ignore
    return input
}