<?php
/**
 * Category items
 *
 * @package Quizess\Views\Category
 */

use Quizess\Core\Config;

$class_category_list = 'category-list';
$categories          = get_the_terms( get_the_ID(), Config::QUIZESS_CATEGORY_SLUG );

?>
<nav class="<?php echo esc_attr( "{$class_category_list}__items" ); ?>">
  <?php
  if ( ! empty( $categories ) ) {
    foreach ( $categories as $item ) {
      $category_url = get_category_link( $item->term_id );
      ?>
      
      <a class="<?php echo esc_attr( "{$class_category_list}__item" ); ?>" href="<?php echo esc_url( $category_url ); ?>">
        <?php
          echo esc_html( $item->name );
        ?>
      </a>
      <?php
    }
  }
  ?>
</nav>
