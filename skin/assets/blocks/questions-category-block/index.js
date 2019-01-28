/**
 * Block dependencies
 *
 * Text Domain: quizess
 */
import {registerBlockType} from '@wordpress/blocks';
import {__} from '@wordpress/i18n';
import icons from './icons';

import BlockEdit from './containers/BlockEdit';
import BlockSave from './containers/BlockSave';
import pluginConfig from '../../config';

/**
 * Register block
 */
export default registerBlockType(
  `${pluginConfig.pluginName}/questions-category-block`,
  {
    title: __('Questions Category Block', 'quizess'),
    description: __('This is question block', 'quizess'),
    category: 'quizess-blocks',
    icon: {
      foreground: '#0073A8',
      background: '#FFFFFF',
      src: icons.default,
    },
    keywords: [
      __('Title', 'quizess'),
      __('Body', 'quizess'),
      __('Quizess', 'quizess'),
    ],
    supports: {
      inserter: true,
      html: false,
    },
    attributes: {
      rows: {
        type: 'string',
      },
      theme: {
        type: 'string',
      },
      category: {
        type: 'string',
      },
      posts: {
        type: 'string',
        default: '[]',
      },
      fontColor: {
        type: 'string',
      },
      backgroundColor: {
        type: 'string',
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
