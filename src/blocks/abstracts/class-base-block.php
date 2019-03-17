<?php
/**
 * Base class for all blocks.
 *
 * @since 1.3.0
 * @package Quizess\Blocks
 */

namespace Quizess\Blocks\Abstracts;

use Quizess\Blocks\Interfaces\Block as Block;
use Quizess\Helpers\General_Helper;

/**
 * Class Block
 */
abstract class Base_Block implements Block {

  /**
   * Namespace in which all our blocks exist.
   *
   * @var string
   *
   * @since 1.3.0
   */
  const NAME = 'abstract-block';

  /**
   * Namespace in which all our blocks exist.
   *
   * @var string
   *
   * @since 1.3.0
   */
  const BLOCK_NAMESPACE = 'quizess';

  /**
   * Array of block attributes as defined in js.
   *
   * @var array
   *
   * @since 1.3.0
   */
  public $attributes = array();

  /**
   * Adds default attributes that are dynamically built for all blocks.
   * These are:
   * - blockName: Block's full name including namespace (example: quizess/heading)
   * - rootClass: Block's root (base) BEM CSS class, built in "block/$name" format (example: block-heading)
   *
   * @throws \Exception On missing block name.
   *
   * @return void
   */
  public function add_default_attributes() : void {

    // Make sure the class (block) extending this class (abstract Base_Block)
    // has defined it's own name.
    if ( static::NAME === self::NAME ) {
      throw new \Exception( esc_html__( 'Trying to add_default_attributes() for block that hasnt defined NAME', 'quizess' ) );
    }

    $default_attributes = array(
        'blockName' => array(
            'type' => 'string',
            'default' => self::BLOCK_NAMESPACE . '/' . static::NAME,
        ),
        'rootClass' => array(
            'type' => 'string',
            'default' => 'block-' . static::NAME,
        ),
    );

    $this->attributes = array_merge( $this->attributes, $default_attributes );
  }


  /**
   * Renders the block using a template in Quizess\Blocks\Templates namespace/folder.
   * Template file must have the same name as the class-blockname file, for example:
   *
   *   Block:     class-heading.php
   *   Template:  heading.php
   *
   * @param  array  $attributes Array of attributes as defined in block's index.js.
   * @param  string $content    Block's content.
   *
   * @throws \Exception On missing attributes OR missing template.
   * @echo string
   *
   * @since 1.3.0
   */
  public function render( array $attributes, string $content ) : string {

    // Block must have a defined name to find it's template.
    // Make sure the class (block) extending this class (abstract Base_Block)
    // has defined it's own name.
    if ( static::NAME === self::NAME ) {
      throw new \Exception( esc_html__( 'Trying to add_default_attributes() for block that hasnt defined NAME', 'quizess' ) );
    }

    $template_path = 'src/blocks/templates/' . static::NAME . '.php';
    $template      = General_Helper::get_base_path() . $template_path;

    if ( empty( $template ) ) {
      throw new \Exception( sprintf( esc_html__( 'Missing template for block called: %1$s | Expecting a template in path: %2$s', 'quizess' ), static::NAME, $template_path ) );
    }

    // If everything is ok, return the contents of the template (return, NOT echo).
    ob_start();
    include $template;
    return ob_get_clean();
  }
}
