<?php
/**
 * Class that handles REST security checks
 *
 * @since   1.0.0
 * @package Quizess\Rest_Routes
 */

namespace Quizess\Rest;

use Quizess\Includes\Config;
use Quizess\Helpers\Error_Logger;

/**
 * Class containing registered rest routes
 */
final class Rest_Security {
  use Error_Logger;

  /**
   * Ensure that user exists, is logged in and is able to submit scores
   *
   * This method is called before submit scores callback.
   *
   * @api
   *
   * @param \WP_REST_Request $request Full data about the request.
   * @return bool|error               True if user authentication passes, error otherwise.
   *
   * @since 1.0.0
   */
  public function user_authentication_check( \WP_REST_Request $request ) {

    $headers = $request->get_headers();

    if ( empty( $headers ) ) {
      return $this->error_handler( 'empty_header' );
    }

    if ( empty( $request->get_body() ) ) {
      return $this->error_handler( 'empty_body' );
    }

    if ( ! is_user_logged_in() ) {
      return $this->error_handler( 'user_not_authenticated' );
    }

    $current_user_id = get_current_user_id();
    $user_player     = get_user_meta( $current_user_id, Config::USER_PLAYER_TOGGLE, true );

    if ( $user_player !== 'yes' ) {
      return $this->error_handler( 'user_not_player' );
    }

    $body = \json_decode( $request->get_body(), true );

    $quiz_id = $body['id'];
    $correct = $body['correct'];
    $total   = $body['total'];
    $stats   = $body['stats'];

    if ( empty( $quiz_id ) || empty( $correct ) || empty( $total ) || empty( $stats ) ) {
      return $this->error_handler();
    }

    $scores = get_post_meta( $quiz_id, Config::SCORES_META_KEY, true );

    if ( ! empty( $scores ) ) {

      $player_scores = $scores['players'][ $current_user_id ];
      $user_single   = get_user_meta( $current_user_id, Config::USER_SINGLE_TOGGLE, true );

      if ( ! empty( $player_scores ) && $user_single === 'yes' ) {

        return $this->error_handler( 'user_submit_limit' );

      }
    }

    return true;
  }

  /**
   * Ensure that user is logged in
   *
   * @api
   *
   * @param \WP_REST_Request $request Full data about the request.
   * @return bool|error               True if user authentication passes, error otherwise.
   *
   * @since 1.0.0
   */
  public function user_basic_authentication_check( \WP_REST_Request $request ) {

    // Disable security check on GET method.
    if ( $request->get_method() === 'GET' ) {
      return true;
    }

    $headers = $request->get_headers();

    if ( empty( $headers ) ) {
      return $this->error_handler( 'empty_header' );
    }

    if ( ! is_user_logged_in() ) {
      return $this->error_handler( 'user_not_authenticated' );
    }

    return true;
  }

}
