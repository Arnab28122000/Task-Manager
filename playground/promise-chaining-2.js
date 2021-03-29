require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('605e03dfaa0e2f4b60ebe6df').then(task => {
//     console.log(task)
//     return Task.countDocuments({ completed:false})
// }).then(result => {
//     console.log(result)
// }).catch(err =>{
//     console.log(err)
// })

const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: completed})
    return count
}

deleteTaskAndCount('605e03eb5dccf53a48e40ef1',false).then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})