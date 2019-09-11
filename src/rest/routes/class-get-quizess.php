<?php
/**
 * The class file that contains method for getting quizess values
 *
 * @since   1.0.0
 * @package Quizess\Routes\Route
 */

namespace Quizess\Routes\Route;

use Eightshift_Libs\Routes\Callable_Route;

use Quizess\Routes\Base_Route;

use Quizess\Blocks\Blocks_Utils;
use Quizess\Core\Config;

/**
 * Class Get_Quizess
 */
class Get_Quizess extends Base_Route implements Callable_Route {
  const ROUTE_NAME = '/quizes/(?P<id>\d+)';

  /**
   * Options slug
   *
   * @since 1.0.0
   */
  const OPTIONS_SLUG = self::NAMESPACE_NAME . self::VERSION . '/quizes';

  /**
   * Blocks_Utils reference
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $blocks_utils;

  /**
   * Initialize the class
   *
   * @param Blocks_Utils $blocks_utils Security callbacs.
   *
   * @since 1.0.0
   */
  public function __construct( Blocks_Utils $blocks_utils ) {
    $this->blocks_utils = $blocks_utils;
  }


  /**
   * Get callback arguments array
   *
   * @return array Either an array of options for the endpoint,
   */
  protected function get_callback_arguments() : array {
    return [
      'methods'             => static::READABLE,
      'callback'            => [ $this, 'route_callback' ],
      'args' => array(
        'id' => array(
          'validate_callback' => function( $param, $request, $key ) {
                  return is_numeric( $param );
          },
          'required' => true,
        ),
      ),
    ];
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
   * @since 1.0.2
   */
  public function route_callback( \WP_REST_Request $request ) {

    $quiz_id = $request->get_param( 'id' );

    // get quiz with id param.
    $quiz_args = array(
      'p' => $quiz_id,
      'post_type' => Config::QUIZESS_POST_SLUG,
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
      return apply_filters( 'qz_rest_error_handler', 'awesome_no_quiz' );
    }

    $parsed_quiz_array = $this->blocks_utils->parse_gutenberg_blocks( $quiz->post_content );

    if ( empty( $parsed_quiz_array ) ) {
      return apply_filters( 'qz_rest_error_handler', 'awesome_no_blocks' );
    }

    $output = $this->blocks_utils->get_decoded_quiz_values( $parsed_quiz_array );
    $scores = $this->blocks_utils->get_quiz_scores( $quiz_id );

    $output['scores'] = $scores;

    /**
     * Check if user logged in and can it play quiz.
     * Case if user refreshes page before finishing the quiz.
     * Save is delayed and user can play again so we need to check when fetching data.
     */
    $should_play = '0';
    if ( is_user_logged_in() ) {
      $current_user_id = get_current_user_id();
      $can_user_submit = apply_filters( 'qz_can_user_submit', (int) $quiz_id, $current_user_id );
      $should_play     = ( $can_user_submit ) ? '1' : '2';
    }

    $output['shouldPlay'] = $should_play;

    \wp_reset_postdata();

    return \rest_ensure_response( $output );
  }

}
