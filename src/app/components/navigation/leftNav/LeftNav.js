import React, {
  PureComponent,
  PropTypes
}                           from 'react';
import LeftNavButton        from './leftNavButton/LeftNavButton';

class LeftNav extends PureComponent  {
  static propTypes = {
    leftLinks: PropTypes.arrayOf(
      PropTypes.shape({
        link:     PropTypes.string,
        label:    PropTypes.string,
        viewName: PropTypes.string
      })
    ),
    onLeftNavButtonClick: PropTypes.func
  };

  render() {
    const { leftLinks, onLeftNavButtonClick } = this.props;
    return (
      <ul className="nav navbar-nav">
        {
          leftLinks.map(
            (aLinkBtn, index) => {
              return (
                <LeftNavButton
                  key={index}
                  link={aLinkBtn.link}
                  label={aLinkBtn.label}
                  viewName={aLinkBtn.view}
                  onClick={onLeftNavButtonClick}
                />
              );
            }
          )
        }
      </ul>
    );
  }
}

export default LeftNav;
