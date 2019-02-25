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

    if ( ! is_user_logged_in() ) {
      return $this->error_handler( 'user_not_authenticated' );
    }

    return true;
  }

}
