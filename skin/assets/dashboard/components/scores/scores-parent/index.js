import {__} from '@wordpress/i18n';

const ScoresParent = (props) => {
  const {
    children,
  } = props;

  return (
    <ul
      className="scores-list__parent"
    >
      <li
        className="scores-list__item scores-list__item--title">
        <div className="scores-list__inner scores-list__title">
          {__('Name', 'quizess')}
        </div>
        <div className="scores-list__inner scores-list__title">
          {__('Attempts', 'quizess')}
        </div>
        <div className="scores-list__inner scores-list__title">
          {__('Correct', 'quizess')}
        </div>
        <div className="scores-list__inner scores-list__title">
          {__('Total', 'quizess')}
        </div>
        <div className="scores-list__inner scores-list__title">
          {__('Success', 'quizess')}
        </div>
        <div className="scores-list__inner scores-list__title">
          {__('Remove', 'quizess')}
        </div>
      </li>
      {children}
    </ul>
  );
};

export default ScoresParent;
