<?php
/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @since   1.0.0
 * @package Quizess\Includes
 */

namespace Quizess\Includes;

use Quizess\Admin;
use Quizess\Front;
use Quizess\Rest;
use Quizess\Helpers;
use Quizess\Includes\Config;

/**
 * The main start class.
 *
 * This is used to define admin-specific hooks
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 */
class Main extends Config {

  /**
   * Loader variable for hooks
   *
   * @var Loader $loader Maintains and registers all hooks for the plugin.
   *
   * @since 1.0.0
   */
  protected $loader;

  /**
   * General Helper variable
   *
   * @var General_Helper $general_helper Contains helper functions for the plugin.
   *
   * @since 1.0.0
   */
  protected $general_helper;

  /**
   * Custom Fields variable
   *
   * @var Blocks_Helper $blocks_helper Contains functions for rest custom fields.
   *
   * @since 1.0.0
   */
  protected $blocks_helper;

  /**
   * Initialize class
   * Load hooks and define some global variables.
   *
   * @since 1.0.0
   */
  public function __construct() {

    // If global variable is not defined exit.
    if ( ! defined( 'QIZ_ENV' ) ) {
      return false;
    }

    $this->load_dependencies();
    $this->set_locale();
    $this->set_assets_manifest_data();
    $this->define_admin_hooks();
    $this->define_plugins_hooks();
    $this->define_rest_routes_hooks();
  }

  /**
   * Load the required dependencies.
   *
   * Create an instance of the loader which will be used to register the hooks
   * with WordPress.
   *
   * @since 1.0.0
   */
  private function load_dependencies() {
    $this->loader         = new Loader();
    $this->general_helper = new Helpers\General_Helper();
    $this->blocks_helper  = new Helpers\Blocks_Helper();

  }

  /**
   * If gutenberg is not present deactivates plugin
   *
   * @since 1.0.0
   */
  private function detect_gutenberg() {
    $this->loader->add_action( 'admin_init', $this->general_helper, 'no_gutenberg_deactivation' );
  }

  /**
   * Define the locale for this plugin for internationalization.
   *
   * Uses the Inf_Plugin_i18n class in order to set the domain and to register the hook
   * with WordPress.
   *
   * @since 1.0.0
   */
  private function set_locale() {
    $plugin_i18n = new Internationalization();

    $this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
  }

  /**
   * Register all of the hooks related to the admin area functionality
   * of the plugin.
   *
   * @since 1.0.0
   */
  private function define_admin_hooks() {
    $admin     = new Admin\Admin( $this->general_helper );
    $media     = new Admin\Media();
    $blocks    = new Admin\Blocks();
    $quiz      = new Admin\Quiz();
    $questions = new Admin\Questions();
    $story     = new Admin\Story();
    $users     = new Admin\Users();

    // Admin.
    $this->loader->add_action( 'admin_enqueue_scripts', $admin, 'enqueue_admin_styles', 50 );
    $this->loader->add_action( 'enqueue_block_editor_assets', $admin, 'enqueue_block_styles', 50 );
    $this->loader->add_action( 'admin_enqueue_scripts', $admin, 'enqueue_admin_scripts' );
    $this->loader->add_action( 'enqueue_block_editor_assets', $admin, 'enqueue_block_scripts' );

    // Media.
    $this->loader->add_filter( 'upload_mimes', $media, 'enable_mime_types' );
    $this->loader->add_filter( 'wp_prepare_attachment_for_js', $media, 'enable_svg_library_preview', 10, 3 );
    $this->loader->add_filter( 'wp_handle_upload_prefilter', $media, 'check_svg_on_media_upload' );
    $this->loader->add_filter( 'after_setup_theme', $media, 'enable_full_width' );
    $this->loader->add_filter( 'wp_check_filetype_and_ext', $media, 'disable_mime_check', 10, 4 );

    // Users.
    $this->loader->add_action( 'show_user_profile', $users, 'show_extra_user_meta_fields', 10, 1 );
    $this->loader->add_action( 'edit_user_profile', $users, 'show_extra_user_meta_fields', 10, 1 );
    $this->loader->add_action( 'personal_options_update', $users, 'save_extra_user_meta_fields' );
    $this->loader->add_action( 'edit_user_profile_update', $users, 'save_extra_user_meta_fields' );

    // Blocks.
    // Whitelist blocks.
    $this->loader->add_action( 'allowed_block_types', $blocks, 'quizess_allowed_block_types', 10, 2 );

    // Add custom block category.
    $this->loader->add_filter( 'block_categories', $blocks, 'quizess_category', 10, 2 );

    // Register custom post type quiz.
    $this->loader->add_action( 'init', $quiz, 'register_post_type' );
    $this->loader->add_action( 'init', $quiz, 'register_categories' );
    $this->loader->add_filter( 'template_include', $quiz, 'quiz_single_template', 10, 4 );

    // Register custom post type story.
    $this->loader->add_action( 'init', $story, 'register_post_type' );
    $this->loader->add_action( 'init', $story, 'register_categories' );

    // Register custom post type auestion.
    $this->loader->add_action( 'init', $questions, 'register_post_type' );
    $this->loader->add_action( 'init', $questions, 'register_categories' );
  }

  /**
   * Register all of the hooks related to extending plugins
   *
   * @since 1.0.0
   */
  private function define_plugins_hooks() {
    $front = new Front\Front( $this->general_helper );

    // Frontend.
    $this->loader->add_action( 'wp_enqueue_scripts', $front, 'enqueue_frontend_scripts', 50 );
    $this->loader->add_action( 'wp_enqueue_scripts', $front, 'enqueue_localized_frontend_scripts', 50 );
    $this->loader->add_action( 'wp_enqueue_scripts', $front, 'enqueue_frontend_styles', 50 );
  }

  /**
   * Register all rest routes functionality.
   *
   * @since 1.0.0
   */
  private function define_rest_routes_hooks() {
    $rest_routes_register = new Rest\Rest_Register( $this->blocks_helper );

    // Register New Fields For block atributes on posts.
    $this->loader->add_action( 'rest_api_init', $rest_routes_register, 'register_fields' );

    // Register Rest routes.
    $this->loader->add_action( 'rest_api_init', $rest_routes_register, 'register_routes' );

  }

  /**
   * Run the loader to execute all of the hooks with WordPress.
   *
   * @since 1.0.0
   */
  public function run() {
    $this->loader->run();
  }

  /**
   * Define global variable to save memory when parsing manifest on every load.
   *
   * @since 1.0.0
   */
  public function set_assets_manifest_data() {
    $response = file( QZ_ASSETS_PUBLIC_PATH . 'manifest.json', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );

    if ( ! $response ) {
      return;
    }

    define( 'QI_ASSETS_MANIFEST', implode( ' ', $response ) );
  }
}
