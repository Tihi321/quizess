<?php
/**
 * Single Post
 *
 * @package Quizess\Template_Parts\Single
 */

use Quizess\Helpers;
use Quizess\Includes\Config;

$blocks_helper  = new Helpers\Blocks_Helper();
$general_helper = new Helpers\General_Helper();

$user_submit  = '1';
$quiz_options = $blocks_helper->get_quiz_options( $post->post_content );
$quiz_scores  = $blocks_helper->get_quiz_scores( $post->ID );

$welcome_message = $general_helper->get_array_value( 'welcomeMessage', $quiz_options['options'] );
$theme           = $general_helper->get_array_value( 'theme', $quiz_options['options'] );
$about_field     = $general_helper->get_array_value( 'aboutField', $quiz_options['options'] );
$bg_color        = $general_helper->get_array_value( 'bgColor', $quiz_options['bgOptions'] );
$bg_image_url    = $general_helper->get_array_value( 'bgUrl', $quiz_options['bgOptions'] );
$player_scores   = $general_helper->get_array_value( 'players', $quiz_scores );
$about_modal_id  = 'modal--about-' . $post->ID;
$scores_modal_id = 'modal--scores-' . $post->ID;
$base_path       = Helpers\General_Helper::get_base_path();

// check if user can submit scores.
if ( is_user_logged_in() ) {
  $current_user_id = get_current_user_id();
  $can_user_submit = $general_helper->can_user_submit( $post->ID, $current_user_id );
  if ( ! $can_user_submit ) {
    $user_submit = '0';
  }
}


?>

<!-- Single Content Section -->
<section class="quiz" id="<?php echo esc_attr( $post->ID ); ?>">

  <div class="quiz__content quiz__content--<?php echo esc_attr( $theme ); ?>" style="background-color:<?php echo esc_attr( $bg_color ); ?>;background-image:url('<?php echo esc_attr( $bg_image_url ); ?>');">
    <div class="quiz__welcome--outer">
      <h2 class="quiz__welcome--message">
        <?php
        if ( ! empty( $welcome_message ) ) {
          ?>
          <?php echo esc_html( $welcome_message ); ?>
          <?php } else { ?>
          <?php echo esc_html__( 'Welcome to our quiz', 'quizess' ); ?>
        <?php } ?>
      </h2>
    </div>
    <div class="quiz__button--outer">
      <?php
      if ( ! empty( $post->ID ) ) {
        ?>
        <div class="js-quiz-start" data-quiz-id="<?php echo esc_attr( $post->ID ); ?>" data-theme="<?php echo esc_attr( $theme ); ?>" data-user-submit="<?php echo esc_attr( $user_submit ); ?>">
        </div>
      <?php } ?>
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

  <?php
  $google_snippets_path = $base_path . 'template-parts/parts/google-rich-snippets.php';
  if ( ! empty( $google_snippets_path ) ) {
    include $google_snippets_path;
  }
  ?>
</section>
