import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {getTrendingMovies} from "@/services/appwrite";

export default function Index() {
    // Add router hook
    const router = useRouter();

    // Get data from trending movies
    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError
    } = useFetch(getTrendingMovies)

    // Get data from API to get movie results
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies({
        query: ""
    }))

    return (
        //  Add background to home page
        <View className="flex-1 bg-primary">
            {/* Display pictures of movies*/}
            <Image source={images.bg} className="absolute w-full z-0 "/>
            {/*Make screen scrollable*/}
            <ScrollView
                className="flex-1 px-5"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}
            >
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

                {/* Display loading indicator for movie*/}
                {moviesLoading || trendingLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                    //  Display error if error occurs
                ) : moviesError ||trendingError ? (
                    <Text>Error: {moviesError?.message || trendingError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            /*  Add search function to search movies to route to search URL */
                            onPress={() => {
                                router.push("/search")}}
                            placeholder="Search for a movie"
                        />
                        {/* Display trending movies if they exist*/}
                        {trendingMovies && (
                            <View className="mt-10">
                            <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                            </View>
                        )}

                        <>
                            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                            {/* Display movies organized into columns*/}
                            <FlatList
                                data={movies}
                                renderItem={({item}) => (
                                    // Add movie cards
                                    <MovieCard
                                        {...item}
                                    />
                                )}
                                /*Check out how many elements there are*/
                                keyExtractor={(item) => item.id.toString()}
                                /*Divide the elements into columns*/
                                numColumns={3}
                                /*Spread out the columns*/
                                columnWrapperStyle={{
                                    justifyContent: 'flex-start',
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
