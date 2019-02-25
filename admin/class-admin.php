<?php
/**
 * The Admin specific functionality.
 *
 * @since   1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Quizess\Includes\Config;
use Quizess\Helpers\General_Helper;

/**
 * Class Admin
 */
class Admin extends Config {

  /**
   * General Helper class
   *
   * @var object General_Helper
   *
   * @since 1.0.0
   */
  public $general_helper;

  /**
   * Initialize class
   *
   * @param General_Helper $general_helper Helper class instance.
   *
   * @since 1.0.0
   */
  public function __construct( General_Helper $general_helper ) {
    $this->general_helper = $general_helper;

  }

  /**
   * Register the Stylesheets for the admin area.
   *
   * @since 1.0.0
   */
  public function enqueue_admin_styles() {

    $main_admin_style = $this->general_helper->get_manifest_assets_data( 'adminQuizess.css' );
    wp_register_style( static::PLUGIN_NAME . '-admin-style', $main_admin_style, '', static::PLUGIN_VERSION, false );
    wp_enqueue_style( static::PLUGIN_NAME . '-admin-style' );

  }


  /**
   * Register the Stylesheets for the blocks editor area.
   *
   * @since 1.0.0
   */
  public function enqueue_block_styles() {

    // If script debug is not enabled import react development.
    if ( defined( 'SCRIPT_DEBUG' ) && ! SCRIPT_DEBUG ) {

        // If in development add development not minified react libraries.
      if ( QIZ_ENV === 'develop' ) {
        wp_deregister_script( 'react' );
        wp_deregister_script( 'react-dom' );

        wp_register_script( 'react', General_Helper::get_base_url() . 'skin/public/scripts/vendors/react.development.js', array(), '16.6.3', false );

        wp_register_script( 'react-dom', General_Helper::get_base_url() . 'skin/public/scripts/vendors/react-dom.development.js', array(), '16.6.3', false );

        wp_enqueue_script( 'react' );
        wp_enqueue_script( 'react-dom' );
      }
    }

    $main_block_style = $this->general_helper->get_manifest_assets_data( 'blocksQuizess.css' );
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

      $main_admin_script = $this->general_helper->get_manifest_assets_data( 'adminQuizess.js' );
      wp_register_script(
        static::PLUGIN_NAME . '-admin-scripts',
        $main_admin_script,
        array(
            'wp-plugins',
            'wp-edit-post',
            'wp-element',
        ),
        static::PLUGIN_VERSION,
        true
      );

      wp_enqueue_script( static::PLUGIN_NAME . '-admin-scripts' );

    }

  }

  /**
   * Register the JavaScript for the blocks editor area.
   *
   * @since 1.0.0
   */
  public function enqueue_block_scripts() {

    $main_block_script = $this->general_helper->get_manifest_assets_data( 'blocksQuizess.js' );
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

  }

}
