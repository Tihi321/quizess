<?php
/**
 * The class file that removes scores from user.
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Core\Config;
use Quizess\Rest\Rest_Routes;

/**
 * Class Patch_Scores
 */
class Patch_Scores extends Config implements Rest_Callback {

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

    $body = \json_decode( $request->get_body(), true );

    $player_id  = $body['playerId'];
    $quiz_id    = $body['quizId'];
    $last_score = $body['last'];

    $message = ( $last_score === 1 ) ? __( 'Player last score removed', 'quizess' ) : __( 'Player scores removed', 'quizess' );

    $scores = get_post_meta( $quiz_id, self::SCORES_META_KEY, true );

    if ( $last_score === 1 ) {
      // Set players last score to null.
      $scores['players'][ $player_id ]['last'] = null;
    } else {
      // Remove player id from scores.
      unset( $scores['players'][ $player_id ] );
    }

    // Save new scores.
    update_post_meta( $quiz_id, self::SCORES_META_KEY, $scores );

    return \rest_ensure_response( $message );
  }

}
