import Component from '@ember/component';

export default Component.extend({
  tagName: 'i',
  classNames: ['moon-icon'],
  classNameBindings: ['name'],

  // Passed in
  name: undefined
});
