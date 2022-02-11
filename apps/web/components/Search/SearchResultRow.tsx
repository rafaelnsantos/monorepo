/* eslint-disable jsx-a11y/alt-text */
import { FC, memo } from "react";
import { TouchableOpacity } from "react-native";
import { SearchTvShow } from "resources/episodate.types";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "~/store";
import { Button, Image, Text, View } from "native-base";

interface ShowRowProps {
  show: SearchTvShow;
}
const SearchResultRow: FC<ShowRowProps> = ({ show }) => {
  const { name, image_thumbnail_path, network } = show;
  const isAdded = useSelector((state) => state.shows.value.includes(show.id));
  const dispatch = useDispatch();

  const handleAdd = () => dispatch(actions.shows.addShow(show.id));

  const handleSelect = () => dispatch(actions.shows.selectShow(show.id));

  return (
    <TouchableOpacity onPress={handleSelect} style={{ flexDirection: "row" }}>
      <Image
        source={{ uri: image_thumbnail_path }}
        width="16"
        height="24"
        borderRadius="md"
        alt={name}
      />
      <View mx="3" flex={1}>
        <Text>{name}</Text>
        <Text>{network}</Text>
      </View>
      <View justifyContent="center">
        <Button onPress={handleAdd} isDisabled={isAdded}>
          <Text>Add</Text>
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export const MemoizedSearchResultRow = memo(SearchResultRow);
