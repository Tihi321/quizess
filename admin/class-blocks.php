<?php
/**
 * The Gutenberg Blocks specific functionality.
 *
 * @since   1.0.0
 * @package Quizess\Blocks
 */

namespace Quizess\Admin;

use Quizess\Includes\Config;

/**
 * Class Blocks
 */
class Blocks extends Config {

  /**
   * Whitelist allowed blocks according to post type
   *
   * @param array  $allowed_block_types accepts all registered block types.
   *
   * @param object $post accepts post object.
   * @return array
   */
  public function Quizess_allowed_block_types( $allowed_block_types, $post ) {
    return $allowed_block_types;
  }

  /**
   * Method that adds custom Quizess category to blocks inserter
   *
   * @param array  $categories Categories from blocks.
   * @param string $post Current post.
   *
   * @since 1.0.0
   */
  public function quizess_category( $categories, $post ) {
    return array_merge(
      $categories,
      array(
          array(
              'slug' => 'quizess-blocks',
              'title' => __( 'Quizess', 'quizess' ),
          ),
      )
    );
  }

}
