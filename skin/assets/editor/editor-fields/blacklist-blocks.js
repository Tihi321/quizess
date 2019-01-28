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
            registeredBlocks = false;
            this.unregisterAllBlocks();
          }
          registeredBlocks = false;
        }
      }
    });
  }

  unregisterAllBlocks() {
    const blockNames = [
      'question-block',
      'questions-category-block',
      'row-block',
      'cpt-quizess-background-options-block',
      'cpt-quizess-options-block',
    ];

    blockNames.forEach((name) => {
      unregisterBlockType(`${pluginConfig.pluginName}/${name}`);
    });
  }

}
