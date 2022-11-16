import './Button.css';

function Button(props) {
  return (
    <button className="button-wrapper">
        {props.title}
    </button>
  );
}

export default Button;
