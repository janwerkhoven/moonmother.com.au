import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'footer',
  elementId: 'page-footer',
  didInsertElement() {
    this._super(...arguments);
    this.$().attr('contenteditable', true);
  }
});
