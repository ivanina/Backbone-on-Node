
(function () {
    "use strict";

    window.App = {
        Model: {},
        View: {},
        Collection: {},
        Router: {}
    };
    window.App.template = function (id) {
        return _.template($("#" + id).html());
    };

    var vent = _.extend({},Backbone);

    App.Model.Task = Backbone.Model.extend({
        initialize : function(){
            this.on("invalid",function(model,error){
                alert(error);
            });
        },
        /*defaults: {
            id:0,
            title: 'Default task',
            priority: 0
        },*/
        validate: function (args) {
            if (! $.trim(args.title) ) return "Title is empty";
        },
        urlRoot:'/tasks'
    });

    App.Collection.Tasks = Backbone.Collection.extend({
        model:App.Model.Task,
        url:'/tasks'
    })

    App.View.Task = Backbone.View.extend({

    })



    var tasks = new App.Collection.Tasks()
    tasks.fetch();
    console.log('>> start');
    console.log(tasks);

    var task = new App.Model.Task({id: 2});
    task.fetch();
    console.log(task.attributes);

    task.set({'title':'New title for updated task'});
    task.save();
    console.log('save new task');

    tasks.fetch();
    console.log('>> updated tasks');
    console.log(tasks);

    var task2del = new App.Model.Task({id: 4});
    task2del.destroy();

    tasks.fetch();
    console.log('>> updated tasks');
    console.log(tasks);

}());


$(document).ready(function () {

});


