import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {router, useLocalSearchParams} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovieDetails} from "@/services/api";
import {icons} from "@/constants/icons";

// Add a reusable component for different movies
interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({label, value}: MovieInfoProps) => (
    // Add movie info label
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">
            {label}
        </Text>
        {/*Add movie value*/}
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || 'N/A'}
        </Text>

    </View>
)

// Add movie details
const MovieDetails = () => {
    // Fetch movie details by movie id
    const {id} = useLocalSearchParams();

    // Gather data from the movie details
    const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string));
    return (
        <View className="bg-primary flex-1">
            {/* Add scrollable content*/}
            <ScrollView contentContainerStyle={{
                paddingBottom: 80
            }}>
                <View>
                    {/* Display movie poster*/}
                    <Image source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
                           className="w-full h-[550px]"
                           resizeMode="stretch"/>
                </View>
                {/* Display movie title*/}
                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                    {/* Display movie release date by year*/}
                    <View className="flex-row items-start gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">{movie?.release_date?.split('-')[0]}</Text>
                        {/* Display movie runtime*/}
                        <Text className="text-light-200 text-sm">
                            {movie?.runtime}m
                        </Text>
                    </View>
                    {/* Display movie rating*/}
                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image
                            source={icons.star}
                            className="size-4"
                        />
                        {/*Display movie rating rounding up the nearest whole number*/}
                        <Text className="text-white font-bold text-sm">
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>
                        {/*Display how many votes the movie got*/}
                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>
                    {/*Display overview plot of the movie*/}
                    <MovieInfo
                        label="Overview"
                        value={movie?.overview}
                    />
                    {/*Display the genre of the movie*/}
                    <MovieInfo
                        label="Genres"
                        value={movie?.genres?.map((g) => g.name).join(' - ') || 'N/A'}
                    />
                    {/*Display the budget and the revenue of the movie*/}
                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo
                            label="Budget"
                            value={`$${movie?.budget / 1_000_000} million`}
                        />
                        <MovieInfo
                            label="Revenue"
                            value={`$${Math.round(movie?.revenue) / 1_000_000}`}
                        />
                    </View>
                    {/*Display the production companies of the movie*/}
                    <MovieInfo
                        label="Production Companies"
                        value={movie?.production_companies.map((c) => c.name).join(' - ') || 'N/A'}
                    />
                </View>
            </ScrollView>
            {/* Add back button to go back to the previous page*/}
            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image
                    source={icons.arrow}
                    className="size-5 mr-1 mt-0.5 rotate-180"
                    tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">Go back</Text>
            </TouchableOpacity>
        </View>
    );
};
export default MovieDetails

