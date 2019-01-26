import PostTitle from './editor-fields/post-title';

$(function() {
  const postTitle = new PostTitle();
  postTitle.titleMaxChars(50);
});
