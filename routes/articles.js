import { Router } from 'express'
import * as auth from '../middlewares/auth.js'
import { create, getAll, edit, get, getId, remove } from '../controllers/articles.js'
import upload from '../middlewares/upload.js'
// import admin from '../middlewares/admin.js'

const router = Router()

router.post('/', auth.jwt, upload, create)
router.get('/all', getAll)
router.patch('/:id', auth.jwt, upload, edit)
router.get('/', auth.jwt, get)
// router.get('/', getPost)
router.get('/:id', getId)

router.delete('/:id', auth.jwt, remove)

export default router
