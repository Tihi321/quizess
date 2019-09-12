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
  const PLUGIN_PREFIX = 'qz_';


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
   * The custom post meta field that holds user scores for players
   *
   * @var string
   *
   * @since 1.0.0
   */
  const SCORES_META_KEY = '_quizess_scores';

  /**
   * The custom post meta field for quizess, options metabox id
   *
   * @var string
   *
   * @since 1.0.0
   */
  const QUIZESS_OPTIONS_META_ID = '_quizess_options_meta_id';

  /**
   * The custom post meta field for quizess check should this quiz track scores
   *
   * @var string
   *
   * @since 1.0.0
   */
  const TRACK_SCORES_META_KEY = '_track_scores';

  /**
   * The custom post meta field for quizess if only registered players should be able to play
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
  const CUSTOM_STYLE_TOGGLE = 'quizess_custom_style';

  /**
   * Toggle to check if user wants remove admin top bar on frontend
   *
   * @var string
   *
   * @since 1.0.0
   */
  const REMOVE_ADMIN_TOGGLE = 'quizess_remove_admin_bar';

  /**
   * Toggle to check which theme to use as default
   *
   * @var string
   *
   * @since 1.0.0
   */
  const LIGHT_THEME_TOGGLE = 'quizess_light_theme_default';

  /**
   * Toggle to check if user wants display github of quizess in footer
   *
   * @var string
   *
   * @since 1.0.0
   */
  const SHOW_GITHUB_TOGGLE = 'quizess_show_github';

  /**
   * Custom logo.
   *
   * @var string
   *
   * @since 1.0.0
   */
  const CUSTOM_LOGO = 'quizess_custom_logo';

  /**
   * Custom copyright text.
   *
   * @var string
   *
   * @since 1.0.0
   */
  const COPYRIGHT_TEXT = 'quizess_copyright_text';

  /**
   * Facebook url.
   *
   * @var string
   *
   * @since 1.0.0
   */
  const FACEBOOK_URL = 'quizess_facebook_url';

  /**
   * Twitter url.
   *
   * @var string
   *
   * @since 1.0.0
   */
  const TWITTER_URL = 'quizess_twitter_url';

  /**
   * LinkedIn url.
   *
   * @var string
   *
   * @since 1.0.0
   */
  const LINKEDIN_URL = 'quizess_linkedin_url';

  /**
   * Instagram url.
   *
   * @var string
   *
   * @since 1.0.0
   */
  const INSTAGRAM_URL = 'quizess_instagram_url';

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
   * This is set so user can submit quiz record only one time
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

  // -------------------------------------------------------
  // GITHUB
  // -------------------------------------------------------

  /**
   * The custom post type slug, if github for quizess repository should be shown in the footer
   *
   * @var string
   *
   * @since 1.0.0
   */
  const GITHUB_URL = 'https://github.com/Tihi321/quizess';

}
