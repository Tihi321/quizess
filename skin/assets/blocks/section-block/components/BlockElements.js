import {Fragment} from '@wordpress/element';
import {InnerBlocks} from '@wordpress/editor';

function BlockElements(props) {
  const {
    attributes: {
      allowedBlocks,
      disableBlocks,
      template,
      templateLock,
    },
  } = props;

  return (
    <Fragment>
      <InnerBlocks
        allowedBlocks={(disableBlocks) ? [] : allowedBlocks}
        template={template}
        templateLock={templateLock}
      />
    </Fragment>
  );
}

export default BlockElements;
