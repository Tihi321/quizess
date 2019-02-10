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

const blockName = 'section-block';

/**
 * Register block
 */
export default registerBlockType(
  `${pluginConfig.pluginName}/${blockName}`,
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
      blockClass: {
        type: 'string',
        default: `${pluginConfig.pluginName}-${blockName}`,
      },
      wrapClass: {
        type: 'string',
      },
      allowedBlocks: {
        type: 'array',
        items: {
          type: 'string',
        },
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
