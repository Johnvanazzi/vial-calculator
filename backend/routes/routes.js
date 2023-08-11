const express = require('express');
const router = express.Router();
const { baseResponse } = require("../utils/httpUtils");
const userRepo = require("../repository/userRepository");
const hmac = require('crypto-js/hmac-sha256');
const token = require("../utils/tokenUtils");

router.get('/', (req, res) => res.json(""));

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!req.body || !email || !password) {
        baseResponse(res, 400, { message: "You are missing important data to log in."});

        return;
    }

    const user = await userRepo.getUserByEmail(email);

    if (!user || !user.email) {
        baseResponse(res, 400, { message: "Email or password are invalid"});
        return;
    }

    if (hmac(password, process.env.pwd_salt).toString() !== user.password) {
        baseResponse(res, 400, { message: "Email or password are invalid"});
        return;
    }

    baseResponse(res, 200, { accessToken: token.getUserToken(user.email)});
});

router.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const knownUser = await userRepo.getUserByEmail(email);

    if (knownUser && knownUser.email) {
        baseResponse(res, 403, {message: "There already exists an user with the provided email."});
        return;
    }

    const newUser = {
        email: email,
        password: password
    }

    const userAdded = await userRepo.addUser(newUser)

    if (!userAdded) {
        baseResponse(res, 500, {message: "An error occurred on our side."});
        return;
    }

    baseResponse(res, 200, { accessToken: token.getUserToken(newUser.email)});
});

router.post('/check-token', async (req, res) => {
    const email = req.body.email;
    const jwt_token = req.body.token;

    const isTokenValid = token.checkToken(email, jwt_token);

    if (!isTokenValid) {
        baseResponse(res, 400, { valid: false});
        return;
    }

    baseResponse(res, 200, { valid: true, email});
});

module.exports = router;
