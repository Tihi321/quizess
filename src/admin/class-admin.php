<?php
/**
 * The Admin specific functionality.
 *
 * @since   1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Quizess\Core\Service;
use Quizess\Core\Config;
use Quizess\Rest\Rest_Routes;
use Quizess\Helpers\General_Helper;
use Quizess\Helpers\Loader;

/**
 * Class Admin
 */
class Admin extends Config implements Service {

  /**
   * Use trait inside class.
   */
  use Loader;


  /**
   * Register all the hooks
   *
   * @since 1.0.0
   */
  public function register() : void {
    $this->add_action( 'admin_enqueue_scripts', $this, 'enqueue_admin_styles', 50 );
    $this->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_block_styles', 50 );
    $this->add_action( 'admin_enqueue_scripts', $this, 'enqueue_admin_scripts' );
    $this->add_action( 'enqueue_block_editor_assets', $this, 'enqueue_block_scripts' );

    if ( $this->remove_admin_bar_check() ) {
      $this->add_action( 'show_admin_bar', $this, 'remove_admin_login_header' );
    }
  }

  /**
   * Register the Stylesheets for the admin area.
   *
   * @since 1.0.0
   */
  public function enqueue_admin_styles() {

    $main_admin_style = General_Helper::get_manifest_assets_data( 'adminQuizess.css' );
    wp_register_style( static::PLUGIN_NAME . '-admin-style', $main_admin_style, '', static::PLUGIN_VERSION, false );
    wp_enqueue_style( static::PLUGIN_NAME . '-admin-style' );

  }


  /**
   * Register the Stylesheets for the blocks editor area.
   *
   * @since 1.0.0
   */
  public function enqueue_block_styles() {

    $this->enqueue_react_developemnt();

    $main_block_style = General_Helper::get_manifest_assets_data( 'blocksQuizess.css' );
    wp_register_style( static::PLUGIN_NAME . '-editor--style', $main_block_style, '', static::PLUGIN_VERSION, false );
    wp_enqueue_style( static::PLUGIN_NAME . '-editor--style' );

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

      $this->enqueue_react_developemnt();
      wp_enqueue_media();

      $main_admin_script = General_Helper::get_manifest_assets_data( 'adminQuizess.js' );
      wp_register_script(
        static::PLUGIN_NAME . '-admin-scripts',
        $main_admin_script,
        array(
            'wp-plugins',
            'wp-edit-post',
            'wp-element',
            'wp-components',
            'wp-editor',
        ),
        static::PLUGIN_VERSION,
        true
      );

      wp_enqueue_script( static::PLUGIN_NAME . '-admin-scripts' );

      // add localization to javascript.
      if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
        $locale  = gutenberg_get_jed_locale_data( 'quizess' );
        $content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "quizess" );';
        wp_script_add_data( static::PLUGIN_NAME . '-admin-scripts', 'data', $content );
      }

      wp_localize_script(
        static::PLUGIN_NAME . '-admin-scripts',
        'quizessDashboard',
        array(
            'root' => esc_url_raw( rest_url() ),
            'dashboardApi' => Rest_Routes::QUIZESS_DASHBOARD_SLUG,
            'optionsApi' => Rest_Routes::QUIZESS_OPTIONS_SLUG,
            'scoresApi' => Rest_Routes::QUIZESS_SCORES_SLUG,
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

    $main_block_script = General_Helper::get_manifest_assets_data( 'blocksQuizess.js' );
    wp_register_script(
      static::PLUGIN_NAME . '-editor-scripts',
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
      static::PLUGIN_VERSION,
      true
    );

    wp_enqueue_script( static::PLUGIN_NAME . '-editor-scripts' );

    // add localization to javascript.
    if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
      $locale  = gutenberg_get_jed_locale_data( 'quizess' );
      $content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "quizess" );';
      wp_script_add_data( static::PLUGIN_NAME . '-editor-scripts', 'data', $content );
    }

  }

  /**
   * Register react for development if debug mode enabled.
   *
   * @since 1.0.0
   */
  public function enqueue_react_developemnt() {

    // If script debug is not enabled import react development.
    if ( defined( 'SCRIPT_DEBUG' ) && ! SCRIPT_DEBUG ) {

        // If in development add development not minified react libraries.
      if ( QIZ_ENV === 'develop' ) {
        wp_deregister_script( 'react' );
        wp_deregister_script( 'react-dom' );

        wp_register_script( 'react', General_Helper::get_base_url() . 'skin/public/scripts/vendors/react.development.js', array(), '16.6.3', false );

        wp_register_script( 'react-dom', General_Helper::get_base_url() . 'skin/public/scripts/vendors/react-dom.development.js', array(), '16.6.3', false );

      }
    }

    wp_enqueue_script( 'react' );
    wp_enqueue_script( 'react-dom' );

  }

  /**
   * Check if user has opted to remove admin bar for login users on fron end
   *
   * @since 1.0.0
   */
  public function remove_admin_bar_check() : bool {
    $remove_admin_bar_option = get_option( self::REMOVE_ADMIN_TOGGLE );
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
