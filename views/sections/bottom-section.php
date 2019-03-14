<?php
/**
 * Bottom content
 *
 * @package Quizess\Template_Parts\Sections
 * @since 1.0.0
 */

use Quizess\Helpers\General_Helper;

$quiz_scores   = $blocks_helper->get_quiz_scores( $post->ID, true );
$player_scores = General_Helper::get_array_value( 'players', $quiz_scores );

?>

<div class="quiz__buttons">
  <div class="quiz__buttons--inner">
    <div class="quiz__buttons--start js-quiz-start" data-quiz-id="<?php echo esc_attr( $post->ID ); ?>" data-theme="<?php echo esc_attr( $theme ); ?>" data-user-submit="<?php echo esc_attr( $user_submit ); ?>">
    </div>
    <?php
    if ( ! empty( $about_field ) ) {
      ?>
      <button class="btn btn--<?php echo esc_attr( $theme ); ?> js-modal-trigger-open" data-modal="<?php echo esc_attr( $about_modal_id ); ?>">
        <?php echo esc_html__( 'About', 'quizess' ); ?>
      </button>
    <?php } ?>
  </div>
  <?php
  if ( ! empty( $player_scores ) ) {
    ?>
    <button class="btn btn--<?php echo esc_attr( $theme ); ?> js-modal-trigger-open" data-modal="<?php echo esc_attr( $scores_modal_id ); ?>">
      <?php echo esc_html__( 'High scores', 'quizess' ); ?>
    </button>
  <?php } ?>
</div>

<?php
$about_modal_path = $base_path . 'views/modal/modal-about.php';

if ( ! empty( $about_modal_path ) ) {
  include $about_modal_path;
}
?>

<?php
if ( ! empty( $player_scores ) ) {
  $scores_modal_path = $base_path . 'views/modal/modal-scores.php';

  if ( ! empty( $scores_modal_path ) ) {
    include $scores_modal_path;
  }
}
?>
