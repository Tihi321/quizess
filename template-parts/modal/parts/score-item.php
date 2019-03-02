<?php
/**
 * Score item
 *
 * @package Quizess\Template_Parts\Modal\Parts
 * @since 1.0.0
 */

use Quizess\Helpers;

$blocks_helper = new Helpers\Blocks_Helper();

$name     = $general_helper->get_array_value( 'name', $player );
$attempts = $general_helper->get_array_value( 'attempts', $player );
$correct  = $general_helper->get_array_value( 'correct', $player );
$total    = $general_helper->get_array_value( 'total', $player );
$success  = $general_helper->get_gercentage( $correct, $total );

$player_info = [
    $name,
    $attempts,
    $correct,
    $total,
    "{$success}%",
];

?>

<?php foreach ( $player_info as $index => $info ) { ?>
  <div class="scores__inner">
    <?php echo esc_html( $info ); ?>
  </div>
<?php } ?>
