import 'dotenv/config'
import express from 'express'
import sequelize from './db'
import User from './models/user'
import router from './routes/index'
import errorHandler from './middleware/errorHandler'

const PORT = process.env.PORT ?? 3000

const app = express()
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await User.sync({ alter: true })
    
    app.listen(PORT, () => console.log(`Server runs on ${PORT}`))
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

start().catch((err) => {
  console.log(err)
})
