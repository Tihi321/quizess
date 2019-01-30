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
  `${pluginConfig.pluginName}/section-block`,
  {
    title: __('Section Block', 'quizess'),
    description: __('This is section block', 'quizess'),
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
      html: false,
      inserter: false,
    },
    attributes: {
      classWrap: {
        type: 'string',
        default: '',
      },
      allowedBlocks: {
        type: 'array',
      },
      template: {
        type: 'string',
        default: '',
      },
      disableBlocks: {
        type: 'boolean',
        default: false,
      },
      templateLock: {
        type: 'boolean',
        default: false,
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
