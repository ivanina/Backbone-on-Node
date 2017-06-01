// For simple test
var Person = function (config) {
    this.name = config.name;
    this.age = config.age;
    this.job = config.job;
}
// For simple test
Person.prototype.walk = function () {
    return this.name + ' is walking';
}

//-----------


// with Backbone
var Person = Backbone.Model.extend({
    defaults: {
        name: 'No title',
        age: 0,
        job: 'unknown'
    },
    validate: function (args) {
        if (!ags.age || age < 0 || !args.name) {
            return false;
        }
    },
    walk: function () {
        return this.get('name') + ' is walking';
    }
})
var p1 = new Person({name: 'John', age: 25});
console.log(p1.toJSON());
console.log(p1.walk());


// View

var PersonView = Backbone.View.extend({
    tagName:'li',
    className:'person',
    initialize :function () {
        console.log('PersonView initialize');
    },
    //template: _.template('<%= name %> (<%= age %>)'), // better Variant #2            - 2
    //template: _.template($('#personTemplate').html()), // good! Variant #3 A          - 3
    //template: $("#personTemplate").html(), // good! Variant #3 B                      - 4
    render:function () {
        console.log('render');
        //this.$el.html(this.model.get('name')) // bad style Variant #1                 - 1
        //var tpl = template; Variant #3 A                                              - 2
        //var tpl = _.template(this.template); // good! Variant #3 B                    - 4
        var tpl = _.template($("#personTemplate").html()); // good! Variant #3 C        - 5

        //this.$el.html(this.template( this.model.toJSON()))                            - 1,2,3
        this.$el.html(tpl( this.model.toJSON()))
    }
})



$( document ).ready(function() {

    var p1 = new Person({name: 'John Smith', age: 40, job:'employer'});
    var personView = new PersonView({model:p1});
    console.log(personView.el);
    personView.render();
    console.log(personView.el);
});
