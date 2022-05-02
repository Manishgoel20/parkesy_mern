import express from 'express'
import {
  accessTo,
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  signUp,
  updatePassword,
} from '../controllers/authController.js'
import {
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updateUser,
} from '../controllers/userController.js'

const router = express.Router()

// Auth related stuffs
router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').patch(resetPassword)

// all routes beneath this use this two middlewares
router.use(protect)

router.route('/me').get(getMe, getUser)
router.route('/updatePassword').patch(updatePassword)
router.route('/updateMe').patch(updateMe)
router.route('/deleteMe').delete(deleteMe)

// all routes beneath this use this below middlewares
router.use(accessTo('admin'))

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router
