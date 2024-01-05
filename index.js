const express = require('express')
const app = express()
const port = 3000
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const jobRouter=require('./routes/job')
const authRouter=require('./routes/auth')
const bookmarkRouter=require('./routes/bookmark')
const userRouter=require('./routes/user')
const bodyParser=require('body-parser')
dotenv.config();
const admin=require('firebase-admin')
const seviceAccount=require('./service.json')

admin.initializeApp({
    credential:admin.credential.cert(seviceAccount),
});



mongoose.connect(process.env.MONGO_URL).then(()=>console.log('Connect to V2 DB'))
.catch((err)=>console.log(err));
app.get('/', (req, res) => {
    res.send('Hello World I am Makeen Alshaban')
  })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/',authRouter)
app.use('/api/users',userRouter)
app.use('/api/jobs',jobRouter)
app.use('/api/bookmark',bookmarkRouter)
app.listen(process.env.PORT||port, () => console.log(`The app listening on port ${process.env.PORT}!`)) 