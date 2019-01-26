/**
 * Block dependencies
 *
 * Text Domain: design-island
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
  `${pluginConfig.pluginName}/cpt-islands-category-block`,
  {
    title: __('Islands Category Block', 'design-islands'),
    description: __('This is islands category block', 'design-islands'),
    category: 'design-islands-blocks',
    icon: {
      foreground: '#D8262C',
      background: '#FFFFFF',
      src: icons.default,
    },
    keywords: [
      __('Title', 'design-islands'),
      __('Body', 'design-islands'),
      __('Design Islands', 'design-islands'),
    ],
    supports: {
      align: ['full'],
      html: false,
      inserter: true,
    },
    attributes: {
      align: {
        type: 'string',
        default: 'full',
      },
      category: {
        type: 'string',
      },
      islands: {
        type: 'string',
        default: '{}',
      },
    },
    edit: BlockEdit,
    save: BlockSave,
  },
);
