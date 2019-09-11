<?php
/**
 * Error Utility class.
 *
 * @since   1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Utils;

use Eightshift_Libs\Core\Service;

use Quizess\Core\Config;

/**
 * Class Validation
 *
 * This class handles srtings.
 *
 * @since 1.0.0
 */
class Validation implements Service {

  /**
   * Register all the hooks
   *
   * @return void
   *
   * @since 1.0.0
   */
  public function register() {
    add_filter( 'qz_can_user_submit', [ $this, 'can_user_submit' ], 10, 2 );
  }

  /**
   * Checks if user submited & can submit only one quiz user needs to be authenticated
   *
   * @param int $posts_id post ID to check if scores has been submited.
   * @param int $users_id users ID to check against.
   * @return bool returns true is user can submit.
   */
  public function can_user_submit( int $posts_id, int $users_id ) : bool {

    $scores = \get_post_meta( $posts_id, Config::SCORES_META_KEY, true );

    // check it this quiz has scores submited to it for that player, before last field was deleted and if user is selected so it can only submit one.
    if ( ! empty( $scores ) ) {
      $player_scores = $scores['players'][ $users_id ] ?? '';
      $user_single   = \get_user_meta( $users_id, Config::USER_SINGLE_TOGGLE, true );

      if ( ! empty( $player_scores['last'] ) && $user_single === 'yes' ) {
        return false;
      }
    }
    return true;

  }
}
