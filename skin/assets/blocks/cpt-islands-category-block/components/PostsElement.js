import {Fragment} from '@wordpress/element';
import classnames from 'classnames';
import {__} from '@wordpress/i18n';
import {select} from '@wordpress/data';
import MediaElement from '../../elements/MediaElement';
import PlaceholderElement from '../../elements/PlaceholderElement';

const PostsElement = (props) => {
  const {
    islands,
    state: {
      imageIndex,
      clientId,
    },
    dispatchAttributesStore: {
      handleMediaChange,
    },
    dispatchStateStore: {
      handlePostFocus,
    },
  } = props;

  const showSelected = select('core/editor').isBlockSelected(clientId);

  const islandsElement = (islands) ? Object.keys(islands).map((key, index) => {
    return (
      <li className="cpt-island-item" key={index + 1}>
        <div
          className={classnames('cpt-island-item-wrap', {
            'cpt-island-focus': (imageIndex === index + 1 && showSelected),
          })}
          tabIndex={index + 1}
          role="button"
          onFocus={() => {
            handlePostFocus(index + 1, islands[key].postTitle);
          }}
        >
          <div className="cpt-island-item-number">{index + 1}.</div>
          <div
            className="cpt-island-item-icon">
            <MediaElement
              showToolbar={(imageIndex === index + 1) || false}
              className="cpt-island-icon"
              placeholderTitle={__('Island Icon', 'design-islands')}
              mediaTitle={islands[key].mediaTitle}
              mediaId={islands[key].mediaId}
              mediaUrl={islands[key].mediaUrl}
              onSelectMedia={(media) => handleMediaChange(media, islands, key)}
            />
          </div>
        </div>
      </li>
    );
  }) : '';

  return (
    <Fragment>
      {
        (!islands) ?
          <PlaceholderElement
            spinner={false}
            title={__('Sorry, no posts for you', 'design-islands')}
          /> :
          <Fragment>
            <ul
              className="cpt-island-items"
            >
              {islandsElement}
            </ul>
            <div className="coordinates-element-wrap">
              <h1 className="coordinates-title">
                {__('Coordinates', 'design-islands')}
              </h1>
            </div>
          </Fragment>
      }
    </Fragment>
  );
};

export default PostsElement;
