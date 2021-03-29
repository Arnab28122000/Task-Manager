require('../src/db/mongoose')
const User = require('../src/models/user')

// 605e03eb5dccf53a48e40ef0

// User.findByIdAndUpdate('605e03eb5dccf53a48e40ef0', {age: 69}).then(user => {
//     console.log(user)
//     return User.countDocuments({ age:69})
// }).then(result => {
//     console.log(result)
// }).catch(err =>{
//     console.log(err)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('605ec1e4c77308380884b8b7', 2).then(count => {
    console.log(count)
}).catch(err => {
    console.log(err)
})