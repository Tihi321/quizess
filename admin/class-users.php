<?php
/**
 * The users specific functionality.
 *
 * @since 1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Quizess\Helpers\General_Helper;
use Quizess\Includes\Config;

/**
 * Class Users
 */
class Users {

  /**
   * Initialize class
   *
   * @since 1.2.0
   */
  public function __construct() {
  }

  /**
   * Shows extra user's meta fields for users.
   *
   * @param WP_User $user   WP_User object.
   *
   * @since 1.4.0
   */
  public function show_extra_user_meta_fields( $user ) {

    $user_player_toggle = General_Helper::get_base_path() . 'template-parts/admin/user-player-toggle.php';
    if ( ! empty( $user_player_toggle ) ) {
      include $user_player_toggle;
    }
  }

  /**
   * Used for editing extra external_user meta fields from Profile page.
   *
   * @param int $user_id  WP's user_ID.
   * @return bool
   *
   * @since 1.4.0
   */
  public function save_extra_user_meta_fields( $user_id ) {

    if ( ! current_user_can( 'edit_user', $user_id ) ) {
      return false;
    }

    if ( ! isset( $_POST['_wpnonce'] ) && ! wp_verify_nonce( sanitize_key( $_POST['_wpnonce'] ), '_wpnonce' ) ) {
      wp_die( 'Nonce check failed' );
      return false;
    }

    $user_player = ! empty( $_POST[ Config::USER_PLAYER_TOGGLE ] ) ? \sanitize_text_field( \wp_unslash( $_POST[ Config::USER_PLAYER_TOGGLE ] ) ) : '';
    $output_value = ( $user_player === 'on' ) ? 'yes' : 'no';

    \update_user_meta( $user_id, Config::USER_PLAYER_TOGGLE, $output_value );
  }

}
