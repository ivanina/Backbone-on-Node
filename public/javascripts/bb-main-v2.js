
var template = function (id) {
    return _.template($("#"+id).html());
}

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
});

var PersonCollection = Backbone.Collection.extend({
    model:Person
});


var PersonView = Backbone.View.extend({
    tagName:'li',
    className:'person',
    initialize :function () {
        console.log('PersonView initialize');
    },
    render:function () {
        console.log('render');
        //var tpl = _.template($("#personTemplate").html());
        //this.$el.html(tpl( this.model.toJSON()));

        this.$el.html(template("personTemplate")( this.model.toJSON()));
        return this;
    }
});

var PeopleView = Backbone.View.extend({
    tagName:'ul',
    initialize :function () {
        console.log('PeopleView initialize');
    },
    render:function () {
        console.log(this.collection);
        this.collection.each(function (person) {
            var personView = new PersonView({model:person});
            this.$el.append(personView.render().el);
        },this);
        return this;
    }
});



$( document ).ready(function() {

    var p1 = new Person({name: 'John Smith', age: 40, job:'employer'});
    var personView = new PersonView({model:p1});
    console.log(personView.el);
    personView.render();
    console.log(personView.el);

    personCollection = new PersonCollection( // do not use var for view on browser console
        [
            {name:'Alex',age:30,job:'student'}
        ]
    );
    personCollection.add(new Person());
    personCollection.add(p1);
    console.log(personCollection);


    peopleView = new PeopleView({collection:personCollection});
    console.log(peopleView.el);
    peopleView.render();
    console.log(peopleView.el);


    $(document.body).append(peopleView.el);
});
