<?php
/**
 * If using pagination in custom query
 *
 * @package Quizess\Views\Parts
 */

$max_page = $pagination_query->max_num_pages;

if ( $max_page > 1 ) {

    $big = 999999999; // need an unlikely integer.

    echo '<nav class="navigation pagination" role="navigation">';
    echo '<div class="nav-links">';
      echo wp_kses_post(
        paginate_links(
          array(
            'base'       => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
            'format'     => '?paged=%#%',
            'current'    => max( 1, $paged ),
            'total'      => $max_page,
            'mid_size'   => 1,
            'prev_text'  => __( 'Previous', 'quizess' ),
            'next_text'  => __( 'Next', 'quizess' ),
            'type'       => 'plain',
          )
        )
      );
    echo '</div>';
    echo '</nav>';
}
