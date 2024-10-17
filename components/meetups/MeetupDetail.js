import classes from "./MeetupDetail.module.css";
import { useRouter } from "next/router";

// when click on show details button, it will show the details of the meetup and can delete it
export default function MeetupDetail(props) {
  const router = useRouter();

  // if i want to delete the meetup
  async function deleteMeetupHandler() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meetup?"
    );
    // if the user confirms delete, it will send a delete request to the server [database] with the meetupId that was clicked and it will redirect to the home page.
    if (confirmDelete) {
      await fetch("/api/delete-meetup/" + props.id, {
        method: "DELETE",
      });
      router.push("/");
    }
  }

  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <div className={classes.actions}>
        <button onClick={deleteMeetupHandler} className={classes.deleteButton}>
          Delete Meetup
        </button>
      </div>
    </section>
  );
}
