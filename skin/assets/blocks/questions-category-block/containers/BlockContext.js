import React, {PureComponent} from 'react';

// Set Up The Initial Context
const BlockContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const BlockConsumer = BlockContext.Consumer;

class BlockProvider extends PureComponent {

  dispatchAttributesStore = {
    handleCategoryChange: (category) => {
      this.props.dispatchAtributes({
        action: 'category',
        payload: JSON.stringify(category),
      });
    },
    handlePostChange: (posts) => {
      this.props.dispatchAtributes({
        action: 'posts',
        payload: JSON.stringify(posts),
      });
    },
  };

  render() {
    const {
      attributes,
      allPosts,
      categories,
    } = this.props;

    return (

      // value prop is where we define what values
      // that are accessible to consumer components
      <BlockContext.Provider
        value={{
          values: {
            attributes,
            allPosts,
            categories,
          },
          attributesStore: this.dispatchAttributesStore,
        }}>
        {this.props.children}
      </BlockContext.Provider>
    );
  }
}

export default BlockProvider;


