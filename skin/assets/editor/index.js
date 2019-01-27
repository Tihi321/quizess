import PostTitle from './editor-fields/post-title';
import BlackListBlocks from './editor-fields/blacklist-blocks';

$(function() {
  const postTitle = new PostTitle();
  const blackList = new BlackListBlocks();
  postTitle.titleMaxChars(50);
  blackList.init();
});
