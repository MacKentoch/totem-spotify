import React, {
  PureComponent,
  PropTypes
}                     from 'react';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import PageHeader     from '../../components/pageHeader/PageHeader';
import SearchForm     from '../../components/searchForm/SearchForm';
import ListArtists    from '../../components/listArtists/ListArtists';
import SearchArtistInvitation from '../../components/searchArtistInvitation/SearchArtistInvitation';
import {Pagination}   from 'react-bootstrap';


class Home extends PureComponent {
  static propTypes= {
    // react-router:
    router:   PropTypes.object,
    params:   PropTypes.object,
    location: PropTypes.object,

    // views module:
    currentView:  PropTypes.string.isRequired,
    enterHome:    PropTypes.func.isRequired,
    leaveHome:    PropTypes.func.isRequired,

    // search module:
    search:     PropTypes.func.isRequired,
    moveToPage: PropTypes.func.isRequired,
    // search input info:
    lastSearchText: PropTypes.string,
    lastSearchTime: PropTypes.string,
    // search result:
    isFetching:     PropTypes.bool.isRequired,
    lastFetchTime:  PropTypes.string,
    artists:        PropTypes.array,
    // search result pagination:
    limit:  PropTypes.number.isRequired,
    total:  PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired
  };

  componentDidMount() {
    const { enterHome } = this.props;
    enterHome();
  }

  componentWillUnmount() {
    const { leaveHome } = this.props;
    leaveHome();
  }

  render() {
    const { artists, offset, limit, total, lastSearchText } = this.props;
    const maxPage = Math.ceil(total / limit);
    const currentPage = (offset / limit) + 1;

    return(
      <AnimatedView>
        <PageHeader title="Artistes" />
        <div className="panel panel-primary">
          <div className="panel-heading">
            Rechercher un artiste Spotify
          </div>
          <div className="panel-body">
            <SearchForm
              onSearchSubmit={this.handleOnSearchSubmit}
              defaultValue={lastSearchText}
            />
          </div>
        </div>
        {
          artists.length > 0
          ?
            <div>
              <ListArtists
                artists={artists}
              />
              <div className="container text-center">
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  items={maxPage}
                  maxButtons={5}
                  activePage={currentPage}
                  onSelect={this.handleSelect}
                />
              </div>
            </div>

          :
            <SearchArtistInvitation />
        }
      </AnimatedView>
    );
  }

  handleSelect = (eventKey) => {
    const { moveToPage, limit } = this.props;
    const offset = (eventKey - 1) * limit;
    moveToPage(offset);
  }

  handleOnSearchSubmit = searchValue => {
    const { search } = this.props;
    search(searchValue, 0);
  }
}

export default Home;
