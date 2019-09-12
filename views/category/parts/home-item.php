<?php
/**
 * Category menu links
 *
 * @package Quizess\Views\Category\Parts
 */

$class_category_item = 'category-menu';
$page_category       = $wp_query->get_queried_object();
$category_url        = isset( $item ) ? get_category_link( $item->term_id ) : false;

?>

<a class="<?php echo esc_attr( "{$class_category_item}__item" ); ?>" href="<?php echo esc_url( $category_url ); ?>">
  <?php
    echo esc_html( $item->name );
  ?>
</a>
