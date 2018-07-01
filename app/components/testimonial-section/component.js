import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  tagName: 'section',
  elementId: 'testimonials',

  quotes: [{
    text: 'Their application of skills is exhaustive, they leave no stone unturned and accept the largest of challenges with a warm smile.',
    person: 'Andy Higgins',
    profession: 'Former International Events Manager, Rip Curl'
  }, {
    text: 'Of all the Event Managers, Jenny Moon and her Crew at Moon Mother Productions is BEST IN CLASS. They have a very special personal touch and it was obvious that every crew person was very passionate about what they did, which is a rarity in this industry.',
    person: 'David Champion',
    profession: 'Parade Management'
  }, {
    text: `Moon Mother Productions put the love back into live sound. Professional technically brilliant and most importantly, spiritually connected with their work and the music they help to create.`,
    person: 'Josh Cunningham',
    profession: 'The Waifs'
  }, {
    text: `Our experience with Moon Mother, and Jenny in particular has been refreshing, and I would recommend Moon Mother to people who need an innovative, quality product that is professional from 'start to finish' of the project`,
    person: 'Chris Ball',
    profession: 'Venue Operations Manager, Cycling Australia'
  }, {
    text: `In our experience, Moon Mother Productions provide the best quality sound for children and family events. This is because they understand the needs of young families and take the time to fully understand the needs and requirements of the artist in order to produce the best quality sound possible.`,
    person: 'Joel McInnes',
    profession: `The MikMaks`
  }, {
    text: `Jenny and the whole MoonMother Team are always spoken of very highly in events circles and I can certainly see why. The pre-production advice is fantastic and you feel as though Jenny is on your side in finding effective and affordable solutions that will present the event and the organisation in the best light.`,
    person: `Michael 'smasha' Pollard`,
    profession: `Smash'n'Sound, Melbourne`
  }],

  activeQuote: 1,

  numberOfQuotes: computed(function() {
    return this.get('quotes').length;
  }),

  init() {
    this._super(...arguments);
    const max = this.get('numberOfQuotes');
    const random = Math.floor(Math.random() * max) + 1;
    this.set('activeQuote', random);
  },

  didInsertElement() {
    const i = this.get('activeQuote');
    const $activeQuote = this.$('blockquote').eq(i - 1);
    $activeQuote.addClass('active');

    // TODO: animate

  },

  showQuote(target) {
    const max = this.get('numberOfQuotes');
    let i = this.get('activeQuote');
    if (target === 'next') { i++; }
    if (target === 'prev') { i--; }
    i = i > max ? 1 : i;
    i = i < 1 ? max : i;
    this.set('activeQuote', i);
    this.$('blockquote').eq(i - 1).addClass('active').siblings().removeClass('active');

    // TODO: animate

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
