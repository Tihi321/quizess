<?php
/**
 * Options on user page
 *
 * @package Quizess\Views\Admin
 */

use Quizess\Core\Config;

$label_yes = __( 'Yes', 'quizess' );
$label_no  = __( 'No', 'quizess' );

$user_player = \get_user_meta( $user->ID, Config::USER_PLAYER_TOGGLE, true );
$user_single = \get_user_meta( $user->ID, Config::USER_SINGLE_TOGGLE, true );

$user_checked   = ( $user_player === 'yes' ) ? 'checked' : '';
$single_checked = ( $user_single === 'yes' ) ? 'checked' : '';


?>
<h2><?php esc_html_e( 'Quizess', 'quizess' ); ?></h2>

<div class="qz-table-group">
  <div class="components-panel__row">
    <label class="components__label" for="user-player-id"><?php esc_html_e( 'Register player', 'quizess' ); ?>
      <span class="components__label-helper">
        <?php esc_html_e( 'Will register user as quiz player and keep records of quiz stats', 'quizess' ); ?>
      </span>
    </label>
    <div class="components__field">
      <label class="toggle-switch">
        <input class="toggle-switch__input" name="<?php echo esc_attr( Config::USER_PLAYER_TOGGLE ); ?>" id="user-player-id" type="checkbox" <?php echo esc_attr( $user_checked ); ?>>
        <span class="toggle-switch__slider"></span>
      </label>
    </div>
  </div>
</div>
<div class="qz-table-group">
  <div class="components-panel__row">
    <label class="components__label" for="user-single-id"><?php esc_html_e( 'Single submit', 'quizess' ); ?>
      <span class="components__label-helper">
        <?php esc_html_e( 'Will allow user to have only 1 attempt recorded per quiz, to reset remove last attempt record under dashboard', 'quizess' ); ?>
      </span>
    </label>
    <div class="components__field">
      <label class="toggle-switch">
        <input class="toggle-switch__input" name="<?php echo esc_attr( Config::USER_SINGLE_TOGGLE ); ?>" id="user-single-id" type="checkbox" <?php echo esc_attr( $single_checked ); ?>>
        <span class="toggle-switch__slider"></span>
      </label>
    </div>
  </div>
</div>
