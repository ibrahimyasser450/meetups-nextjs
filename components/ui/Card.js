import classes from "./Card.module.css";

// this component is used to make the card, just for styling to the meetup.
function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
