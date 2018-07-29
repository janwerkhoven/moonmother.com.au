import PageContent from 'moonmother/components/page-content/component';
import { scrollTo } from 'moonmother/helpers/scroll-to';

export default PageContent.extend({
  elementId: 'index-page',
  actions: {
    scrollToContact() {
      scrollTo('footer #contact', 3200, 'easeInOutQuint');
    }
  }
});
