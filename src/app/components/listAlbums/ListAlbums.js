import React, {
  Component,
  PropTypes
}               from 'react';
import { Link } from 'react-router';

class ListAlbums extends Component {
  static propTypes = {
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
  }

  static defaultProps = {
    albums: []
  };

  render() {
    const { albums } = this.props;

    return (
      <div className="container albums">
        <div className="row">
        {
          albums.map(
            ({ id, name, images }, keyIdx) => {
              return (
                <div
                  key={keyIdx}
                  className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                  <div className="thumbnail thumbnail--sized text-center">
                    <a href="#">
                      {
                        images.length > 0
                        ?
                          <img
                            width="300"
                            height="300"
                            src={images[0].url}
                            alt={name}
                          />
                        :
                         <div className="no-album-photo">
                           <span />
                         </div>
                      }
                    </a>
                    <div className="caption caption--sized">
                      <Link to={`/artist/album/${id}`}>
                        <h4>
                          { name }
                        </h4>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }
          )
        }
        </div>
      </div>
    );
  }
}

export default ListAlbums;
