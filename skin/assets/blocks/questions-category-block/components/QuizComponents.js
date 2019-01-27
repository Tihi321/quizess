import {PureComponent} from 'react';
import MainQuestion from './quiz-components/MainQuestion';
import AnswersParent from './quiz-components/AnswersParent';
import AnswerItem from './quiz-components/AnswerItem';

class QuizComponents extends PureComponent {

  static MainQuestion = MainQuestion;
  static AnswersParent = AnswersParent;
  static AnswerItem = AnswerItem;

}

export default QuizComponents;

