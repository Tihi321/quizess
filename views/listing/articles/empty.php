<?php
/**
 * Empty Article
 *
 * @package TS_Blog\Views\Listing\Articles
 */

$class_name = 'article-empty';

?>

<article class="<?php echo esc_attr( $class_name ); ?>">
  <div class="<?php echo esc_attr( "{$class_name}__content" ); ?>">
    <?php esc_html_e( 'Sorry no items found', 'quizess' ); ?>
  </div>
</article>
