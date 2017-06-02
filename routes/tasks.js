var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.header('content-type', 'application/json');
    console.log(tasks);
    res.send(tasks);
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    res.header('content-type', 'application/json');

    var index = getTaskIndexById(req.params.id);
    if(index < 0){
        res.send({});
    }else {
        res.send(tasks[index]);
    }
});

/* PUT users listing. */
router.put('/:id', function(req, res, next) {
    res.header('content-type', 'application/json');
    var task = req.body;
    var index = getTaskIndexById(task.id)
    if(index < 0){
        res.send({result:'error',data:[index,task,tasks[index]]});
    }else{
        tasks[index] = task;
        res.send(task);
    }
});

/* DELETE users listing. */
router.delete('/:id', function(req, res, next) {
    res.header('content-type', 'application/json');

    var index = getTaskIndexById(req.params.id)
    console.log({index:index,id:req.params.id});
    if(index < 0){
        res.send({result:'error',data:[index,task,tasks[index]]});
    }else{
        tasks.splice(index, 1);
        res.send({op:'success'});
    }
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    var task = req.body;
    var index =  typeof req.params.id != 'undefined' && req.params.id ? getTaskIndexById(req.params.id) : -1;
    var maxId = getMaxTaskId();
    if( typeof task.id == 'undefined' || !task.id){
        task.id = maxId+1;
    }
    if(index < 0){
        tasks.push(task);
    }else{
        tasks[index] = task;
    }
    res.header('content-type', 'application/json');
    res.send({op:'success'});
});

module.exports = router;

var tasks = [
    {
        id:1,
        title: 'Task on server #1',
        priority : 5
    },
    {
        id:2,
        title: 'Task on server #2',
        priority : 6
    },
    {
        id:3,
        title: 'Task on server #3',
        priority : 7
    },
    {
        id:4,
        title: 'Low priority task on server',
        priority : -5
    }
];

var getTask = function (id) {
    var index = getTaskIndexById(task.id)
    if(index < 0){
        return {};
    }else{
        return tasks[index];
    }
}

var getTaskIndexById = function (id) {
    for(var i=0; i < tasks.length; i++){
        if(tasks[i].id == id){
            return i;
        }
    }
    return -1;
}
var getMaxTaskId = function (id) {
    var max = -1;
    for(var i=0; i < tasks.length; i++){
        if(tasks[i].id > max){
            max = tasks[i].id
        }
    }
    return max;
}
