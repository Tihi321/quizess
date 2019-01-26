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
  `${pluginConfig.pluginName}/video-text-block`,
  {
    title: __('Video Text Block', 'quizess'),
    description: __('This is video text block', 'quizess'),
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
      theme: {
        type: 'string',
        default: 'light-theme',
      },
      sourceType: {
        type: 'string',
        default: 'type-file',
      },
      showEmbed: {
        type: 'boolean',
        default: false,
      },
      youtubeUrl: {
        type: 'string',
        default: '',
      },
      youtubeID: {
        type: 'string',
        default: '',
      },
      mediaId: {
        type: 'number',
      },
      mediaUrl: {
        type: 'string',
        default: '',
      },
      title: {
        type: 'string',
        default: '',
      },
      titleChecked: {
        type: 'boolean',
        default: true,
      },
      bodyContent: {
        type: 'string',
        default: '',
      },
      bodyContentChecked: {
        type: 'boolean',
        default: true,
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
