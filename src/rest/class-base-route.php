<?php
/**
 * The class file that holds abstract class for REST routes registering
 *
 * @since   1.4.0
 * @package Quizess\Routes
 */

namespace Quizess\Routes;

use Eightshift_Libs\Routes\Route;

/**
 * Abstract base route class
 *
 * @since   1.4.0
 */
abstract class Base_Route implements Route {
  const NAMESPACE_NAME = 'quizess';
  const VERSION        = '/v1';
  const ROUTE_NAME     = '';

  /**
   * Register REST API route
   */
  public function register() : void {
    add_action(
      'rest_api_init',
      function() {
        register_rest_route(
          self::NAMESPACE_NAME . self::VERSION,
          $this->get_callback_route(),
          $this->get_callback_arguments(),
          $this->override_route()
        );
      }
    );
  }

  /**
   * Get the base url of the route
   *
   * @return string The base URL for route you are adding.
   */
  protected function get_callback_route() : string {
    return static::ROUTE_NAME;
  }

  /**
   * Get callback arguments array
   *
   * @return array Either an array of options for the endpoint, or an array of arrays for multiple methods.
   */
  abstract protected function get_callback_arguments() : array;

  /**
   * Override the existing route
   *
   * @return bool If the route already exists, should we override it?
   * True overrides, false merges (with newer overriding if duplicate keys exist).
   */
  protected function override_route() : bool {
    return false;
  }

  /**
   * Error response helper
   *
   * @param  int    $code    Error code.
   * @param  string $message Error message.
   */
  protected function get_error_response( int $code, string $message ) {
    return new \WP_Error( (int) $code, $message, [ 'status' => (int) $code ] );
  }
}
