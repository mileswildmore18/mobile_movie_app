// track the searches made by a user

import {Client, Databases, ID, Query} from "react-native-appwrite";
import union from "ajv/lib/vocabularies/jtd/union";

// Add the Appwrite database and collection
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// Set up the database instance
const database = new Databases(client);

// Function to update the search count
export const updateSearchCount = async (query: string, movie: Movie) => {

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", query),
        ]);

        //check if a record of that search has already been stored
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
// if document is found, increment the searchCount field
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1,
                }
            );
        } else {
            //if no document is found, create a new document in Appwrite database to 1
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                title: movie.title,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Search for trending movies
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            // Limit the query of trending movies to 5
            Query.limit(5),
            Query.orderDesc("count"),
        ]);

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error(error);
        return undefined;
    }
}



