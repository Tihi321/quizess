/* global tinyMCE */

export default function resetGlobalTinyMCE() {
  const {
    baseURI: {
      host,
      protocol,
    },
  } = tinyMCE;
  
  tinyMCE.baseURI.directory = '//wp-includes/js/tinymce';
  tinyMCE.baseURI.path = '//wp-includes/js/tinymce';
  tinyMCE.baseURI.relative = '//wp-includes/js/tinymce';
  tinyMCE.baseURI.source = `${protocol}://${host}//wp-includes/js/tinymce`;
  tinyMCE.baseURL = `${protocol}://${host}//wp-includes/js/tinymce`;
}
