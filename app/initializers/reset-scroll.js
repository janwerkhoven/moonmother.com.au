import Ember from 'ember';

export function initialize() {
  Ember.Route.reopen({
    activate() {
      this._super();
      window.scrollTo(0, 0);
    }
  });
}

export default {
  name: 'reset-scroll',
  initialize
};
