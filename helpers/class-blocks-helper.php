<?php
/**
 * The Blocks_Helper.
 *
 * @since   1.0.0
 * @package Quizess\Helpers
 */

declare( strict_types=1 );

namespace Quizess\Helpers;

use Quizess\Helpers\General_Helper;
use Quizess\Includes\Config;

/**
 * Class that holds all the necessary functionality parsing
 * of blocks for plugin
 *
 * @since 1.0.0
 */
final class Blocks_Helper {

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
   * @param array $parsed_blocks     Parsed blocks from post.
   * @return array         JSON with Parsed blocks atributes data.
   *
   * @since 1.0.0
   */
  public function get_decoded_quiz_values( $parsed_blocks ) : array {

    $output    = array();
    $questions = array();

    $prefix_name = Config::PLUGIN_NAME;
    $block_names = [
        'options'    => $prefix_name . '/cpt-quizess-options-block',
        'bg-options' => $prefix_name . '/cpt-quizess-background-options-block',
        'section'    => $prefix_name . '/section-block',
        'question'   => $prefix_name . '/question-block',
        'category'   => $prefix_name . '/questions-category-block',
    ];

    foreach ( $parsed_blocks as $index => $quiz_item ) {
      switch ( $quiz_item['blockName'] ) {
        case $block_names['options']:
          $use_timer = $this->general_helper->get_array_value( 'useTimer', $quiz_item['attrs'] );

          $output['options'] = array(
              'timer' => ( $use_timer ) ? $this->general_helper->get_array_value( 'timer', $quiz_item['attrs'] ) : null,
              'theme'  => ( $this->general_helper->get_array_value( 'theme', $quiz_item['attrs'] ) ) ? json_decode( $this->general_helper->get_array_value( 'theme', $quiz_item['attrs'] ) )->value : 'light',
              'welcomeMessage' => $this->general_helper->get_array_value( 'welcomeMessage', $quiz_item['attrs'] ),
              'successMessage' => $this->general_helper->get_array_value( 'successMessage', $quiz_item['attrs'] ),
              'failureMessage' => $this->general_helper->get_array_value( 'failureMessage', $quiz_item['attrs'] ),
              'aboutField' => $this->general_helper->get_array_value( 'aboutField', $quiz_item['attrs'] ),
          );
              break;
        case $block_names['bg-options']:
          $output['bg-options'] = array(
              'bgColor' => $this->general_helper->get_array_value( 'backgroundColor', $quiz_item['attrs'] ),
              'bgUrl'   => $this->general_helper->get_array_value( 'url', $quiz_item['attrs'] ),
              'bgAlt'   => $this->general_helper->get_array_value( 'title', $quiz_item['attrs'] ),
          );
              break;
        case $block_names['section']:
          $output['questions'] = $this->general_helper->get_array_value( 'innerBlocks', $quiz_item );
              break;
        default:
      }
    }

    foreach ( $output['questions'] as $index => $block ) {
      switch ( $block['blockName'] ) {
        case $block_names['question']:
          $questions[ $index ] = [
              'name' => 'question',
              'style' => $this->get_style_data( $block['attrs'] ),
              'data' => $this->get_question_data( $block['attrs'] ),
          ];
              break;
        case $block_names['category']:
          $category = $this->get_decoded_array_value( 'category', $block['attrs'] );
          $selected = $this->get_decoded_array_value( 'posts', $block['attrs'] );

          if ( ! empty( $category ) && ! empty( $selected ) ) {
            $category_name       = $category['label'];
            $questions[ $index ] = [
                'name' => 'category',
                'category' => $category_name,
                'style' => $this->get_style_data( $block['attrs'] ),
                'questions' => $this->get_selected_questions_data( $selected ),
            ];
          }
              break;
        default:
      }
    }

    return array(
        'options' => $output['options'],
        'bgOptions' => $output['bg-options'],
        'blocks' => $questions,
    );
  }

  /**
   * Return blocks options data
   *
   * @param string $content Post content.
   * @since 1.0.0
   */
  public function get_quiz_options( $content ) : array {
    $parsed_blocks = $this->parse_gutenberg_blocks( $content );
    $blocks_data   = $this->get_decoded_quiz_values( $parsed_blocks );
    return array(
        'options' => $blocks_data['options'],
        'bgOptions' => $blocks_data['bgOptions'],
    );
  }

  /**
   * Get selected questions blocks data
   *
   * @param array $blocks_data Blocks_Helper dependency.
   * @since 1.0.0
   */
  private function get_selected_questions_data( $blocks_data ) : array {
    $block_ids     = [];
    $question_data = [];

    foreach ( $blocks_data as $index => $block ) {
      $block_ids[] = $block['value'];
    }

    $args        = array(
        'post_type' => 'question',
        'posts_per_page' => -1,
        'post__in' => $block_ids,
        'order_by' => 'post__in',
    );
    $block_posts = get_posts( $args );

    foreach ( $block_posts as $index => $block_post ) {

      $parsed_data = $this->parse_gutenberg_blocks( $block_post->post_content );

      $question_data[ $index ] = [
          'name' => 'question',
          'data' => $this->get_question_data( $parsed_data[0]['attrs'] ),
      ];
    }

    return array( $question_data );
  }

  /**
   * Get question data
   *
   * @param array $block_data Blocks_Helper dependency.
   * @since 1.0.0
   */
  private function get_question_data( $block_data ) : array {

    $show_explanation  = $this->general_helper->get_array_value( 'showExplanation', $block_data );
    $explanation       = $this->general_helper->get_array_value( 'explanation', $block_data );
    $explanation_type  = ( $this->general_helper->get_array_value( 'explanationType', $block_data ) ) ? json_decode( $this->general_helper->get_array_value( 'explanationType', $block_data ) )->value : null;
    $explanation_media = json_decode( $this->general_helper->get_array_value( 'explanationMedia', $block_data ) );

    return array(
        'question'         => $this->general_helper->get_array_value( 'question', $block_data ),
        'answers'          => $this->get_decoded_array_value( 'answers', $block_data ),
        'explanationText'  => ( $show_explanation ) ? $explanation : null,
        'explanationType'  => ( $show_explanation && $explanation_type !== 'none' ) ? $explanation_type : null,
        'explanationMedia' => ( $show_explanation && $explanation_media->id ) ? $explanation_media : null,
    );
  }

  /**
   * Get style data
   *
   * @param array $block_data Blocks_Helper dependency.
   * @since 1.0.0
   */
  private function get_style_data( $block_data ) : array {

    return array(
        'direction'  => ( $this->general_helper->get_array_value( 'rows', $block_data ) ) ? json_decode( $this->general_helper->get_array_value( 'rows', $block_data ) )->value : 'row',
        'theme'  => ( $this->general_helper->get_array_value( 'theme', $block_data ) ) ? json_decode( $this->general_helper->get_array_value( 'theme', $block_data ) )->value : 'light',
    );
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
  private function get_decoded_array_value( $key, $content ) : array {
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
