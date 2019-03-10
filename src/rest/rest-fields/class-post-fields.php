<?php
/**
 * Posts custom fields class file
 *
 * @since   1.0.0
 * @package Developer_Portal\Rest\Rest_Fields
 */

namespace Quizess\Rest\Rest_Fields;

use Quizess\Helpers\Blocks_Helper;

/**
 * Class Pages Fields
 *
 * Class that holds methods for adding additional custom fields to the
 * documentation endpoint.
 */
class Post_Fields {
  /**
   * Blocks_Helper reference
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $blocks_helper;

  /**
   * Initialize the class
   *
   * @param Blocks_Helper $blocks_helper Blocks_Helper dependency.
   * @since 1.0.0
   */
  public function __construct( Blocks_Helper $blocks_helper ) {
    $this->blocks_helper = $blocks_helper;
  }

  /**
   * Create new Rest fields for gutenberg blocks on question posts.
   *
   * @api
   *
   * @since 1.0.0
   */
  public function register_block_fields() {

    register_rest_field(
      'question',
      'blocks',
      array(
          'get_callback' => array( $this, 'add_parse_gutenberg_blocks' ),
      )
    );
  }

  /**
   * Get Parsed blocks data.
   *
   * @param array $post     Post object array.
   * @return string         JSON with Parsed blocks atributes data.
   *
   * @since 1.0.0
   */
  public function add_parse_gutenberg_blocks( array $post ) {
    return $this->blocks_helper->parse_gutenberg_blocks( $post['content']['raw'] );
  }

}
