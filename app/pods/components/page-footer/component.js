import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'footer',
  elementId: 'page-footer',
  didInsertElement() {
    let feed = new Instafeed({
      // userId: '1437536913',
      // accessToken: '1437536913.1677ed0.02677d6ce703465e80498fcd44f92c54',
      get: 'user',
      userId: '2932372041',
      accessToken: '1094777342.1233815.3fb820d15db741e798db3e7428461d43',
      sortBy: 'random',
      links: true,
      limit: 10,
      resolution: 'standard_resolution',
      template: '<div><a href={{link}} target="_blank"><img src={{image}} alt="{{caption}}"/></a></div>'
    });
    feed.run();
  }
});

// On how to get accessToken for Instafeed
// https://github.com/adrianengine/jquery-spectragram/wiki/How-to-get-Instagram-API-access-token-and-fix-your-broken-feed
// https://www.instagram.com/oauth/authorize/?client_id=12338153407546998e72a429b4dd5684&redirect_uri=http://localhost:4200&response_type=token&scope=public_content
