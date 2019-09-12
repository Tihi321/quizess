<?php
/**
 * Single page for Quiz custom post type
 *
 * @package Quizess
 */

use Quizess\Core\Config;

$custom_style = get_option( Config::CUSTOM_STYLE_TOGGLE );
$theme        = get_option( Config::LIGHT_THEME_TOGGLE ) ? 'light' : 'dark';

// use custom header instead theme default.
if ( $custom_style ) {

  $header = apply_filters( 'qz_get_base_url', 'path' ) . 'views/header/header.php';

  if ( ! empty( $header ) ) {
    include $header;
  }

  $menu_items = apply_filters( 'qz_get_menu_by_position', Config::MENU_NAME );

  if ( ! empty( $menu_items ) ) {
    $header_content = apply_filters( 'qz_get_base_url', 'path' ) . 'views/header/header-content.php';

    if ( ! empty( $header_content ) ) {
      include $header_content;
    }

    $category_menu = apply_filters( 'qz_get_base_url', 'path' ) . 'views/category/menu.php';

    if ( ! empty( $category_menu ) ) {
      include $category_menu;
    }
  }
} else {
  get_header();
}

if ( have_posts() ) {
  while ( have_posts() ) {
    the_post();
    $list_template = apply_filters( 'qz_get_base_url', 'path' ) . 'views/listing/articles/list.php';

    if ( ! empty( $list_template ) ) {
      include $list_template;
    }
  }
  the_posts_pagination(
    array(
      'screen_reader_text' => esc_html__( 'Pagination', 'ts-blog' ),
    )
  );
} else {
  $empty_template = apply_filters( 'qz_get_base_url', 'path' ) . 'views/listing/articles/empty.php';

  if ( ! empty( $empty_template ) ) {
    include $empty_template;
  }
}

// use custom footer instead theme default.
if ( $custom_style ) {

  $footer_content = apply_filters( 'qz_get_base_url', 'path' ) . 'views/footer/footer-content.php';

  if ( ! empty( $footer_content ) ) {
    include $footer_content;
  }

  $footer = apply_filters( 'qz_get_base_url', 'path' ) . 'views/footer/footer.php';

  if ( ! empty( $footer ) ) {
    include $footer;
  }
} else {
  get_footer();
}
