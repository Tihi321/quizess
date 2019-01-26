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
   * Initialize the class
   *
   * @param Custom_Fields_Content $custom_fields_content Custom_Fields_Content dependency.
   * @since 1.0.0
   */
  public function __construct( Custom_Fields_Content $custom_fields_content ) {
    $this->custom_fields_content = $custom_fields_content;

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

    $prefix_name = Config::PLUGIN_NAME;
    $block_names = [
        'question' => '/question-block',
        'category' => '/questions-category-block',
    ];

    $quiz_id            = $request->get_param( 'id' );
    $quiz               = get_post( $quiz_id );
    $parsed_quiz        = $this->custom_fields_content->parse_gutenberg_blocks( $quiz->post_content );
    $options            = $parsed_quiz[0]['attrs'];
    $background_options = $parsed_quiz[2]['attrs'];
    $questions_data     = $parsed_quiz[4]['innerBlocks'];

    $questions = [];

    foreach ( $questions_data as $index => $block ) {
      switch ( $block['blockName'] ) {
        case Config::PLUGIN_NAME . $block_names['question']:
          $questions[ $index ] = [
              'name' => 'question',
              'data' => $block['attrs'],
          ];
              break;
        case Config::PLUGIN_NAME . $block_names['category']:
          $category = $this->custom_fields_content->get_decoded_array_value( 'category', $block['attrs'] );
          $selected = $this->custom_fields_content->get_decoded_array_value( 'posts', $block['attrs'] );

          if ( ! empty( $category ) && ! empty( $selected ) ) {
            $category_name       = $category['label'];
            $questions[ $index ] = [
                'name' => 'category',
                'category' => $category_name,
                'sub_blocks' => $this->get_blocks_data( $selected ),
            ];
          }
              break;
        default:
      }
    }

    if ( empty( $parsed_quiz ) ) {
      return new \WP_Error( 'awesome_no_blocks', 'No blocks found', array( 'status' => 404 ) );
    }

    return new \WP_REST_Response(
      array(
          'options' => $options,
          'background_options' => $background_options,
          'blocks' => $questions,
      ),
      200
    );
  }
  /**
   * Initialize the class
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
          'data' => $parsed_data[0]['attrs'],
      ];
    }

    return array( $question_data );
  }

}
