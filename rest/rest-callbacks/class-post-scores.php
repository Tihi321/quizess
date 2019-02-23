<?php
/**
 * The class file that contains method for saving quiz player scores
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

declare( strict_types=1 );

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Rest\Rest_Routes;
use Quizess\Helpers\Blocks_Helper;
use Quizess\Helpers\General_Helper;
use Quizess\Includes\Config;

/**
 * Class Get_Quizess
 */
class Post_Scores extends Rest_Routes implements Rest_Callback {

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

    $output = 'yea';

    return new \WP_REST_Response( $output, 200 );
  }

}
