import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import CategoryElement from './CategoryElement';
import PlaceholderElement from '../../elements/PlaceholderElement';

const BlockElements = (props) => {
  const {
    attributes: {
      category,
      islands,
    },
    dispatchAttributesStore,
    dispatchStateStore,
    state,
  } = props;

  const categoryId = (category) ? JSON.parse(category).value : 0;

  return (
    <Fragment>
      {
        (categoryId === 0) ?
          <PlaceholderElement
            spinner={false}
            title={__('Please select Islands category', 'design-islands')}
          /> :
          <CategoryElement
            dispatchAttributesStore={dispatchAttributesStore}
            dispatchStateStore={dispatchStateStore}
            categoryId={categoryId}
            islands={islands}
            state={state}
          />
      }
    </Fragment>
  );
};

export default BlockElements;
