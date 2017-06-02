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

    var vent = _.extend({}, Backbone);

    App.Model.Task = Backbone.Model.extend({
        initialize: function () {
            this.on("invalid", function (model, error) {
                alert(error);
            });
        },
        defaults: {
            title: '',
            priority: 0,
            //id:0
        },
        validate: function (args) {
            if (!$.trim(args.title)) return "Title is empty";
        },
        urlRoot: '/tasks'
    });

    App.Collection.Tasks = Backbone.Collection.extend({
        model: App.Model.Task,
        url: '/tasks'
    });

    App.View.Task = Backbone.View.extend({
        model:{},
        tagName:'li',
        initialize: function () {
            this.model.on('destroy',this.remove, this) // this.$el.remove()
        },
        render:function () {
            this.$el.html(App.template('taskModel')(this.model.toJSON()));
            return this;
        }
    });
    
    App.View.Tasks = Backbone.View.extend({
        initialize: function () {
            /*this.collection = new App.Collection.Tasks();
            this.collection.bind("reset", _.bind(this.render, this));
            var self = this;
            this.collection.fetch({
                success: function () {
                    self.render();
                }
            });*/

            this.collection.on('add',this.addOne,this);
        },
        tagName:'ul',
        render:function () {
            this.$el.empty();
            this.collection.each(this.addOne,this);
            return this;
        },
        addOne:function (taskModel) {
            var taskView = new App.View.Task({model:taskModel});
            this.$el.append( taskView.render().el );
        }
    });


}());

var tasks;

$(document).ready(function () {

    // 1)

    //var tasks = new App.Collection.Tasks([ {title:'NULL',priority:-100} ]);
    tasks = new App.Collection.Tasks();
    tasks.fetch();
    console.log(tasks);
    var tasksView = new App.View.Tasks({collection:tasks});

    console.log(tasksView.render().el);
    $(document.body).append(tasksView.render().el);


    // 2)
    setTimeout(function () {
        addNewTask();
        setTimeout(function () {
            fetchNewDate();
            setTimeout(function () {
                removeTask(1);
                setTimeout(function () {
                    fetchNewDate();
                },3000)
            },3000);
        },4000)
    },3000);


    /**
     * In browser console:
     *
     * var cTasks = new App.Collection.Tasks();
     * cTasks.fetch();
     * var cTasksView = new App.View.Tasks({collection:cTasks});
     * $(document.body).append(cTasksView.render().el);
     * cTasks.create({title:'New Additional task'})
     *
     * var cTaskDel = cTasks.at(id)
     * cTaskDel.destroy();
     */
});

var addNewTask = function(){
    console.log("add new task");
    //lookup variable tasks
    tasks.create({title:'New Additional task',priority:100},App.Model.Task)
}

var fetchNewDate = function(id){
    var tasksNew = new App.Collection.Tasks();
    tasksNew.fetch();
    var tasksNewView = new App.View.Tasks({collection:tasksNew});
    $(document.body).append(tasksNewView.render().el);
}

var removeTask = function(id){
    //lookup variable tasks
    var task = tasks.at(id) // see to first view on browser - for tasksView
    task.destroy();
}
