const express = require('express')
const app = express()
const port = 3000

// 몽고디비 데이터 베이스 몽구스 사용해서 연결 하기
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://MinWoo:honggildong@boilerplate.91mlv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('안녕하십니꽊!!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// 몽고디비 유저네임 : MinWoo, 패스워드 : honggildong