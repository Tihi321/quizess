<?php
/**
 * Category menu links
 *
 * @package Quizess\Views\Category\Parts
 */

$class_name      = 'category-menu';
$is_active_class = 'is-active';

$page_category   = $wp_query->get_queried_object();
$category_url    = isset( $item ) ? get_category_link( $item->term_id ) : false;
$active_category = '';

// $cat = ( isset( $page_category ) && $page_category->term_id === $item->term_id ) ? " {$is_active_class}" : '';

error_log( print_r( $item, true) );

?>

<a class="<?php echo esc_attr( "{$class_name}__item" ); ?><?php echo esc_attr( $active_category ); ?>" href="<?php echo esc_url( $category_url ); ?>">
  <?php
    echo esc_html( $item->name );
  ?>
</a>
