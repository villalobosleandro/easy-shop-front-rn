import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { Toast } from 'native-base';

import EasyButton from "./../../Shared/StyledComponents/EasyButton"
import baseURL from "./../../assets/common/baseUrl";

var { width, height } = Dimensions.get("window")

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}categories/`)
      .then((res) => {
        setCategories(res.data)
        setLoading(false);
      })
      .catch((error) => alert("Error to load categories"))

    return () => {
      setCategories();
      setToken();
    }
  }, [])

  const Item = (props) => {
    return (
      <View style={styles.item}>
        <Text>{props.item.name}</Text>
        <EasyButton
          danger
          medium
          onPress={() => props.delete(props.item._id)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
        </EasyButton>
      </View>
    )
  }

  const addCategory = () => {
    const category = {
      name: categoryName
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    axios
      .post(`${baseURL}categories`, category, config)
      .then((res) => {
        setCategories([...categories, res.data])
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "New Category added",
          text2: ""
        });
      })
      .catch((error) => alert("Error to load categories"));

    setCategoryName("");
  }

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Category deleted successfully",
          text2: ""
        });
      })
      .catch((error) => alert("Error to load categories"));
  }

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <View style={{ marginBottom: 60 }}>
        {
          loading ? (
            <View style={styles.spinner}>
              <ActivityIndicator size={'large'} color={'blue'} />
            </View>
          ) : (
              <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  return (
                    <Item item={item} key={index} index={index} delete={deleteCategory} />
                  )
                }}
              />
            )
        }

      </View>

      <View style={styles.bottomBar}>
        <View>
          <Text>Add Category</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
            style={styles.input}
          />
        </View>

        <View>
          <EasyButton
            medium
            primary
            onPress={() => addCategory()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    alignContent: 'center'
  },
})

export default Categories;