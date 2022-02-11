/* eslint-disable jsx-a11y/alt-text */
import { FC, memo } from "react";
import { queryDetail } from "~/resources/episodate";
import { TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { actions } from "~/store";
import { Image, Text, useTheme, View } from "native-base";

interface MyShowsRowProps {
  id: number;
  time: string;
  episode: string;
}

export const MyShowsRow: FC<MyShowsRowProps> = ({ id, episode, time }) => {
  const { data } = useQuery(["detail", { id }], queryDetail, {
    suspense: true,
  });
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSelect = () => dispatch(actions.shows.selectShow(id));

  if (!data) return null;

  const uri =
    data.image_thumbnail_path === "https://static.episodate.com"
      ? "https://static.episodate.com/images/no-image.png"
      : data.image_thumbnail_path;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: theme.sizes["2"],
      }}
      onPress={handleSelect}
    >
      <Image
        source={{ uri }}
        width="16"
        height="24"
        borderRadius="md"
        alt={data.name}
      />
      <View mx="2" flex="1">
        <Text>
          {data.name} - {episode}
        </Text>
        <Text>{data.network}</Text>
        <Text>{time.substring(0, 5)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const MemoizedMyShowsRow = memo(MyShowsRow);

export const MyShowsRowSkeleton: FC = () => {
  return (
    <View>
      <Image
        source={{ uri: "https://static.episodate.com/images/no-image.png" }}
        width="4"
        height="5"
        borderRadius="sm"
        alt="loading"
      />
      <View mx="2">
        <Text>loading</Text>
        <Text></Text>
      </View>
    </View>
  );
};
