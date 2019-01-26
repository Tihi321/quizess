<?php
/**
 * Posts custom fields class file
 *
 * @since   1.0.0
 * @package Developer_Portal\Rest\Rest_Fields
 */

namespace Quizess\Rest\Rest_Fields;

use Quizess\Helpers\Custom_Fields_Content;

/**
 * Class Pages Fields
 *
 * Class that holds methods for adding additional custom fields to the
 * documentation endpoint.
 */
class Post_Fields {
  /**
   * Custom_Fields_Content reference
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $custom_fields_content;

  /**
   * Initialize the class
   *
   * @param Custom_Fields_Content $custom_fields_content Custom_Fields_Content dependency.
   * @since 1.0.0
   */
  public function __construct( Custom_Fields_Content $custom_fields_content ) {
    $this->custom_fields_content = $custom_fields_content;
  }

  /**
   * Create new Rest fields for gutenberg blocks on posts.
   *
   * @api
   *
   * @since 1.0.0
   */
  public function register_block_fields() {

    register_rest_field(
      'post',
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
    return $this->custom_fields_content->parse_gutenberg_blocks( $post['content']['raw'] );
  }

  /**
   * Add custom acf fields for author post
   *
   * @param array $post Post object array.
   * @return array      Custom acf fields to show in the rest response of author posts json.
   */
  public function add_parse_acf_fields( array $post ) {
    return $this->custom_fields_content->parse_acf_fields( $post['id'] );
  }
}
