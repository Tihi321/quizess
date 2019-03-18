<?php
/**
 * The front-specific functionality of the plugin.
 *
 * @since   1.0.0
 * @package Quizess\Front
 */

namespace Quizess\Front;

use Quizess\Core\Service;
use Quizess\Core\Config;
use Quizess\Helpers\Loader;
use Quizess\Helpers\General_Helper;
use Quizess\Rest\Rest_Routes;

/**
 * Class Front
 */
class Front extends Config implements Service {

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
    $this->add_action( 'wp_enqueue_scripts', $this, 'enqueue_frontend_scripts', 50 );
    $this->add_action( 'wp_enqueue_scripts', $this, 'enqueue_localized_frontend_scripts', 50 );
    $this->add_action( 'wp_enqueue_scripts', $this, 'enqueue_frontend_styles', 50 );
  }

  /**
   * Register the Stylesheets for frontend.
   *
   * @since 1.0.0
   */
  public function enqueue_frontend_styles() {

    $main_admin_style = General_Helper::get_manifest_assets_data( 'applicationQuizess.css' );
    wp_register_style( static::PLUGIN_NAME . '-frontend-style', $main_admin_style, '', static::PLUGIN_VERSION, false );
    wp_enqueue_style( static::PLUGIN_NAME . '-frontend-style' );

  }


  /**
   * Register the JavaScript for the frontend area.
   *
   * @since 1.0.0
   */
  public function enqueue_frontend_scripts() {

    // If in development add development not minified react libraries.
    if ( QIZ_ENV === 'develop' ) {
      wp_deregister_script( 'react' );
      wp_deregister_script( 'react-dom' );

      wp_register_script( 'react', General_Helper::get_base_url() . 'skin/public/scripts/vendors/react.development.js', array(), '16.6.3', false );

      wp_register_script( 'react-dom', General_Helper::get_base_url() . 'skin/public/scripts/vendors/react-dom.development.js', array(), '16.6.3', false );
    }

    wp_enqueue_script( 'wp-element' );
    wp_enqueue_script( 'wp-components' );
    wp_enqueue_script( 'wp-i18n' );
    wp_enqueue_script( 'react' );
    wp_enqueue_script( 'react-dom' );

    $main_admin_script = General_Helper::get_manifest_assets_data( 'applicationQuizess.js' );
    wp_register_script( static::PLUGIN_NAME . '-frontend-scripts', $main_admin_script, array(), static::PLUGIN_VERSION, true );
    wp_enqueue_script( static::PLUGIN_NAME . '-frontend-scripts' );

  }

  /**
   * Register the JavaScript for the frontend area.
   *
   * @since 1.0.0
   */
  public function enqueue_localized_frontend_scripts() {

    // Global variables for ajax and translations.
    wp_localize_script(
      static::PLUGIN_NAME . '-frontend-scripts',
      'quizessOptions',
      array(
          'root' => esc_url_raw( rest_url() ),
          'quizApi' => Rest_Routes::QUIZESS_SLUG . '/',
          'menusApi' => Rest_Routes::QUIZESS_MENUS_SLUG,
      )
    );

    if ( is_user_logged_in() ) {
      // Glbal variables for ajax and translations.
      wp_localize_script(
        static::PLUGIN_NAME . '-frontend-scripts',
        'userLogged',
        array(
            'userPlayer' => 'yes',
            'scoresApi' => Rest_Routes::QUIZESS_SCORES_SLUG,
            'nonce' => wp_create_nonce( 'wp_rest' ),
        )
      );
    } else {
      wp_localize_script(
        static::PLUGIN_NAME . '-frontend-scripts',
        'userLogged',
        array(
            'userPlayer' => 'no',
        )
      );
    }
  }


}
