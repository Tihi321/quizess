<?php
/**
 * About modal
 *
 * @package Quizess\Template_Parts\Modal
 * @since 1.0.0
 */

?>

<div class="modal js-modal" id="<?php echo esc_attr( $about_modal_id ); ?>" style="background-color:<?php echo esc_attr( $bg_color ); ?>;background-image:url('<?php echo esc_attr( $bg_image_url ); ?>');">
  <div class="modal__inner modal__inner--narrow modal__inner--<?php echo esc_attr( $theme ); ?>">
    <div class="modal__top-bar modal__top-bar--<?php echo esc_attr( $theme ); ?>">
      <h1 class="modal__title">
        <?php echo esc_html__( 'About', 'quizess' ); ?>
      </h1>
      <button class="btn-close js-modal-trigger-close" data-modal="<?php echo esc_attr( $about_modal_id ); ?>">
      </button>
    </div>
    <div class="modal__content">
      <?php echo wp_kses_post( $about_field ); ?>
    </div>
  </div>
</div>
