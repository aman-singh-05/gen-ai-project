const {Router} = require("express");
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const authRouter =Router();


 
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */


authRouter.post("/register", authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */

authRouter.post("/login", authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @desc clear token from the user cookie and add the token to the blacklist
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @desc Get current logged-in user's information
 * @access Private
 */

authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports = authRouter;