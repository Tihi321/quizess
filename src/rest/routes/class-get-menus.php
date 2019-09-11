<?php
/**
 * The class file that returns all data for menu add on frontend
 *
 * @since   1.0.0
 * @package Quizess\Routes\Route
 */

namespace Quizess\Routes\Route;

use Eightshift_Libs\Routes\Callable_Route;
use Quizess\Routes\Route_Security;

use Quizess\Routes\Base_Route;

use Quizess\Routes\Routes_Security;
use Quizess\Core\Config;

/**
 * Class Get_Menus
 */
class Get_Menus extends Base_Route implements Callable_Route, Route_Security {

  const ROUTE_NAME = '/menus';

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
      'methods'             => static::READABLE,
      'callback'            => [ $this, 'route_callback' ],
      'permission_callback' => [ $this, 'authentification_check' ],
    ];
  }

  /**
   * Retrieves all emenu data
   *
   * This callback is triggered when a front end app
   * goes to the @link https://API-URL/wp-json/quizess/v1/menus
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

    $logo       = get_option( Config::CUSTOM_LOGO, null );
    $menu_items = apply_filters( 'qz_get_menus', 'all' );

    foreach ( $menu_items as $index => $item ) {
      if ( $item['position'] === Config::MENU_NAME ) {

        if ( empty( $item['name'] ) ) {
          return apply_filters( 'qz_rest_error_handler', 'menu_not_selected' );
        }

        if ( empty( $item['items'] ) ) {
          return apply_filters( 'qz_rest_error_handler', 'no_menu_items' );
        }
      }
    }

    $output =
    [
      'logo' => $logo,
      'menu' => $menu_items[0],
    ];

    return \rest_ensure_response( $output );
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
    return $this->routes_security->menu_authentification_check( $request );
  }

}
