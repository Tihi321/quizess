import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import icons from './../icons';

function BlockElements(props) {
  const {
    attributes: {
      authors,
    },
  } = props;

  const authorsArray = (authors) ? JSON.parse(authors) : [];
  const authorsLength = authorsArray.length;
  const authorNamesElement = authorsArray.map((author, index) => {
    return (
      <li className="authors-name" key={author.value}>
        <a className="author-link" href={author.url} >
          {author.label}
          {(index !== authorsLength - 1) && ','}
        </a>
      </li>
    );
  });

  return (
    <Fragment>
      {(authorsLength === 1) ? (
        <Fragment>
          <div className="profile-image">
            <img className="authors-image" src={authorsArray[0].imageUrl} alt={authorsArray[0].alt} />
          </div>
          <div className="profile-title">
            {__('Designer', 'quizess')}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="profile-image">
            {icons.authors}
          </div>
          {(authorsLength === 0) ? (
            <div className="profile-title">
              {__('Pick a designer', 'quizess')}
            </div>
          ) : (
            <div className="profile-title">
              {__('Designers', 'quizess')}
            </div>
          )}
        </Fragment>
      )}
      <ul className="authors-list">
        {authorNamesElement}
      </ul>
    </Fragment>
  );
}

export default BlockElements;
