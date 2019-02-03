<?php
/**
 * Single page for Quiz custom post type
 *
 * @package Quizess
 */

use Quizess\Helpers\General_Helper;


get_header();

if ( have_posts() ) {
  while ( have_posts() ) {
    the_post();
    $single_path = General_Helper::get_base_path() . 'template-parts/single/quiz.php';

    if ( ! empty( $single_path ) ) {
      include $single_path;
    }
  }
}

get_footer();
