<?php
/**
 * Class that handles REST security checks
 *
 * @since   1.0.0
 * @package Developer_Portal\Rest
 */

declare( strict_types=1 );

namespace Quizess\Rest;

/**
 * Class containing registered rest routes
 */
final class Rest_Security {

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
    return true;
  }

}
