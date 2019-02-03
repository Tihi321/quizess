<?php
/**
 * The front-specific functionality of the plugin.
 *
 * @since   1.0.0
 * @package Quizess\Front
 */

namespace Quizess\Front;

use Quizess\Includes\Config;
use Quizess\Helpers\General_Helper;

/**
 * Class Front
 */
class Front extends Config {

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
   * Register the Stylesheets for frontend.
   *
   * @since 1.0.0
   */
  public function enqueue_frontend_styles() {

    $main_admin_style = $this->general_helper->get_manifest_assets_data( 'applicationQuizess.css' );
    wp_register_style( static::PLUGIN_NAME . '-frontend-style', $main_admin_style, '', static::PLUGIN_VERSION, false );
    wp_enqueue_style( static::PLUGIN_NAME . '-frontend-style' );

  }


  /**
   * Register the JavaScript for the frontend area.
   *
   * @since 1.0.0
   */
  public function enqueue_frontend_scripts() {

    $main_admin_script = $this->general_helper->get_manifest_assets_data( 'applicationQuizess.js' );
    wp_register_script( static::PLUGIN_NAME . '-frontend-scripts', $main_admin_script, array( 'jquery' ), static::PLUGIN_VERSION, true );
    wp_enqueue_script( static::PLUGIN_NAME . '-frontend-scripts' );

  }


}
