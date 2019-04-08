=== Quizess ===
Contributors: Tihi321
Tags: quizess, quiz, questions
Donate link: PayPal.Me/tihi321
Requires at least: 5.0
Tested up to: 5.1.1
Requires PHP: 7.0
Stable tag: 1.0.2
License: GPL-2.0
License URI: http://www.gnu.org/licenses/gpl-2.0.txt

Gutenberg plugin; provides a simple way of creating online quizes. Fully customisable.

== Description ==

The Quizess plugin is designed to work with the [Gutenberg editor](https://wordpress.org/plugins/gutenberg/ "Gutenberg Plugin"). It includes options to create and customize quizess, track player scores, add questions by topic and many more. This plugin is an excellent solution for creating quiz games.

= Key Features =

+ **Custom syle.** Use own theme header & footer, or use Quizess styling with custom logo, menu & social links. With option to remove login WordPress admin bar on Frontend.
+ **Track scores.** Option to track scores on per quiz basis. If registered player exits the the quiz before end, the scores will be sent, with all unanswered question as negative. Check records for quizes in admin dashboard.
+ **Lock quiz.** Option to show quiz only to registered players.
+ **Single submit.** Players can play quiz once. It allows admin to check player scores, as player will be locked out of the quiz until approved again, by disabling options or by removing last attempt scores from players records.
+ **Single quiz options.**  customize quiz messages text, add about text, add timer for questions, choose quiz background color, image and theme.
+ **Question topics.** Groups question by topic, eg. History, Astronomy, and import them as a group to quiz.
+ **Single question options.**  Add question text, answers and optional explanation text and media - image, video, youtube, lottie.

**Contribute:**

This plugin is open source software, and you may actively contribute on [Github](https://github.com/Tihi321/quizess "Quizess").


== Installation ==

1. Upload the plugin files to the `/wp-content/quizess\' directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the \'Plugins\' screen in WordPress
3. Use the Quizess->Dashboard screen to configure the plugin
4. To keep track of players, under users->user-profile activate option registered player

== Frequently Asked Questions ==

Q: What are the Wordpress requirements ?
A: Wordpress version 5.0 or above is required or Gutenberg plugin must be installed and active.
Q: What are the Server requirements ?
A: Minimum PHP 7 required..
Q: How to register player, so we can keep track player records ?
A: Under User->user-profile check options registered player.
Q: How to allow player to play quiz only once ?
A: Under User->user-profile check options single submit .
Q: How to allow player one more try if single submit checked and user allraedy played ?
A: You need to reset last record from player, under Quizess->dashboard->quizes choose quiz you wish to track, than player->view detail than under last attempt choose remove, now the quiz is unlocked for the player and player can have one more try.

== Screenshots ==

1. Frontend start screen with custom style
2. Frontend question screen with 4 answers, timer and explanation
3. Frontend youtube explanation to a answered question.
4. Admin dashboard options
5. Quiz backend options
6. Question category blocks
7. Question templates

== Changelog ==

1.0.2
* Submit if user refreshes in middle of quiz.
* Bugfix for not logged in users.

1.0.1
* Option to lock quiz if user submitted.
* Improved documentation.

= 1.0.0 =
* First release.

== Upgrade Notice ==

== Translations ==

* English - default

*Note:* Currently, the plugin is available only in English. But, the plugin is localized and you can translate it to your language easy.
