<?php
/**
 * Single page for Quiz custom post type
 *
 * @package Quizess
 */

get_header();

if ( have_posts() ) {
  while ( have_posts() ) {
    the_post();
    $single_path = plugin_dir_path( __DIR__ ) . 'template-parts/single/quiz.php';

    if ( ! empty( $single_path ) ) {
      include $single_path;
    }
  }
}

get_footer();
