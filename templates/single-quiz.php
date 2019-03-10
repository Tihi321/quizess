<?php
/**
 * Single page for Quiz custom post type
 *
 * @package Quizess
 */

use Quizess\Helpers\General_Helper;
use Quizess\Core\Config;

$custom_style = get_option( Config::CUSTOM_STYLE_TOGGLE );

// use custom header instead theme default.
if ( $custom_style ) {

  $header = General_Helper::get_base_path() . 'views/header/header.php';

  if ( ! empty( $header ) ) {
    include $header;
  }
} else {
  get_header();
}

if ( have_posts() ) {
  while ( have_posts() ) {
    the_post();
    $single_path = General_Helper::get_base_path() . 'views/single/quiz.php';

    if ( ! empty( $single_path ) ) {
      include $single_path;
    }
  }
}

// use custom footer instead theme default.
if ( $custom_style ) {

  $footer = General_Helper::get_base_path() . 'views/footer/footer.php';

  if ( ! empty( $footer ) ) {
    include $footer;
  }
} else {
  get_footer();
}
