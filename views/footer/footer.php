<?php
/**
 * Custom footer
 *
 * @package Quizess\Template_Parts\Parts
 * @since 1.0.0
 */

 use Quizess\Core\Config;

 $logo      = get_option( Config::CUSTOM_LOGO, null );
 $copyright = get_option( Config::COPYRIGHT_TEXT, null );
 $facebook  = get_option( Config::FACEBOOK_URL, null );
 $twitter   = get_option( Config::TWITTER_URL, null );
 $linked_in = get_option( Config::LINKEDIN_URL, null );
 $instagram = get_option( Config::INSTAGRAM_URL, null );
 $github    = get_option( Config::SHOW_GITHUB_TOGGLE, null );

 $logo_decoded = ( ! empty( $logo ) ) ? json_decode( $logo, true ) : null;

?>

  </div><!-- #content -->

  <footer class="quizess-footer quizess-footer--<?php echo esc_attr( $theme ); ?>">
    <div class="quizess-footer__brand">
      <?php if ( ! empty( $logo_decoded ) ) { ?>
      <div class="quizess-footer__logo">
        <img src="<?php echo esc_url( $logo_decoded['url'] ); ?>" />
      </div>
      <?php } ?>
      <?php if ( ! empty( $copyright ) ) { ?>
      <div class="quizess-footer__copyright">
        <?php echo esc_html( $copyright ); ?>
      </div>
    </div>
    <?php } ?>
    <ul class="quizess-footer__social">
    <?php if ( ! empty( $facebook ) ) { ?>
    <li class="quizess-footer__social-item">
      <a href="<?php echo esc_url( $facebook ); ?>" aria-label="<?php esc_html_e( 'Facebook', 'quizess' ); ?>">
        <i class="icon icon--qz-facebook"></i>
      </a>
    </li>
    <?php } ?>
    <?php if ( ! empty( $twitter ) ) { ?>
    <li class="quizess-footer__social-item">
      <a href="<?php echo esc_url( $twitter ); ?>" aria-label="<?php esc_html_e( 'Twitter', 'quizess' ); ?>">
        <i class="icon icon--qz-twitter"></i>
      </a>
    </li>
    <?php } ?>
    <?php if ( ! empty( $linked_in ) ) { ?>
    <li class="quizess-footer__social-item">
       <a href="<?php echo esc_url( $linked_in ); ?>" aria-label="<?php esc_html_e( 'LinkedIn', 'quizess' ); ?>">
       <i class="icon icon--qz-linkedin"></i>
      </a>
    </li>
    <?php } ?>
    <?php if ( ! empty( $instagram ) ) { ?>
    <li class="quizess-footer__social-item">
      <a href="<?php echo esc_url( $instagram ); ?>" aria-label="<?php esc_html_e( 'Instagram', 'quizess' ); ?>">
        <i class="icon icon--qz-instagram"></i>
      </a>
    </li>
    <?php } ?>
    <?php if ( ! empty( $github ) ) { ?>
    <li class="quizess-footer__social-item">
      <a href="<?php echo esc_url( Config::GITHUB_URL ); ?>" aria-label="<?php esc_html_e( 'Github', 'quizess' ); ?>">
        <i class="icon icon--qz-github"></i>
      </a>
    </li>
    <?php } ?>
    </ul>
  </footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
