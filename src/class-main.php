<?php
/**
 * File containing the main theme class
 *
 * @since 1.0.0
 * @package Quizess\Core
 */

namespace Quizess\Core;

use Eightshift_Libs\Core\Main as LibMain;

use Quizess\Utils;
use Quizess\Assets;
use Quizess\Admin;
use Quizess\Blocks;
use Quizess\Front;
use Quizess\Languages;
use Quizess\Routes;
use Quizess\Routes\Route;
use Quizess\Routes\Field;

/**
 * The main start class.
 *
 * All classes are instantiated here that represent different functionality for plugin.
 */
class Main extends LibMain {
  /**
   * Get the list of services to register.
   *
   * A list of classes which contain hooks.
   *
   * @return array<string> Array of fully qualified class names.
   *
   * @since 1.0.0
   */
  protected function get_service_classes() : array {
    return [

      // Utils.
      Utils\Compatibility::class,
      Utils\Error_Logger::class,
      Utils\Url_Utils::class,
      Utils\Math_Utils::class,
      Utils\Validation::class,
      Utils\Sanitization_Utils::class,

      // Assets.
      Assets\Manifest::class,

      // Admin.
      Admin\Admin::class => [ Assets\Manifest::class ],
      Admin\Menu::class,
      Admin\Menu_Page::class,
      Admin\Media::class,
      Admin\Quiz::class,
      Admin\Questions::class,
      Admin\Users::class,

      // Blocks.
      Blocks\Blocks_Utils::class,
      Blocks\Blocks::class,

      // Front.
      Front\Front::class => [ Assets\Manifest::class ],

      // Languages.
      Languages\Internationalization::class,

      // Routes Security.
      Routes\Routes_Security::class,

      // Routes.
      Route\Get_Dashboard_Options::class,
      Route\Get_Menus::class,
      Route\Get_Quizess::class => [ Blocks\Blocks_Utils::class ],
      Route\Patch_General_Options::class => [ Routes\Routes_Security::class ],
      Route\Patch_Scores::class => [ Routes\Routes_Security::class ],
      Route\Post_Scores::class => [ Routes\Routes_Security::class ],

      // Fields.
      Field\Post_Fields::class => [ Blocks\Blocks_Utils::class ],
    ];
  }
}
