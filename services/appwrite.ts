// track the searches made by a user

import {Client, Databases, Query} from "react-native-appwrite";

// Add the Appwrite database and collection
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

// Setup the database instance
const database = new Databases(client);

// Function to update the search count
export const updateSearchCount = async (query: string, movie: Movie) => {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ])

    console.log(result);
    //check if a record of that search has already been stored
    // if document is found, increment the searchCount field
    //if no document is found, create a new document in Appwrite database to 1

}