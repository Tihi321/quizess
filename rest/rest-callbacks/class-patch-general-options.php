<?php
/**
 * The class file that contains method for saving general plugin options
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Rest\Rest_Routes;
use Quizess\Includes\Config;
use Quizess\Helpers\General_Helper;

/**
 * Class Patch_General_Options
 */
class Patch_General_Options extends Rest_Routes implements Rest_Callback {

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

    $custom_style = $this->general_helper->get_array_value( 'customStyle', $body );

    $old_custom_style = get_option( Config::CUSTOM_STYLE_TOGGLE );

    if ( empty( $old_custom_style ) ) {

      delete_option( Config::CUSTOM_STYLE_TOGGLE );
      add_option( Config::CUSTOM_STYLE_TOGGLE, $custom_style );

    }
    if ( $custom_style !== $old_custom_style ) {
      update_option( Config::CUSTOM_STYLE_TOGGLE, $custom_style );
    }

    return new \WP_REST_Response( __( 'Options posted with success', 'quizess' ), 200 );
  }

}
