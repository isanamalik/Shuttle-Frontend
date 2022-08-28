import * as React from "react";
import {StyleSheet,View,Text,TouchableWithoutFeedback, Dimensions} from "react-native";

//Config

//Packages
import DropDownPicker from "react-native-dropdown-picker";
import appColors from "../colors";

const WINDOW_WIDTH = Dimensions.get('window').width;

const DropDown = ({
  placeholder,
  zIndex,
  zIndexInverse,
  open,
  value,
  items,
  setOpen,
  onOpen,
  setValue,
}) => {
  return (
    <View>
      <DropDownPicker
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        placeholder={placeholder}
        placeholderStyle={styles.placeHolderStyle}
        style={[
          styles.dropDownStyle,
          { width: '100%' },
        ]}
        searchTextInputStyle={styles.searchInput}
        searchContainerStyle={styles.searchContainer}
        selectedItemLabelStyle={styles.selectedItemLabel}
        listItemContainerStyle={[
          styles.listItemContainer,
          { width: '100%' },
        ]}
        containerStyle={[
          styles.dropContainer,
          { width: '100%' },
        ]}
        itemSeparator={true}
        listItemLabelStyle={{ fontSize: 10, marginLeft: 10, textAlign:'left' }}
        //searchable={true}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        onOpen={onOpen}
        setValue={setValue}
        flatListProps={{
          showsVerticalScrollIndicator: false,
          keyboardShouldPersistTaps: "always",
        }}
        renderListItem={(props) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                props.onPress(props["item"]);
              }}
            >
                <Text
                  style={{
                    fontSize: 14,
                    color: appColors.primary,
                    paddingLeft: 10,
                    paddingVertical: 10,
                  }}
                >
                  {props.item.label}
                </Text>
            </TouchableWithoutFeedback>
          );
        }}
        // listMode="MODAL"
        modalContentContainerStyle={{
          backgroundColor: appColors.lightGray,
        }}
        customItemContainerStyle={{
          borderWidth: 1,
        }}
        customItemLabelStyle={{
          borderWidth: 1,
        }}
        listParentContainerStyle={{
          borderWidth: 1,
        }}
        listChildContainerStyle={{
          borderWidth: 1,
        }}
        dropDownContainerStyle={{
          borderWidth: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: appColors.lightGray,
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    justifyContent:'center',
    marginVertical: 15,
  },
  searchContainer: {
    borderWidth: 0,
  },
  selectedItemLabel: {
    fontSize: 12,
    color: appColors.primary,
  },
  listItemContainer: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  dropContainer: {
    borderWidth: 0,
  },
  placeHolderStyle: {
    color: appColors.primary,
    fontSize: 14,
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: 14,
    color: appColors.primary,
   // marginLeft: WINDOW_WIDTH * 0.02,
    fontFamily: "Poppins-Regular",
  },
});

export default DropDown;
