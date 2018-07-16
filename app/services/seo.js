import HeadTagsService from 'ember-cli-meta-tags/services/head-tags';
import config from 'ember-get-config';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default HeadTagsService.extend({
  headData: service(),

  // Sets all meta tags needed for SEO
  // Must be called from a route, ideally the afterModel()
  // Example:
  // seoService.setMetaTags(this, {
  //   title: '...',
  //   description: '...',
  //   canonical: 'https://moonmother.com.au/services',
  //   index: true,
  //   follow: true
  // });
  setMetaTags(route, options = {}) {
    // The index.html has static tags that will be read in the non-rendered index by Google
    this._clearStaticMetaTags();

    // The tags we set with Ember will only be read after Google bots render our JS.

    // 1. Set the <title>
    const title = options.title || config.seo.appName;
    set(this, 'headData.title', title);

    // 2. Set all other <meta>
    const headTags = this._buildHeadTags(options);
    set(route, 'headTags', headTags);

    console.log(route.routeName, options, headTags);
  },

  _clearStaticMetaTags() {
    const staticTags = document.querySelectorAll('[data-static="meta"]');
    [...staticTags].forEach(staticTag =>
      staticTag.parentNode.removeChild(staticTag)
    );
  },

  _buildHeadTags(options = {}) {
    const arr = [];

    if (options.description) {
      arr.push(this._buildDescriptioTag(options.description));
    }

    if (options.index && options.follow) {
      arr.push(this._buildRobotsTag(options.index, options.follow));
    }

    if (options.canonical) {
      arr.push(this._buildCanonicalTag(options.canonical));
    }

    return arr;
  },

  _buildDescriptioTag(description) {
    return {
      type: 'meta',
      tagId: 'meta-description-tag',
      attrs: {
        name: 'description',
        content: description
      }
    };
  },

  _buildRobotsTag(index = true, follow = true) {
    const a = index ? 'index' : 'noindex';
    const b = follow ? 'follow' : 'nofollow';
    return {
      type: 'meta',
      tagId: 'meta-robot-tag',
      attrs: {
        name: 'robots',
        content: `${a}, ${b}`
      }
    };
  },

  _buildCanonicalTag(url) {
    return {
      type: 'link',
      tagId: 'canonical-link',
      attrs: {
        rel: 'canonical',
        content: url
      }
    };
  }
});
