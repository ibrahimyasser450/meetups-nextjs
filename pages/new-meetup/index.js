import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";

// when the user clicked on Add Meetup button, it will open this page and send the data that wanted to add to /api/new-meetup to store at database [Mongodb]
export default function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(meetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <h1>Add a New Meetup</h1>
      {/* get the data that the user entered it and send it to addMeetupHandler function to send it to database. */}
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}
