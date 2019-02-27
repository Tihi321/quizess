<?php
/**
 * The class file that removes scores from user.
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Rest\Rest_Routes;
use Quizess\Includes\Config;

/**
 * Class Patch_Scores
 */
class Patch_Scores extends Rest_Routes implements Rest_Callback {

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

    $player_id = $body['playerId'];
    $quiz_id   = $body['quizId'];

    $scores = get_post_meta( $quiz_id, Config::SCORES_META_KEY, true );

    // Remove player id from scores.
    unset( $scores['players'][ $player_id ] );

    // Save new scores without player id score.
    update_post_meta( $quiz_id, Config::SCORES_META_KEY, $scores );

    return new \WP_REST_Response( __( 'Player scores removed', 'quizess' ), 200 );
  }

}
