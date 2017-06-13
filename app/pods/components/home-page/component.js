import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'home-page',
  currentQuote: 1,

  numberOfQuotes: computed(function() {
    return this.$('#testimonials blockquote').length;
  }),

  showQuote(i) {

    // To make the quotes an infinite loop
    const max = this.get('numberOfQuotes');
    i = i > max ? 1 : i;
    i = i < 1 ? max : i;
    this.set('currentQuote', i);
    console.log(i);

    // TODO: animate quotes
    // this.$('#testimonials').addClass('something');
    // Our use {{currentQuote}} in the template somehow
  },

  actions: {
    nextQuote() {
      console.log('nextQuote');
      const current = this.get('currentQuote');
      let toShow = current + 1;
      this.showQuote(toShow);
    },
    prevQuote() {
      console.log('prevQuote');
      const current = this.get('currentQuote');
      let toShow = current - 1;
      this.showQuote(toShow);
    }
  }
});