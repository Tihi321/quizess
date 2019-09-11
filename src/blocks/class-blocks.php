<?php
/**
 * The Gutenberg Blocks specific functionality.
 *
 * @since   1.0.0
 * @package Quizess\Blocks
 */

namespace Quizess\Blocks;

use Eightshift_Libs\Core\Service;

use Quizess\Blocks\Interfaces\Block;
use Quizess\Blocks\Section;

/**
 * Class Blocks
 */
class Blocks implements Service {

  /**
   * Register all the hooks
   *
   * @since 1.0.0
   */
  public function register() : void {

    // Whitelist blocks.
    add_action( 'allowed_block_types', [ $this, 'quizess_allowed_block_types' ], 10, 2 );

    // Add custom block category.
    add_filter( 'block_categories', [ $this, 'quizess_category' ], 10, 2 );

    // Add dynamic blocks to list.
    $this->register_dynamic_blocks();

    // Register dynamic blocks.
    $this->register_blocks();
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
      'quizess/section',
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

  /**
   * Initialize dynamic blocks
   *
   * @throws \Exception If there's a block in $this->list that doesn't extend "Block" class.
   *
   * @return void
   *
   * @since 1.3.0
   */
  public function register_dynamic_blocks() : void {
    $this->list = [
      'section'   => new Section(),
    ];
  }

  /**
   * Add a new action to the collection to be registered with WordPress.
   *
   * @throws \Exception If there's a block in $this->list that doesn't extend "Block" class.
   *
   * @return void
   *
   * @since 1.3.0
   */
  public function register_blocks() : void {

    foreach ( $this->list as $block ) {
      if ( ! ( $block instanceof Block ) ) {
        throw new \Exception( 'Trying to register a block that doesn\'t extend "Block" class' );
      }
      $this->register_block( $block );
    }
  }

  /**
   * Registers a dynamic block with a corresponding render_callback defined in the block itself
   *
   * @param Block $block Block object.
   *
   * @return void
   */
  public function register_block( Block $block ) {

    $block->add_default_attributes();

    register_block_type(
      $block::BLOCK_NAMESPACE . '/' . $block::NAME,
      array(
        'render_callback' => array( $block, 'render' ),
        'attributes' => $block->attributes,
      )
    );

  }

}
