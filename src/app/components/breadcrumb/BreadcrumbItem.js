import React, { PureComponent, PropTypes } from 'react';

class BreadcrumbItem extends PureComponent {
  static propTypes = {
    itemIndex: PropTypes.number.isRequired,
    itemText:  PropTypes.string.isRequired,
    linkClass: PropTypes.string,
    onClick:   PropTypes.func.isRequired
  };

  static defaultProps = {
    linkClass: 'active'
  };

  render() {
    const { itemText, linkClass  } = this.props;

    return (
      <li>
        <a
          href="#"
          onClick={this.onItemClick}>
          <i className={linkClass} />
            &nbsp;
            {itemText}
        </a>
      </li>
    );
  }

  onItemClick = (event) => {
    event.preventDefault();
    const { onClick, itemIndex, itemText } = this.props;
    onClick({ itemIndex, itemText });
  }
}

export default BreadcrumbItem;
