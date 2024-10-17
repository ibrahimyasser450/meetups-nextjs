import { useRef, useEffect } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

// when the user want to edit the meetup or create a new meetup.
function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  useEffect(() => {
    // if the user want to edit the meetup, it will prefill the form with the existing data
    if (props.meetup) {
      titleInputRef.current.value = props.meetup.title;
      imageInputRef.current.value = props.meetup.image;
      addressInputRef.current.value = props.meetup.address;
      descriptionInputRef.current.value = props.meetup.description;
    }
  }, [props.meetup]);

  // when the user submit the form, it will send the data to the server
  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    // this is the function take meetupData and will send the data to the server
    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          {/* if the user want to edit the meetup, props meetup will be true because carry the meetup data, so it will show the Edit Meetup button */}
          <button>{props.meetup ? "Edit Meetup" : "Add Meetup"}</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
