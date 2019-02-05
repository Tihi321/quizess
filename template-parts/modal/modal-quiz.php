<?php
/**
 * Quiz modal
 *
 * @package Quizess\Template_Parts\Modal
 * @since 1.0.0
 */

?>

<div class="modal js-modal" id="<?php echo esc_attr( $modal_id ); ?>" style="background-color:<?php echo esc_attr( $bg_color ); ?>;background-image:url('<?php echo esc_attr( $bg_image_url ); ?>');">
  <div class="modal__inner">
    <div class="modal__close-btn-wrap">
      <button class="modal__close-btn js-modal-trigger-close" data-modal="<?php echo esc_attr( $modal_id ); ?>">
      </button>
    </div>
    <div class="modal__content">
      <h1>
        <?php echo esc_html__( 'About', 'quizess' ); ?>
      </h1>
      <div>
        <?php echo wp_kses_post( $about_field ); ?>
      </div>
    </div>
  </div>
</div>
