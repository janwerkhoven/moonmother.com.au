import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

  tagName: 'section',
  elementId: 'testimonials',

  quotes: [{
    text: 'Their application of skills is exhaustive, they leave no stone unturned and accept the largest of challenges with a warm smile.',
    person: 'Andy Higgins',
    profession: 'Former International Events Manager, Rip Curl'
  }, {
    text: 'The artist is nothing without the gift, but the gift is nothing without work.',
    person: 'Emile Zola',
    profession: 'French Novelist'
  }, {
    text: `A ship is always safe at shore, but that is not what it's built for`,
    person: 'Albert Einstein',
    profession: 'Theoretical physicist'
  }, {
    text: `If you hear a voice within you say 'You cannot paint' then by all means paint, and that voice will be silenced`,
    person: 'Vincent Van Gogh',
    profession: 'Dutch painter'
  }],

  numberOfQuotes: computed(function() {
    return this.get('quotes').length;
  }),

  activeQuote: 1,

  showQuote(target) {
    const max = this.get('numberOfQuotes');
    let i = this.get('activeQuote');
    if (target === 'next') { i++; }
    if (target === 'prev') { i--; }
    i = i > max ? 1 : i;
    i = i < 1 ? max : i;
    this.set('activeQuote', i);
    this.$('blockquote').eq(i - 1).show().siblings().hide();
  },

  actions: {
    nextQuote() {
      this.showQuote('next');
    },
    prevQuote() {
      this.showQuote('prev');
    }
  }
});
