<?php
/**
 * Single Post
 *
 * @package Quizess
 */

use Quizess\Helpers;

$blocks_helper  = new Helpers\Blocks_Helper();
$general_helper = new Helpers\General_Helper();

$quiz_options = $blocks_helper->get_quiz_options( $post->post_content );

$welcome_message = $general_helper->get_array_value( 'welcomeMessage', $quiz_options['options'] );

?>

<!-- Single Content Section -->
<section class="single" id="<?php echo esc_attr( $post->ID ); ?>">

  <div class="single__content">

  </div>

  <?php
  $google_snippets_path = plugin_dir_path( __DIR__ ) . 'parts/google-rich-snippets.php';
  if ( ! empty( $google_snippets_path ) ) {
    include $google_snippets_path;
  }
  ?>
</section>
