import React, {
  PureComponent,
  PropTypes
}                     from 'react';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import PageHeader     from '../../components/pageHeader/PageHeader';
import ListAlbums     from '../../components/listAlbums/ListAlbums';

class Artist extends PureComponent {
  static propTypes= {
    // react-router:
    router:   PropTypes.object,
    params:   PropTypes.object,
    location: PropTypes.object,
    // views:
    currentView:  PropTypes.string.isRequired,
    enterArtist:  PropTypes.func.isRequired,
    leaveArtist:  PropTypes.func.isRequired,
    // artist:
    getArtistAlbum: PropTypes.func.isRequired,
    artistId:       PropTypes.string,
    artistName:     PropTypes.string,
    isFetching:     PropTypes.bool.isRequired,
    lastFetchTime:  PropTypes.string,
    albums: PropTypes.arrayOf(
      PropTypes.shape({
        id:           PropTypes.string.isRequired,
        name:         PropTypes.string.isRequired,
        images:       PropTypes.arrayOf(
          PropTypes.shape({
            height: PropTypes.number.isRequired,
            width:  PropTypes.number.isRequired,
            url:    PropTypes.string.isRequired
          })
        )
      })
    )
  };

  componentDidMount() {
    const {
      enterArtist,
      params: { id },
      getArtistAlbum
    } = this.props;

    enterArtist();
    /* eslint-disable no-console */
    getArtistAlbum(id)
      .then(() => console.log('artist albums fetched successfull: should add notification here'))
      .catch((err) => console.log('artist albums fetch error: ', err));
    /* eslint-enable no-console */
  }

  componentWillUnmount() {
    const { leaveArtist } = this.props;
    leaveArtist();
  }

  render() {
    const { albums, artistName } = this.props;

    return(
      <AnimatedView>
        <PageHeader
          title="Albums"
          subTitle={artistName || ' ---- '}
        />
        <ListAlbums
          albums={albums}
        />
      </AnimatedView>
    );
  }
}

export default Artist;
