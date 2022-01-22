import type { NextPage } from "next";
import { FC, Suspense, SuspenseList } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "ui";
import { useDetail } from "../resources/episodate";
import { actions } from "../store";
import { MyLink } from "./MyLink";

const ShowRow: FC<{ id: number; handleRemove: () => void }> = ({
  id,
  handleRemove,
}) => {
  const { data } = useDetail(id);

  return (
    <Box css={{ justifyContent: "space-between" }}>
      <MyLink href={`/${id}`}>{data.name}</MyLink>
      <Button onClick={handleRemove}>Remove</Button>
    </Box>
  );
};

export const MyShows: NextPage = () => {
  const shows = useSelector((store) => store.shows.value);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => dispatch(actions.shows.removeShow(id));

  if (!shows) return null;

  return (
    <SuspenseList revealOrder="forwards">
      {shows.map((id) => (
        <Suspense key={id} fallback={<div>loading...</div>}>
          <ShowRow id={id} handleRemove={() => handleRemove(id)} />
        </Suspense>
      ))}
    </SuspenseList>
  );
};
