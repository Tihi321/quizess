<?php
/**
 * Register all actions and filters for the plugin
 *
 * @since   1.0.0
 * @package Quizess\Helpers
 */

namespace Quizess\Helpers;

/**
 * Register all actions and filters for the plugin.
 *
 * Maintain a list of all hooks that are registered throughout
 * the plugin, and register them with the WordPress API. Call the
 * run function to execute the list of actions and filters.
 */
trait Loader {

  /**
   * Add a new action to the collection to be registered with WordPress.
   *
   * @since    1.0.0
   * @param    string $hook             The name of the WordPress action that is being registered.
   * @param    object $component        A reference to the instance of the object on which the action is defined.
   * @param    string $callback         The name of the function definition on the $component.
   * @param    int    $priority         Optional. The priority at which the function should be fired. Default is 10.
   * @param    int    $accepted_args    Optional. The number of arguments that should be passed to the $callback. Default is 1.
   */
  public function add_action( $hook, $component, $callback, $priority = 10, $accepted_args = 1 ) {
    add_action( $hook, [ $component, $callback ], $priority, $accepted_args );
  }

  /**
   * Remove action from the registered collection of hooks.
   *
   * @since    1.0.0
   * @param    string $hook                The name of the WordPress action that is being registered.
   * @param    string $function_to_remove  The name of the function definition on the $component.
   * @param    int    $priority            Optional. The priority at which the function should be fired. Default is 10.
   */
  public function remove_action( $hook, $function_to_remove, $priority = 10 ) {
    remove_action( $hook, $function_to_remove, $priority );
  }

  /**
   * Add a new filter to the collection to be registered with WordPress.
   *
   * @since    1.0.0
   * @param    string $hook             The name of the WordPress filter that is being registered.
   * @param    object $component        A reference to the instance of the object on which the filter is defined.
   * @param    string $callback         The name of the function definition on the $component.
   * @param    int    $priority         Optional. The priority at which the function should be fired. Default is 10.
   * @param    int    $accepted_args    Optional. The number of arguments that should be passed to the $callback. Default is 1.
   */
  public function add_filter( $hook, $component, $callback, $priority = 10, $accepted_args = 1 ) {
    add_filter( $hook, [ $component, $callback ], $priority, $accepted_args );
  }

  /**
   * Remove filter from the registered collection of hooks.
   *
   * @since    1.0.0
   * @param    string $hook                 The name of the WordPress filter that is being registered.
   * @param    string $function_to_remove   The name of the function definition on the $component.
   * @param    int    $priority             Optional. The priority at which the function should be fired. Default is 10.
   */
  public function remove_filter( $hook, $function_to_remove, $priority = 10 ) {
    remove_filter( $hook, $function_to_remove, $priority );
  }

  /**
   * Register the filters and actions with WordPress.
   *
   * @since 1.0.0
   */
  public function run() {
    foreach ( $this->filters as $hook ) {
      add_filter( $hook['hook'], array( $hook['component'], $hook['callback'] ), $hook['priority'], $hook['accepted_args'] );
    }

    foreach ( $this->actions as $hook ) {
      add_action( $hook['hook'], array( $hook['component'], $hook['callback'] ), $hook['priority'], $hook['accepted_args'] );
    }
  }
}
