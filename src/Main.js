import React, { useState, useEffect, useContext } from "react";
import { styles, navOptions } from "./helpers/styles";
import * as strings from "./helpers/strings";
import * as constants from "./helpers/constants";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./pages/HomeScreen";
import RegisterUser from "./pages/RegisterUser";
import UpdateUser from "./pages/UpdateUser";
import ViewUser from "./pages/ViewUser";
import ViewAllUser from "./pages/ViewAllUser";
import DeleteUser from "./pages/DeleteUser";

import ESContext from "./ESContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import AddPatient from "./pages/AddPatient";
import ViewPatient from "./pages/ViewPatient";
import AddPrescription from "./pages/AddPrescription";

import { Text } from "react-native";
import ESIcon from "./components/ESIcon";

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

  useEffect(() => {
    store.initializeAllTables(() =>
      store.initializeMainUser(() => initializeScreen())
    );
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
              title: "Profile",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: "Dashboard",
              // headerTitle: () => <Text>HELLO</Text>,
              headerRight: () => (
                <ESIcon
                  name="settings-outline"
                  color="#ffffff"
                  customClick={() => navigationRef.navigate("Profile")}
                />
              ),
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
              title: "Add Patient",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="ViewPatient"
            component={ViewPatient}
            options={{
              title: "View Patient",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="AddPrescription"
            component={AddPrescription}
            options={{
              title: "Add Prescription",
              ...navOptions,
            }}
          />
          {/* <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Home",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="View"
            component={ViewUser}
            options={{
              title: "View User",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="ViewAll"
            component={ViewAllUser}
            options={{
              title: "View Users",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Update"
            component={UpdateUser}
            options={{
              title: "Update User",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterUser}
            options={{
              title: "Register User",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Delete"
            component={DeleteUser}
            options={{
              title: "Delete User",
              ...navOptions,
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};
export default Main;
