import {subscribe, select, dispatch} from '@wordpress/data';
import {__} from '@wordpress/i18n';

export default class PostTitle {
  titleMaxChars(maxChars) {
    let currentTitle;
    subscribe(function() {
      if (!currentTitle) {
        currentTitle = select('core/editor').getEditedPostAttribute('title');
      }
      if (currentTitle) {
        const newTitle = select('core/editor').getEditedPostAttribute('title');
        const maxValue = newTitle.length > maxChars;
        currentTitle = !maxValue ? newTitle : currentTitle;
        if (maxValue) {
          const infoMaxTitleMessage = `${__('Maximum title characters is ', 'quizess')} ${maxChars}`;
          dispatch('core/editor').editPost({title: currentTitle});
          dispatch('core/notices').createNotice('warning', infoMaxTitleMessage, {
            id: 'maxTitleInfo',
          });
        }
      }
    });
  }
}
