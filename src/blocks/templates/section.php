<?php
/**
 * Template for the section block.
 *
 * @since 1.0.0
 * @package Quizess\Blocks\Templates.
 */

namespace Quizess\Blocks\Templates;

// $attributes are block's attributes.
$class_name = $attributes['className'] && '';
$base_class = $attributes['rootClass'] && '';

$container_class = ( ! empty( $base_class ) ? "{$base_class}__container" : '' );
$content_class   = ( ! empty( $base_class ) ? "{$base_class}__content" : '' );
?>

<div class="<?php echo esc_attr( trim( "{$class_name} {$base_class}" ) ); ?>">
  <div class="<?php echo esc_attr( $container_class ); ?>">
    <div class="<?php echo esc_attr( $content_class ); ?>">
      <?php echo wp_kses_post( $content ); ?>
    </div>
  </div>
</div>
