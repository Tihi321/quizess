<?php
/**
 * The class file that contains method for saving quiz player scores
 *
 * @since   1.0.0
 * @package Quizess\Rest\Rest_Callbacks
 */

namespace Quizess\Rest\Rest_Callbacks;

use Quizess\Rest\Rest_Routes;
use Quizess\Helpers\Blocks_Helper;
use Quizess\Helpers\General_Helper;
use Quizess\Includes\Config;

/**
 * Class Get_Quizess
 */
class Post_Scores extends Rest_Routes implements Rest_Callback {

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

    $question_stats    = [];
    $current_user_id   = get_current_user_id();
    $user_data         = get_userdata( $current_user_id );
    $user_display_name = $user_data->data->display_name;

    $body = \json_decode( $request->get_body(), true );

    $quiz_id = $body['id'];
    $correct = $body['correct'];
    $total   = $body['total'];
    $stats   = $body['stats'];

    foreach ( $stats as $key => $stat ) {
      $question_stats[] = ( $stat['correct'] === true ) ? 1 : 0;
    }

    $quiz_stats = [
        $user_display_name => [
            'tries' => 1,
            'correct' => $correct,
            'total' => $total,
        ],
        'stats' => $question_stats,
    ];

    $scores = get_post_meta( $quiz_id, Config::SCORES_META_KEY, true );

    if ( $scores === '' ) {

        delete_post_meta( $quiz_id, Config::SCORES_META_KEY );
        add_post_meta( $quiz_id, Config::SCORES_META_KEY, $quiz_stats );

    } else {
        $updated_stats      = [];
        $current_user_stats = $scores[ $user_display_name ];
        $current_stats      = $scores['stats'];

      if ( empty( $current_user_stats ) ) {
        $updated_stats = $quiz_stats[ $user_display_name ];
      } else {
        $updated_stats[ $user_display_name ]['tries']   = $current_user_stats['tries'] + 1;
        $updated_stats[ $user_display_name ]['correct'] = $current_user_stats['correct'] + $correct;
        $updated_stats[ $user_display_name ]['total']   = $current_user_stats['total'] + $total;
      }

      if ( empty( $current_stats ) ) {
        $updated_stats['stats'] = $quiz_stats['stats'];
      } else {
        foreach ( $quiz_stats['stats'] as $index => $stat ) {
          $updated_stats['stats'][] = ( $current_stats[ $index ] ) ? $current_stats[ $index ] + $quiz_stats['stats'][ $index ] : $quiz_stats['stats'][ $index ];
        }
      }

        update_post_meta( $quiz_id, Config::SCORES_META_KEY, $updated_stats );

    }

    return new \WP_REST_Response( $updated_stats, 200 );
  }

}
