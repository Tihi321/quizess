<?php
/**
 * Register all Rest_Routes.
 *
 * @since   1.0.0
 * @package Quizess\Rest_Routes
 */

namespace Quizess\Rest;

use Quizess\Includes\Config;

/**
 * Class Register
 */
class Rest_Routes extends Config {
   /**
   * Namespace version
   *
   * @since 1.0.0
   */
  const REST_API_VERSION = '/v1';

  /**
   * Rest api base
   *
   * @since 1.0.0
   */
  const REST_API_BASE = 'quizess';

  /**
   * Rest callback name
   *
   * @since 1.0.0
   */
  const REST_CALLBACK = 'rest_callback';

  /**
   * Quizess custom post type route name
   *
   * @since 1.0.0
   */
  const QUIZESS_POSTS = '/quiz/(?P<id>\d+)';

}
