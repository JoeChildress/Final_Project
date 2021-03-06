'use strict';

var Backbone = require('backbone');
var TodoView = require('./TodoView');

module.exports = Backbone.View.extend({
  initialize: function() {

    this.collection.on( 'add', this.render, this );
  },
  className: 'impTodosList',
  template: TD.impTodos,
  _children: [],
  render: function () {

    this.$el.append( this.template() );
    this.collection.each( function ( model ) {
      var itemView = new TodoView( { model: model } );

      this._children.push( itemView );
      this.$( '.taskList' ).prepend( itemView.render().el );
    }, this );

    return this;
  },
  remove: function () {

    this._children.forEach( function ( view ) {
      view.remove();
    });

    Backbone.View.prototype.remove.call( this );
  }
});