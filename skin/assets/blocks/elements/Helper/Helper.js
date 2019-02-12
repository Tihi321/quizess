import {__} from '@wordpress/i18n';
import {dispatch} from '@wordpress/data';
import {Fragment} from '@wordpress/element';
import {parse, stringify} from 'himalaya';
import styles from './styles';

class Helper {

  disablePostSave(lockName) {
    dispatch('core/editor').lockPostSaving(lockName);
  }

  enablePostSave(lockName) {
    dispatch('core/editor').unlockPostSaving(lockName);
  }

  getRequiredMessageElement() {
    return (
      <p style={{...styles.warningParagraphStyle, ...{width: '100%'}}}>
        {__('This field is required', 'quizess')}
      </p>
    );
  }

  getMaxFieldsMessageElement(maxChars, maxRows) {
    return (
      <Fragment>
        <p style={styles.warningParagraphStyle}>
          {__('Limit reached:', 'quizess')}
        </p>
        {maxChars && (
          <p style={styles.warningParagraphStyle}>{`${maxChars} ${__(
            'characters',
            'quizess',
          )}`}</p>
        )}
        {maxRows && (
          <p style={styles.warningParagraphStyle}>{`${maxRows} ${__(
            'rows',
            'quizess',
          )}`}</p>
        )}
      </Fragment>
    );
  }

  setContent(content, type) {
    switch (type) {
      case 'text':
        return content;
      default:
        return stringify(JSON.parse(content));
    }
  }

  getContent(content, type) {
    switch (type) {
      case 'text':
        return content;
      default:
        return JSON.stringify(parse(content));
    }
  }

  isTagSingle(tagName) {
    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
      case 'ul':
        return true;
      default:
        return false;
    }
  }

  isMaxChars(string, splitChar, maxChars) {
    if (!maxChars) {
      return false;
    }
    const noNewLinesString = string.replace(splitChar, ' ');

    return noNewLinesString.length >= maxChars;
  }

  isMaxRows(string, splitChar, maxRows) {
    if (!maxRows) {
      return false;
    }
    if (maxRows === 1) {
      return true;
    }

    const newLinesArray = string.split(splitChar);

    if (newLinesArray[newLinesArray.length - 1] === '') {
      newLinesArray.pop();
    }

    return newLinesArray.length >= maxRows;
  }

  youTubeGetID(url) {
    const urlArray = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (urlArray[2]) {
      const idArray = urlArray[2].split(/[^0-9a-z_-]/i);
      return idArray[0];
    }

    return false;
  }

}

const helpers = new Helper();
Object.freeze(helpers);

export default helpers;

