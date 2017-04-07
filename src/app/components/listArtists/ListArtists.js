import React, {
  Component,
  PropTypes
}               from 'react';
import { Link } from 'react-router';

class ListArtists extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        genres: PropTypes.arrayOf(PropTypes.string),
        images: PropTypes.arrayOf(
          PropTypes.shape({
            height: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired
          })
        )
      })
    )
  }

  static defaultProps = {
    artists: []
  };

  render() {
    const { artists } = this.props;

    return (
      <div className="container artists">
        {
          artists.map(
            ({ id, name, genres, images }, keyIdx) => {
              return (
                <div
                  key={keyIdx}
                  className="media">
                  <div className="media-left">
                    <a href="#">
                      {
                        images.length > 0
                        ?
                          <img
                            className="media-object"
                            width="60"
                            height="60"
                            src={images[0].url}
                            alt={name}
                          />
                        :
                         <div className="no-artist-photo">
                           <span />
                         </div>
                      }
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                      <Link to={`/artist/${id}`}>
                        { name }
                      </Link>
                    </h4>
                    {
                      genres.map(
                        (genre, genreIdx) => (
                          <span key={genreIdx}>
                            {genre}
                            {genreIdx === (genres.length - 1) ? '' : ', '}
                          </span>
                        )
                      )
                    }
                  </div>
                </div>
              );
            }
          )
        }
      </div>
    );
  }
}

export default ListArtists;
