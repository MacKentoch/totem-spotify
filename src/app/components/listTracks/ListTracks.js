import React, {
  Component,
  PropTypes
}               from 'react';
import moment   from 'moment';

class ListTracks extends Component {
  static propTypes = {
    tracks: PropTypes.arrayOf(
      PropTypes.shape({
        'disc_number':   PropTypes.number,
        id:              PropTypes.string.isRequired,
        'track_number':  PropTypes.number,
        name:            PropTypes.string.isRequired,
        'duration_ms':  PropTypes.number,
        type:            PropTypes.string.isRequired
      })
    ),
    albumName:    PropTypes.string,
    albumImgSrc:  PropTypes.string
  }

  static defaultProps = {
    tracks:       [],
    albumName:    'album',
    albumImgSrc:  'http://placehold.it/640x640'
  };

  render() {
    const { tracks, albumName, albumImgSrc } = this.props;

    return (
      <div className="row">
        <div className="col-xs-12 col-md-6 col-lg-6">
          <img
            src={ albumImgSrc }
            className="thumbnail img-responsive"
            alt={ albumName }
          />
        </div>
        <div className="col-xs-12 col-md-6 col-lg-6">
          <ul className="list-group">
            {
              tracks.map(
                (
                  {
                    'disc_number': diskNb,
                    id,
                    'track_number': trackNb,
                    'duration_ms': durationMs,
                    name,
                    type
                  },
                  trackIndex
                ) => (
                  <li
                    key={trackIndex}
                    className="list-group-item">
                    {trackNb}. {name}
                    <span className="badge">
                      { moment(durationMs).format('mm:ss') }
                    </span>
                  </li>
                )
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ListTracks;
