<?php
/**
 * Class that handles REST security checks
 *
 * @since   1.0.0
 * @package Quizess\Routes
 */

namespace Quizess\Routes;

use Quizess\Core\Config;

/**
 * Class containing registered rest routes
 */
final class Routes_Security {

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
      return apply_filters( 'qz_rest_error_handler', 'empty_header' );
    }

    if ( empty( $request->get_body() ) ) {
      return apply_filters( 'qz_rest_error_handler', 'empty_body' );
    }

    if ( ! is_user_logged_in() ) {
      return apply_filters( 'qz_rest_error_handler', 'user_not_authenticated' );
    }

    // check if method is PATCH from dashboard.
    if ( $request->get_method() === 'PATCH' ) {

      if ( ! isset( $headers['dashboard_nonce'] ) && ! wp_verify_nonce( sanitize_key( $headers['dashboard_nonce'] ), 'quizess_dashboard_nonce' ) ) {
        return apply_filters( 'qz_rest_error_handler', 'user_not_authenticated' );
      }
    }

    // check if method is POST from frontend.
    if ( $request->get_method() === 'POST' ) {

      $current_user_id = get_current_user_id();
      $user_player     = get_user_meta( $current_user_id, Config::USER_PLAYER_TOGGLE, true );

      if ( $user_player !== 'yes' ) {
        return apply_filters( 'qz_rest_error_handler', 'user_not_player' );
      }

      $body = \json_decode( $request->get_body(), true );

      $quiz_id = $body['id'] ?? '';
      $correct = $body['correct'] ?? '';
      $total   = $body['total'] ?? '';
      $stats   = $body['stats'] ?? '';

      if ( ! isset( $quiz_id ) || ! isset( $correct ) || ! isset( $total ) || ! isset( $stats ) ) {
        return apply_filters( 'qz_rest_error_handler', 'default' );
      }

      $can_user_submit = apply_filters( 'qz_can_user_submit', $quiz_id, $current_user_id );

      if ( ! $can_user_submit ) {
        return apply_filters( 'qz_rest_error_handler', 'user_submit_limit' );
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

    $headers = $request->get_headers();

    if ( empty( $headers ) ) {
      return apply_filters( 'qz_rest_error_handler', 'empty_header' );
    }

    if ( ! is_user_logged_in() ) {
      return apply_filters( 'qz_rest_error_handler', 'user_not_authenticated' );
    }

    if ( ! isset( $headers['dashboard_nonce'] ) && ! wp_verify_nonce( sanitize_key( $headers['dashboard_nonce'] ), 'quizess_dashboard_nonce' ) ) {
      return apply_filters( 'qz_rest_error_handler', 'user_not_authenticated' );
    }

    if ( empty( $request->get_body() ) ) {
      return apply_filters( 'qz_rest_error_handler', 'empty_body' );
    }

    return true;
  }

  /**
   * Ensure that menu exist and is selected to be shown
   *
   * @api
   *
   * @param \WP_REST_Request $request Full data about the request.
   * @return bool|error               True if user authentication passes, error otherwise.
   *
   * @since 1.0.0
   */
  public function menu_authentification_check( \WP_REST_Request $request ) {

    $custom_style_option = get_option( Config::CUSTOM_STYLE_TOGGLE );

    if ( empty( $custom_style_option ) ) {
      return apply_filters( 'qz_rest_error_handler', 'custom_not_enabled' );
    }

    return true;
  }

}
