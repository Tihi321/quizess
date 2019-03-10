<?php
/**
 * The class file that returns all data for dashboard
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Admin\Menu;
use Quizess\Core\Config;
use Quizess\Helpers\Error_Logger;

/**
 * Class Get_Dashboard
 */
class Get_Menus extends Config implements Rest_Callback {
  use Error_Logger;

  /**
   * Update quiz data rest route callback
   *
   * This callback is triggered when a front end app
   * goes to the @link https://API-URL/wp-json/quizess/v1/quiz
   * endpoint.
   *
   * @api
   *
   * @throws \WP_Error Error if the token is missing or wrong or the password
   * is the same.
   * @param \WP_REST_Request $request Data got from enpoint url.
   * @return \WP_REST_Response|\WP_Error          Developer data array.
   *
   * @since 1.0.0
   */
  public function rest_callback( \WP_REST_Request $request ) {

    $logo       = get_option( Config::CUSTOM_LOGO, null );
    $menu       = new Menu();
    $menu_items = $menu->get_menus();

    foreach ( $menu_items as $index => $item ) {
      if ( $item['position'] === self::MENU_NAME ) {

        if ( empty( $item['name'] ) ) {
          return $this->error_handler( 'menu_not_selected' );
        }

        if ( empty( $item['items'] ) ) {
          return $this->error_handler( 'no_menu_items' );
        }
      }
    }

    return new \WP_REST_Response(
      [
          'logo' => $logo,
          'menu' => $menu_items,
      ],
      200
    );
  }

}