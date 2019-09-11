<?php
/**
 * The class file that returns all data for dashboard
 *
 * @since   1.0.0
 * @package Quizess\Routes\Route
 */

namespace Quizess\Routes\Route;

use Eightshift_Libs\Routes\Callable_Route;

use Quizess\Routes\Base_Route;

use Quizess\Core\Config;

/**
 * Class Get_Dashboard
 */
class Get_Dashboard_Options extends Base_Route implements Callable_Route {
  const ROUTE_NAME = '/dashboard-options';

  /**
   * Options slug
   *
   * @since 1.0.0
   */
  const OPTIONS_SLUG = self::NAMESPACE_NAME . self::VERSION . self::ROUTE_NAME;

  /**
   * Get callback arguments array
   *
   * @return array Either an array of options for the endpoint,
   */
  protected function get_callback_arguments() : array {
    return [
      'methods'             => static::READABLE,
      'callback'            => [ $this, 'route_callback' ],
    ];
  }

  /**
   * Get all dashboard options.
   *
   * This callback is triggered when a front end app
   * goes to the @link https://API-URL/wp-json/quizess/v1/dasboard-options
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
  public function route_callback( \WP_REST_Request $request ) {
    $quiz_scores = [];

    // get all general options.
    $logo                    = get_option( Config::CUSTOM_LOGO );
    $copyright               = get_option( Config::COPYRIGHT_TEXT );
    $facebook                = get_option( Config::FACEBOOK_URL );
    $twitter                 = get_option( Config::TWITTER_URL );
    $linked_in               = get_option( Config::LINKEDIN_URL );
    $instagram               = get_option( Config::INSTAGRAM_URL );
    $custom_style_option     = get_option( Config::CUSTOM_STYLE_TOGGLE );
    $custom_style            = $custom_style_option ?: '0';
    $remove_admin_bar_option = get_option( Config::REMOVE_ADMIN_TOGGLE );
    $remove_admin_bar        = $remove_admin_bar_option ?: '0';
    $show_github_option      = get_option( Config::SHOW_GITHUB_TOGGLE );
    $show_github             = $show_github_option ?: '0';

    // get all quiz posts.
    $quizess_args = array(
      'post_type' => Config::QUIZESS_POST_SLUG,
      'post_status' => 'publish',
      'numberposts' => 100,
      'order'    => 'ASC',
      'update_post_meta_cache' => false,
      'update_post_term_cache' => false,
      'no_found_rows' => true,
    );

    $quizess_query = new \WP_Query( $quizess_args );
    $quizess_posts = $quizess_query->posts;

    foreach ( $quizess_posts as $key => $quiz_post ) {
      $quiz_score = get_post_meta( $quiz_post->ID, Config::SCORES_META_KEY, true );
      if ( ! empty( $quiz_score ) ) {
        $quiz_score['title']           = $quiz_post->post_title;
        $quiz_scores[ $quiz_post->ID ] = $quiz_score;
      }
    }

    $output =
    [
      'generalOptions' => [
        'customStyle'    => $custom_style,
        'removeAdminBar' => $remove_admin_bar,
        'showGithub'     => $show_github,
        'logo'           => $logo,
        'copyright'      => $copyright,
        'facebook'       => $facebook,
        'twitter'        => $twitter,
        'linkedIn'       => $linked_in,
        'instagram'      => $instagram,
      ],
      'quizOptions' => [
        'scores' => $quiz_scores,
      ],
    ];

    \wp_reset_postdata();

    return \rest_ensure_response( $output );
  }

}
