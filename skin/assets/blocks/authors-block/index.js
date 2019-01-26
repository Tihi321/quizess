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
  `${pluginConfig.pluginName}/authors-block`,
  {
    title: __('Authors Block', 'quizess'),
    description: __('This is authors block', 'quizess'),
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
      inserter: true,
      multiple: false,
    },
    attributes: {
      align: {
        type: 'string',
        default: 'full',
      },
      authors: {
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
