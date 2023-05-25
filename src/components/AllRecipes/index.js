import React from 'react';
import { Grid } from '../Categories';
import { useLocation } from 'react-router-dom';

function AllRecipes(props) {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <Grid recipes={props.recipes} type={data}></Grid>
    </div>
  );
}

export default AllRecipes;
