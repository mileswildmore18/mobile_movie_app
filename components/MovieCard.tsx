import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {Link} from "expo-router";

// Add movie card properties
const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
    console.log(poster_path);
    return (
        // Link to movie details
        <Link href={`/movies/${id}`} asChild>
            {/* Display movie poster and make it clickable*/}
            <TouchableOpacity className="w-[30%]">
                {/* Display movie poster*/}
                <Image
                    source={{
                        uri: poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                    />

                <Text className="text-sm font-bold text-white">{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}
export default MovieCard
