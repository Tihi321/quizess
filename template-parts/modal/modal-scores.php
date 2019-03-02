<?php
/**
 * Scores modal
 *
 * @package Quizess\Template_Parts\Modal
 * @since 1.0.0
 */

?>

<div class="modal js-modal" id="<?php echo esc_attr( $scores_modal_id ); ?>" style="background-color:<?php echo esc_attr( $bg_color ); ?>;background-image:url('<?php echo esc_attr( $bg_image_url ); ?>');">
  <div class="modal__inner modal__inner--<?php echo esc_attr( $theme ); ?>">
    <div class="modal__top-bar modal__top-bar--<?php echo esc_attr( $theme ); ?>">
      <button class="btn-close js-modal-trigger-close" data-modal="<?php echo esc_attr( $scores_modal_id ); ?>">
      </button>
    </div>
    <div class="modal__content">
      <h1 class="modal__title">
        <?php echo esc_html__( 'Scores', 'quizess' ); ?>
      </h1>
      <div class="modal__scores">
      </div>
    </div>
  </div>
</div>
