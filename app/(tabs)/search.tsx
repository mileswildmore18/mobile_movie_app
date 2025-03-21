// // Add search page for mobile
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native'
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useEffect, useState} from "react";

const Search = () => {
    // Trigger search when user searches for a movie
    const [searchQuery, setSearchQuery] = useState('')


    // Get data from API to get movie results
    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({
        query: searchQuery
    }), false)
    // Re-fetch results when query changes
    useEffect(() => {
        // Limit the time for API requests to avoid overloading with results
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset()
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery])

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"/>

            {/* Display movie cards in a grid*/}
            <FlatList
                data={movies}
                renderItem={({item}) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                /*Divide the elements into columns and spread them out evenly*/
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{paddingBottom: 100}}
                ListHeaderComponent={
                    <>
                        {/* Add logo at header*/}
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10"/>
                        </View>
                        {/* Add search bar allowing users to type in search query*/}
                        <View className="my-5">
                            <SearchBar
                                placeholder="Search movies..."
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>
                        {/* Display loading movies indicator*/}
                        {loading && (
                            <ActivityIndicator size="large" color="#0000ff" className="my-3"/>
                        )}
                        {/* Display error is movie is not found or error loading page*/}
                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {error.message}
                            </Text>
                        )}

                        {
                            !loading && !error && searchQuery.trim()
                            && movies?.length > 0 && (
                                <Text className="text-xl text-white font-bold">
                                    Search Results for{' '}
                                    <Text className="text-accent">{searchQuery}</Text>
                                </Text>
                            )}
                    </>
                }
                /* Display message if no movie is found*/
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
}
export default Search
