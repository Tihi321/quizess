import React, {PureComponent} from 'react';

// Set Up The Initial Context
const BlockContext = React.createContext();

// Create an exportable consumer that can be injected into components
export const BlockConsumer = BlockContext.Consumer;

class BlockProvider extends PureComponent {

  attributesStore = {
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
    handleOnBackgroundChange: (color) => {
      this.props.dispatchAtributes({
        action: 'backgroundColor',
        payload: color,
      });
    },
    handleOnFontColorChange: (color) => {
      this.props.dispatchAtributes({
        action: 'fontColor',
        payload: color,
      });
    },
    handleRowsChange: (rows) => {
      this.props.dispatchAtributes({
        action: 'rows',
        payload: JSON.stringify(rows),
      });
    },
    handleThemeChange: (theme) => {
      this.props.dispatchAtributes({
        action: 'theme',
        payload: JSON.stringify(theme),
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
          attributesStore: this.attributesStore,
        }}>
        {this.props.children}
      </BlockContext.Provider>
    );
  }
}

export default BlockProvider;


