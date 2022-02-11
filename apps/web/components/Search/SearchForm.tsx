import { Formik } from "formik";
import { SearchResult } from "./SearchResult";
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { useRef, useState, FC } from "react";
import { Button, Text, useTheme, useColorModeValue } from "native-base";

export const SearchForm: FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();

  const [, fixBackdropWeb] = useState(-1);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={0}
      appearsOnIndex={1}
      pressBehavior={props.animatedIndex.value === 1 ? "collapse" : "none"}
      enableTouchThrough={props.animatedIndex.value !== 1}
    />
  );

  const handleSheetChanges = (index: number) => {
    fixBackdropWeb(index);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={[theme.sizes.$bottomSheetHeader, theme.sizes.$bottomSheet]}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enableContentPanningGesture={false}
      backgroundStyle={{
        backgroundColor: useColorModeValue(
          theme.colors.blueGray["200"],
          theme.colors.blueGray["800"]
        ),
      }}
      style={{
        paddingHorizontal: theme.space[3],
      }}
      keyboardBehavior="extend"
    >
      <Formik
        initialValues={{ name: name }}
        onSubmit={(values) => {
          bottomSheetRef.current?.expand();
          setName(values.name);
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <BottomSheetView
            style={{ flexDirection: "row", marginBottom: theme.space[2] }}
          >
            <BottomSheetTextInput
              keyboardType="web-search"
              placeholder="TV Show Name"
              value={values.name}
              onChangeText={handleChange("name")}
              editable={!loading}
              onSubmitEditing={handleSubmit as any}
              style={{
                flex: 1,
                marginRight: theme.space[2],
                // eslint-disable-next-line react-hooks/rules-of-hooks
                backgroundColor: useColorModeValue(
                  theme.colors.backgroundLight,
                  theme.colors.backgroundDark
                ),
                borderRadius: theme.radii.sm,
                paddingHorizontal: theme.space[2],
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color: useColorModeValue(
                  theme.colors.darkText,
                  theme.colors.lightText
                ),
              }}
              returnKeyType="search"
              onFocus={() => bottomSheetRef.current?.expand()}
            />
            <Button
              onPress={handleSubmit as any}
              isDisabled={!values.name}
              isLoading={loading}
            >
              <Text>Search</Text>
            </Button>
          </BottomSheetView>
        )}
      </Formik>
      <SearchResult name={name} onStateChange={setLoading} />
    </BottomSheet>
  );
};
