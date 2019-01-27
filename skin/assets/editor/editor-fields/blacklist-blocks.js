import {unregisterBlockType} from '@wordpress/blocks';
import {select, subscribe} from '@wordpress/data';
import pluginConfig from '../../config';

export default class BlackListBlocks {

  init() {

    /**
     * Function subscribes to the store for continuous check of post type
     * When post type is defined eg. not undefined it checks name
     * and then unregister or ignores blocks.
     */

    let registeredBlocks = true;
    subscribe(() => {
      if (registeredBlocks) {
        const postType = select('core/editor').getCurrentPostType();
        if (postType) {
          if (postType !== 'quiz' && postType !== 'question') {
            this.unregisterAllBlocks();
          }
          registeredBlocks = false;
        }
      }
    });
  }

  unregisterAllBlocks() {
    unregisterBlockType(`${pluginConfig.pluginName}/question-block`);
    unregisterBlockType(`${pluginConfig.pluginName}/questions-category-block`);
    unregisterBlockType(`${pluginConfig.pluginName}/row-block`);
    unregisterBlockType(`${pluginConfig.pluginName}/cpt-quizess-background-options-block`);
    unregisterBlockType(`${pluginConfig.pluginName}/cpt-quizess-options-block`);
  }

}
