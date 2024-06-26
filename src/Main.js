import React, { useState, useEffect, useContext } from "react";
import styles, { navOptions } from "./helpers/styles";
import * as strings from "./helpers/strings";
import * as constants from "./helpers/constants";
import { View, Alert } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ESContext from "./ESContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import AddPatient from "./pages/AddPatient";
import ViewPatient from "./pages/ViewPatient";
import AddPrescription from "./pages/AddPrescription";
import AddDrug from "./pages/AddDrug";
import ViewPrescription from "./pages/ViewPrescription";
import ViewPdf from "./pages/ViewPdf";
import ScanQr from "./pages/ScanQr";
import ViewTemplate from "./pages/ViewTemplate";
import AddTemplate from "./pages/AddTemplate";
import EditTotal from "./pages/EditTotal";
import InputStartTime from "./pages/InputStartTime";
import ESButton from "./components/ESButton";
import { Text } from "react-native";
import ESIcon from "./components/ESIcon";
import PushNotification, { Importance } from "react-native-push-notification";

const Stack = createNativeStackNavigator();

const Main = () => {
  let [initialPage, setInitialPage] = useState(null);
  const store = useContext(ESContext);
  const navigationRef = useNavigationContainerRef();
  initializeScreen = () => {
    let tempPage = "Home";
    let type = store.mainUser.type;
    if (type != null) {
      tempPage = "Dashboard";
    }
    setInitialPage(tempPage);
  };

  createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: constants.CHANNEL_ID, // (required)
        channelName: constants.CHANNEL_NAME, // (required)
        channelDescription: constants.CHANNEL_NAME, // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log("CHANNEL CREATED", created) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  useEffect(() => {
    store.initializeAllTables(() =>
      store.initializeMainUser(() => initializeScreen())
    );
    this.createChannel();
  }, []);

  return (
    initialPage && (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={initialPage}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "My Profile",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: "Dashboard",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="DoctorDashboard"
            component={DoctorDashboard}
            options={{
              title: "Doctor Dashboard",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="PatientDashboard"
            component={PatientDashboard}
            options={{
              title: "Patient Dashboard",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="AddPatient"
            component={AddPatient}
            options={{
              title: "Manage Patient",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="ViewPatient"
            component={ViewPatient}
            options={{
              title: "Patient Details",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="AddPrescription"
            component={AddPrescription}
            options={{
              title: "Manage Prescription",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="AddDrug"
            component={AddDrug}
            options={{
              title: "Manage Drug",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="ViewPrescription"
            component={ViewPrescription}
            options={{
              title: "Prescription Details",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="ViewPdf"
            component={ViewPdf}
            options={{
              title: "View QR Code",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="ScanQr"
            component={ScanQr}
            options={{
              title: "Scan QR Code",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="ViewTemplate"
            component={ViewTemplate}
            options={{
              title: "Custom Templates",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="AddTemplate"
            component={AddTemplate}
            options={{
              title: "Manage Template",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="EditTotal"
            component={EditTotal}
            options={{
              title: "Replenish Total",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="InputStartTime"
            component={InputStartTime}
            options={{
              title: "Input Start Time",
              ...navOptions,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};
export default Main;
