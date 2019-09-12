<?php
/**
 * Category menu links
 *
 * @package Quizess\Views\Category\Parts
 */

$class_name = 'category-menu';

$category_url    = isset( $item ) ? get_category_link( $item->term_id ) : false;
$active_category = ( isset( get_queried_object()->term_id ) && get_queried_object()->term_id === $item->term_id ) ? ' is-active' : '';

?>

<a class="<?php echo esc_attr( "{$class_name}__item" ); ?><?php echo esc_attr( $active_category ); ?>" href="<?php echo esc_url( $category_url ); ?>">
  <?php
    echo esc_html( $item->name );
  ?>
</a>
