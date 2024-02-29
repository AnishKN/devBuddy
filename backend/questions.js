const mongoose = require('mongoose')

const questionScheme = new mongoose.Schema({
    title: String,
    description_body: String,
    difficulty: String,
    category: Array,
    sampleinput: String,
    sampleoutput: String,
    testcases: Array
})

const questionModel = mongoose.model('question',questionScheme)
module.exports = userModel