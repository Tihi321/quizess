<?php
/**
 * The Gutenberg Blocks specific functionality.
 *
 * @since   1.0.0
 * @package Quizess\Blocks
 */

namespace Quizess\Blocks;

use Quizess\Core\Service;
use Quizess\Helpers\Loader;

/**
 * Class Blocks
 */
class Blocks implements Service {

  /**
   * Use trait inside class.
   */
  use Loader;

  /**
   * Register all the hooks
   *
   * @since 1.0.0
   */
  public function register() : void {

    // Whitelist blocks.
    $this->add_action( 'allowed_block_types', $this, 'quizess_allowed_block_types', 10, 2 );

    // Add custom block category.
    $this->add_filter( 'block_categories', $this, 'quizess_category', 10, 2 );
  }

  /**
   * Whitelist allowed blocks according to post type
   *
   * @param array  $allowed_block_types accepts all registered block types.
   *
   * @param object $post accepts post object.
   * @return array
   */
  public function quizess_allowed_block_types( $allowed_block_types, $post ) {
    $quiz_allowed_blocks     = [
        'quizess/question-block',
        'quizess/questions-category-block',
        'quizess/section-block',
        'quizess/cpt-quizess-background-options-block',
        'quizess/cpt-quizess-options-block',
    ];
    $question_allowed_blocks = [
        'quizess/question-block',
    ];

    $type = get_post_type( $post );

    switch ( $type ) {
      case 'quiz':
            return $quiz_allowed_blocks;
      case 'question':
            return $question_allowed_blocks;
      case 'story':
            return $allowed_block_types;
      default:
            return $allowed_block_types;
    }
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
