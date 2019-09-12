<?php
/**
 * Category menu links
 *
 * @package Quizess\Views\Category
 */

use Quizess\Core\Config;

$class_category_menu = 'category-menu';

$base_path = apply_filters( 'qz_get_base_url', 'path' );

$args = [
  'taxonomy' => Config::QUIZESS_CATEGORY_SLUG,
];

$categories = get_categories( $args );

?>

<div class="<?php echo esc_attr( $class_category_menu ); ?>">
  <?php
      $blog_page = get_post_type_archive_link( Config::QUIZESS_POST_SLUG );
      $active    = ( is_post_type_archive( Config::QUIZESS_POST_SLUG ) ) ? ' is-active' : '';
  ?>
    <a class="<?php echo esc_attr( "{$class_category_menu}__item" ); ?><?php echo esc_attr( $active ); ?>" href="<?php echo esc_url( $blog_page ); ?>">
    <?php esc_html_e( 'All', 'quizess' ); ?>
    </a>
  <?php
  if ( ! empty( $categories ) ) {
    foreach ( $categories as $item ) {
      $category_item = $base_path . 'views/category/parts/item.php';

      if ( ! empty( $category_item ) ) {
        include $category_item;
      }
    }
  }
  ?>
</div>
