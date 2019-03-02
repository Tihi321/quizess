<?php
/**
 * Bottom content
 *
 * @package Quizess\Template_Parts\Sections
 * @since 1.0.0
 */

?>

<div class="quiz__button--outer">
  <div class="js-quiz-start" data-quiz-id="<?php echo esc_attr( $post->ID ); ?>" data-theme="<?php echo esc_attr( $theme ); ?>" data-user-submit="<?php echo esc_attr( $user_submit ); ?>">
  </div>
  <?php
  if ( ! empty( $about_field ) ) {
    ?>
    <button class="btn btn--<?php echo esc_attr( $theme ); ?> js-modal-trigger-open" data-modal="<?php echo esc_attr( $about_modal_id ); ?>">
      <?php echo esc_html__( 'About', 'quizess' ); ?>
    </button>
  <?php } ?>
  <?php
  if ( ! empty( $player_scores ) ) {
    ?>
    <button class="btn btn--<?php echo esc_attr( $theme ); ?> js-modal-trigger-open" data-modal="<?php echo esc_attr( $scores_modal_id ); ?>">
      <?php echo esc_html__( 'High scores', 'quizess' ); ?>
    </button>
  <?php } ?>
</div>

<?php
$about_modal_path = $base_path . 'template-parts/modal/modal-about.php';

if ( ! empty( $about_modal_path ) ) {
  include $about_modal_path;
}
?>

<?php
$scores_modal_path = $base_path . 'template-parts/modal/modal-scores.php';

if ( ! empty( $scores_modal_path ) ) {
  include $scores_modal_path;
}
?>
