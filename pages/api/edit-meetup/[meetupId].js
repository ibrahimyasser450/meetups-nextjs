// pages/api/edit-meetup/[meetupId].js
import { MongoClient, ObjectId } from "mongodb";

// take new data and ensure it is valid and update the meetup in MongoDB.
export default async function handler(req, res) {
  if (req.method === "PUT") {
    const meetupId = req.query.meetupId;

    let client;

    try {
      // new data
      const updatedData = req.body;

      // Validate input data (optional but recommended)
      if (
        !updatedData ||
        !updatedData.title ||
        !updatedData.image ||
        !updatedData.address ||
        !updatedData.description
      ) {
        res.status(400).json({ message: "Invalid input data" });
        return;
      }

      client = await MongoClient.connect(
        "mongodb+srv://ibrahim450:ibrahim12345@cluster0.duian.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
      );
      const db = client.db();
      const meetupsCollection = db.collection("meetups");

      // Update the meetup document in MongoDB
      const result = await meetupsCollection.updateOne(
        { _id: new ObjectId(meetupId) },
        { $set: updatedData }
      );

      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Meetup not found" });
        return;
      }
      // if everything is okay.
      res.status(200).json({ message: "Meetup updated!" });
    } catch (error) {
      console.error("Error updating meetup:", error);
      res.status(500).json({ message: "Updating meetup failed." });
    } finally {
      if (client) {
        client.close();
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
