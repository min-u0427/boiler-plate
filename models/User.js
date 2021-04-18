const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
  type: String,
  // 공백 없에주는게 트림
  trim: true,
  unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function(next) {
  let user = this;
  // 비밀번호가  index.js에서 save되기 전에 암호화를 시켜 줘야 함.
  // 패스워드가 변경 될 때만 비밀번호를 암호화 해준다.
  if(user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err)
        user.password = hash
        next();
      })
    })
  } else {
    next();
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  })
}

userSchema.methods.generateToken = function(cb) {
  let user = this;

  // jsonwebtoken을 이용해서 token을 생성하기.
  let token = jwt.sign(user._id.toHexString(), 'secretToken')

  user.token = token
  user.save(function(err, user) {
    if(err) return cb(err)
    cb(null, user)
  })
}

  userSchema.statics.findByToken = function(token, cb) {
    let user = this;

    //user._id + '' = token

    jwt.verify(token, 'secretToken', function(err, decoded) {
      // 유저 아이디를 이용해서 유저를 찾은 다음에
      // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

      user.findOne({"_id": decoded, "token": token}, function(err, user) {
        if(err) return cb(err);
        cb(null, user)
      })
    })

    
  }

// 스키마 모델로 감싸기
const User = mongoose.model('User', userSchema);

module.exports = {User}