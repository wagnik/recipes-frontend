import './ColorButton.css';

function ColorButton(props) {
  return (
    props.color ? 
    <button className="color-button-wrapper-2">
        {props.title}
    </button> :
    <button className="color-button-wrapper">
      {props.title}
    </button>
  );
}

export default ColorButton;
