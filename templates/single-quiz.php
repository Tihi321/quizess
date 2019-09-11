<?php
/**
 * Single page for Quiz custom post type
 *
 * @package Quizess
 */

use Quizess\Core\Config;

$custom_style = get_option( Config::CUSTOM_STYLE_TOGGLE );
$quiz_options = apply_filters( 'qz_get_quiz_options', $post->post_content );
$theme        = $quiz_options['options']['theme'] ?? '';

// use custom header instead theme default.
if ( $custom_style ) {

  $header = apply_filters( 'qz_get_base_url', 'path' ) . 'views/header/header.php';

  if ( ! empty( $header ) ) {
    include $header;
  }
} else {
  get_header();
}

if ( have_posts() ) {
  while ( have_posts() ) {
    the_post();

    if ( $custom_style ) {
      $menu_items = apply_filters( 'qz_get_menu_by_position', Config::MENU_NAME );

      if ( ! empty( $menu_items ) ) {
        $header_content = apply_filters( 'qz_get_base_url', 'path' ) . 'views/header/header-content.php';

        if ( ! empty( $header_content ) ) {
          include $header_content;
        }
      }
    }
    $single_path = apply_filters( 'qz_get_base_url', 'path' ) . 'views/single/quiz.php';

    if ( ! empty( $single_path ) ) {
      include $single_path;
    }

    if ( $custom_style ) {

      $footer_content = apply_filters( 'qz_get_base_url', 'path' ) . 'views/footer/footer-content.php';

      if ( ! empty( $footer_content ) ) {
        include $footer_content;
      }
    }
  }
}

// use custom footer instead theme default.
if ( $custom_style ) {

  $footer = apply_filters( 'qz_get_base_url', 'path' ) . 'views/footer/footer.php';

  if ( ! empty( $footer ) ) {
    include $footer;
  }
} else {
  get_footer();
}
