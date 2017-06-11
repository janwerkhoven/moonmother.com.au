import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('home-page/who-we-are', 'Integration | Component | home page/who we are', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{home-page/who-we-are}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#home-page/who-we-are}}
      template block text
    {{/home-page/who-we-are}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
