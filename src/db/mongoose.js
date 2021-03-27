const mongoose= require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength:7,
        trim: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Invalid Password'); 
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number');
            }
        },
    }
});

// const me = new User({
//     name: 'Arnab',
//     email:'arnab@gmail.com',
//     password:'Ab28122000',
//     age: 20
// });

// me.save().then((me) => {
//     console.log(me);
// }).catch((error) =>{
//     console.log('Error!', error );
// });

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed:{
        type: Boolean,
        default: false,
    }
});

const task = new Task({
    description: 'Starting to make sense',
    completed: true,
});

task.save().then((task)=> {
    console.log(task);
}).catch((error) => {
    console.log(error);
});