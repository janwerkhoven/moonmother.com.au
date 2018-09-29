import LinkComponent from '@ember/routing/link-component';
export default {
  name: 'reopen-link-to',

  initialize: function() {
    // Expand {{link-to}} helpers to support itemscope and itemtype attributes
    LinkComponent.reopen({
      attributeBindings: ['itemscope', 'itemtype', 'itemprop']
    });
  }
};
