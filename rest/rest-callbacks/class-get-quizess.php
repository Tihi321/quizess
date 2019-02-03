<?php
/**
 * The class file that contains method for getting quizess values
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

declare( strict_types=1 );

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Rest\Rest_Routes;
use Quizess\Helpers\Custom_Fields_Content;
use Quizess\Includes\Config;
use Quizess\Helpers\General_Helper;

/**
 * Class Get_Quizess
 */
class Get_Quizess extends Rest_Routes implements Rest_Callback {
  /**
   * Custom_Fields_Content reference
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $custom_fields_content;
  /**
   * General Helper
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $general_helper;

  /**
   * Initialize the class
   *
   * @param Custom_Fields_Content $custom_fields_content Custom_Fields_Content dependency.
   * @since 1.0.0
   */
  public function __construct( Custom_Fields_Content $custom_fields_content ) {
    $this->custom_fields_content = $custom_fields_content;
    $this->general_helper        = new General_Helper();

  }

  /**
   * Update quiz data rest route callback
   *
   * This callback is triggered when a front end app
   * goes to the @link https://API-URL/wp-json/quizess/v1/quiz
   * endpoint.
   *
   * @api
   *
   * @throws \WP_Error Error if the token is missing or wrong or the password
   * is the same.
   * @param \WP_REST_Request $request Data got from enpoint url.
   * @return \WP_REST_Response|\WP_Error          Developer data array.
   *
   * @since 1.0.0
   */
  public function rest_callback( \WP_REST_Request $request ) {

    $output = array();

    $prefix_name = Config::PLUGIN_NAME;
    $block_names = [
        'options'    => $prefix_name . '/cpt-quizess-options-block',
        'bg-options' => $prefix_name . '/cpt-quizess-background-options-block',
        'section'    => $prefix_name . '/section-block',
        'question'   => $prefix_name . '/question-block',
        'category'   => $prefix_name . '/questions-category-block',
    ];

    $quiz_id = $request->get_param( 'id' );
    $quiz    = get_post( $quiz_id );

    if ( empty( $quiz ) ) {
      return new \WP_Error( 'awesome_no_quiz', 'No quiz found', array( 'status' => 404 ) );
    }

    $parsed_quiz_array = $this->custom_fields_content->parse_gutenberg_blocks( $quiz->post_content );

    if ( empty( $parsed_quiz_array ) ) {
      return new \WP_Error( 'awesome_no_blocks', 'No blocks found', array( 'status' => 404 ) );
    }

    foreach ( $parsed_quiz_array as $index => $quiz_item ) {
      switch ( $quiz_item['blockName'] ) {
        case $block_names['options']:
          $output['options'] = array(
              'useTimer'       => $this->general_helper->get_array_value( 'useTimer', $quiz_item['attrs'] ),
              'timer'          => $this->general_helper->get_array_value( 'timer', $quiz_item['attrs'] ),
              'welcomeMessage' => $this->general_helper->get_array_value( 'welcomeMessage', $quiz_item['attrs'] ),
              'successMessage' => $this->general_helper->get_array_value( 'successMessage', $quiz_item['attrs'] ),
              'failureMessage' => $this->general_helper->get_array_value( 'failureMessage', $quiz_item['attrs'] ),
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

    $questions = [];

    foreach ( $output['questions'] as $index => $block ) {
      switch ( $block['blockName'] ) {
        case $block_names['question']:
          $questions[ $index ] = [
              'name' => 'question',
              'data' => $this->get_question_data( $block['attrs'] ),
          ];
              break;
        case $block_names['category']:
          $category = $this->custom_fields_content->get_decoded_array_value( 'category', $block['attrs'] );
          $selected = $this->custom_fields_content->get_decoded_array_value( 'posts', $block['attrs'] );

          if ( ! empty( $category ) && ! empty( $selected ) ) {
            $category_name       = $category['label'];
            $questions[ $index ] = [
                'name' => 'category',
                'category' => $category_name,
                'questions' => $this->get_blocks_data( $selected ),
            ];
          }
              break;
        default:
      }
    }

    return new \WP_REST_Response(
      array(
          'options' => $output['options'],
          'bgOptions' => $output['bg-options'],
          'blocks' => $questions,
      ),
      200
    );
  }
  /**
   * Get blocks data
   *
   * @param array $blocks_data Custom_Fields_Content dependency.
   * @since 1.0.0
   */
  private function get_blocks_data( $blocks_data ) : array {
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

      $parsed_data = $this->custom_fields_content->parse_gutenberg_blocks( $block_post->post_content );

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
   * @param array $block_data Custom_Fields_Content dependency.
   * @since 1.0.0
   */
  private function get_question_data( $block_data ) : array {

    return array(
        'question'         => $this->general_helper->get_array_value( 'question', $block_data ),
        'answers'          => $this->custom_fields_content->get_decoded_array_value( 'answers', $block_data ),
        'showExplanation'  => $this->general_helper->get_array_value( 'showExplanation', $block_data ),
        'explanationType'  => ( $this->general_helper->get_array_value( 'explanationType', $block_data ) ) ? json_decode( $this->general_helper->get_array_value( 'explanationType', $block_data ) )->value : '',
        'explanationMedia' => $this->general_helper->get_array_value( 'explanationMedia', $block_data ),
    );
  }

}
