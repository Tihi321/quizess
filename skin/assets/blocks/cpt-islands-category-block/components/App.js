import BlockOptions from './BlockOptions';
import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    posts,
    categories,
    state: {
      postTitle,
    },
    state,
  } = props;

  const dispatchAttributesStore = {
    handleCategoryChange: (category) => {
      props.dispatchAtributes({
        action: 'category',
        payload: JSON.stringify(category),
      });
    },
    handleMediaChange: (media, islands, id) => {
      const newIsland = islands;
      newIsland[id].mediaUrl = media.url;
      newIsland[id].mediaTitle = media.title;
      newIsland[id].mediaId = media.id;
      props.dispatchAtributes({
        action: 'islands',
        payload: JSON.stringify(newIsland),
      });
    },
    handleCoordinatesChange: (coord, islands, id) => {
      const newIsland = islands;
      newIsland[id].x = coord.x;
      newIsland[id].y = coord.y;
      props.dispatchAtributes({
        action: 'islands',
        payload: JSON.stringify(newIsland),
      });
    },
    handleSizeChange: (size, islands, id) => {
      const newIsland = islands;
      newIsland[id].width = size.width;
      newIsland[id].height = size.height;
      props.dispatchAtributes({
        action: 'islands',
        payload: JSON.stringify(newIsland),
      });
    },
  };

  const dispatchStateStore = {
    handlePostFocus: (index, title) => {
      props.dispatchState({
        action: 'post',
        payload: {
          index,
          title,
        },
      });
    },
  };

  return (
    <div className={className}>
      <BlockOptions
        postTitle={postTitle}
        categories={categories}
        posts={posts}
        attributes={props.attributes}
        dispatchAttributesStore={dispatchAttributesStore}
      />
      <BlockElements
        state={state}
        attributes={props.attributes}
        dispatchAttributesStore={dispatchAttributesStore}
        dispatchStateStore={dispatchStateStore}
      />
    </div>
  );
};

export default App;
