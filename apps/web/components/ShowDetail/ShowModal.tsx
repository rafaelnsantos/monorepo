import { FC, useCallback, useState } from "react";
import { Modal, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { actions } from "~/store";
import { queryDetail } from "resources/episodate";
import { checkIsAdded } from "~/store/shows";
import AwesomeAlert from "react-native-awesome-alerts";
import { useTheme, View, Text, Button } from "native-base";

export const ShowModal: FC = () => {
  const id = useSelector((store) => store.shows.selected) || 0;
  const dispatch = useDispatch();
  const isAdded = useSelector(checkIsAdded(id));
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const theme = useTheme();

  const handleClose = useCallback(
    () => dispatch(actions.shows.selectShow(undefined)),
    [dispatch]
  );

  const handleAdd = () => dispatch(actions.shows.addShow(id));

  const handleRemove = () => setShowRemoveAlert(true);

  const { data, isLoading } = useQuery(["detail", { id }], queryDetail, {
    enabled: !!id,
  });

  return (
    <Modal animationType="slide" visible={!!id} onRequestClose={handleClose}>
      <View
        _dark={{ bg: "backgroundDark" }}
        _light={{ bg: "backgroundLight" }}
        p="2"
        flex={1}
      >
        {!data ? (
          <>
            {isLoading && (
              <ActivityIndicator size="large" style={{ flex: 1 }} />
            )}
          </>
        ) : (
          <>
            <View flexDirection="row">
              <Text flex={1}>{data.name}</Text>
              <Button variant="outline" onPress={handleClose}>
                Close
              </Button>
            </View>
            {isAdded ? (
              <Button
                variant="ghost"
                colorScheme="secondary"
                onPress={handleRemove}
              >
                Remove
              </Button>
            ) : (
              <Button onPress={handleAdd}>Add</Button>
            )}
          </>
        )}
      </View>
      <AwesomeAlert
        show={showRemoveAlert}
        title="Remove"
        message={data?.name}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false} // does not work on web
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor={theme.colors.error[400]}
        cancelButtonColor={theme.colors.gray[400]}
        onCancelPressed={() => {
          setShowRemoveAlert(false);
        }}
        onConfirmPressed={() => {
          dispatch(actions.shows.removeShow(id));
          setShowRemoveAlert(false);
        }}
        onDismiss={() => {
          setShowRemoveAlert(false);
        }}
      />
    </Modal>
  );
};
