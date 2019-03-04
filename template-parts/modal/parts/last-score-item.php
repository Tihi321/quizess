<?php
/**
 * Last score item
 *
 * @package Quizess\Template_Parts\Modal\Parts
 * @since 1.0.0
 */

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
