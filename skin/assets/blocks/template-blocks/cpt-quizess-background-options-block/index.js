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
import pluginConfig from '../../../config';

/**
 * Register block
 */
export default registerBlockType(
  `${pluginConfig.pluginName}/cpt-quizess-background-options-block`,
  {
    title: __('Background Options', 'quizess'),
    description: __('Choose background image and color', 'quizess'),
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
      inserter: false,
      html: false,
    },
    attributes: {
      backgroundColor: {
        type: 'string',
      },
      url: {
        type: 'string',
        default: '',
      },
      title: {
        type: 'string',
        default: '',
      },
      id: {
        type: 'number',
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
