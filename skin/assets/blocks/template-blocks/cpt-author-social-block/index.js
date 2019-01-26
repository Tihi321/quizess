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
  `${pluginConfig.pluginName}/cpt-author-social-block`,
  {
    title: __('Author Social Link Block', 'quizess'),
    description: __('This is social link block', 'quizess'),
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
      link: {
        type: 'string',
        default: '',
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
