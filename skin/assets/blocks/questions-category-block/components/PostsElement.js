import {parse} from '@wordpress/blockSerializationDefaultParser';
import {Fragment} from '@wordpress/element';
import helpers from './../../elements/Helper/Helper';
import AnswersElement from './AnswersElement';

function PostsElement(props) {
  const {
    postsArray,
    allPosts,
  } = props;

  let parsedBlocks;

  if (allPosts && postsArray) {
    const postsIds = postsArray.map((post) => {
      return post.value;
    });
    const selectedPostsData = allPosts.filter((value) => {
      return postsIds.includes(value.id);
    });
    parsedBlocks = selectedPostsData.map((value) => {
      return parse(value.content.raw);
    });
  }

  const answerElements = parsedBlocks.map((post, index) => {

    const attr = post[0].attrs;
    const question = (attr.question) ? helpers.setContent(attr.question) : false;
    const answers = (attr.answers) ? JSON.parse(attr.answers) : false;
    const showExplanation = attr.showExplanation || false;
    const explanation = (attr.explanation) ? helpers.setContent(attr.explanation) : false;
    const explanationType = (attr.explanationType) ? JSON.parse(attr.explanationType) : false;
    const explanationMedia = (attr.explanationMedia) ? JSON.parse(attr.explanationMedia) : false;

    return (
      <AnswersElement
        key={index}
        question={question}
        answers={answers}
        showExplanation={showExplanation}
        explanation={explanation}
        explanationType={explanationType}
        explanationMedia={explanationMedia}
      />
    );
  });


  return (
    <Fragment>
      {answerElements}
    </Fragment>
  );
}

export default PostsElement;

