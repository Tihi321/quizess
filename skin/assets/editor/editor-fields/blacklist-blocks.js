import {unregisterBlockType} from '@wordpress/blocks';
import {getQueryArg} from '@wordpress/url';
import pluginConfig from '../../config';

export default class BlackListBlocks {

  init() {

    /**
     * Script is loaded inside of gutenberg editor, so we are checking url
     * so we can filter editors accorgin to post type.
     * There is function of wordpress to check editor post type,
     * but when function is called for the first time it is undefined even
     * if it is called under domReady gutenberg function.
     */

    const postType = getQueryArg(window.location.href, 'post_type');

    if (postType === 'quiz' || postType === 'question') {
      return;
    }
    unregisterBlockType(`${pluginConfig.pluginName}/question-block`);
    unregisterBlockType(`${pluginConfig.pluginName}/questions-category-block`);
    unregisterBlockType(`${pluginConfig.pluginName}/row-block`);
    unregisterBlockType(`${pluginConfig.pluginName}/cpt-quizess-background-options-block`);
    unregisterBlockType(`${pluginConfig.pluginName}/cpt-quizess-options-block`);
  }

}
