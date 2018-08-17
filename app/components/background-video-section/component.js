import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'section',
  elementId: 'background-video',

  fastboot: service(),
  isFastBoot: readOnly('fastboot.isFastBoot')
});
