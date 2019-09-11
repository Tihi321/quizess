<?php
/**
 * File that holds the Securable Route interface.
 *
 * @since   0.2.0
 * @package Quizess\Routes;
 */

namespace Quizess\Routes;

/**
 * Interface Securable.
 *
 * An object that can be registered.
 */
interface Route_Security {

  /**
   * Route security callback
   *
   * @param  \WP_REST_Request $request Data got from enpoint url.
   *
   * @return WP_REST_Response|bool If response generated an error, WP_Error, if response
   *                                is already an instance, WP_HTTP_Response, otherwise
   *                                returns a new true.
   *
   * @since 0.1.0
   */
  public function authentification_check( \WP_REST_Request $request );
}
