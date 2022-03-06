import express from "express"
import LOGIN_USER_ACTION from "../actions/auth/login_user";
import REGISTER_USER_ACTION from "../actions/auth/register_user";
import GET_AUTH_USER from "../getters/auth/get_auth_user";

var router = express.Router();

/* GET home page. */

router.post('/login', ...LOGIN_USER_ACTION);
router.post('/signup', ...REGISTER_USER_ACTION);
router.get("/user", ...GET_AUTH_USER)

export default router