import React from "react";
import { Icon } from "semantic-ui-react";

const CustomMarker = (props) => {
  const { id } = props;

  const onMarkerClick = (e) => {
    console.log(id);
  };

  return (
    <Icon size="large" name="wheelchair" onClick={onMarkerClick} {...props} />
  );
};

export default CustomMarker;
