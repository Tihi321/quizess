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
 * Class Post_Score
 */
class Post_Score extends Rest_Routes implements Rest_Callback {

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

    $body = \json_decode( $request->get_body(), true );

    $quiz_id = $body['id'];
    $correct = $body['correct'];
    $total   = $body['total'];
    $stats   = $body['stats'];

    $question_stats = [];

    foreach ( $stats as $key => $stat ) {
      $question_stats[] = ( $stat['correct'] === true ) ? 1 : 0;
    }

    $current_user_id   = get_current_user_id();
    $user_data         = get_userdata( $current_user_id );
    $user_display_name = $user_data->data->display_name;

    $quiz_stats = [
        'players' => [
            $current_user_id => [
                'name' => $user_display_name,
                'attempts' => 1,
                'correct' => $correct,
                'total' => $total,
            ],
        ],
        'stats' => $question_stats,
    ];

    $scores = get_post_meta( $quiz_id, Config::SCORES_META_KEY, true );

    if ( ! empty( $scores ) ) {

        delete_post_meta( $quiz_id, Config::SCORES_META_KEY );
        add_post_meta( $quiz_id, Config::SCORES_META_KEY, $quiz_stats );

    } else {
        $user_scores        = [];
        $updated_stats      = [];
        $current_user_stats = $scores['players'][ $current_user_id ];
        $current_stats      = $scores['stats'];

      if ( empty( $current_user_stats ) ) {
        $user_scores = $quiz_stats[ $current_user_id ];
      } else {
        $user_scores['name']     = $current_user_stats['name'];
        $user_scores['attempts'] = $current_user_stats['attempts'] + 1;
        $user_scores['correct']  = $current_user_stats['correct'] + $correct;
        $user_scores['total']    = $current_user_stats['total'] + $total;
      }

      if ( empty( $current_stats ) ) {
        $updated_stats['stats'] = $quiz_stats['stats'];
      } else {
        foreach ( $quiz_stats['stats'] as $index => $stat ) {
          $updated_stats['stats'][] = ( $current_stats[ $index ] ) ? $current_stats[ $index ] + $quiz_stats['stats'][ $index ] : $quiz_stats['stats'][ $index ];
        }
      }

        $scores['players'][ $current_user_id ] = $user_scores;
        $scores['stats']                       = $updated_stats;

        update_post_meta( $quiz_id, Config::SCORES_META_KEY, $scores );

    }

    return new \WP_REST_Response( $scores, 200 );
  }

}
