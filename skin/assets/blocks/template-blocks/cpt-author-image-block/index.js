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
  `${pluginConfig.pluginName}/cpt-author-image-block`,
  {
    title: __('Author Image Block', 'quizess'),
    description: __('This is authors image block', 'quizess'),
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
      inserter: false,
      html: false,
    },
    attributes: {
      id: {
        type: 'number',
      },
      url: {
        type: 'string',
        default: '',
      },
      title: {
        type: 'string',
        default: '',
      },
      alt: {
        type: 'string',
        default: '',
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
