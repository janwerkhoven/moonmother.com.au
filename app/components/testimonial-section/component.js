import Component from '@ember/component';
import { computed } from '@ember/object';

const quotes = [
  {
    body: `Their application of skills is exhaustive, they leave no stone unturned and accept the largest of challenges with a warm smile.`,
    rating: 4.5,
    author: {
      firstName: 'Andy',
      lastName: 'Higgins',
      title: 'Former International Events Manager',
      worksFor: 'Rip Curl'
    }
  },
  {
    body: `Of all the Event Managers, Jenny Moon and her Crew at Moon Mother Productions is BEST IN CLASS. They have a very special personal touch and it was obvious that every crew person was very passionate about what they did, which is a rarity in this industry.`,
    rating: 5,
    author: {
      firstName: 'David',
      lastName: 'Champion',
      title: 'Manager',
      worksFor: 'Parade Management'
    }
  },
  {
    body: `Moon Mother Productions put the love back into live sound. Professional technically brilliant and most importantly, spiritually connected with their work and the music they help to create.`,
    rating: 5,
    author: {
      firstName: 'Josh',
      lastName: 'Cunningham',
      title: 'Australian guitarist',
      worksFor: 'The Waifs'
    }
  },
  {
    body: `Our experience with Moon Mother, and Jenny in particular has been refreshing, and I would recommend Moon Mother to people who need an innovative, quality product that is professional from 'start to finish' of the project.`,
    rating: 4.5,
    author: {
      firstName: 'Chris',
      lastName: 'Ball',
      title: 'Venue Operations Manager',
      worksFor: 'Cycling Australia'
    }
  },
  {
    body: `In our experience, Moon Mother Productions provide the best quality sound for children and family events. This is because they understand the needs of young families and take the time to fully understand the needs and requirements of the artist in order to produce the best quality sound possible.`,
    rating: 5,
    author: {
      firstName: 'Joel',
      lastName: 'McInnes',
      title: 'Entertainer',
      worksFor: 'The MikMaks'
    }
  },
  {
    body: `Jenny and the whole MoonMother Team are always spoken of very highly in events circles and I can certainly see why. The pre-production advice is fantastic and you feel as though Jenny is on your side in finding effective and affordable solutions that will present the event and the organisation in the best light.`,
    rating: 4,
    author: {
      firstName: `Michael "smasha"`,
      lastName: 'Pollard',
      title: 'Audio Engineer',
      worksFor: `Smash'n'Sound, Melbourne`
    }
  }
];

export default Component.extend({
  tagName: 'section',
  elementId: 'testimonials',

  quotes,

  activeQuote: 1,

  numberOfQuotes: computed(function() {
    return this.quotes.length;
  }),

  init() {
    this._super(...arguments);
    const max = this.numberOfQuotes;
    const random = Math.floor(Math.random() * max) + 1;
    this.set('activeQuote', random);
  },

  didInsertElement() {
    const i = this.activeQuote;
    const $activeQuote = this.$('blockquote').eq(i - 1);
    $activeQuote.addClass('active');

    // TODO: animate
  },

  showQuote(target) {
    const max = this.numberOfQuotes;
    let i = this.activeQuote;
    if (target === 'next') {
      i++;
    }
    if (target === 'prev') {
      i--;
    }
    i = i > max ? 1 : i;
    i = i < 1 ? max : i;
    this.set('activeQuote', i);
    this.$('blockquote')
      .eq(i - 1)
      .addClass('active')
      .siblings()
      .removeClass('active');

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
