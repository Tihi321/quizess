<?php
/**
 * The class file that contains method for saving general plugin options
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Core\Config;
use Quizess\Helpers\Object_Helper;
use Quizess\Helpers\General_Helper;

/**
 * Class Patch_General_Options
 */
class Patch_General_Options extends Config implements Rest_Callback {

  /**
   * Use trait inside class.
   */
  use Object_Helper;

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

    $custom_style = sanitize_text_field( General_Helper::get_array_value( 'customStyle', $body ) );
    $show_github  = sanitize_text_field( General_Helper::get_array_value( 'showGithub', $body ) );
    $copyright    = sanitize_text_field( General_Helper::get_array_value( 'copyright', $body ) );
    $facebook     = sanitize_text_field( General_Helper::get_array_value( 'facebook', $body ) );
    $twitter      = sanitize_text_field( General_Helper::get_array_value( 'twitter', $body ) );
    $linked_in    = sanitize_text_field( General_Helper::get_array_value( 'linkedIn', $body ) );
    $instagram    = sanitize_text_field( General_Helper::get_array_value( 'instagram', $body ) );

    $sanitized_logo = [];
    $logo           = General_Helper::get_array_value( 'logo', $body );

    foreach ( $logo as $key => $item ) {
      if ( $key !== 'id' && $key !== 'url' && $key !== 'title' ) {
        continue;
      }
      if ( $key === 'url' ) {
        $sanitized_logo[ $key ] = esc_url_raw( $item );
        continue;
      }
      $sanitized_logo[ $key ] = sanitize_text_field( $item );
    }

    $sanitized_logo_string = wp_json_encode( $sanitized_logo );

    $this->save_options( $custom_style, self::CUSTOM_STYLE_TOGGLE );
    $this->save_options( $show_github, self::SHOW_GITHUB_TOGGLE );
    $this->save_options( $sanitized_logo_string, self::CUSTOM_LOGO );
    $this->save_options( $copyright, self::COPYRIGHT_TEXT );
    $this->save_options( $facebook, self::FACEBOOK_URL );
    $this->save_options( $twitter, self::TWITTER_URL );
    $this->save_options( $linked_in, self::LINKEDIN_URL );
    $this->save_options( $instagram, self::INSTAGRAM_URL );

    return new \WP_REST_Response( __( 'Options posted with success', 'quizess' ), 200 );
  }

}
