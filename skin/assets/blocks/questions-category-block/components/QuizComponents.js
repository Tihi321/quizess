import {PureComponent} from 'react';
import QuestionHeader from './quiz-components/QuestionHeader';
import MainQuestion from './quiz-components/MainQuestion';
import AnswersParent from './quiz-components/AnswersParent';
import AnswerItem from './quiz-components/AnswerItem';
import ExplanationText from './quiz-components/ExplanationText';
import ExplanationPreview from './quiz-components/ExplanationPreview';

class QuizComponents extends PureComponent {

  static QuestionHeader = QuestionHeader;
  static MainQuestion = MainQuestion;
  static AnswersParent = AnswersParent;
  static AnswerItem = AnswerItem;
  static ExplanationText = ExplanationText;
  static ExplanationPreview = ExplanationPreview;

}

export default QuizComponents;

