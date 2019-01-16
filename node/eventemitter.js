let EventEmitter = require('events')
let util = require('util')

function Bell(){
    EventEmitter.call(this)
}
util.inherits(Bell,EventEmitter)
let bell = new Bell();
function studentInClassroom(){
    console.log('学生进教室')
}
function teatherInClassroom(){
    console.log('老师进教室')
}
bell.on('bell',studentInClassroom)
bell.on('bell',teatherInClassroom)
bell.emit('bell')