import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import MediaElement from '../../../elements/MediaElement';

function BlockElements(props) {
  const {
    dispatchAttributesStore: {
      handlePortfolioLinkChange,
      handleRemovePortfolio,
      handleAddPortfolio,
      handleOnSelectMedia,
    },
    portfolios,
  } = props;

  return (
    <Fragment>
      <div className="portfolio-items">
        <div className="portfolio-label">
          <h4 className="portfolio-label--title">{__('Portfolio', 'quizess')}</h4>
          <p className="portfolio-label--description">{__('Add portfolio entries for current author. Every entry will display as one slide in authors gallery', 'quizess')}</p>
        </div>
        <ul className="portfolio-items-list">
          {portfolios.map((portfolio, id) => {
            return (
              <li key={id} className="portfolio-item">
                <div className="portfolio-item--wrap">
                  <div className="portfolio-item--image">
                    <MediaElement
                      className="portfolio-item--figure"
                      placeholderTitle={__('Portfolio Item Image', 'quizess')}
                      mediaTitle={portfolio.image.title}
                      mediaId={portfolio.image.id}
                      mediaUrl={portfolio.image.thumbnail}
                      onSelectMedia={(media) => handleOnSelectMedia(media, id)}
                    />
                  </div>
                  <input
                    className="portfolio-item--link"
                    type="url"
                    placeholder={`External link to project #${id + 1}`}
                    value={portfolio.link}
                    onChange={handlePortfolioLinkChange(id)}
                  />
                </div>
                <button type="button" onClick={handleRemovePortfolio(id)} className="remove-button button button-secondary">-</button>
              </li>
            );
          })}
        </ul>
        <div className="add-buttopn-wrap">
          <button type="button" onClick={handleAddPortfolio} className="add-button button button-primary">{__('Add item', 'quizess')}</button>
        </div>
      </div>
    </Fragment>
  );
}

export default BlockElements;
