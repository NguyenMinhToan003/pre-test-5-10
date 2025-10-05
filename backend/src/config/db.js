const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// Kết nối database
const CONNECT_DB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('✅ Connected to MongoDB with Mongoose')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  }
}

// Lấy instance mongoose (nếu cần thao tác connection)
const GET_DB = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not connected')
  }
  return mongoose.connection
}

// Đóng database
const CLOSE_DB = async () => {
  await mongoose.disconnect()
  console.log('Database connection closed')
}

module.exports = { CONNECT_DB, GET_DB, CLOSE_DB }
