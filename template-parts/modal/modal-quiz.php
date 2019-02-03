<?php
/**
 * Quiz modal
 *
 * @package Quizess\Template_Parts\Modal
 * @since 1.0.0
 */

?>

<div class="modal js-modal" id="<?php echo esc_attr( $modal_id ); ?>">
  <div class="modal__inner">
    <div class="modal__close-btn-wrap">
      <button class="modal__close-btn js-modal-trigger-close" data-modal="<?php echo esc_attr( $modal_id ); ?>">
      </button>
    </div>
    <div class="modal__content">
      This is modal
    </div>
  </div>
</div>
