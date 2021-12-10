import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';

export default function HeaderSearchBar(props) {
  const { isVisible } = props;

  return (
    <Collapse in={ isVisible } className="header">
      <div>
        <input type="text" data-testid="search-input" />
      </div>
    </Collapse>
  );
}

HeaderSearchBar.propTypes = ({
  isVisible: PropTypes.bool.isRequired,
});
