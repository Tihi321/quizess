import {Fragment} from 'react';
import {__} from '@wordpress/i18n';

const ToggleSwitch = (props) => {
  const {
    idName = 'toggle-switch',
    label = __('Use toggle', 'quizess'),
    labelClass = '',
    helperMessage = '',
    checked,
    onChange,
  } = props;


  const toggleElement = (
    <Fragment>
      <label
        htmlFor={`${idName}-id`}
        className={`toggle-switch__label ${labelClass}`}
      >
        {label}
        {(helperMessage) && <span className="toggle-switch__label-helper">
          {helperMessage}
        </span>}
      </label>
      <label
        className="toggle-switch"
      >
        <input
          className="toggle-switch__input"
          id={`${idName}-id`}
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
        />
        <span className="toggle-switch__slider"></span>
      </label>
    </Fragment>
  );



  return toggleElement;
};

export default ToggleSwitch;
