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
  `${pluginConfig.pluginName}/image-text-block`,
  {
    title: __('Image Text Block', 'quizess'),
    description: __('This is image text block', 'quizess'),
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
      mediaPosition: {
        type: 'string',
        default: 'left',
      },
      mediaUrl: {
        type: 'string',
        default: '',
      },
      mediaTitle: {
        type: 'string',
        default: '',
      },
      title: {
        type: 'string',
        default: '',
      },
      bodyContent: {
        type: 'string',
        default: '',
      },
      bodyContentChecked: {
        type: 'boolean',
        default: true,
      },
      bottomContent: {
        type: 'string',
        default: '',
      },
      bottomContentChecked: {
        type: 'boolean',
        default: true,
      },
      mediaAlt: {
        type: 'string',
        default: '',
      },
      mediaId: {
        type: 'number',
      },
      hoursWorked: {
        type: 'number',
        default: 1,
      },
      hoursChecked: {
        type: 'boolean',
        default: false,
      },
      fontsUsed: {
        type: 'string',
        default: '',
      },
      fontsChecked: {
        type: 'boolean',
        default: false,
      },
      backgroundColor: {
        type: 'string',
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
