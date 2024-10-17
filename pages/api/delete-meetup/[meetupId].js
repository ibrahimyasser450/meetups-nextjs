import { MongoClient, ObjectId } from "mongodb";

// if the user clicked on delete button at MeetupDetail.js, it will take the meetupId from the URL and delete it from the database.
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const meetupId = req.query.meetupId;

    const client = await MongoClient.connect(
      "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.deleteOne({
      _id: new ObjectId(meetupId),
    });

    client.close();

    res.status(200).json({ message: "Meetup deleted!" });
  }
}
