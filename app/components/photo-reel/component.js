import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  classNames: ['photo-reel'],
  classNameBindings: ['name'],

  // Passed in
  name: undefined
});
