import React, {
  PureComponent,
  PropTypes
}                           from 'react';
import RightNavButton       from './rightNavButton/RightNavButton';

class RightNav extends PureComponent {
  static propTypes = {
    rightLinks: PropTypes.arrayOf(
      PropTypes.shape({
        link:     PropTypes.string,
        label:    PropTypes.string,
        viewName: PropTypes.string
      })
    ),
    onRightNavButtonClick: PropTypes.func
  };

  render() {
    const { rightLinks, onRightNavButtonClick } = this.props;
    return (
      <ul className="nav navbar-nav navbar-right">
        {
          rightLinks.map(
            (aLinkBtn, index) => {
              return (
                <RightNavButton
                  key={index}
                  link={aLinkBtn.link}
                  label={aLinkBtn.label}
                  viewName={aLinkBtn.view}
                  onClick={onRightNavButtonClick}
                />
              );
            }
          )
        }
      </ul>
    );
  }
}

export default RightNav;
