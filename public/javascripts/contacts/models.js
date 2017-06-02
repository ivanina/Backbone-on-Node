App.Model.Contact = Backbone.Model.extend({
    validate:function (args) {
        var msg = {
            name:'First and Last name are required',
            email:'E-Mail is required'
        }
        if(!args.fName || !args.lName){
            console.log(msg.name);
            return msg.name;
        }
        if(!args.email){
            console.log(msg.email);
            return msg.email;
        }
    }
})