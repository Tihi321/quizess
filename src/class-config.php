<?php
/**
 * The abstract class that will be used to extend for all config files.
 *
 * @since   1.0.0
 * @package Quizess\Core
 */

namespace Quizess\Core;

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

  // -------------------------------------------------------
  // META FIELDS
  // -------------------------------------------------------

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
  const QUIZESS_OPTIONS_META_ID = '_quizess_options_meta_id';

  /**
   * The custom post meta field for quizess
   *
   * @var string
   *
   * @since 1.0.0
   */
  const TRACK_SCORES_META_KEY = '_track_scores';

  /**
   * The custom post meta field for quizess
   *
   * @var string
   *
   * @since 1.0.0
   */
  const QUIZ_LOCKED_META_KEY = '_quiz_locked_toggle';

  // -------------------------------------------------------
  // OPTIONS
  // -------------------------------------------------------

  /**
   * Toggle to check if user wants remove header & footer custom styling on quiz cpt
   *
   * @var string
   *
   * @since 1.0.0
   */
  const CUSTOM_STYLE_TOGGLE = 'custom_style_quizess';

  // -------------------------------------------------------
  // USERS OPTIONS
  // -------------------------------------------------------

  /**
   * Toggle to track user progress in quizess
   *
   * @var string
   *
   * @since 1.0.0
   */
  const USER_PLAYER_TOGGLE = 'user_player_quizess';

  /**
   * This is set so user can submit only one quiz
   *
   * @var string
   *
   * @since 1.0.0
   */
  const USER_SINGLE_TOGGLE = 'user_single_quizess';

  // -------------------------------------------------------
  // MENUS
  // -------------------------------------------------------

  /**
   * The custom menu name
   *
   * @var string
   *
   * @since 1.0.0
   */
  const MENU_NAME = 'quiz_custom_menu';

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

}
