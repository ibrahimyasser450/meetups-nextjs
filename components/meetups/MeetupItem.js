import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

// this page is for each individual meetup make it as a card
function MeetupItem(props) {
  const router = useRouter();

  // when click on show details button, it will show the details of the meetup, it will open this page, it is dynamic page => localhost:3000/[id] => pages/[meetupId]/index.js
  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  // when click on edit button, it will open the edit page => localhost:3000/edit-meetup/[id] => pages/edit-meetup/[meetupId].js
  function editMeetupHandler() {
    router.push("/edit-meetup/" + props.id);
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
          <button className={classes.edit} onClick={editMeetupHandler}>
            Edit
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
