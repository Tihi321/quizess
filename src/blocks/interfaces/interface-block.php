<?php
/**
 * Interface for blocks.
 *
 * @since 1.3.0
 * @package Quizess\Blocks
 */

namespace Quizess\Blocks\Interfaces;

/**
 * Interface Block
 */
interface Block {

  /**
   * Adds default attributes that are dynamically built for all blocks.
   * These are:
   * - blockName: Block's full name including namespace (example: quizess/heading)
   * - rootClass: Block's root (base) BEM CSS class, built in "block/$name" format (example: block-heading)
   *
   * @return void
   */
  public function add_default_attributes() : void;

  /**
   * Renders the block using a template in Quizess\Blocks\Templates namespace/folder.
   * Template file must have the same name as the class-blockname file, for example:
   *
   *   Block:     class-heading.php
   *   Template:  heading.php
   *
   * @param array  $attributes Array of attributes as defined in block's index.js.
   * @param string $content    Block's content.
   *
   * @echo string
   *
   * @since 1.3.0
   */
  public function render( array $attributes, string $content ) : string;
}
