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
    <?php if ( ! empty( $player_scores ) ) { ?>
      <div class="modal__scores scores">
        <ul class="scores__parent">
          <li class="scores__item scores__item--title">
            <?php
            $score_titles_template = $base_path . 'template-parts/modal/parts/score-titles.php';

            if ( ! empty( $score_titles_template ) ) {
              include $score_titles_template;
            }
            ?>
          </li>
          <li class="scores__item">
            <?php
            foreach ( $player_scores as $index => $player ) {

              $score_item_template = $base_path . 'template-parts/modal/parts/score-item.php';

              if ( ! empty( $score_item_template ) ) {
                include $score_item_template;
              }
            }
            ?>
          </li>
        </ul>
      </div>
    <?php } ?>
    </div>
  </div>
</div>
