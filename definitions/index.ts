import express from "express";
import User from "../models/user";

// authenticated request
export interface IAuthRequest extends express.Request {
    user: User
}