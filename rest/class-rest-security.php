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
use Quizess\Helpers\General_Helper;

/**
 * Class containing registered rest routes
 */
final class Rest_Security {
  use Error_Logger;

  /**
   * General Helper class
   *
   * @var object General_Helper
   *
   * @since 1.0.0
   */
  protected $general_helper;

  /**
   * Initialize class
   *
   * @param General_Helper $general_helper Helper class instance.
   *
   * @since 1.0.0
   */
  public function __construct( General_Helper $general_helper ) {
    $this->general_helper = $general_helper;

  }

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

    $quiz_id = $this->general_helper->get_array_value( 'id', $body );
    $correct = $this->general_helper->get_array_value( 'correct', $body );
    $total   = $this->general_helper->get_array_value( 'total', $body );
    $stats   = $this->general_helper->get_array_value( 'stats', $body );

    if ( ! isset( $quiz_id ) || ! isset( $correct ) || ! isset( $total ) || ! isset( $stats ) ) {
      return $this->error_handler();
    }

    $can_user_submit = $this->general_helper->can_user_submit( $quiz_id, $current_user_id );

    if ( ! $can_user_submit ) {
      return false;
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

    if ( ! isset( $headers['dashboard_nonce'] ) && ! wp_verify_nonce( sanitize_key( $headers['dashboard_nonce'] ), 'quizess_dashboard_nonce' ) ) {
      return $this->error_handler( 'user_not_authenticated' );
    }

    if ( empty( $request->get_body() ) ) {
      return $this->error_handler( 'empty_body' );
    }

    return true;
  }

}
