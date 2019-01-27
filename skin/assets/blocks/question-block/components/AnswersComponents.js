import {PureComponent} from 'react';
import AnswersParent from './answer-components/AnswersParent';
import AnswerItem from './answer-components/AnswerItem';

class AnswersComponents extends PureComponent {

  static AnswersParent = AnswersParent;
  static AnswerItem = AnswerItem;

}

export default AnswersComponents;

