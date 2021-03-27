require('../src/db/mongoose')
const User = require('../src/models/user')

// 605e03eb5dccf53a48e40ef0

User.findByIdAndUpdate('605e03eb5dccf53a48e40ef0', {age: 69}).then(user => {
    console.log(user)
    return User.countDocuments({ age:69})
}).then(result => {
    console.log(result)
}).catch(err =>{
    console.log(err)
})