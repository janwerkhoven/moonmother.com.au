import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

// https://github.com/ronco/ember-cli-head

export function initialize() {
  Route.reopen({
    headData: service(),

    afterModel() {
      this._super(...arguments);
      set(this, 'headData.title', this.metaTitle);
      set(this, 'headData.description', this.metaDescription);
      set(this, 'headData.canonical', this.metaCanonical);
      set(this, 'headData.image', this.metaImage);
      set(this, 'headData.robots', this._metaRobots());
    },

    _metaRobots() {
      return this.robots || 'index, follow';
    }
  });
}

export default {
  initialize
};
