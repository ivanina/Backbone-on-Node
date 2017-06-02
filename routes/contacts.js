var express = require('express');
var router = express.Router();

/* GET index. */
router.get('/index', function(req, res, next) {
    res.render('contacts', { title: 'Contacts' });
});

/* GET contacts listing. */
router.get('/', function(req, res, next) {
    res.header('content-type', 'application/json');

    res.send(contacts);
});

/* GET contacts listing. */
router.get('/:id', function(req, res, next) {
    res.header('content-type', 'application/json');

    var index = getContactIndexById(req.params.id);
    if(index < 0){
        res.send({});
    }else {
        res.send(contacts[index]);
    }
});

/* PUT  update contact*/
router.put('/:id', function(req, res, next) {
    res.header('content-type', 'application/json');

    var contact = req.body;
    var index = getContactIndexById(contact.id)
    if(index < 0){
        res.send({r:'error'});
    }else{
        contacts[index] = contact;
        res.send(contact);
    }
});

/* DELETE contact. */
router.delete('/:id', function(req, res, next) {
    res.header('content-type', 'application/json');

    var index = getContactIndexById(req.params.id)
    if(index < 0){
        res.send({r:'error'});
    }else{
        contacts.splice(index, 1);
        res.send({r:'success'});
    }
});

/* POST add contact. */
router.post('/', function(req, res, next) {
    res.header('content-type', 'application/json');

    var contact = req.body;

    if(!validate(contact)){
        res.send({r:'invalid'});
        return;
    }

    var index =  typeof req.params.id != 'undefined' && req.params.id ? getContactIndexById(req.params.id) : -1;
    var maxId = getMaxContactId();

    if( typeof contact.id == 'undefined' || !contact.id){
        contact.id = maxId+1;
    }
    if(index < 0){
        contacts.push(contact);
    }else{
        contacts[index] = contact;
    }
    res.send(getContactByEmail(contact.email));
});

module.exports = router;

var getContact = function (id) {
    var index = getContactIndexById(id)
    if(index < 0){
        return {};
    }else{
        return contacts[index];
    }
}

var getContactIndexById = function (id) {
    for(var i=0; i < contacts.length; i++){
        if(contacts[i].id == id){
            return i;
        }
    }
    return -1;
}
var getMaxContactId = function (id) {
    var max = -1;
    for(var i=0; i < contacts.length; i++){
        if(contacts[i].id > max){
            max = contacts[i].id
        }
    }
    return max;
}

var validate = function (contact) {
    for(var i=0; i < contacts.length; i++){
        if(contacts[i].email == contact.email &&
            (typeof contact.id == 'undefined' || !contact.id || contacts[i].id != contact.id) ){

            return false;
        }
    }
    return true;
}

var getContactByEmail = function (email) {
    for(var i=0; i < contacts.length; i++){
        if(contacts[i].email == email){
            return contacts[i];
        }
    }
    return {};
}

var contacts = [
    {
        id:1,
        fName:'John',
        lName:'Smith',
        email:'john.smith@test.com',
        description:''
    },
    {
        id:2,
        fName:'Zachery',
        lName:'Cajigas',
        email:'zachery.cajigas@test.com',
        description:''
    },
    {
        id:3,
        fName:'Patti',
        lName:'Tigue',
        email:'patti.tigue@test.com',
        description:''
    },
    {
        id:4,
        fName:'Teodora',
        lName:'Witty',
        email:'teodora.witty@test.com',
        description:''
    }
];