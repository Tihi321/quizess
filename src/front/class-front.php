<?php
/**
 * The front-specific functionality of the plugin.
 *
 * @since   1.0.0
 * @package Quizess\Front
 */

namespace Quizess\Front;

use Eightshift_Libs\Core\Service;
use Eightshift_Libs\Assets\Manifest_Data;

use Quizess\Core\Config;
use Quizess\Routes\Route;

/**
 * Class Front
 */
class Front implements Service {

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
    add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_scripts' ], 50 );
    add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_localized_frontend_scripts' ], 50 );
    add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_styles' ], 50 );
    add_filter( 'qz_get_current_theme', [ $this, 'get_current_theme' ] );
  }

  /**
   * Returns current color theme.
   *
   * @return string returns current theme.
   * @since 1.0.0
   */
  public function get_current_theme() : string {

    $theme = get_option( Config::LIGHT_THEME_TOGGLE ) ? 'light' : 'dark';

    if ( Config::QUIZESS_POST_SLUG === get_post_type() ) {
      global $post;

      $quiz_options = apply_filters( 'qz_get_quiz_options', $post->post_content );
      $theme        = $quiz_options['options']['theme'] ?? $theme;
    }

    return $theme;
  }

  /**
   * Register the Stylesheets for frontend.
   *
   * @since 1.0.0
   */
  public function enqueue_frontend_styles() {

    // // load only on quizess post types.
    if ( Config::QUIZESS_POST_SLUG === get_post_type() || get_query_var( Config::QUIZESS_CATEGORY_SLUG ) ) {

      $main_admin_style = $this->manifest->get_assets_manifest_item( 'applicationQuizess.css' );
      wp_register_style( Config::PLUGIN_NAME . '-frontend-style', $main_admin_style, '', Config::PLUGIN_VERSION, false );
      wp_enqueue_style( Config::PLUGIN_NAME . '-frontend-style' );

    }

  }


  /**
   * Register the JavaScript for the frontend area.
   *
   * @since 1.0.0
   */
  public function enqueue_frontend_scripts() {

    // load only on quizess post types.
    if ( Config::QUIZESS_POST_SLUG === get_post_type() || get_query_var( Config::QUIZESS_CATEGORY_SLUG ) ) {

      wp_enqueue_script( 'wp-element' );
      wp_enqueue_script( 'wp-components' );
      wp_enqueue_script( 'wp-i18n' );
      wp_enqueue_script( 'react' );
      wp_enqueue_script( 'react-dom' );

      $main_admin_script = $this->manifest->get_assets_manifest_item( 'applicationQuizess.js' );
      wp_register_script( Config::PLUGIN_NAME . '-frontend-scripts', $main_admin_script, array(), Config::PLUGIN_VERSION, true );
      wp_enqueue_script( Config::PLUGIN_NAME . '-frontend-scripts' );

      // add localization to javascript.
      if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
        $locale  = gutenberg_get_jed_locale_data( 'quizess' );
        $content = 'wp.i18n.setLocaleData( ' . wp_json_encode( $locale ) . ', "quizess" );';
        wp_script_add_data( Config::PLUGIN_NAME . '-frontend-scripts', 'data', $content );
      }
    }

  }

  /**
   * Register the JavaScript for the frontend area.
   *
   * @since 1.0.1
   */
  public function enqueue_localized_frontend_scripts() {

    // // load only on quizess post types.
    if ( Config::QUIZESS_POST_SLUG === get_post_type() || get_query_var( Config::QUIZESS_CATEGORY_SLUG ) ) {

      // Global variables for ajax and translations.
      wp_localize_script(
        Config::PLUGIN_NAME . '-frontend-scripts',
        'quizessOptions',
        array(
          'root' => esc_url_raw( rest_url() ),
          'quizApi' => Route\Get_Quizess::OPTIONS_SLUG . '/',
          'menusApi' => Route\Get_Menus::OPTIONS_SLUG,
        )
      );

      if ( is_user_logged_in() ) {

        $single_submit = get_user_meta( get_current_user_id(), Config::USER_SINGLE_TOGGLE, true );
        $single_value  = ( $single_submit === 'yes' ) ? '1' : '0';

        wp_localize_script(
          Config::PLUGIN_NAME . '-frontend-scripts',
          'userLogged',
          array(
            'userPlayer' => 'yes',
            'singleSubmit' => $single_value,
            'scoresApi' => Route\Patch_Scores::OPTIONS_SLUG,
            'nonce' => wp_create_nonce( 'wp_rest' ),
          )
        );
      } else {
        wp_localize_script(
          Config::PLUGIN_NAME . '-frontend-scripts',
          'userLogged',
          array(
            'userPlayer' => 'no',
          )
        );
      }
    }

  }


}
