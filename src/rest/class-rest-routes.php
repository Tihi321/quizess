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
   * Rest callback name
   *
   * @since 1.0.0
   */
  const USER_PERMISION_CHECK = 'user_authentication_check';

  /**
   * Rest callback name
   *
   * @since 1.0.0
   */
  const USER_BASIC_AUTHENTIFICATION = 'user_basic_authentication_check';

  /**
   * Quizess custom post type route name
   *
   * @since 1.0.0
   */
  const QUIZESS_POSTS = '/quizes/(?P<id>\d+)';

  /**
   * Quizess custom post type submit a score route
   *
   * @since 1.0.0
   */
  const QUIZESS_SCORES = '/scores';

  /**
   * Quizess custom post type submit a score route
   *
   * @since 1.0.0
   */
  const QUIZESS_OPTIONS = '/options';

  /**
   * Quizess custom post type submit a score route
   *
   * @since 1.0.0
   */
  const QUIZESS_DASHBOARD = '/dashboard-options';

  /**
   * Quizess custom route slug
   *
   * @since 1.0.0
   */
  const QUIZESS_SLUG = self::REST_API_BASE . self::REST_API_VERSION . '/quizes';

  /**
   * Quizess custom route slug
   *
   * @since 1.0.0
   */
  const QUIZESS_SCORES_SLUG = self::REST_API_BASE . self::REST_API_VERSION . self::QUIZESS_SCORES;

  /**
   * Quizess custom route slug
   *
   * @since 1.0.0
   */
  const QUIZESS_OPTIONS_SLUG = self::REST_API_BASE . self::REST_API_VERSION . self::QUIZESS_OPTIONS;

  /**
   * Quizess custom route slug
   *
   * @since 1.0.0
   */
  const QUIZESS_DASHBOARD_SLUG = self::REST_API_BASE . self::REST_API_VERSION . self::QUIZESS_DASHBOARD;

}
