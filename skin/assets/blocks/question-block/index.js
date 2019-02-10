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

const blockName = 'question-block';

/**
 * Register block
 */
export default registerBlockType(
  `${pluginConfig.pluginName}/${blockName}`,
  {
    title: __('Question Block', 'quizess'),
    description: __('This is question block', 'quizess'),
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
      inserter: true,
      html: false,
    },
    attributes: {
      templateBlock: {
        type: 'boolean',
        default: false,
      },
      blockClass: {
        type: 'string',
        default: `${pluginConfig.pluginName}-${blockName}`,
      },
      rows: {
        type: 'string',
      },
      theme: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      question: {
        type: 'string',
      },
      answers: {
        type: 'string',
      },
      fontColor: {
        type: 'string',
      },
      backgroundColor: {
        type: 'string',
      },
      showExplanation: {
        type: 'boolean',
      },
      explanationType: {
        type: 'string',
      },
      explanation: {
        type: 'string',
      },
      explanationMedia: {
        type: 'string',
      },
      embed: {
        type: 'boolean',
        default: false,
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
