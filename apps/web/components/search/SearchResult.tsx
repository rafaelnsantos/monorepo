/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "ui";
import { SearchRoot, SearchTvShow } from "~/resources/episodate.types";
import { actions } from "~/store";

interface ShowRowProps {
  show: SearchTvShow;
  isAdded: boolean;
  handleAdd: () => void;
}

const ShowRow: FC<ShowRowProps> = ({ show, isAdded, handleAdd }) => {
  const { id, name, image_thumbnail_path } = show;

  return (
    <Box
      css={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        marginTop: 5,
      }}
    >
      <img alt={name} src={image_thumbnail_path} width={64} height={64} />
      <Box css={{ flex: 1, alignItems: "center" }}>
        <Link href={`/${id}`}>
          <a>{name}</a>
        </Link>
      </Box>
      <Button onClick={handleAdd} disabled={isAdded}>
        Add
      </Button>
    </Box>
  );
};

export const SearchResult: FC<{ shows?: SearchRoot["tv_shows"] }> = ({
  shows,
}) => {
  const addedShows = useSelector((state) => state.shows.value);
  const dispatch = useDispatch();

  const handleAdd = (id: number) => dispatch(actions.shows.addShow(id));

  return (
    <Box css={{ flexDirection: "column" }}>
      {shows?.map((show) => (
        <ShowRow
          show={show}
          isAdded={addedShows.includes(show.id)}
          key={show.id}
          handleAdd={() => handleAdd(show.id)}
        />
      ))}
    </Box>
  );
};
