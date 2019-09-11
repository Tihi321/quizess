<?php
/**
 * Error Utility class.
 *
 * @since   1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Utils;

use Eightshift_Libs\Core\Service;

/**
 * Class Error_Logger
 *
 * This class handles srtings.
 *
 * @since 1.0.0
 */
class Error_Logger implements Service {

  /**
   * Register all the hooks
   *
   * @return void
   *
   * @since 1.0.0
   */
  public function register() {
    add_filter( 'qz_rest_error_handler', [ $this, 'rest_error_handler' ], 10, 2 );
  }

  /**
   * Ensure correct error response for rest using error handler function.
   *
   * @param string $status  Status description.
   * @param string $message Optional error message.
   *
   * @return \WP_Error \WP_Error instance with error message and status.
   *
   * @since 1.0.0
   */
  public function rest_error_handler( string $status = '', string $message = null ) {
    return \rest_ensure_response( $this->error_handler( $status, $message ) );
  }

  /**
   * Error handler helper
   *
   * Returns array with the error code and reason of the error.
   *
   * @param string $status      Status description.
   * @param string $message     Optional error message.
   *
   * @return \WP_Error          \WP_Error instance with error message and status.
   *
   * @since  1.0.0
   */
  private function error_handler( string $status, string $message = null ) {

    switch ( $status ) {
      case 'empty_body':
          $error_message = esc_html__( 'The request body is empty.', 'quizess' );
          $code          = 400;
            break;

      case 'empty_header':
          $error_message = esc_html__( 'The request header is empty.', 'quizess' );
          $code          = 400;
            break;

      case 'scores_missing':
          $error_message = esc_html__( 'Scores not submitted.', 'quizess' );
          $code          = 400;
            break;

      case 'user_not_authenticated':
          $error_message = esc_html__( 'User is not authenticated.', 'quizess' );
          $code          = 403;
            break;

      case 'user_not_player':
          $error_message = esc_html__( 'User is not registered player.', 'quizess' );
          $code          = 403;
            break;

      case 'user_submit_limit':
          $error_message = esc_html__( 'Uer submit limit reached.', 'quizess' );
          $code          = 403;
            break;

      case 'custom_not_enabled':
          $error_message = esc_html__( 'Custom styles not enabled', 'quizess' );
          $code          = 403;
            break;

      case 'menu_not_selected':
          $error_message = esc_html__( 'Menu is not selected', 'quizess' );
          $code          = 403;
            break;

      case 'no_menu_items':
          $error_message = esc_html__( 'Menu has no items', 'quizess' );
          $code          = 403;
            break;

      case 'awesome_no_quiz':
          $error_message = esc_html__( 'No quiz found', 'quizess' );
          $code          = 404;
            break;

      case 'awesome_no_blocks':
          $error_message = esc_html__( 'No blocks found', 'quizess' );
          $code          = 404;
            break;

      default:
          $error_message = esc_html__( 'Not all quiz values present', 'quizess' );
          $code          = 400;
            break;
    }

    $output_message = ( $message ) ? $message : $error_message;

    return new \WP_Error( esc_html( $status ), $output_message, [ 'status' => (int) $code ] );
  }
}
