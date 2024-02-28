import { Schema, model, ObjectId } from 'mongoose'
// 放了商品的車子
const articleSchema = new Schema({
  article: {
    type: ObjectId,
    ref: 'articles',
    required: [true, '缺少文章']
  }
})
// 車子
const schema = new Schema({
  user: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  article: {
    type: [articleSchema],
    validate: {
      validator (value) {
        return Array.isArray(value) && value.length > 0
      },
      message: '文章不能為空'
    }
  }
}, { versionKey: false, timestamps: true })

export default model('posts', schema)
