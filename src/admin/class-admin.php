<?php
/**
 * The Admin specific functionality.
 *
 * @since   1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Eightshift_Libs\Core\Service;
use Eightshift_Libs\Assets\Manifest_Data;

use Quizess\Core\Config;
use Quizess\Routes\Route;


/**
 * Class Admin
 */
class Admin implements Service {

  /**
   * Instance variable of manifest data.
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $manifest;

  /**
   * Create a new admin instance that injects manifest data for use in assets registration.
   *
   * @param Manifest_Data $manifest Inject manifest which holds data about assets from manifest.json.
   *
   * @since 1.0.0
   */
  public function __construct( Manifest_Data $manifest ) {
    $this->manifest = $manifest;
  }


  /**
   * Register all the hooks
   *
   * @since 1.0.0
   */
  public function register() : void {
    add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_styles' ], 50 );
    add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_styles' ], 50 );
    add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_scripts' ] );
    add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_scripts' ] );

    if ( $this->remove_admin_bar_check() ) {
      add_action( 'show_admin_bar', [ $this, 'remove_admin_login_header' ] );
    }
  }

  /**
   * Register the Stylesheets for the admin area.
   *
   * @param string $hook page top slug.
   * @since 1.0.0
   */
  public function enqueue_admin_styles( $hook ) {

    if ( $hook === 'toplevel_page_quizess_dashboard' ) {
      $main_admin_style = $this->manifest->get_assets_manifest_item( 'adminQuizess.css' );
      wp_register_style( Config::PLUGIN_NAME . '-admin-style', $main_admin_style, '', Config::PLUGIN_VERSION, false );
      wp_enqueue_style( Config::PLUGIN_NAME . '-admin-style' );
    }

  }


  /**
   * Register the Stylesheets for the blocks editor area.
   *
   * @since 1.0.0
   */
  public function enqueue_block_styles() {
    global $post;

    if ( $post->post_type === 'quiz' || $post->post_type === 'question' ) {
      $main_block_style = $this->manifest->get_assets_manifest_item( 'blocksQuizess.css' );
      wp_register_style( Config::PLUGIN_NAME . '-editor--style', $main_block_style, '', Config::PLUGIN_VERSION, false );
      wp_enqueue_style( Config::PLUGIN_NAME . '-editor--style' );
    }

  }


  /**
   * Register the JavaScript for the admin area.
   *
   * @param string $hook page top slug.
   * @since 1.0.0
   */
  public function enqueue_admin_scripts( string $hook ) : void {

    // load scripts only on dasboard page.
    if ( $hook === 'toplevel_page_quizess_dashboard' ) {

      wp_enqueue_script( 'react' );
      wp_enqueue_script( 'react-dom' );

      wp_enqueue_media();

      $main_admin_script = $this->manifest->get_assets_manifest_item( 'adminQuizess.js' );
      wp_register_script(
        Config::PLUGIN_NAME . '-admin-scripts',
        $main_admin_script,
        array(
          'wp-plugins',
          'wp-edit-post',
          'wp-element',
          'wp-components',
          'wp-editor',
        ),
        Config::PLUGIN_VERSION,
        true
      );

      wp_enqueue_script( Config::PLUGIN_NAME . '-admin-scripts' );

      // add localization to javascript.
      if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
        $locale  = gutenberg_get_jed_locale_data( 'quizess' );
        $content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "quizess" );';
        wp_script_add_data( Config::PLUGIN_NAME . '-admin-scripts', 'data', $content );
      }

      wp_localize_script(
        Config::PLUGIN_NAME . '-admin-scripts',
        'quizessDashboard',
        array(
          'root' => esc_url_raw( rest_url() ),
          'dashboardApi' => Route\Get_Dashboard_Options::OPTIONS_SLUG,
          'optionsApi' => Route\Patch_General_Options::OPTIONS_SLUG,
          'scoresApi' => Route\Patch_Scores::OPTIONS_SLUG,
          'dashboardNonce' => wp_create_nonce( 'quizess_dashboard_nonce' ),
          'nonce' => wp_create_nonce( 'wp_rest' ),
        )
      );

    }

  }

  /**
   * Register the JavaScript for the blocks editor area.
   *
   * @since 1.0.0
   */
  public function enqueue_block_scripts() {
    global $post;

    if ( $post->post_type === 'quiz' || $post->post_type === 'question' ) {

      $main_block_script = $this->manifest->get_assets_manifest_item( 'blocksQuizess.js' );
      wp_register_script(
        Config::PLUGIN_NAME . '-editor-scripts',
        $main_block_script,
        array(
          'jquery',
          'wp-components',
          'wp-blocks',
          'wp-plugins',
          'wp-edit-post',
          'wp-element',
          'wp-editor',
          'wp-date',
          'wp-data',
          'wp-i18n',
        ),
        Config::PLUGIN_VERSION,
        true
      );

      wp_enqueue_script( Config::PLUGIN_NAME . '-editor-scripts' );

      // add localization to javascript.
      if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
        $locale  = gutenberg_get_jed_locale_data( 'quizess' );
        $content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "quizess" );';
        wp_script_add_data( Config::PLUGIN_NAME . '-editor-scripts', 'data', $content );
      }
    }

  }

  /**
   * Check if user has opted to remove admin bar for login users on fron end
   *
   * @since 1.0.0
   */
  public function remove_admin_bar_check() : bool {
    $remove_admin_bar_option = get_option( Config::REMOVE_ADMIN_TOGGLE );
    $remove_admin_bar        = $remove_admin_bar_option ?: '0';

    return ( $remove_admin_bar === '1' );
  }

  /**
   * Removes admin bar on frontend.
   *
   * @since 1.0.0
   */
  public function remove_admin_login_header() {
    return false;
  }

}
