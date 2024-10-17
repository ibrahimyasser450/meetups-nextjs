import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import MeetupList from "@/components/meetups/MeetupList";

// the home page => localhost:3000/
// this page get all the meetups from the database and send them to the MeetupList to show them but if the user search on something it will filter the meetups by the search query and send it to the MeetupList to show just it
export default function Home(props) {
  const router = useRouter();
  const searchQuery = router.query.search || ""; // Get search query from URL

  // Filter meetups by title if searchQuery is provided
  const filteredMeetups = props.meetups.filter((meetup) =>
    meetup.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      {/* if there search query send it to the MeetupList and if search query doesn't exist return the page not found */}
      {filteredMeetups.length > 0 ? (
        <MeetupList meetups={filteredMeetups} />
      ) : (
        <section style={{ textAlign: "center", padding: "3rem" }}>
          <h1>Page Not Found</h1>
          <p>No meetups found with the title "{searchQuery}".</p>
        </section>
      )}
    </Fragment>
  );
}

// when the data changes multiple times every second and need access to request and response so getServerSideProps is better.
// export async function getServerSideProps(context) {
//   const req = context.req; // get request
//   const res = context.res; // get response
//   // fetch data from an API
//   // doesn't need revalidate because getServerSideProps is called on every incoming request
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// when the data doesn't changes multiple times every second and don't need access to request and response so getStaticProps is better.
// so here the data doesn't changes multiple times.
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // wait 1 second for every incoming request
  };
}
