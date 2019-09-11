<?php
/**
 * Score item
 *
 * @package Quizess\Views\Modal\Parts
 * @since 1.0.0
 */

$name     = $player['name'] ?? '';
$attempts = $player['attempts'] ?? '';
$correct  = $player['correct'] ?? '';
$total    = $player['total'] ?? '';
$success  = apply_filters( 'qz_get_gercentage', $correct, $total );

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
