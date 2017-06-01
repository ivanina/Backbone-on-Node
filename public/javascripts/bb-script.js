var Book = Backbone.Model.extend({
    initialize: function () {
        console.log('Book was initialized');
    },
    urlRoot: '/book',
    defaults: {
        title: 'No title',
        author: 'unknown',
        releaseDate: 2011,
        description: ''
    }
});

var oBook = new Book({title: 'Alice in Wonderland', author: 'Lewis Caroll'});
oBook.set({releaseDate: '1865'});
oBook.save();


var BooksCollection = Backbone.Collection.extend({
    model: Book,
    old: function () {
        return this.filter(function (book) {
            return book.get('releaseDate') < 1900;
        });
    },
    url: '/book'
});

var booksCollection = new BooksCollection();
booksCollection.get(0);

// fetch from server

console.log({'fetch oBooks': booksCollection.fetch()});

//------------


var BookView = Backbone.View.extend({
    tagName: 'div',
    id: 'bbcontainer',
    //template: _.template($('#bookTemplate').html()),
    render: function () {
        console.log("it's render")
        this.$el.html("^_^");
        return this;
    }
});


var bookView = new BookView();
bookView.render();


//-----------


var appRouter = Backbone.Router.extend({
    routes: {
        "": "start",
        "!/": "start",
        "!/books": "book"
    },

    start: function () {
        console.log("it's start")
    },

    book: function () {
        console.log("it's book")
    },
});

