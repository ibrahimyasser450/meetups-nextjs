// pages/edit-meetup/[meetupId].js
import { MongoClient, ObjectId } from "mongodb";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

// if the user click on edit button at meetupItem.js, will open this page and send the data that wanted to edit to newMeetupForm.js and Prefill the form with existing data and the user change any field and click on Edit Meetup button, it will take enteredMeetupData and the meetupId from the URL to save new data for this meetup.
export default function EditMeetupPage(props) {
  const router = useRouter();
  const meetupId = router.query.meetupId; // Fetch the meetupId from the URL

  async function editMeetupHandler(enteredMeetupData) {
    // Make a PUT request to update the meetup
    const response = await fetch("/api/edit-meetup/" + meetupId, {
      method: "PUT",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    router.push("/"); // Redirect to home after successful update
  }

  return (
    <NewMeetupForm
      onAddMeetup={editMeetupHandler}
      meetup={props.meetup} // Prefill the form with existing data
    />
  );
}

// ensure the id is correct and exists in the database through paths and if not exists it will return 404 [not found]
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // Get all meetup IDs to generate dynamic paths
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// get the data of the meetup of this id and store it in props in meetup to send it to EditMeetupPage function in the first line to send it to NewMeetupForm.
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // Fetch the specific meetup data by id
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}
