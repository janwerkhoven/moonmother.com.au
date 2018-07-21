import PageContent from 'moonmother/components/page-content/component';
import { inject as service } from '@ember/service';

export default PageContent.extend({
  elementId: 'index-page',
  contact: service(),
  actions: {
    scrollToContact() {
      this.contact.scrollToMe();
    }
  }
});
