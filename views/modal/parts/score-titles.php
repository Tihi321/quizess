<?php
/**
 * Score titles
 *
 * @package Quizess\Views\Modal\Parts
 * @since 1.0.0
 */

$score_titles = [
    __( 'Name', 'quizess' ),
    __( 'Attempts', 'quizess' ),
    __( 'Correct', 'quizess' ),
    __( 'Total', 'quizess' ),
    __( 'Success', 'quizess' ),
];

?>

<?php foreach ( $score_titles as $index => $title_item ) { ?>
  <div class="stats__inner stats__title">
    <?php echo esc_html( $title_item ); ?>
  </div>
<?php } ?>
