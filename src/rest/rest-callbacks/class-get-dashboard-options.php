<?php
/**
 * The class file that returns all data for dashboard
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Core\Config;

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

    $logo                = get_option( self::CUSTOM_LOGO );
    $copyright           = get_option( self::COPYRIGHT_TEXT );
    $facebook            = get_option( self::FACEBOOK_URL );
    $twitter             = get_option( self::TWITTER_URL );
    $linked_in           = get_option( self::LINKEDIN_URL );
    $instagram           = get_option( self::INSTAGRAM_URL );
    $custom_style_option = get_option( self::CUSTOM_STYLE_TOGGLE );
    $custom_style        = $custom_style_option ?: '0';
    $show_github_option  = get_option( self::SHOW_GITHUB_TOGGLE );
    $show_github         = $show_github_option ?: '0';

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

    $output =
    [
        'generalOptions' => [
            'customStyle' => $custom_style,
            'showGithub'  => $show_github,
            'logo'        => $logo,
            'copyright'   => $copyright,
            'facebook'    => $facebook,
            'twitter'     => $twitter,
            'linkedIn'    => $linked_in,
            'instagram'   => $instagram,
        ],
        'quizOptions' => [
            'scores' => $quiz_scores,
        ],
    ];

    return \rest_ensure_response( $output );
  }

}
