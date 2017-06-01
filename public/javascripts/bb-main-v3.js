
(function () {
    "use strict";

    window.App = {
        Model: {},
        View: {},
        Collection: {}
    };
    window.App.template = function (id) {
        return _.template($("#" + id).html());
    };

    App.Model.Task = Backbone.Model.extend({
        initialize : function(){
            this.on("invalid",function(model,error){
                alert(error);
            });
        },
        validate: function (args) {
            if (! $.trim(args.title) ) return "Title is empty";
        }
    });
    App.View.Task = Backbone.View.extend({
        tagName: 'li',
        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        render: function () {
            //this.$el.html(this.model.get('title'));
            this.$el.html(App.template('personTemplateV2')(this.model.toJSON()));
            return this;
        },
        events: {
            //'click':'showConsoleElement'
            'click .edit': 'editTask',
            'click .delete': 'deleteTask'
        },
        showConsoleElement: function () {
            console.log({'sh-cnl-el': this});
        },
        editTask: function () {
            var newTitle = prompt('New title of task?');
            this.model.set('title', newTitle,{validate:true});
        },
        deleteTask: function () {
            if (confirm('Are you sure?')) {
                this.model.destroy();
            }
        },
        remove: function () {
            this.$el.remove();
        }

    });
    App.View.Tasks = Backbone.View.extend({
        tagName: 'ul',
        render: function () {
            this.collection.each(this.addOne, this);
            this.collection.on('add',this.addOne, this);
            return this;
        },
        addOne: function (task) {
            var view = new App.View.Task({model: task})
            this.$el.append(view.render().el);
        }
    });
    App.View.AddTask = Backbone.View.extend({
        el:'#addTask',
        initialize:function () {
            
        },
        events:{
            'submit':'submit'
        },
        submit:function (e) {
            e.preventDefault();
            var el = $(e.currentTarget).find('input[name="taskTitle"]');
            var task = new App.Model.Task({title:el.val(),priority:0});
            el.val("");
            this.collection.add(task);
        }
    });

    App.Collection.Tasks = Backbone.Collection.extend({
        model: App.Model.Task,
        addTask:function (task) {
            this.collection.add(task)
        }
    })
}());

var tasksView;
var tasks;

$(document).ready(function () {

    var task1 = new App.Model.Task({title: 'First task (5)', priority: 5});
    var task1View = new App.View.Task({model: task1});

    tasks = new App.Collection.Tasks([
        {title: 'First task', priority: 5},
        {title: 'Second task', priority: 1},
        {title: 'First task', priority: 7}
    ]);

    tasksView = new App.View.Tasks({collection: tasks});
    var addTask = new App.View.AddTask({collection:tasks});

    $(document.body).append(tasksView.render().el);
});


