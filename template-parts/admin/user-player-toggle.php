<?php
/**
 * User player toggle
 *
 * @package Quizess\Template_Parts\Admin
 */

use Quizess\Includes\Config;

$user_player  = \get_user_meta( $user->ID, Config::USER_PLAYER_TOGGLE, true );
$user_checked = ( $user_player === 'yes' ) ? 'checked' : '';
$label_yes    = __( 'Yes', 'quizess' );
$label_no     = __( 'No', 'quizess' );
$label_output = ( $user_player === 'yes' ) ? $label_yes : $label_no;


?>
<h2><?php esc_html_e( 'Quizess', 'quizess' ); ?></h2>

    <table class="form-table">
    <tr>
      <th><label for="user-player-id"><?php esc_html_e( 'Registered player', 'quizess' ); ?> ( <?php echo esc_html( $label_output ); ?> )</label></th>
      <td>
        <label class="toggle-switch">
          <input class="toggle-switch__input" name="<?php echo esc_attr( Config::USER_PLAYER_TOGGLE ); ?>" id="user-player-id" type="checkbox" <?php echo esc_attr( $user_checked ); ?>>
          <span class="toggle-switch__slider"></span>
        </label>
      </td>
    </tr>
</table>
