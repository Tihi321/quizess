import {parse} from '@wordpress/blockSerializationDefaultParser';
import helpers from './../../elements/Helper/Helper';
import QuizElement from './QuizElement';
import {BlockConsumer} from '../containers/BlockContext';

function PostsElementConsumer(props) {
  const {
    values: {
      postsArray,
      allPosts,
      fontColor,
      backgroundColor,
    },
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
      return {
        title: value.title.rendered,
        data: parse(value.content.raw),
      };
    });
  }
  const numberOfQuestions = parsedBlocks.length;
  const quizElements = parsedBlocks.map((post, index) => {

    const {title} = post;
    const attr = post.data[0].attrs;
    const question = (attr.question) ? helpers.setContent(attr.question, 'text') : false;
    const answers = (attr.answers) ? JSON.parse(attr.answers) : false;
    const showExplanation = attr.showExplanation || false;
    const explanation = (attr.explanation) ? helpers.setContent(attr.explanation, 'text') : false;
    const explanationType = (attr.explanationType) ? JSON.parse(attr.explanationType) : false;
    const explanationMedia = (attr.explanationMedia) ? JSON.parse(attr.explanationMedia) : false;

    return (
      <QuizElement
        key={index}
        numberOfQuestions={numberOfQuestions}
        questionNumber={index}
        title={title}
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
    <div
      className="quiz-elements-wrap"
      style={{
        backgroundColor: backgroundColor || false,
        color: fontColor || false,
      }}
    >
      {quizElements}
    </div>
  );
}

const PostsElement = ({
  postsArray,
  allPosts,
}) => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            fontColor,
            backgroundColor,
          },
        },
      } = value;
      return (
        <PostsElementConsumer
          values={{
            postsArray,
            allPosts,
            fontColor,
            backgroundColor,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default PostsElement;

