<?php
/**
 * User player toggle
 *
 * @package Quizess\Template_Parts\Admin
 */

use Quizess\Includes\Config;

$label_yes = __( 'Yes', 'quizess' );
$label_no  = __( 'No', 'quizess' );

$user_player = \get_user_meta( $user->ID, Config::USER_PLAYER_TOGGLE, true );
$user_single = \get_user_meta( $user->ID, Config::USER_SINGLE_TOGGLE, true );

$user_checked   = ( $user_player === 'yes' ) ? 'checked' : '';
$single_checked = ( $user_single === 'yes' ) ? 'checked' : '';

$user_label   = ( $user_player === 'yes' ) ? $label_yes : $label_no;
$single_label = ( $user_single === 'yes' ) ? $label_yes : $label_no;


?>
<h2><?php esc_html_e( 'Quizess', 'quizess' ); ?></h2>

    <table class="form-table">
    <tr>
      <th><label for="user-player-id"><?php esc_html_e( 'Registered player', 'quizess' ); ?> ( <?php echo esc_html( $user_label ); ?> )</label></th>
      <td>
        <label class="toggle-switch">
          <input class="toggle-switch__input" name="<?php echo esc_attr( Config::USER_PLAYER_TOGGLE ); ?>" id="user-player-id" type="checkbox" <?php echo esc_attr( $user_checked ); ?>>
          <span class="toggle-switch__slider"></span>
        </label>
      </td>
    </tr>
    <tr>
      <th><label for="user-single-id"><?php esc_html_e( 'Single submit', 'quizess' ); ?> ( <?php echo esc_html( $single_label ); ?> )</label></th>
      <td>
        <label class="toggle-switch">
          <input class="toggle-switch__input" name="<?php echo esc_attr( Config::USER_SINGLE_TOGGLE ); ?>" id="user-single-id" type="checkbox" <?php echo esc_attr( $single_checked ); ?>>
          <span class="toggle-switch__slider"></span>
        </label>
      </td>
    </tr>
</table>
