import {Fragment} from '@wordpress/element';
import {stringify} from 'himalaya';
import parser from 'html-react-parser';
import helpers from '../../helper/Helper';
import TextElement from '../../elements/TextElement';
import FileElement from '../../elements/FileElement';
import icons from '../icons';

function BlockElements(props) {
  const {
    attributes: {
      linkText,
      link,
      customDomain,
      useCustomDomain,
      description,
      resource,
      customFileType,
      useCustomFileType,
      fileUrl,
      fileId,
      fileTitle,
    },
    dispatchAttributesStore: {
      handleDescriptionOnChange,
      handleOnFileChange,
    },
  } = props;

  const linkTextElement = (linkText !== '') ? parser(stringify(JSON.parse(linkText))) : '';
  const linkAddress = (link !== '') ? JSON.parse(link)[0].content : '';
  const linkDomain = (!useCustomDomain) ? helpers.extractRootDomain(linkAddress) : customDomain;

  const fileExtensionType = (!useCustomFileType) ? helpers.extractExtensionName(fileUrl) : customFileType;

  /* eslint-disable */
  const descriptionElement = (
    <TextElement
      className="description-component-element"
      value={description}
      onChange={(description) => handleDescriptionOnChange(description)}
      maxChars={300}
      maxRows={1}
      warning={true}
      single={true}
      init={{
        selection_toolbar: 'bold italic underline uppercase | forecolor | removeformat',
        insert_toolbar: false,
      }}
    />
  );
  /* eslint-enable */

  const fileRender = (
    <Fragment>
      <div className="resource-element file-element">
        <div className="icon">
          {icons.file}
        </div>
        <div className="resource-wrap">
          <a className="resource" href={fileUrl} >
            {fileTitle}
          </a>
          <div className="resource-type">{fileExtensionType}</div>
        </div>
      </div>
    </Fragment>
  );

  const fileElement = (
    <FileElement
      fileId={fileId}
      onSelectFile={handleOnFileChange}
      render={fileRender}
    />
  );

  return (
    <Fragment>
      <div className="description-component">
        {descriptionElement}
      </div>
      <div className="resource-component">
        {
          (resource === 'link-type') && (
            (linkTextElement) && (
              <div className="resource-element link-element">
                <div className="icon">
                  {icons.link}
                </div>
                <div className="resource-wrap">
                  <a className="resource" href={linkAddress} >
                    {linkTextElement}
                  </a>
                  <div className="resource-type">{linkDomain}</div>
                </div>
              </div>
            )
          )
        }
        {
          (resource === 'file-type') && fileElement
        }
      </div>
    </Fragment>
  );
}

export default BlockElements;
