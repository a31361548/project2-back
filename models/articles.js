import { Schema, model, ObjectId } from 'mongoose'
// 等同於商品
const articleSchema = new Schema({
  userid: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  title: {
    type: String,
    required: [true, '缺少標題']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  content: {
    type: String,
    required: [true, '缺少內容']
  },
  type: {
    type: String,
    required: [true, '缺少類型'],
    enum: {
      values: ['經典調酒', '超商酒單'],
      message: '酒單分類錯誤'
    }
  },
  post: {
    type: Boolean,
    required: [true, '缺少發布狀態']
  }
}, { versionKey: false, timestamps: true })

export default model('articles', articleSchema)
