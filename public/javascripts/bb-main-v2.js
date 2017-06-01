(function () {
    window.App = {
        Model:{},
        View:{},
        Collection:{}
    }
    window.App.template = function (id) {
        return _.template($("#"+id).html());
    }

    App.Model.Person = Backbone.Model.extend({
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

    App.Collection.People = Backbone.Collection.extend({
        model:App.Model.Person
    });


    App.View.Person = Backbone.View.extend({
        model:{},
        tagName:'li',
        className:'person',
        initialize :function () {
            console.log('PersonView initialize');
        },
        render:function () {
            console.log('View.Person render');
            //var tpl = _.template($("#personTemplate").html());
            //this.$el.html(tpl( this.model.toJSON()));

            this.$el.html(App.template("personTemplate")(
                this.model.toJSON()
            ));
            return this;
        }
    });

    App.View.People = Backbone.View.extend({
        tagName:'ul',
        initialize :function () {
            console.log('PeopleView initialize');
        },
        render:function () {
            console.log(this.collection);
            this.collection.each(function (person) {
                var personView = new App.View.Person({model:person});
                this.$el.append(personView.render().el);
            },this);
            return this;
        }
    });




    $( document ).ready(function() {

        var p1 = new App.Model.Person({name: 'John Smith', age: 40, job:'employer'});
        /*var personView = new App.View.Person({model:p1});
        console.log(personView.el);
        personView.render();
        console.log(personView.el);*/

        personCollection = new App.Collection.People( // do not use var for view on browser console
            [
                {name:'Alex',age:30,job:'student'}
            ]
        );
        personCollection.add(new App.Model.Person());
        personCollection.add(p1);


        peopleView = new App.View.People({collection:personCollection});
        console.log(peopleView.el);
        peopleView.render();
        console.log(peopleView.el);


        $(document.body).append(peopleView.el);
    });
}());

