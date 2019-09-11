<?php
/**
 * The class file that removes scores from user.
 *
 * @since   1.0.0
 * @package Quizess\Routes\Route
 */

namespace Quizess\Routes\Route;

use Eightshift_Libs\Routes\Callable_Route;
use Quizess\Routes\Routes_Security;

use Quizess\Routes\Base_Route;

use Quizess\Routes\Route_Security;
use Quizess\Core\Config;

/**
 * Class Patch_Scores
 */
class Patch_Scores extends Base_Route implements Callable_Route, Route_Security {
  const ROUTE_NAME = '/scores';

  /**
   * Options slug
   *
   * @since 1.0.0
   */
  const OPTIONS_SLUG = self::NAMESPACE_NAME . self::VERSION . self::ROUTE_NAME;

  /**
   * Instance variable of rest security.
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $routes_security;

  /**
   * Initialize the class
   *
   * @param Routes_Security $routes_security Security callbacs.
   * @since 1.0.0
   */
  public function __construct( Routes_Security $routes_security ) {
    // Security.
    $this->routes_security = $routes_security;
  }

  /**
   * Get callback arguments array
   *
   * @return array Either an array of options for the endpoint,
   */
  protected function get_callback_arguments() : array {
    return [
      'methods'             => static::EDITABLE,
      'callback'            => [ $this, 'route_callback' ],
      'permission_callback' => [ $this, 'authentification_check' ],
    ];
  }


  /**
   * Update quiz records data, updated through admin dashboard.
   * It will eather remove players last score or delete all player records from quiz
   *
   * This callback is triggered when a admin dashboard
   * goes to the @link https://API-URL/wp-json/quizess/v1/scores
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
  public function route_callback( \WP_REST_Request $request ) {

    $body = \json_decode( $request->get_body(), true );

    $player_id  = $body['playerId'];
    $quiz_id    = $body['quizId'];
    $last_score = $body['last'];

    $message = ( $last_score === 1 ) ? __( 'Player last score removed', 'quizess' ) : __( 'Player scores removed', 'quizess' );

    $scores = get_post_meta( $quiz_id, Config::SCORES_META_KEY, true );

    if ( $last_score === 1 ) {
      // Set players last score to null.
      $scores['players'][ $player_id ]['last'] = null;
    } else {
      // Remove player id from scores.
      unset( $scores['players'][ $player_id ] );
    }

    // Save new scores.
    update_post_meta( $quiz_id, Config::SCORES_META_KEY, $scores );

    return \rest_ensure_response( $message );
  }

  /**
   * Security callback
   *
   * @api
   *
   * @param \WP_REST_Request $request Full data about the request.
   * @return bool|error               True if user authentication passes, error otherwise.
   *
   * @since 1.0.0
   */
  public function authentification_check( \WP_REST_Request $request ) {
    return $this->routes_security->user_authentication_check( $request );
  }

}
