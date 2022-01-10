import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../../../contexts/mainContext';

export default function AreasList({ areas }) {
  const { setAreaSelected } = useContext(mainContext);

  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        name="areas"
        onChange={ (e) => setAreaSelected(e.target.value) }
      >
        { areas.map((area, index) => (
          <option
            data-testid={ `${area}-option` }
            key={ index }
            value={ area }
          >
            { area }
          </option>
        )) }
      </select>
    </div>
  );
}

AreasList.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
};
