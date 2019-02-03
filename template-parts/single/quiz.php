<?php
/**
 * Single Post
 *
 * @package Quizess
 */

?>

<!-- Single Content Section -->
<section class="single" id="<?php echo esc_attr( $post->ID ); ?>">

  <div class="single__content">
    <?php the_content(); ?>
  </div>

  <?php
  $google_snippets_path = plugin_dir_path( __DIR__ ) . 'parts/google-rich-snippets.php';
  if ( ! empty( $google_snippets_path ) ) {
    include $google_snippets_path;
  }
  ?>
</section>
