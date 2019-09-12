<?php
/**
 * Single page for Quiz custom post type
 *
 * @package Quizess
 */

use Quizess\Core\Config;

$custom_style = get_option( Config::CUSTOM_STYLE_TOGGLE );
$theme        = apply_filters( 'qz_get_current_theme', true );

// Pagination.
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;

// Get post per page from wp options.
$posts_per_page = get_option( 'posts_per_page' );

$args = [
  'post_type' => Config::QUIZESS_POST_SLUG,
  'posts_per_page' => $posts_per_page,
  'paged' => $paged,
  'update_post_meta_cache' => false,
  'update_post_term_cache' => false,
  'tax_query' => [
    [
      'taxonomy' => Config::QUIZESS_CATEGORY_SLUG,
      'field' => 'slug',
      'terms' => get_query_var( Config::QUIZESS_CATEGORY_SLUG ),
    ],
  ],
];

$query = new WP_Query( $args );

// use custom header instead theme default.
if ( $custom_style ) {

  $header = apply_filters( 'qz_get_base_url', 'path' ) . 'views/header/archive-header.php';

  if ( ! empty( $header ) ) {
    include $header;
  }

  $menu_items = apply_filters( 'qz_get_menu_by_position', Config::MENU_NAME );

  if ( ! empty( $menu_items ) ) {
    $header_content = apply_filters( 'qz_get_base_url', 'path' ) . 'views/header/header-content.php';

    if ( ! empty( $header_content ) ) {
      include $header_content;
    }

    ?>
    <div class="quizess__category quizess__category--<?php echo esc_attr( $theme ); ?>">
      <div class="quizess__container">
        <h1 class="quizess__topics"><?php echo esc_html__( 'Topics', 'quizess' ); ?></h1>
    <?php

    $category_menu = apply_filters( 'qz_get_base_url', 'path' ) . 'views/category/menu.php';

    if ( ! empty( $category_menu ) ) {
      include $category_menu;
    }
    ?>
    </div>
  </div>
  <div class="quizess__content">
    <div class="quizess__container">
      <div class="article-list">
    <?php
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
  ?>
  </div>
</div>
</div>
<div class="quizess__pagination quizess__pagination--<?php echo esc_attr( $theme ); ?>">
<div class="quizess__container">
  <?php
  $pagination_query    = $query;
  $paginstion_template = apply_filters( 'qz_get_base_url', 'path' ) . 'views/parts/query-pagination.php';

  if ( ! empty( $paginstion_template ) ) {
    include $paginstion_template;
  }
  ?>
  </div>
</div>
  <?php
} else {
  ?>
  <div class="quizess__empty">
  <?php
  $empty_template = apply_filters( 'qz_get_base_url', 'path' ) . 'views/listing/articles/empty.php';

  if ( ! empty( $empty_template ) ) {
    include $empty_template;
  }
  ?>
  </div>
  <?php
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
