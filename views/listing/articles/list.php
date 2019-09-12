<?php
/**
 * List Simple Article
 *
 * @package TS_Blog\Views\Listing\Articles
 */

$class_name = 'article-list';

$post_date = get_the_date();
$base_path = apply_filters( 'qz_get_base_url', 'path' );

?>
<article class="<?php echo esc_attr( "{$class_name}__item" ); ?>">
  <h2 class="<?php echo esc_attr( "{$class_name}__heading" ); ?>">
    <a class="<?php echo esc_attr( "{$class_name}__heading-link" ); ?>" href="<?php the_permalink(); ?>">
    <?php esc_html( the_title() ); ?>
    </a>
  </h2>
  <div class="<?php echo esc_attr( "{$class_name}__meta" ); ?>">
    <?php
      $categories = $base_path . 'views/category/list.php';

    if ( ! empty( $categories ) ) {
      include $categories;
    }
    ?>
    <span class="<?php echo esc_attr( "{$class_name}__date" ); ?>">
      <?php
        echo esc_html( $post_date );
      ?>
    </span>
  </div>
  <?php
  $google_snippets_path = $base_path . 'views/parts/google-rich-snippets.php';
  if ( ! empty( $google_snippets_path ) ) {
    include $google_snippets_path;
  }
  ?>
</article>
