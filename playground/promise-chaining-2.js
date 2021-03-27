require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('605e03dfaa0e2f4b60ebe6df').then(task => {
    console.log(task)
    return Task.countDocuments({ completed:false})
}).then(result => {
    console.log(result)
}).catch(err =>{
    console.log(err)
})