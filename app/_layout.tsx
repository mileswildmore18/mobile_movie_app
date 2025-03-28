import { Stack } from "expo-router";
import './globals.css';
import {StatusBar} from "react-native";
export default function RootLayout() {
  return (
  <>
    {/* Hide status bar of phone*/}
    <StatusBar hidden={true} />
  <Stack>
  {/*  Hide current page header*/}
  <Stack.Screen
  name="(tabs)"
  options={{ headerShown: false}}
  />

    <Stack.Screen
    name="movies/[id]"
    options={{headerShown: false}}
    />
  </Stack>;
  </>
  );
}
