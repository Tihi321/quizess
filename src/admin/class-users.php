<?php
/**
 * The users specific functionality.
 *
 * @since 1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Quizess\Core\Service;
use Quizess\Core\Config;
use Quizess\Helpers\Loader;
use Quizess\Helpers\General_Helper;

/**
 * Class Users
 */
class Users extends Config implements Service {


  /**
   * Use trait inside class.
   */
  use Loader;

  /**
   * Register all the hooks
   *
   * @since 1.0.0
   */
  public function register() : void {
    $this->add_action( 'show_user_profile', $this, 'show_extra_user_meta_fields', 10, 1 );
    $this->add_action( 'edit_user_profile', $this, 'show_extra_user_meta_fields', 10, 1 );
    $this->add_action( 'personal_options_update', $this, 'save_extra_user_meta_fields' );
    $this->add_action( 'edit_user_profile_update', $this, 'save_extra_user_meta_fields' );
  }

  /**
   * Shows extra user's meta fields.
   *
   * @param WP_User $user   WP_User object.
   *
   * @since 1.0.0
   */
  public function show_extra_user_meta_fields( $user ) {

    $user_options_template = General_Helper::get_base_path() . 'views/admin/user-meta-options.php';
    if ( ! empty( $user_options_template ) ) {
      include $user_options_template;
    }
  }

  /**
   * Used for saving users metafields.
   *
   * @param int $user_id  WP's user_ID.
   * @return bool
   *
   * @since 1.0.0
   */
  public function save_extra_user_meta_fields( $user_id ) {

    if ( ! current_user_can( 'edit_user', $user_id ) ) {
      return false;
    }

    if ( ! isset( $_POST['_wpnonce'] ) && ! wp_verify_nonce( sanitize_key( $_POST['_wpnonce'] ), '_wpnonce' ) ) {
      wp_die( 'Nonce check failed' );
      return false;
    }

    $user_player = ! empty( $_POST[ self::USER_PLAYER_TOGGLE ] ) ? \sanitize_text_field( \wp_unslash( $_POST[ self::USER_PLAYER_TOGGLE ] ) ) : '';
    $user_single = ! empty( $_POST[ self::USER_SINGLE_TOGGLE ] ) ? \sanitize_text_field( \wp_unslash( $_POST[ self::USER_SINGLE_TOGGLE ] ) ) : '';

    $user_output   = ( $user_player === 'on' ) ? 'yes' : 'no';
    $single_output = ( $user_single === 'on' ) ? 'yes' : 'no';

    \update_user_meta( $user_id, self::USER_PLAYER_TOGGLE, $user_output );
    \update_user_meta( $user_id, self::USER_SINGLE_TOGGLE, $single_output );
  }

}
