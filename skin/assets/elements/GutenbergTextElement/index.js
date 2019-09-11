import {Component} from 'react';
import {select} from '@wordpress/data';
import {Editor} from '@tinymce/tinymce-react';
import classnames from 'classnames';
import helpers from './../Helper/Helper';
import resetGlobalTinyMCE from './reset-global';
import styles from './styles';

class GutenbergTextElement extends Component {
  constructor(props) {
    super(props);

    const {
      value = '',
      theme = 'inlite',
      inline = true,
      className = '',
      tagName = 'p',
      single = false,
      maxChars = false,
      maxRows = false,
      warning = true,
      required = false,
      warningClass = 'warning-label',
      onSetup = false,
      init = {},
    } = props;

    // temporary fix for global tinyMce version clash
    resetGlobalTinyMCE();

    this.theme = theme;
    this.inline = inline;
    this.wrapperClass = className;
    this.tagName = single ? false : tagName;
    this.maxChars = maxChars;
    this.maxRows = maxRows;
    this.warning = warning;
    this.warningClass = warningClass;
    this.required = required;
    this.onSetup = onSetup;

    this.onInit = init;

    this.blockId = select('core/editor').getSelectedBlockClientId();

    const postDisable = (this.required && value.length <= 2);

    if (postDisable) {
      helpers.disablePostSave(this.blockId);
    }

    this.state = {
      activeBlockClass: 'inactive',
      showWarning: false,
      showRequired: postDisable,
    };

    this.splitChar = single || helpers.isTagSingle(tagName) ? '\n' : '\n\n';

    this.getInit = this.getInit.bind(this);
    this.setWarningLabel = this.setWarningLabel.bind(this);

    this.onEditorChange = this.onEditorChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onEditorChange(content) {
    const requiredEnable = (content.length < 1);
    this.setState({
      showRequired: requiredEnable,
    });
    if (this.required && requiredEnable) {
      helpers.disablePostSave(this.blockId);
    } else {
      helpers.enablePostSave(this.blockId);
    }
    const output = helpers.getContent(content, this.props.outputType);
    this.props.onChange(output);
  }

  setWarningLabel() {
    if (!this.state.showWarning) {
      this.setState({
        showWarning: true,
      });
      setTimeout(() => {
        this.setState({
          showWarning: false,
        });
      }, 2500);
    }
  }

  onFocus(e) {
    this.setState({
      activeBlockClass: 'active',
    });
  }

  onBlur(e) {
    this.setState({
      activeBlockClass: 'inactive',
    });
  }
  /* eslint-disable */
  getInit() {
    const initObject = {
      theme: this.theme,
      inline: this.inline,
      forced_root_block: this.tagName,
      plugins:
        'charmap colorpicker hr link media paste tabfocus image textcolor lists',
      insert_toolbar: 'undo redo | pastetext charmap | image hr',
      selection_toolbar:
        'bold italic underline | removeformat | forecolor | alignleft aligncenter alignright | bullist numlist | link unlink',
      image_advtab: true,
      paste_as_text: true,
      onSetup: this.onSetup,
      maxRows: this.maxRows,
      maxChars: this.maxChars,
      splitChar: this.splitChar,
      isMaxRows: helpers.isMaxRows,
      isMaxChars: helpers.isMaxChars,
      setWarningLabel: this.setWarningLabel,
      formats: {
        bold: {inline: 'span', styles: {fontWeight: 'bold'}},
        italic: {inline: 'span', styles: {fontStyle: 'italic'}},
        underline: {inline: 'span', styles: {textDecoration: 'underline'}},
        uppercase : {inline : 'span', 'classes' : 'uppercase', 'styles' : {'text-transform' : 'uppercase'}, exact : true},
      },
      setup: function(editor) {
        const {
          splitChar,
          maxChars,
          maxRows,
          isMaxRows,
          isMaxChars,
          setWarningLabel,
          onSetup,
        } = this;

        // Checks if Enter key is pressed & if it is in the last row, if all is true, stops enter key
        editor.on('keydown', function(e) {
          if (
            e.keyCode === 13 &&
            isMaxRows(editor.getBody().innerText, splitChar, maxRows)
          ) {
            e.preventDefault();
            setWarningLabel();
          }
        });

        // On every keypress checks if the max number of characters is pressed & stops any more characters
        editor.on('keypress', function(e) {
          if (isMaxChars(editor.getBody().innerText, splitChar, maxChars)) {
            e.preventDefault();
            setWarningLabel();
          }
          if (
            e.keyCode === 13 &&
            isMaxRows(editor.getBody().innerText, splitChar, maxRows)
          ) {
            e.preventDefault();
            setWarningLabel();
          }
        });

        editor.addButton('uppercase', {
          icon: 'change-case',
          tooltip: "Uppercase",
          onclick: function() {
            editor.execCommand('mceToggleFormat', false, 'uppercase');
          },
        });

        if(onSetup) {
          onSetup(editor);
        }
      },
    };

    // concatinate aditional init options.
    return Object.assign(initObject, this.onInit);
  }
  /* eslint-enable */

  render() {
    const wrapperClasses = classnames(
      (!this.props.styleReset) ? 'text-component-element' : false,
      this.wrapperClass,
      this.state.activeBlockClass,
    );
    const init = this.getInit();
    const content = this.props.value ? helpers.setContent(this.props.value, this.props.outputType) : '';
    return (
      <div style={styles.wrapperStyle} className={wrapperClasses}>
        <Editor
          value={content}
          onEditorChange={this.onEditorChange}
          onKeyPress={this.onKeyPress}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          init={init}
        />
        {this.warning && (
          <div style={styles.warningStyle} className={this.warningClass}>
            {[
              (this.required && this.state.showRequired) ? helpers.getRequiredMessageElement() : '',
              (this.state.showWarning) ? helpers.getMaxFieldsMessageElement(this.maxChars, this.maxRows) : '',
            ]}
          </div>
        )}
      </div>
    );
  }
}

export default GutenbergTextElement;
