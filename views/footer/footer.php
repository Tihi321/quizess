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

  <footer class="quizess-footer">
    <?php if ( ! empty( $logo_decoded ) ) { ?>
    <div class="quizess-footer__brand">
      <img src="<?php echo esc_url( $logo_decoded['url'] ); ?>" />
    </div>
    <?php } ?>
    <?php if ( ! empty( $copyright ) ) { ?>
    <div class="quizess-footer__copyright">
      <?php echo esc_html( $copyright ); ?>
    </div>
    <?php } ?>
    <ul class="quizess-footer__social">
    <?php if ( ! empty( $facebook ) ) { ?>
    <li class="quizess-footer__facebook">
      <a href="<?php echo esc_url( $facebook ); ?>">
        <i class="icon--qz-facebook"></i>
      <?php esc_html_e( 'Facebook', 'quizess' ); ?>
      </a>
    </li>
    <?php } ?>
    <?php if ( ! empty( $twitter ) ) { ?>
    <li class="quizess-footer__twitter">
      <a href="<?php echo esc_url( $twitter ); ?>">
        <i class="icon--qz-twitter"></i>
        <?php esc_html_e( 'Twitter', 'quizess' ); ?>
      </a>
    </li>
    <?php } ?>
    <?php if ( ! empty( $linked_in ) ) { ?>
    <li class="quizess-footer__linkedin">
       <a href="<?php echo esc_url( $linked_in ); ?>">
       <i class="icon--qz-linkedin"></i>
        <?php esc_html_e( 'LinkedIn', 'quizess' ); ?>
      </a>
    </li>
    <?php } ?>
    <?php if ( ! empty( $instagram ) ) { ?>
    <li class="quizess-footer__instagram">
      <a href="<?php echo esc_url( $instagram ); ?>">
        <i class="icon--qz-instagram"></i>
        <?php esc_html_e( 'Instagram', 'quizess' ); ?>
      </a>
    </li>
    <?php } ?>
    <?php if ( ! empty( $github ) ) { ?>
    <li class="quizess-footer__github">
      <a href="<?php echo esc_url( Config::GITHUB_URL ); ?>">
        <i class="icon--qz-github"></i>
        <?php esc_html_e( 'Github', 'quizess' ); ?>
      </a>
    </li>
    <?php } ?>
    </ul>
  </footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
