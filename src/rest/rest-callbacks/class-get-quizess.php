<?php
/**
 * The class file that contains method for getting quizess values
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

declare( strict_types=1 );

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Core\Config;
use Quizess\Helpers\Blocks_Helper;

/**
 * Class Get_Quizess
 */
class Get_Quizess extends Config implements Rest_Callback {
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
   * Retrieve data needed for quizes endpoint.
   *
   * This callback is triggered from frontend app
   * goes to the @link https://API-URL/wp-json/quizess/v1/quizes
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

    $quiz_id = $request->get_param( 'id' );

    // get quiz with id param.
    $quiz_args = array(
        'p' => $quiz_id,
        'post_type' => self::QUIZESS_POST_SLUG,
        'post_status' => 'publish',
        'order'    => 'ASC',
        'update_post_meta_cache' => false,
        'update_post_term_cache' => false,
        'no_found_rows' => true,
    );

    $quiz_query = new \WP_Query( $quiz_args );
    $quiz_posts = $quiz_query->posts;
    $quiz       = $quiz_posts[0];

    if ( empty( $quiz ) ) {
      return $this->rest_error_handler( 'awesome_no_quiz' );
    }

    $parsed_quiz_array = $this->blocks_helper->parse_gutenberg_blocks( $quiz->post_content );

    if ( empty( $parsed_quiz_array ) ) {
      return $this->rest_error_handler( 'awesome_no_blocks' );
    }

    $output = $this->blocks_helper->get_decoded_quiz_values( $parsed_quiz_array );
    $scores = $this->blocks_helper->get_quiz_scores( $quiz_id );

    $output['scores'] = $scores;

    \wp_reset_postdata();

    return \rest_ensure_response( $output );
  }

}
