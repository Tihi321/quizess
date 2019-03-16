<?php
/**
 * Last score titles
 *
 * @package Quizess\Template_Parts\Modal\Parts
 * @since 1.0.0
 */

$last_score_titles = [
    __( 'Correct', 'quizess' ),
    __( 'Total', 'quizess' ),
    __( 'Success', 'quizess' ),
];

?>

<?php foreach ( $last_score_titles as $index => $title_item ) { ?>
  <div class="quiz-accomplishment__inner quiz-accomplishment__title">
    <?php echo esc_html( $title_item ); ?>
  </div>
<?php } ?>
