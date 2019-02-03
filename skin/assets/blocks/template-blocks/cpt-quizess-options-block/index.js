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
  `${pluginConfig.pluginName}/cpt-quizess-options-block`,
  {
    title: __('Quiz Options', 'quizess'),
    description: __('These are quiz options', 'quizess'),
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
      useTimer: {
        type: 'boolean',
      },
      timer: {
        type: 'number',
      },
      welcomeMessage: {
        type: 'string',
      },
      successMessage: {
        type: 'string',
      },
      failureMessage: {
        type: 'string',
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
