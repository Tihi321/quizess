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
use Quizess\Helpers\Blocks_Helper;
use Quizess\Helpers\General_Helper;
use Quizess\Includes\Config;

/**
 * Class Get_Quizess
 */
class Get_Quizess extends Rest_Routes implements Rest_Callback {
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

    $quiz_id        = $request->get_param( 'id' );
    $quiz_post_type = get_post_type( $quiz_id );
    $quiz           = get_post( $quiz_id );

    if ( $quiz_post_type !== Config::QUIZESS_POST_SLUG || empty( $quiz ) ) {
      return new \WP_Error( 'awesome_no_quiz', 'No quiz found', array( 'status' => 404 ) );
    }

    $parsed_quiz_array = $this->blocks_helper->parse_gutenberg_blocks( $quiz->post_content );

    if ( empty( $parsed_quiz_array ) ) {
      return new \WP_Error( 'awesome_no_blocks', 'No blocks found', array( 'status' => 404 ) );
    }

    $output           = $this->blocks_helper->get_decoded_quiz_values( $parsed_quiz_array );
    $scores           = get_post_meta( $quiz_id, Config::SCORES_META_KEY, true );
    $output['scores'] = ( $scores ) ? $scores : '';

    return new \WP_REST_Response( $output, 200 );
  }

}
