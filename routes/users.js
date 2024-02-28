import { Router } from 'express'
import { create, login, logout, extend, getProfile, editCart, getCart, edit, getAll, remove } from '../controllers/users.js'
import * as auth from '../middlewares/auth.js'
import upload from '../middlewares/upload.js'
import admin from '../middlewares/admin.js'

const router = Router()

router.post('/', create)
router.post('/login', auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)
router.get('/me', auth.jwt, getProfile)
router.patch('/cart', auth.jwt, editCart)
router.get('/cart', auth.jwt, getCart)

router.get('/all', auth.jwt, admin, getAll)
router.patch('/:id', auth.jwt, upload, edit)
router.delete('/:id', auth.jwt, admin, remove)
export default router
