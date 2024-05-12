import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import ESSingleLabelValue from "../components/ESSingleLabelValue";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";
import ESListView from "../components/ESListView";
import ESButton from "../components/ESButton";
import ESIcon from "../components/ESIcon";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const PatientDashboard1 = ({ navigation }) => {
  let [schedules, setSchedules] = useState(null);
  const store = useContext(ESContext);
  let user = store.mainUser;

  let refreshList = () => {
    console.log("REFRESH LIST 1");
    store.getSchedules(user.id, constants.STATUS_PENDING, (list) =>
      setSchedules(list)
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshList();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  let updateStatus = (item) => {
    store.updateSchedule(item.id, constants.STATUS_COMPLETED, () => {
      refreshList();
    });
  };

  return (
    <View style={styles.viewMain}>
      <View style={styles.withPadding}>
        <ESListView
          header="Pending Schedules"
          list={schedules}
          customPanel={(item) => {
            return (
              <View>
                <ESLabel
                  text={
                    store.convertDateIntToString(item.intakeDate) +
                    " " +
                    store.convertDateIntToString2(item.intakeDate)
                  }
                />
                <ESSingleLabelValue
                  label="Drug"
                  value={item.drugName}
                  customStyle={styles.valueNoMargin}
                />
              </View>
            );
          }}
          customActionClick={(item) =>
            store.confirm(
              () => updateStatus(item),
              "Confirm",
              "Are you sure you want to tag this schedule as completed?"
            )
          }
          customActionIcon="cafe-outline"
        />
      </View>
    </View>
  );
};

export default PatientDashboard1;