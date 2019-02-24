<?php
/**
 * Single Post
 *
 * @package Quizess\Template_Parts\Single
 */

use Quizess\Helpers;

$blocks_helper  = new Helpers\Blocks_Helper();
$general_helper = new Helpers\General_Helper();

$quiz_options = $blocks_helper->get_quiz_options( $post->post_content );

$welcome_message = $general_helper->get_array_value( 'welcomeMessage', $quiz_options['options'] );
$theme           = $general_helper->get_array_value( 'theme', $quiz_options['options'] );
$about_field     = $general_helper->get_array_value( 'aboutField', $quiz_options['options'] );
$bg_color        = $general_helper->get_array_value( 'bgColor', $quiz_options['bgOptions'] );
$bg_image_url    = $general_helper->get_array_value( 'bgUrl', $quiz_options['bgOptions'] );
$modal_id        = 'modal-' . $post->ID;
$base_path       = Helpers\General_Helper::get_base_path();

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
        <div class="js-quiz-start" data-quiz-id="<?php echo esc_attr( $post->ID ); ?>" data-theme="<?php echo esc_attr( $theme ); ?>">
        </div>
      <?php } ?>
      <?php
      if ( ! empty( $about_field ) ) {
        ?>
        <button class="btn btn--<?php echo esc_attr( $theme ); ?> js-modal-trigger-open" data-modal="<?php echo esc_attr( $modal_id ); ?>">
          <?php echo esc_html__( 'About', 'quizess' ); ?>
        </button>
      <?php } ?>
    </div>
  </div>

  <?php
  $modal_path = $base_path . 'template-parts/modal/modal-quiz.php';

  if ( ! empty( $modal_path ) ) {
    include $modal_path;
  }
  ?>

  <?php
  $google_snippets_path = $base_path . 'template-parts/parts/google-rich-snippets.php';
  if ( ! empty( $google_snippets_path ) ) {
    include $google_snippets_path;
  }
  ?>
</section>
