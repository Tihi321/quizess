<?php
/**
 * Score item
 *
 * @package Quizess\Views\Modal\Parts
 * @since 1.0.0
 */

use Quizess\Helpers\General_Helper;

$name     = General_Helper::get_array_value( 'name', $player );
$attempts = General_Helper::get_array_value( 'attempts', $player );
$correct  = General_Helper::get_array_value( 'correct', $player );
$total    = General_Helper::get_array_value( 'total', $player );
$success  = General_Helper::get_gercentage( $correct, $total );

$player_info = [
    $name,
    $attempts,
    $correct,
    $total,
    "{$success}%",
];

?>

<?php foreach ( $player_info as $index => $info ) { ?>
  <div class="stats__inner">
    <?php echo esc_html( $info ); ?>
  </div>
<?php } ?>
