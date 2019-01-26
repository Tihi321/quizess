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
  `${pluginConfig.pluginName}/simple-text-block`,
  {
    title: __('Simple Text Block', 'quizess'),
    description: __('This is simple text block', 'quizess'),
    category: 'quizess-blocks',
    icon: {
      foreground: '#D8262C',
      background: '#FFFFFF',
      src: icons.default,
    },
    keywords: [
      __('Title', 'quizess'),
      __('Body', 'quizess'),
      __('Quizess', 'quizess'),
    ],
    supports: {
      align: ['full'],
      html: false,
    },
    attributes: {
      align: {
        type: 'string',
        default: 'full',
      },
      titlePosition: {
        type: 'string',
        default: 'left',
      },
      title: {
        type: 'string',
        default: '',
      },
      content: {
        type: 'string',
        default: '',
      },
      backgroundColor: {
        type: 'string',
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
