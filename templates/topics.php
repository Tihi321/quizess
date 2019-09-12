<?php
/**
 * Single page for Quiz custom post type
 *
 * @package Quizess
 */

use Quizess\Core\Config;

$custom_style = get_option( Config::CUSTOM_STYLE_TOGGLE );
$theme        = get_option( Config::LIGHT_THEME_TOGGLE ) ? 'light' : 'dark';

$args = [
  'post_type' => Config::QUIZESS_POST_SLUG,
  'tax_query' => [
    [
      'taxonomy' => Config::QUIZESS_CATEGORY_SLUG,
      'field' => 'term_id',
      'terms' => get_queried_object()->term_id,
    ],
  ],
];

$query = new WP_Query( $args );

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

if ( $query->have_posts() ) {
  while ( $query->have_posts() ) {
    $query->the_post();
    $list_template = apply_filters( 'qz_get_base_url', 'path' ) . 'views/listing/articles/list.php';

    if ( ! empty( $list_template ) ) {
      include $list_template;
    }
  }
} else {
  $empty_template = apply_filters( 'qz_get_base_url', 'path' ) . 'views/listing/articles/empty.php';

  if ( ! empty( $empty_template ) ) {
    include $empty_template;
  }
}

wp_reset_postdata();

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
