<?php
/**
 * Rest callback interface
 *
 * @since             1.0.0
 * @package           Quizess\Rest\Rest_Callbacks
 */

namespace Quizess\Rest\Rest_Callbacks;

/**
 * Interface for a REST request callback
 */
interface Rest_Callback {

  /**
   * Rest callback method
   *
   * Returns an array that will be passed to the REST API controller,
   * and turned into JSON string for front end app to be rendered.
   *
   * @param \WP_REST_Request $request Full data about the request.
   * @return array|\WP_Error          Array that will be converted to JSON when passed to endpoint, or error on fail.
   *
   * @since 1.0.0
   */
  public function rest_callback( \WP_REST_Request $request );
}
