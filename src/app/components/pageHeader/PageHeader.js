import React, { PropTypes } from 'react';

const PageHeader = ({ title, subTitle }) => (
  <div className="page-header">
    <h1>
      { title }
    </h1>
    {
      subTitle.length > 0  &&
      <h2>
        { subTitle }
      </h2>
    }
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
};

PageHeader.defaultProps = {
  title: 'title not set!',
  subTitle: ''
};

export default PageHeader;
