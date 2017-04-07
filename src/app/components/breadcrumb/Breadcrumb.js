import React, { PureComponent, PropTypes } from 'react';
import BreadcrumbItem from './BreadcrumbItem';

class Breadcrumb extends PureComponent {
  static propTypes = {
    path: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onItemClick: PropTypes.func
  };

  static defaultProps = {
    path: []
  }

  render() {
    const { path } = this.props;

    return (
      <ul className="breadcrumb">
      {
        path.length === 0 &&
        null
      }
      {
        path.length > 0 &&
        path.map(
          (view, viewIndex) => {
            if (viewIndex === 0) {
              return (
                <BreadcrumbItem
                  key={viewIndex}
                  linkClass="fa fa-search"
                  itemIndex={viewIndex}
                  itemText={view}
                  onClick={this.onBreadcrumbitemClick}
                />
              );
            }
            if (viewIndex < path.length - 1) {
              return (
                <BreadcrumbItem
                  key={viewIndex}
                  linkClass="active"
                  itemIndex={viewIndex}
                  itemText={view}
                  onClick={this.onBreadcrumbitemClick}
                />
              );
            }
            if (viewIndex === path.length - 1) {
              return (
                <BreadcrumbItem
                  key={viewIndex}
                  linkClass="active"
                  itemIndex={viewIndex}
                  itemText={view}
                  onClick={this.onBreadcrumbitemClick}
                />
              );
            }
            return null;
          }
        )
      }
      </ul>
    );
  }

  onBreadcrumbitemClick = breadcrumbItem => {
    const { onItemClick } = this.props;
    const {
      itemIndex: index,
      itemText: text
    } = breadcrumbItem;
    // const [ index, text ] = [breadcrumbItem.itemIndex, breadcrumbItem.itemText];

    onItemClick({ index, text });
  }
}

export default Breadcrumb;
