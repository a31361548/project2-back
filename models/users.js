import { Schema, model, ObjectId, Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import UserRole from '../enums/UserRole.js'

const cartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: 'products',
    required: [true, '缺少商品欄位']
  },
  quantity: {
    type: Number,
    required: [true, '缺少商品數量']
  }
})

const articleSchema = new Schema({
  article: {
    type: ObjectId,
    ref: 'articles',
    required: [true, '缺少文章']
  }
})

const schema = new Schema({
  account: {
    type: String,
    required: [true, '缺少使用者帳號'],
    minlength: [4, '使用者帳號長度不符'],
    maxlength: [20, '使用者帳號長度不符'],
    unique: true,
    validate: {
      validator (value) {
        return validator.isAlphanumeric(value)
      },
      message: '使用者帳號格式錯誤'
    }
  },
  email: {
    type: String,
    required: [true, '缺少使用者信箱'],
    unique: true,
    validate: {
      validator (value) {
        return validator.isEmail(value)
      },
      message: '使用者信箱格式錯誤'
    }
  },
  password: {
    type: String,
    required: [true, '缺少使用者密碼']
  },
  tokens: {
    type: [String]
  },
  cart: {
    type: [cartSchema]
  },
  article: {
    type: [articleSchema]
  },
  role: {
    type: Number,
    default: UserRole.USER
  },
  phone: {
    type: String,
    required: [true, '缺少使用者電話'],
    validate: {
      validator (value) {
        return validator.isMobilePhone(value, 'zh-TW')
      },
      message: '使用者電話格式錯誤'
    }
  },
  avatar: {
    type: String,
    // 預設值 default
    // default: 'aaaaaaa',
    // default 可以寫成 function，要用 this 所以不能用箭頭函式
    default () {
      // this.email 指的是同一筆資料 email 欄位的值
      return `https://source.boringavatars.com/beam/120/${this.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
      /*
      自動產生大頭貼的網站 20231228 00:16:09
      https://boringavatars.com/
      */
    }
  }
}, {
  timestamps: true,
  versionKey: false
})

schema.virtual('cartQuantity')
  .get(function () {
    return this.cart.reduce((total, current) => {
      return total + current.quantity
    }, 0)
  })

schema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length < 4 || user.password.length > 20) {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度不符' }))
      next(error)
      return
    } else {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  next()
})

export default model('users', schema)
