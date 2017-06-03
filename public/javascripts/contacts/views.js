App.View.App = Backbone.View.extend({
    initialize: function () {
        console.log(this.collection.toJSON());

        new App.View.AddContact({collection: this.collection});

        var contactsTbody = new App.View.Contacts({collection: App.contacts}).render();
        $('#contactsTable').append(contactsTbody.el);
    }
});

App.View.AddContact = Backbone.View.extend({
    el: '#add_contact',
    events: {
        'submit': 'addContact'
    },
    addContact: function (e) {
        e.preventDefault();
        this.collection.create({
            fName: this.$('#fName').val(),
            lName: this.$('#lName').val(),
            email: this.$('#email').val(),
            description: this.$('#description').val()
        }, {
            wait: true
        });
        this.clearInps();
    },
    clearInps: function () {
        this.$('input[type="text"]').val('');
        this.$('textarea').val('');
    }
});

App.View.EditContact = Backbone.View.extend({
    el: '#edit_contact_container',
    initialize: function(){
        this.render();
    },
    events: {
        'submit': 'saveContact',
        'click input.cancel': 'cancel',
    },
    render:function () {
        this.$el.html(App.template('edit_contact')(this.model.toJSON()));
        return this;
    },
    saveContact:function (e) {
        e.preventDefault();
        this.model.save({
            fName: this.$('#edit_fName').val(),
            lName: this.$('#edit_lName').val(),
            email: this.$('#edit_email').val(),
            description: this.$('#edit_description').val()
        });
        //this.$el.html('');
        this.remove();
    },
    cancel: function () {
        //this.$el.html('');
        this.remove();
    }
});

App.View.Contact = Backbone.View.extend({
    initialize:function () {
        this.model.on('destroy',this.remove, this);
        this.model.on('change',this.render, this);
    },
    tagName: 'tr',
    events: {
        'click input.edit': 'edit',
        'click input.delete': 'del',

    },
    render: function () {
        this.$el.html(App.template('contactModelTable')(this.model.toJSON()));
        return this;
    },
    edit: function () {
        new App.View.EditContact({model:this.model});
        return this;
    },
    del: function () {
        this.model.destroy();
        return this;
    }
});

App.View.Contacts = Backbone.View.extend({
    initialize: function () {
        this.collection.on('add', this.addOne, this);
    },
    tagName: 'tbody',
    render: function () {
        this.collection.each(this.addOne, this);
        return this;
    },
    addOne: function (contactModel) {
        this.$el.append(
            (new App.View.Contact({model: contactModel})).render().el
        );
    }
})