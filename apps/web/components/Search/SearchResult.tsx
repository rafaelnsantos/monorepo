import { FC, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { MemoizedSearchResultRow } from "./SearchResultRow";
import { useSearch } from "resources/useSearch";
import { Text, useTheme, View } from "native-base";

interface SearchResultProps {
  onStateChange: (loading: boolean) => void;
  name: string;
}

export const SearchResult: FC<SearchResultProps> = ({
  onStateChange,
  name,
}) => {
  const { shows, loadMore, loading, loadingMore, isFetched } = useSearch(name);
  const theme = useTheme();

  useEffect(() => {
    onStateChange(loading);
  }, [loading, onStateChange]);

  return (
    <BottomSheetFlatList
      data={shows}
      style={{
        marginTop: theme.space[1],
        height: theme.sizes.$bottomSheetBody,
      }}
      renderItem={({ item }) => <MemoizedSearchResultRow show={item} />}
      ListFooterComponent={
        loadingMore ? (
          <View my="2">
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <View height="4" />
        )
      }
      keyExtractor={(show) => show.id.toString()}
      onEndReached={loadMore}
      ItemSeparatorComponent={() => <View height="2" />}
      ListEmptyComponent={isFetched ? <Text>TV Show not found</Text> : null}
    />
  );
};
