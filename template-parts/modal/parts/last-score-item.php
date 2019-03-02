<?php
/**
 * Last score item
 *
 * @package Quizess\Template_Parts\Modal\Parts
 * @since 1.0.0
 */

use Quizess\Helpers;

$blocks_helper = new Helpers\Blocks_Helper();

$correct = $general_helper->get_array_value( 'correct', $player_scores[ $user_id ]['last'] );
$total   = $general_helper->get_array_value( 'total', $player_scores[ $user_id ]['last'] );
$success = $general_helper->get_gercentage( $correct, $total );

$last_score_info = [
    $correct,
    $total,
    "{$success}%",
];

?>

<?php foreach ( $last_score_info as $index => $info ) { ?>
  <div class="last-score__inner">
    <?php echo esc_html( $info ); ?>
  </div>
<?php } ?>
