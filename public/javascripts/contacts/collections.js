App.Collection.Contacts = Backbone.Collection.extend({
    model:App.Model.Contact,
    url:'/contacts'
})