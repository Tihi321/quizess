<?php
/**
 * The abstract class that will be used to extend for all config files.
 *
 * @since   1.0.0
 * @package Quizess\Includes
 */

namespace Quizess\Includes;

/**
 * Abstract Class Config
 *
 * Abstract class that exposes constants that are used across multiple files.
 */
abstract class Config {

  /**
   * Plugin Full Name
   *
   * @var string
   *
   * @since 1.0.0
   */
  const PLUGIN_NAME = 'quizess';

  /**
   * Plugin Version
   *
   * @var string
   *
   * @since 1.0.0
   */
  const PLUGIN_VERSION = '1.0.0';

  /**
   * Plugin Prefix
   *
   * @var string
   *
   * @since 1.0.0
   */
  const PLUGIN_PREFIX = 'di_';


  // -------------------------------------------------------
  // CUSTOM POST TYPE
  // -------------------------------------------------------

  /**
   * The custom post type slug for quizess
   *
   * @var string
   *
   * @since 1.0.0
   */
  const QUIZESS_POST_SLUG = 'quiz';

  /**
   * The custom post meta field for quizess
   *
   * @var string
   *
   * @since 1.0.0
   */
  const SCORES_META_KEY = '_quizess_scores';

  /**
   * The custom post meta field for quizess
   *
   * @var string
   *
   * @since 1.0.0
   */
  const TRACK_SCORES_META_KEY = '_track_scores';


  /**
   * The custom post type slug for quizess categories
   *
   * @var string
   *
   * @since 1.0.0
   */
  const QUIZESS_CATEGORY_SLUG = 'quiz-topic';

  /**
   * The custom post type slug for question
   *
   * @var string
   *
   * @since 1.0.0
   */
  const QUESTION_POST_SLUG = 'question';


  /**
   * The custom post type slug for question categories
   *
   * @var string
   *
   * @since 1.0.0
   */
  const QUESTION_CATEGORY_SLUG = 'question-topic';

  /**
   * The custom post type slug for stories
   *
   * @var string
   *
   * @since 1.0.0
   */
  const STORIES_POST_SLUG = 'story';


  /**
   * The custom post type slug for stories categories
   *
   * @var string
   *
   * @since 1.0.0
   */
  const STORIES_CATEGORY_SLUG = 'story-topic';

  // -------------------------------------------------------
  // NONCE
  // -------------------------------------------------------

  /**
   * The custom post type slug
   *
   * @var string
   *
   * @since 1.0.0
   */
  const NONCE_NAME = 'quizess_nonce';

  // -------------------------------------------------------
  // USERS
  // -------------------------------------------------------

  /**
   * The custom post type slug
   *
   * @var string
   *
   * @since 1.0.0
   */
  const USER_PLAYER_TOGGLE = 'user_player_quizess';

}
