import { FlatList, Text, useTheme, View } from "native-base";
import { Suspense } from "react";
import { useSelector } from "react-redux";
// import { FlatList } from "react-native";
import { MemoizedMyShowsRow, MyShowsRowSkeleton } from "./MyShowsRow";

export const MyShows = () => {
  const shows = useSelector((store) => store.shows.value);
  const theme = useTheme();

  return (
    <FlatList
      data={shows}
      renderItem={({ item }) => (
        <Suspense fallback={<MyShowsRowSkeleton />}>
          <MemoizedMyShowsRow id={item} />
        </Suspense>
      )}
      keyExtractor={(id) => id.toString()}
      contentContainerStyle={{
        margin: theme.sizes[2],
        flex: 1,
        justifyContent: shows.length > 0 ? "flex-start" : "flex-end",
      }}
      ItemSeparatorComponent={() => <View height="1.5" />}
      ListEmptyComponent={
        <Text textAlign="center" fontSize="md">
          Search for TV Shows here
        </Text>
      }
      ListFooterComponent={<View height="$bottomSheetHeader" />}
    />
  );
};
