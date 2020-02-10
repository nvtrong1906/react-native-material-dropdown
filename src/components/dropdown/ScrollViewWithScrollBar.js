import React, { Component } from "react";
import { Platform, View, FlatList, TouchableOpacity } from "react-native";

class SBScrollView extends Component {
  state = { hScroll: 0, showScrollBar: false };

  componentWillMount() {
    if (this.props.persistentScrollbar) {
      this.setState({ showScrollBar: true });
    }
  }

  render() {
    const { persistentScrollbar, ...attributes } = this.props;

    if (Platform.OS == "android" || !persistentScrollbar) {
      // Abdroid supports the persistentScrollbar
      return (
        <FlatList persistentScrollbar={persistentScrollbar} {...attributes}>
          {this.props.children}
        </FlatList>
      );
    }

    const { hScroll, showScrollBar } = this.state;
    
    return (
      <FlatList
        ref="FlatList"
        showsVerticalScrollIndicator={false}
        onScroll={event => {
          const ratio =
            event.nativeEvent.contentSize.height /
            event.nativeEvent.layoutMeasurement.height;
          let hScroll;
          if (ratio <= 1) {
            this.setState({ showScrollBar: false });
          } else {
            const hScroll = event.nativeEvent.contentOffset.y * ratio;
            this.setState({ hScroll, showScrollBar: true });
          }
        }}
        {...attributes}
      >
        {this.props.children}
        {showScrollBar && (
          <View
            style={{
              position: "absolute",
              top: hScroll,
              right: 3,
              backgroundColor: "#a6a6a6",
              height: 160,
              width: 2
            }}
          ></View>
        )}
      </FlatList>
    );
  }
}

export default SBScrollView;