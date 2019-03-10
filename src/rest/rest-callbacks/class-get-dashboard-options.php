<?php
/**
 * The class file that returns all data for dashboard
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Core\Config;
use Quizess\Admin\Menu;

/**
 * Class Get_Dashboard
 */
class Get_Dashboard_Options extends Config implements Rest_Callback {

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
    $quiz_scores = [];

    $custom_style_option = get_option( self::CUSTOM_STYLE_TOGGLE );
    $custom_style        = $custom_style_option ?: '0';

    $quizess_posts = get_posts(
      [
          'post_type' => self::QUIZESS_POST_SLUG,
          'post_status' => 'publish',
          'numberposts' => 100,
          'order'    => 'ASC',
      ]
    );

    foreach ( $quizess_posts as $key => $quiz_post ) {
      $quiz_score = get_post_meta( $quiz_post->ID, self::SCORES_META_KEY, true );
      if ( ! empty( $quiz_score ) ) {
        $quiz_score['title']           = $quiz_post->post_title;
        $quiz_scores[ $quiz_post->ID ] = $quiz_score;
      }
    }

    $menu = new Menu();

    $menu_items = $menu->get_menus();

    return new \WP_REST_Response(
      [
          'generalOptions' => [
              'customStyle' => $custom_style,
          ],
          'quizOptions' => [
              'scores' => $quiz_scores,
          ],
          'menu' => [
              'menu' => $menu_items,
          ],
      ],
      200
    );
  }

}
