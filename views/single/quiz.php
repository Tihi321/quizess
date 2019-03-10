<?php
/**
 * Single Post
 *
 * @package Quizess\Template_Parts\Single
 */

use Quizess\Helpers\Blocks_Helper;
use Quizess\Helpers\General_Helper;
use Quizess\Core\Config;

$blocks_helper = new Blocks_Helper();

$user_submit  = '1';
$quiz_options = $blocks_helper->get_quiz_options( $post->post_content );

$welcome_message = General_Helper::get_array_value( 'welcomeMessage', $quiz_options['options'] );
$theme           = General_Helper::get_array_value( 'theme', $quiz_options['options'] );
$about_field     = General_Helper::get_array_value( 'aboutField', $quiz_options['options'] );
$bg_color        = General_Helper::get_array_value( 'bgColor', $quiz_options['bgOptions'] );
$bg_image_url    = General_Helper::get_array_value( 'bgUrl', $quiz_options['bgOptions'] );
$about_modal_id  = 'modal--about-' . $post->ID;
$scores_modal_id = 'modal--scores-' . $post->ID;
$quiz_locked     = \get_post_meta( $post->ID, Config::QUIZ_LOCKED_META_KEY, true );
$base_path       = General_Helper::get_base_path();

// check if user can submit scores.
if ( is_user_logged_in() ) {
  $current_user_id = get_current_user_id();
  $can_user_submit = General_Helper::can_user_submit( $post->ID, $current_user_id );
  if ( ! $can_user_submit ) {
    $user_submit = '0';
  }
}

?>

<!-- Single Content Section -->
<section class="quiz" id="<?php echo esc_attr( $post->ID ); ?>">

  <div class="quiz__content quiz__content--<?php echo esc_attr( $theme ); ?>" style="background-color:<?php echo esc_attr( $bg_color ); ?>;background-image:url('<?php echo esc_attr( $bg_image_url ); ?>');">
    <?php
    $title_template = $base_path . 'views/sections/title-section.php';

    if ( ! empty( $title_template ) ) {
      include $title_template;
    }
    ?>
    <?php
    if ( $quiz_locked === 'on' && ! is_user_logged_in() ) {
      $locked_content_message = $base_path . 'views/parts/quiz-locked.php';

      if ( ! empty( $locked_content_message ) ) {
        include $locked_content_message;
      }
    } else {
      $content_template = $base_path . 'views/sections/bottom-section.php';

      if ( ! empty( $content_template ) ) {
        include $content_template;
      }
    }
    ?>
  </div>

  <?php
  $google_snippets_path = $base_path . 'views/parts/google-rich-snippets.php';
  if ( ! empty( $google_snippets_path ) ) {
    include $google_snippets_path;
  }
  ?>
</section>
