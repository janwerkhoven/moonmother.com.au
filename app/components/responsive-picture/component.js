/**
 *  This component aims to solve the issue where small devices load images that
 *  are too big for the screenwidth, essentially killing the loading time. The
 *  solution is to have on your CDN many sizes of the same image:
 *  image@100x100.jpg
 *  image@200x200.jpg
 *  image@300x300.jpg
 *  ...
 *  image@1200x1200.jpg
 *  With that we can leverage <source> media queries on the <picture> to load
 *  the smallest possible image file size whilst maintaining a sharp image on
 *  any given device, regardless the pixel density. This approach depends on:
 *  1) screen width
 *  2) how wide the image is compared to the screen
 *  3) whether the user is using 2x or 3x retina screens (dppx)
 *  All factors combine would output us something like:
 *  <picture>
 *    <source srcset="small.jpg, medium.jpg 2x, large.jpg 3x" media="(max-width: 400px)">
 *    <source srcset="large.jpg, extralarge.jpg 2x, superlarge.jpg 3x" media="(max-width: 800px)">
 *    <img>
 *  </picture>
 *  Notice how each `srcset` holds 3 URLs, one for each pixel density;
 */

import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'picture',
  classNames: ['responsive-picture'],
  classNameBindings: ['state'],

  alt: undefined, // Passed in
  src: undefined, // Passed in

  errors: service(),

  state: 'loading',

  // Possible alternatives:
  // this.element.parentElement.getBoundingClientRect()
  // Benefit is that the above incorporates CSS.
  pictureWidth: computed(function() {
    // TODO: this.element breaks Fastboot
    // return parseInt(window.getComputedStyle(this.element.parentElement).width);
  }),

  // Output an array of { srcset, media } for the <source> elements in this <picture>
  sources: computed(function() {
    const src = get(this, 'src'); // https://cdn.interflux.com/images/products/Pacific-2009M-VOC-free-soldering-flux@200x200.jpg
    const srcBase = src.split('@')[0]; // https://cdn.interflux.com/images/products/Pacific-2009M-VOC-free-soldering-flux
    const srcSize = src
      .split('@')[1]
      .split('.')[0]
      .split('x'); // ['200','200']
    const fileType = src.split('.').pop(); // jpg or png

    // The height to width ratio of the source image
    const heightRatio = srcSize[1] / srcSize[0];

    // The width of this <picture> component
    const pictureWidth = get(this, 'pictureWidth');

    // Our source media queries are based on the width of the screen (max-width:
    // ...px). Our <picture> will not always as wide as the screen. To figure
    // out which is the smallest possible image that maintains sharpness, we
    // need to factor in how wide this <picture> is compared to the screen
    // width. Default to 100% if ratio is unknown (not a bad assumption).
    //
    // TODO: Recomputed each time the user changes the width of their screen.
    //
    const screenWidthRatio = pictureWidth
      ? window.innerWidth / pictureWidth
      : 100;

    const n = 12; // We have this image in 12 different sizes (@200x200.jpg, @300x300.jpg, ..., @2000x2000px)
    const max = 2000; // The largest one is 2000px wide
    const gap = 100; // Each image is 100px wider than its siblings
    const sources = [];

    // First add 12 <sources> with max-width (for everything below max)
    for (let i = 1; i <= n; ++i) {
      const srcset = this.computeSrcSet(
        srcBase,
        fileType,
        i,
        gap,
        max,
        heightRatio
      );
      const media = `(max-width: ${i * gap * screenWidthRatio}px)`;
      sources.push({ srcset, media });
    }

    // Finally add 1 <source> with a min-width (for everything above max)
    const srcset = this.computeSrcSet(
      srcBase,
      fileType,
      n,
      gap,
      max,
      heightRatio
    );
    const media = `(min-width: ${gap * n * screenWidthRatio + 1}px)`;
    sources.push({ srcset, media });

    return sources;
  }),

  computeSrcSet(srcBase, fileType, i, gap, max, heightRatio) {
    const set = [];
    for (let dppx = 1; dppx <= 3; ++dppx) {
      let width = i * gap * dppx;
      if (width > max) {
        width = max;
      }
      const height = width * heightRatio;
      set.push(`${srcBase}@${width}x${height}.${fileType} ${dppx}x`);
    }
    const srcset = set.join(', ');
    return srcset;
  },

  // On load:
  // 1. Remove the loading state
  // 2. Show user the now loaded image
  onLoad() {
    set(this, 'state', 'done');
  },

  // On error:
  // 1. Remove the loading state
  // 2. Show user the missing image placeholder
  // 3. Log the missing image error
  onError() {
    // TODO: this.element breaks Fastboot
    // if (!this.element) {
    //   return; // Guard against error that appears after breaking down this component
    // }
    set(this, 'state', 'error');
    // TODO: this.element breaks Fastboot
    // const src = this.element.getElementsByTagName('img')[0].currentSrc;
    const vw = window.innerWidth;
    const dppx = window.devicePixelRatio;
    get(this, 'errors').log('Missing image', { src, vw, dppx });
  }
});
