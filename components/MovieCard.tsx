import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {Link} from "expo-router";
import {icons} from "@/constants/icons";

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
                        : "https://placehold.co/600x400/1a1a1a/FFFFFF.png"
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                    />

                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>

                <View className="flex-row items-center justify-start gap-x-1">
                <Image source={icons.star} className="size-4"/>

                    <Text className="text-xs text-white font-bold uppercase">{Math.round(vote_average / 2)}</Text>
                </View>
                {/* Display release date*/}
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {release_date?.split('-')[0]}
                    </Text>
                    {/* Display category*/}
                    {/*<Text className="text-xs font-medium text-light-300 uppercase">*/}
                    {/*    Movie*/}
                    {/*</Text>*/}
                </View>
            </TouchableOpacity>
        </Link>
    )
}
export default MovieCard
