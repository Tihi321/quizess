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

    $main_block_style = $this->general_helper->get_manifest_assets_data( 'blocksQuizess.css' );
    wp_register_style( static::PLUGIN_NAME . '-editor--style', $main_block_style, '', static::PLUGIN_VERSION, false );
    wp_enqueue_style( static::PLUGIN_NAME . '-editor--style' );

  }


  /**
   * Register the JavaScript for the admin area.
   *
   * @since 1.0.0
   */
  public function enqueue_admin_scripts() {

    $main_admin_script = $this->general_helper->get_manifest_assets_data( 'adminQuizess.js' );
    wp_register_script( static::PLUGIN_NAME . '-admin-scripts', $main_admin_script, array( 'wp-plugins', 'wp-edit-post', 'wp-element' ), static::PLUGIN_VERSION, true );
    wp_enqueue_script( static::PLUGIN_NAME . '-admin-scripts' );

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


  /**
   * Method that changes admin colors based on environment variable
   *
   * @param string $color_scheme Color scheme string.
   * @return string              Modified color scheme.
   *
   * @since 1.0.0
   */
  public function set_admin_color_based_on_env( $color_scheme ) {
    if ( ! defined( 'DI_ENV' ) ) {
      return false;
    }

    if ( DI_ENV === 'production' ) {
      $color_scheme = 'sunrise';
    } elseif ( DI_ENV === 'staging' ) {
      $color_scheme = 'blue';
    } elseif ( DI_ENV === 'stg01' ) {
      $color_scheme = 'ectoplasm';
    } elseif ( DI_ENV === 'stg02' ) {
      $color_scheme = 'midnight';
    } elseif ( DI_ENV === 'tst01' ) {
      $color_scheme = 'ocean';
    } elseif ( DI_ENV === 'tst02' ) {
      $color_scheme = 'coffee';
    } elseif ( DI_ENV === 'tst03' ) {
      $color_scheme = 'light';
    } else {
      $color_scheme = 'fresh';
    }

    return $color_scheme;
  }

}
