import { Text, useColorModeValue, useTheme, View } from "native-base";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useMemo } from "react";
import { AgendaProps, AgendaSchedule } from "react-native-calendars";
import { Theme } from "react-native-calendars/src/types";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { queryDetailBatch } from "~/resources/episodate";
import { MyShowsRow, MyShowsRowSkeleton } from "./MyShowsRow";

const Agenda = dynamic<AgendaProps>(
  () => import("react-native-calendars").then((m) => m.Agenda) as any,
  {
    ssr: false,
  }
);

export const MyShows = () => {
  const shows = useSelector((store) => store.shows.value);
  const theme = useTheme();
  const { data } = useQuery(["details", { ids: shows }], queryDetailBatch);

  const items = useMemo(() => {
    const agenda: AgendaSchedule = {};
    if (!data) return agenda;
    data.forEach((show) => {
      show.episodes.forEach((episode) => {
        const [date, hour] = episode.air_date.split(" ");

        if (agenda[date]) {
          agenda[date].push({
            day: hour,
            name: episode.name,
            height: show.id,
          });
        } else {
          agenda[date] = [
            {
              day: hour,
              name: episode.name,
              height: show.id,
            },
          ];
        }
      });
    });

    return agenda;
  }, [data]);

  return (
    <>
      <Agenda
        items={items}
        renderItem={(item) => (
          <Suspense fallback={<MyShowsRowSkeleton />}>
            <MyShowsRow id={item.height} time={item.day} episode={item.name} />
          </Suspense>
        )}
        renderEmptyData={() => <Text textAlign="center">No episodes</Text>}
        theme={useColorModeValue(
          {
            backgroundColor: theme.colors.backgroundLight,
            calendarBackground: theme.colors.blueGray["200"],
            dayTextColor: theme.colors.darkText,
            monthTextColor: theme.colors.darkText,
          } as Theme,
          {
            backgroundColor: theme.colors.backgroundDark,
            calendarBackground: theme.colors.blueGray["800"],
            dayTextColor: theme.colors.lightText,
            monthTextColor: theme.colors.lightText,
          } as Theme
        )}
      />
      <View height="$bottomSheetHeader" />
    </>
  );
};
