<?php
/**
 * The class file that contains method for saving general plugin options
 *
 * @since   1.0.0
 * @package Quizess\Routes\Route
 */

namespace Quizess\Routes\Route;

use Eightshift_Libs\Routes\Callable_Route;
use Quizess\Routes\Routes_Security;

use Quizess\Routes\Base_Route;

use Quizess\Routes\Route_Security;
use Quizess\Core\Config;

/**
 * Class Patch_General_Options
 */
class Patch_General_Options extends Base_Route implements Callable_Route, Route_Security {

  const ROUTE_NAME = '/options';

  /**
   * Options slug
   *
   * @since 1.0.0
   */
  const OPTIONS_SLUG = self::NAMESPACE_NAME . self::VERSION . self::ROUTE_NAME;

  /**
   * Instance variable of rest security.
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $routes_security;

  /**
   * Initialize the class
   *
   * @param Routes_Security $routes_security Security callbacs.
   * @since 1.0.0
   */
  public function __construct( Routes_Security $routes_security ) {
    // Security.
    $this->routes_security = $routes_security;
  }


  /**
   * Get callback arguments array
   *
   * @return array Either an array of options for the endpoint,
   */
  protected function get_callback_arguments() : array {
    return [
      'methods'             => static::EDITABLE,
      'callback'            => [ $this, 'route_callback' ],
      'permission_callback' => [ $this, 'authentification_check' ],
    ];
  }

  /**
   * Update quiz general options data, updated through admin dashboard.
   *
   * This callback is triggered when a admin dashboard
   * goes to the @link https://API-URL/wp-json/quizess/v1/options
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
  public function route_callback( \WP_REST_Request $request ) {

    $body = \json_decode( $request->get_body(), true );

    $custom_style     = $body['customStyle'] ?? '';
    $light_theme      = $body['lightTheme'] ?? '';
    $remove_admin_bar = $body['removeAdminBar'] ?? '';
    $show_github      = $body['showGithub'] ?? '';
    $copyright        = $body['copyright'] ?? '';
    $facebook         = $body['facebook'] ?? '';
    $twitter          = $body['twitter'] ?? '';
    $linked_in        = $body['linkedIn'] ?? '';
    $instagram        = $body['instagram'] ?? '';

    $sanitized_logo = [];
    $logo           = $body['logo'] ?? '';

    // sanitize all logo object values.
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

    apply_filters( 'qz_save_options', $custom_style, Config::CUSTOM_STYLE_TOGGLE );
    apply_filters( 'qz_save_options', $remove_admin_bar, Config::REMOVE_ADMIN_TOGGLE );
    apply_filters( 'qz_save_options', $light_theme, Config::LIGHT_THEME_TOGGLE );
    apply_filters( 'qz_save_options', $show_github, Config::SHOW_GITHUB_TOGGLE );
    apply_filters( 'qz_save_options', $sanitized_logo_string, Config::CUSTOM_LOGO );
    apply_filters( 'qz_save_options', $copyright, Config::COPYRIGHT_TEXT );
    apply_filters( 'qz_save_options', $facebook, Config::FACEBOOK_URL );
    apply_filters( 'qz_save_options', $twitter, Config::TWITTER_URL );
    apply_filters( 'qz_save_options', $linked_in, Config::LINKEDIN_URL );
    apply_filters( 'qz_save_options', $instagram, Config::INSTAGRAM_URL );

    return \rest_ensure_response( __( 'Options posted with success', 'quizess' ) );
  }

  /**
   * Security callback
   *
   * @api
   *
   * @param \WP_REST_Request $request Full data about the request.
   * @return bool|error               True if user authentication passes, error otherwise.
   *
   * @since 1.0.0
   */
  public function authentification_check( \WP_REST_Request $request ) {
    return $this->routes_security->user_authentication_check( $request );
  }

}
