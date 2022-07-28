import React from "react";
import { SafeAreaView, StyleSheet, Text, Linking } from "react-native";
import { auth } from "./firebase";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";

const SidebarMenu = (props) => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Avatar
        style={styles.avatar}
        image={{ uri: auth.currentUser?.photoURL }}
      />
      <Text style={[styles.avatar, styles.emailStyle]}>
        {auth.currentUser?.email}
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="About Us"
          onPress={() => Linking.openURL("https://aboutreact.com/")}
        />
        <DrawerItem
          label="Contact Us"
          onPress={() => Linking.openURL("https://www.itworx.com/contact/")}
        />
        <DrawerItem label="Logout " onPress={handleSignOut} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: { alignSelf: "center", margin: 5 },
  emailStyle: { fontWeight: "bold", marginTop: 14 },
});

export default SidebarMenu;
