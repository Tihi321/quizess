import BlockElements from './BlockElements';

const App = (props) => {
  const {
    className,
    attributes: {
      portfolio,
    },
    dispatchAtributes,
  } = props;

  const portfolios = JSON.parse(portfolio);

  const dispatchAttributesStore = {
    handleOnSelectMedia: (media, pid) => {
      const newPortfolio = portfolios.map((value, id) => {
        if (pid !== id) {
          return value;
        }
        return {
          ...value,
          image: {
            id: media.id,
            title: media.title,
            url: media.url,
            thumbnail: (media.sizes.thumbnail) ? media.sizes.thumbnail.url : media.url,
          },
        };
      });

      dispatchAtributes({
        action: 'portfolio',
        payload: newPortfolio,
      });
    },
    handlePortfolioLinkChange: (pid) => (e) => {
      const newPortfolio = portfolios.map((value, id) => {
        if (pid !== id) {
          return value;
        }
        return {...value, link: e.target.value};
      });

      dispatchAtributes({
        action: 'portfolio',
        payload: newPortfolio,
      });
    },
    handleRemovePortfolio: (pid) => () => {
      dispatchAtributes({
        action: 'portfolio',
        payload: portfolios.filter((value, id) => pid !== id),
      });
    },
    handleAddPortfolio: () => {
      dispatchAtributes({
        action: 'portfolio',
        payload: portfolios.concat([{
          link: '',
          image: {
            title: '',
            id: 0,
            url: '',
            thumbnail: '',
          },
        }]),
      });
    },
  };

  return (
    <div
      className={className}
    >
      <BlockElements
        portfolios={portfolios}
        attributes={props.attributes}
        dispatchAttributesStore={dispatchAttributesStore}
      />
    </div>
  );
};

export default App;
