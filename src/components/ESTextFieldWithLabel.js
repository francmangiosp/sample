import React from "react";
import { View, TextInput } from "react-native";
import styles from "../helpers/styles";
import ESLabel from "./ESLabel";
import ESTextField from "./ESTextField";

const ESTextFieldWithLabel = (props) => {
  return (
    <View
      style={[
        props.isRowItem && styles.rowitems,
        props.withMarginRight && styles.withMarginRight,
      ]}
    >
      <ESLabel text={props.label} />
      <ESTextField {...props} placeholder={"Enter " + props.label} />
    </View>
  );
};

export default ESTextFieldWithLabel;
