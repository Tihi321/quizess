import {Fragment} from '@wordpress/element';
import {stringify} from 'himalaya';
import parser from 'html-react-parser';
import helpers from '../../helper/Helper';

function BlockElements(props) {
  const {
    attributes: {
      title,
      showTitle,
      linkText,
      link,
      customDomain,
      useCustomDomain,
    },
  } = props;

  const linkTextElement = (linkText !== '') ? parser(stringify(JSON.parse(linkText))) : '';
  const linkAddress = (link !== '') ? JSON.parse(link)[0].content : '';
  const linkDomain = (!useCustomDomain) ? helpers.extractRootDomain(linkAddress) : customDomain;

  return (
    <Fragment>
      {(showTitle) &&
        <div className="title-component">{title}</div>
      }{
        (linkTextElement) && (
          <div className="link-component">
            <a className="link" href={linkAddress} >
              {linkTextElement}
            </a>
            <div className="domain">{linkDomain}</div>
          </div>
        )
      }

    </Fragment>
  );
}

export default BlockElements;
