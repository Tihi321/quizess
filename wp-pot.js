const wpPot = require('wp-pot');

wpPot({
  destFile: 'languages/quizess_php.pot',
  domain: 'quizess',
  package: 'Quizess',
  src: ['src/**/*.php', 'views/**/*.php'],
});
