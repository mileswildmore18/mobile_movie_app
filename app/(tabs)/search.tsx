// // Add search page for mobile
import {FlatList, Image, Text, View} from 'react-native'
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";

const Search = () => {

    // Add router hook
    const router = useRouter();

    // Get data from API to get movie results
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies({
        query: ""
    }))
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
            
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
            />

        </View>
    )
}
export default Search
