import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Home }               from '../../views';
import * as viewsActions      from '../../redux/modules/views';
import * as searchActions     from '../../redux/modules/search';


const mapStateToProps = (state) => {
  return {
    // -- views: -- //

    currentView:  state.views.currentView,

    // -- search: -- //
    // search input info:
    lastSearchText: state.search.lastSearchText,
    lastSearchTime: state.search.lastSearchTime,
    // search result:
    isFetching:     state.search.isFetching,
    lastFetchTime:  state.search.lastFetchTime,
    artists:        state.search.artists,
    // search result pagination:
    limit:  state.search.limit,
    total:  state.search.total,
    offset: state.search.offset
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views actions:
      enterHome: viewsActions.enterHome,
      leaveHome: viewsActions.leaveHome,
      // search actions:
      search: searchActions.searchIfNeeded,
      moveToPage: searchActions.moveToPage
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
