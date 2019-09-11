<?php
/**
 * Google Rich Snippets
 *
 * @package Quizess\Views\Parts
 */

?>

<!-- Google Rich Snippets -->
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "Quiz",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
    "headline": "<?php the_title(); ?>",
  "datePublished": "<?php echo esc_html( get_the_time( 'c' ) ); ?>",
  "dateModified": "<?php echo esc_html( date( 'c', strtotime( $post->post_modified ) ) ); ?>",
  "author": {
    "@type": "Person",
    "name": "<?php echo get_the_author(); ?>"
  },
    "publisher": {
    "@type": "Organization",
    "name": "<?php echo esc_html( get_bloginfo( 'name' ) ); ?>",
    "logo": {
    "@type": "ImageObject",
    "url": "<?php echo esc_url( apply_filters( 'qz_get_base_url', 'path' ) . '/skin/public/images/meta-google.png' ); ?>",
    "width": 220,
    "height": 60
    }
  },
  }
</script>
