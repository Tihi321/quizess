<?php
/**
 * Custom header
 *
 * @package Quizess\Views\Parts
 * @since 1.0.0
 */

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="profile" href="https://gmpg.org/xfn/11" />
  <?php wp_head(); ?>
</head>

<body <?php body_class( 'quizess quizess-archive default-typography' ); ?>>
<div class="quizess__archive">
