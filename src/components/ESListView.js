import React from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import styles from "../helpers/styles";
import ESIcon from "./ESIcon";
import ESLabel from "./ESLabel";

let listViewItemSeparator = () => {
  return <View style={styles.listViewItemSeparator} />;
};

let listViewItem = (
  item,
  panel,
  customViewClick,
  customEditClick,
  customDeleteClick,
  customActionClick,
  customActionIcon
) => {
  return (
    <TouchableOpacity onPress={() => customViewClick(item)}>
      <View key={item.id} style={styles.listViewItem}>
        <View style={styles.listViewItem1}>{panel}</View>
        {(customEditClick || customDeleteClick) && (
          <View style={styles.listViewItem2}>
            {customEditClick && (
              <ESIcon
                name="pencil-outline"
                customClick={() => customEditClick(item)}
              />
            )}
            {customDeleteClick && (
              <ESIcon
                name="trash-outline"
                customClick={() => customDeleteClick(item)}
              />
            )}
            {customActionClick && (
              <ESIcon
                name={customActionIcon}
                customClick={() => customActionClick(item)}
              />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const ESListView = (props) => {
  const list = props.list;
  const header = props.header;
  const customPanel = props.customPanel;
  const customAddClick = props.customAddClick;
  const customViewClick = props.customViewClick;
  const customEditClick = props.customEditClick;
  const customDeleteClick = props.customDeleteClick;
  const customActionClick = props.customActionClick;
  const customActionIcon = props.customActionIcon;

  return (
    <View>
      <View style={styles.row}>
        {header && (
          <View style={styles.listViewItem1}>
            <ESLabel text={header} />
          </View>
        )}
        {customAddClick && (
          <View style={styles.listViewItem2}>
            <ESIcon name="add-circle-outline" customClick={customAddClick} />
          </View>
        )}
      </View>
      <View style={styles.listViewItemSeparator} />
      {list != null && list.length > 0 && (
        <FlatList
          data={props.list}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            listViewItem(
              item,
              customPanel(item),
              customViewClick,
              customEditClick,
              customDeleteClick,
              customActionClick,
              customActionIcon
            )
          }
        />
      )}
      {(list == null || list.length == 0) && (
        <ESLabel text="No Records Found" />
      )}
    </View>
  );
};

export default ESListView;