import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'header',
  elementId: 'page-header',
  classNameBindings: ['stance', 'startPosition'],

  galaxy: service('galaxy'),

  stance: readOnly('galaxy.stance'),

  startPosition: computed(function() {
    const route = this.galaxy.isMainRoute
      ? this.galaxy.currentRoute
      : 'services';
    return `start-position-${route}`;
  })
});
