import {Component} from '@wordpress/element';
import App from '../components/App';

class BlockEdit extends Component {

  render() {
    const {attributes, className} = this.props;
    return (
      <App className={className} attributes={attributes} />
    );
  }
}

export default BlockEdit;
