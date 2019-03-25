<?php
/**
 * Single page for Quiz custom post type
 *
 * @package Quizess
 */

use Quizess\Helpers\Blocks_Helper;
use Quizess\Helpers\General_Helper;
use Quizess\Core\Config;
use Quizess\Admin\Menu;


$blocks_helper = new Blocks_Helper();
$custom_style  = get_option( Config::CUSTOM_STYLE_TOGGLE );
$quiz_options  = $blocks_helper->get_quiz_options( $post->post_content );
$theme         = General_Helper::get_array_value( 'theme', $quiz_options['options'] );

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

    if ( $custom_style ) {
      $custom_menu = new Menu();
      $menu_items  = $custom_menu->get_menu_by_position( Config::MENU_NAME );

      if ( ! empty( $menu_items ) ) {
        $header_content = General_Helper::get_base_path() . 'views/header/header-content.php';

        if ( ! empty( $header_content ) ) {
          include $header_content;
        }
      }
    }
    $single_path = General_Helper::get_base_path() . 'views/single/quiz.php';

    if ( ! empty( $single_path ) ) {
      include $single_path;
    }

    if ( $custom_style ) {

      $footer_content = General_Helper::get_base_path() . 'views/footer/footer-content.php';

      if ( ! empty( $footer_content ) ) {
        include $footer_content;
      }
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
