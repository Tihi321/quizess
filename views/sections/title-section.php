<?php
/**
 * Title content
 *
 * @package Quizess\Template_Parts\Sections
 * @since 1.0.0
 */

?>

<div class="quiz__welcome--outer">
  <h1 class="quiz__welcome--message">
    <?php
    if ( ! empty( $welcome_message ) ) {
      ?>
      <?php echo esc_html( $welcome_message ); ?>
      <?php } else { ?>
      <?php echo esc_html__( 'Welcome to our quiz', 'quizess' ); ?>
    <?php } ?>
  </h1>
</div>
