
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

    App.View.Task = Backbone.View.extend({
        initialize:function () {
            vent.on('task:show',this.taskShow, this);
        },
        taskShow:function (id) {
            console.log("show task  #"+id);
        }
    })

    App.Router.RouterSimpe = Backbone.Router.extend({
        routes:{
            '':'index',
            'tasks/:id':'tasks',
            'page/:id/*tail':'page',
            '*notFound':'default'
        },
        index:function () {
            console.log("it's index")
        },
        tasks:function (id) {
            console.log("it's task rout");
            vent.trigger('task:show',id);
        },
        page:function (id,tail) {
            console.log("it's page #"+id + ' and tail: '+tail);
        },
        default:function () {
            console.log("404 Error")
        }
    });

    new App.View.Task();
    new App.Router.RouterSimpe();
    Backbone.history.start();

}());


$(document).ready(function () {

});


