import {Image, ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";

export default function Index() {
    // Add router hook
    const router = useRouter();

    return (
       //  Add background to home page
       <View className="flex-1 bg-primary">
    {/* Display pictures of movies*/}
    <Image source={images.bg} className="absolute w-full z-0 "/>
           {/*Make screen scrollable*/}
           <ScrollView className="flex-1 px-5"
                       showsHorizontalScrollIndicator={false} contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

               <View className="flex-1 mt-5">
                   <SearchBar
                    /*  Add search function to search movies to route to search URL */
                    onPress={() =>
                        router.push("/search")}
                        placeholder="Search for a movie"

                   />
               </View>
           </ScrollView>
       </View>
    );
}
