<?php
/**
 * The Custom_Fields_Content.
 *
 * @since   1.0.0
 * @package Quizess\Helpers
 */

declare( strict_types=1 );

namespace Quizess\Helpers;

use Quizess\Helpers\General_Helper;

/**
 * Class that holds all the necessary functionality for the
 * callbacks for json rest fields
 *
 * @since 1.0.0
 */
final class Custom_Fields_Content {

  /**
   * Initialize the class
   *
   * @since 1.0.0
   */
  public function __construct() {
    $this->general_helper = new General_Helper();

  }

  /**
   * Parses blocks out of a content string.
   *
   * @since 0.5.0
   *
   * @param  string $content Post content.
   * @return array  Array of parsed block objects.
   */
  public function parse_gutenberg_blocks( string $content ) {
    /**
     * Filter to allow plugins to replace the server-side block parser
     *
     * @since 3.8.0
     *
     * @param string $parser_class Name of block parser class
     */
    $parser_class = apply_filters( 'block_parser_class', 'WP_Block_Parser' );
    $parser       = new $parser_class();
    return $parser->parse( $content );
  }

  /**
   * Get Parsed blocks data.
   *
   * @param string      $key     Post object content.
   * @param string|null $content     Post object content.
   * @return array         JSON with Parsed blocks atributes data.
   *
   * @since 1.0.0
   */
  public function get_decoded_array_value( $key, $content ) : array {
    $content_value = $this->general_helper->get_array_value( $key, $content );
    $output        = ( ! empty( $content_value ) ) ? json_decode( $content_value, true ) : array();

    return $output;
  }


  /**
   * Get Acf data.
   *
   * @param int $post_id     Post id.
   * @return string         JSON with acf data.
   *
   * @since 1.0.0
   */
  public function parse_acf_fields( int $post_id ) {

    // Check if acf plugin exist.
    if ( class_exists( 'ACF' ) ) {
      $image        = get_field( 'author_image', $post_id );
      $image_fields = ( $image ) ? array(
          'id'        => $image['id'],
          'name'      => $image['title'],
          'url'       => $image['url'],
          'thumbnail' => $image['sizes']['thumbnail'],
      ) : false;
      $acf_values   = array(
          'image' => $image_fields,
      );
      return $acf_values;
    }
    return false;
  }

}
