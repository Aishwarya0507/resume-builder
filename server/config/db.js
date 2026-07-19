import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume_builder'

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...')
    })

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected')
    })

  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
