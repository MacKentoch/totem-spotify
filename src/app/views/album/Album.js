import React, {
  PureComponent,
  PropTypes
}                     from 'react';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import PageHeader     from '../../components/pageHeader/PageHeader';
import ListTracks     from '../../components/listTracks/ListTracks';

class Album extends PureComponent {
  static propTypes= {
    // react-router:
    router:   PropTypes.object,
    params:   PropTypes.object,
    location: PropTypes.object,
    // views:
    currentView:  PropTypes.string.isRequired,
    enterAlbum:   PropTypes.func.isRequired,
    leaveAlbum:   PropTypes.func.isRequired,
    // artist:
    artistId:       PropTypes.string,
    artistName:     PropTypes.string,
    // album:
    getAlbumTracks: PropTypes.func.isRequired,
    albumId:        PropTypes.string,
    albumName:      PropTypes.string,
    albumImgSrc:    PropTypes.string.isRequired,
    isFetching:     PropTypes.bool.isRequired,
    lastFetchTime:  PropTypes.string,
    tracks: PropTypes.arrayOf(
      PropTypes.shape({
        'disc_number':   PropTypes.number,
        id:             PropTypes.string.isRequired,
        'track_number': PropTypes.number,
        name:           PropTypes.string.isRequired,
        'duration_ms':  PropTypes.number,
        type:           PropTypes.string.isRequired
      })
    )
  };

  componentDidMount() {
    const {
      enterAlbum,
      params: { id },
      getAlbumTracks
    } = this.props;

    enterAlbum();
    /* eslint-disable no-console */
    getAlbumTracks(id)
      .then(() => console.log('albums tracks fetched successfull: should add notification here'))
      .catch((err) => console.log('albums tracks fetch error: ', err));
    /* eslint-enable no-console */
  }

  componentWillUnmount() {
    const { leaveAlbum } = this.props;
    leaveAlbum();
  }

  render() {
    const {
      tracks,
      artistName,
      albumName,
      albumImgSrc
    } = this.props;

    return(
      <AnimatedView>
        <PageHeader
          title="Pistes"
          subTitle={`${artistName || ' ---- '} - ${albumName || ' ---- '}`}
        />
        <ListTracks
          tracks={tracks}
          albumName={albumName}
          albumImgSrc={albumImgSrc}
        />
      </AnimatedView>
    );
  }
}

export default Album;
