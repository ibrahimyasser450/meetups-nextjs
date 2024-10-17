import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";

// when the user click on show details button, it will write in url => localhost:3000/[id] then ensure the id is correct and exists in the database through getStaticPaths at paths, then get the data of the meetup through getStaticProps and store it in props, and send them to the meetupDetail component.
export default function meetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        id={props.meetupData.id}
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

// ensure the id is correct and exists in the database through paths and if not exists it will return 404 [not found]
export async function getStaticPaths() {
  // fetch data for a single meetup
  const client = await MongoClient.connect(
    "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false, // false => means paths contains all supported meetupIds if the user entering anything not supported in paths will return 404 [not found] for example "m3"
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// get the data of the meetup of this id and store it in props in meetupData.
export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
