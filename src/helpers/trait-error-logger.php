<?php
/**
 * A trait used to add the error logging functionality
 *
 * Trait is used so that call to a static method is avoided.
 *
 * @since   1.0.0
 * @package Quizess\Helpers
 */

namespace Quizess\Helpers;

/**
 * Error logger trait.
 */
trait Error_Logger {
  /**
   * Error handler helper
   *
   * Returns array with the error code and reason of the error.
   *
   * @param string $status      Status description.
   */
  public function error_handler( string $status = '' ) {

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

      default:
          $error_message = esc_html__( 'Not all quiz values present', 'quizess' );
          $code          = 400;
            break;
    }

    \wp_send_json_error( $error_message, (int) $code );
  }
}
