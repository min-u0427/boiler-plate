const express = require('express')
const app = express()
const port = 3000
const {User} = require("./models/User");
const bodyParser = require('body-parser');
const config = require('./config/key');

// 어플리케이션 url, json을 분석해서 가져올 수 있게끔 해줌
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 몽고디비 데이터 베이스 몽구스 사용해서 연결 하기
const mongoose = require('mongoose'); 
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('안녕하십니꽊!!!악악악악깟으랏차차깟깟악!!')
})

app.post('/register', (req, res) => {
  // 회원가입을 할 때 필요한 정보들을 client에서 가져오면,
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// 몽고디비 유저네임 : MinWoo, 패스워드 : honggildong