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
  `${pluginConfig.pluginName}/description-resource-block`,
  {
    title: __('Description Resource Block', 'quizess'),
    description: __('This is resource block with description', 'quizess'),
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
      description: {
        type: 'string',
        default: '',
      },
      resource: {
        type: 'string',
        default: 'link-type',
      },
      linkText: {
        type: 'string',
        default: '',
      },
      link: {
        type: 'string',
        default: '',
      },
      customDomain: {
        type: 'string',
        default: '',
      },
      useCustomDomain: {
        type: 'boolean',
        default: false,
      },
      customFileType: {
        type: 'string',
        default: '',
      },
      useCustomFileType: {
        type: 'boolean',
        default: false,
      },
      fileId: {
        type: 'number',
      },
      fileUrl: {
        type: 'string',
        default: '',
      },
      fileTitle: {
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
