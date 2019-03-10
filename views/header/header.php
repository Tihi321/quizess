<?php
/**
 * Custom header
 *
 * @package Quizess\Template_Parts\Parts
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

<body <?php body_class(); ?>>
<div id="post" class="quizess-post">
  <header class="quizess-header">
  This is custom header menu
  </header>
  <div id="content" class="site-content">