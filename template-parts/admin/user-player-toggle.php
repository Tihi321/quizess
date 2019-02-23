<?php
/**
 * User player toggle
 *
 * @package Quizess\Template_Parts\Admin
 */

// Template for user area that displays wheather user is player or not.
$user_player_yes = '';
$user_player_no  = 'checked';

if ( get_user_meta( $user->ID, 'user_player_quizess', true ) ) {
    $user_player_yes = 'checked';
    $user_player_no  = '';
}

?>
<h2><?php esc_html_e( 'Quizess', 'quizess' ); ?></h2>

    <table class="form-table">
    <tr>
      <th><label for="user-player-toggle"><?php esc_html_e( 'Registered player', 'quizess' ); ?></label></th>
      <td>
        <input class="user-player-toggle" type="radio" name="user-player-toggle" id="user-player-yes" value="user-player-yes" <?php echo esc_html( $user_player_yes ); ?>>
        <label class="label label__checkbox" for="user-player-yes"><?php esc_html_e( 'Yes', 'quizess' ); ?></label>
        </br>
        <input class="user-player-toggle" type="radio" name="user-player-toggle" id="user-player-no" value="user-player-no" <?php echo esc_html( $user_player_no ); ?>>
        <label class="label label__checkbox" for="user-player-no"><?php esc_html_e( 'No', 'quizess' ); ?></label>
      </td>
    </tr>
</table>
