const mongoose = require('mongoose')

const connectDB = async () => {

  try {
    // Connect to the database
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    console.log(`Database connected on port: ${connect.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`${error.message}`.red)
    process.exit(1)
  }
}

module.exports = connectDB