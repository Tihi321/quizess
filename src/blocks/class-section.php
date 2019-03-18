<?php
/**
 * All info regarding the section block
 *
 * @since 1.0.0
 * @package Quizess\Includes
 */

namespace Quizess\Blocks;

use Quizess\Blocks\Abstracts\Base_Block;

/**
 * Class Section
 */
class Section extends Base_Block {

  /**
   * Block's name.
   *
   * @since 1.0.0
   */
  const NAME = 'section';

  /**
   * Constructs object
   */
  public function __construct() {
    $this->attributes = array(
        'allowedBlocks' => array(
            'type' => 'array',
            'items' => array(
                'type' => 'string',
            ),
        ),
        'blockClass' => array(
            'type' => 'string',
            'default' => 'quizess-section',
        ),
        'wrapClass' => array(
            'type' => 'string',
        ),
        'template' => array(
            'type' => 'string',
            'default' => '',
        ),
        'disableBlocks' => array(
            'type' => 'boolean',
            'default' => false,
        ),
        'templateLock' => array(
            'type' => 'boolean',
            'default' => false,
        ),
    );
  }
}
