import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'footer',
  elementId: 'page-footer',
  didInsertElement() {
    let feed = new Instafeed({
      userId: '1437536913',
      accessToken: '1437536913.1677ed0.02677d6ce703465e80498fcd44f92c54',
      get: 'user',
      // userId: '2932372041',
      // accessToken: '63814f746c034e4391c6dbfc5d7526a2',
      sortBy: 'random',
      links: true,
      limit: 10,
      resolution: 'standard_resolution',
      template: '<div><a href={{link}} target="_blank"><img src={{image}} alt="{{caption}}"/></a></div>'
    });
    feed.run();
  }
});
