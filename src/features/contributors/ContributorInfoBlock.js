import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class ContributorInfoBlock extends Component {
  static propTypes = {
    contributors: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    if(this.props.contributors){
      const the_contributor = this.props.contributors.contributor;
      return (
        <div className="contributors-contributor-info-block">
          <p>Contributor Name: {the_contributor.full_name}</p>
          <p>Lean Score: {the_contributor.score}</p>
          <p>Total Contributions: {the_contributor.total}</p>
          <iframe src={`https://duckduckgo.com/search.html?prefill=${the_contributor.full_name} Alaska`} style={{overflow:'hidden',margin:'0',padding:'0',width:'408px',height:"40px"}} frameborder="0"></iframe>
        </div>
      );
    } else return <div/>
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    contributors: state.contributors,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContributorInfoBlock);
