import { extendTheme } from "native-base";
import { Dimensions } from "react-native";
import colors from "native-base/src/theme/base/colors";

const height = Dimensions.get("window").height;

const BOTTOM_SHEET = 0.7; // screen percentage
const BOTTOM_SHEET_HEADER = 68;

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  sizes: {
    $screenHeight: height,
    $visibleScreenHeight: height - BOTTOM_SHEET,
    $bottomSheet: height * BOTTOM_SHEET,
    $bottomSheetHeader: BOTTOM_SHEET_HEADER,
    $bottomSheetBody: height * BOTTOM_SHEET - BOTTOM_SHEET_HEADER,
  },
  colors: {
    backgroundDark: colors.blueGray["900"],
    backgroundLight: colors.blueGray["100"],
  },
});

type CustomThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
