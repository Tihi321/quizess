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
  `${pluginConfig.pluginName}/image-block`,
  {
    title: __('Image Block', 'quizess'),
    description: __('This is image block', 'quizess'),
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
      mediaUrl: {
        type: 'string',
        default: '',
      },
      mediaTitle: {
        type: 'string',
        default: '',
      },
      mediaAlt: {
        type: 'string',
        default: '',
      },
      mediaId: {
        type: 'number',
      },
      backgroundColor: {
        type: 'string',
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
