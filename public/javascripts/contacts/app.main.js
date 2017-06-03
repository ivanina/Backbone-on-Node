(function () {
    "use strict";

    window.App = {
        Model: {},
        View: {},
        Collection: {},
        Router: {}
    };
    window.vent = _.extend({},Backbone.Events);

    window.App.template = function (id) {
        return _.template($("#" + id).html());
    };

}());