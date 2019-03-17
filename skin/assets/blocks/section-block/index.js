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

const blockName = 'section';

/**
 * Register block
 */
export default registerBlockType(
  `${pluginConfig.pluginName}/${blockName}`,
  {
    title: __('Section', 'quizess'),
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
    edit: BlockEdit,
    save: BlockSave,
  },
);
