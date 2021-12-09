import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderSearchBar(props) {
  const { isVisible } = props;

  return (isVisible) && (
    <div>
      <input type="text" data-testid="search-input" />
    </div>
  );
}

HeaderSearchBar.propTypes = ({
  isVisible: PropTypes.bool.isRequired,
});
