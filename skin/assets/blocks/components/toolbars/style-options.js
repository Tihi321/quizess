import {__} from '@wordpress/i18n';
import Select from 'react-select';

const StyleOptions = (props) => {
  const {
    rows,
    theme,
    handleRowsChange,
    handleThemeChange,
  } = props;

  const columnsSelectElement = (
    <Select
      className="columns-select"
      closeMenuOnSelect={true}
      value={(rows) ? JSON.parse(rows) : {value: 'row', label: 'Row'}}
      onChange={handleRowsChange}
      options={[
        {value: 'row', label: 'Row'},
        {value: 'columns', label: 'Columns'},
      ]}
      placeholder={__('Select', 'quizess')}
    />
  );

  const themeSelectElement = (
    <Select
      className="columns-select"
      closeMenuOnSelect={true}
      value={(theme) ? JSON.parse(theme) : {value: 'light', label: 'Light'}}
      onChange={handleThemeChange}
      options={[
        {value: 'light', label: 'Light'},
        {value: 'dark', label: 'Dark'},
      ]}
      placeholder={__('Select', 'quizess')}
    />
  );

  return (
    <div className="qz-panel-group qz-panel-group--big">
      <div className="qz-option-title-class">
        {__('Style Options', 'quizess')}
      </div>
      <div className="qz-panel-group">
        <div className="qz-label-mce-class">
          {__('Type', 'quizess')}
        </div>
        {columnsSelectElement}
        <div className="qz-help-mce-class">
          {__('Choose weather place answers in row or 2 columns.', 'quizess')}
        </div>
      </div>
      <div className="qz-panel-group">
        <div className="qz-label-mce-class">
          {__('Theme', 'quizess')}
        </div>
        {themeSelectElement}
        <div className="qz-help-mce-class">
          {__('Theme color for answers', 'quizess')}
        </div>
      </div>
    </div>
  );
};

export default StyleOptions;
