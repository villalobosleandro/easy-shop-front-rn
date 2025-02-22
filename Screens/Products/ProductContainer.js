import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Icon, Item, Input, Text } from 'native-base';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import ProductList from './ProductList';
import { SearchedProduct } from './SearchedProduct ';
import { Banner } from './../../Shared/Banner';
import { CategoryFilter } from './CategoryFilter';
import baseUrl from './../../assets/common/baseUrl';

var { height } = Dimensions.get('window')

const ProductContainer = (props) => {

  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState()
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect((
    useCallback(
      () => {
        setFocus(false);
        setActive(-1);

        // Products
        axios
          .get(`${baseUrl}products`)
          .then((res) => {
            setProducts(res.data);
            setProductsFiltered(res.data);
            setProductsCtg(res.data);
            setInitialState(res.data);
            setLoading(false)
          })
          .catch((error) => {
            console.log('Api call error products porductsContainer', error)
          })

        // Categories
        axios
          .get(`${baseUrl}categories`)
          .then((res) => {
            setCategories(res.data)
          })
          .catch((error) => {
            console.log('Api call error categories porductsContainer', error)
          })

        return () => {
          setProducts([]);
          setProductsFiltered([]);
          setFocus();
          setCategories([]);
          setActive();
          setInitialState();
        };
      },
      [],
    )
  ))

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  }

  const closeSearch = () => {
    setFocus(false);
  }

  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
          setProductsCtg(
            products.filter((i) => i.category._id === ctg),
            setActive(true)
          )
        ]
    }
  }


  return (
    <>
      {
        loading == false ? (
          <Container>
            <Header searchBar rounded>
              <Item>
                <Icon name='ios-search' />
                <Input
                  placeholder="Search"
                  onFocus={openList}
                  onChangeText={(text) => searchProduct(text)}
                />
                {focus ? (
                  <Icon onPress={closeSearch} name='ios-close' />
                ) : null}
              </Item>
            </Header>
            {focus ? (
              <SearchedProduct
                productsFiltered={productsFiltered}
                navigation={props.navigation}
              />
            ) : (
                <ScrollView>
                  <View>
                    <View>
                      <Banner />
                    </View>

                    <View>
                      <CategoryFilter
                        categories={categories}
                        CategoryFilter={changeCtg}
                        productsCtg={productsCtg}
                        active={active}
                        setActive={setActive}
                      />
                    </View>
                    {
                      productsCtg.length > 0 ? (
                        <View style={styles.listContainer}>
                          {productsCtg.map((item) => {
                            return (
                              <ProductList
                                navigation={props.navigation}
                                key={item.name}
                                item={item}
                              />
                            )
                          })}
                        </View>
                      ) : (
                          <View style={[styles.center, { height: height / 2 }]}>
                            <Text>No products found</Text>
                          </View>
                        )
                    }

                  </View>
                </ScrollView>
              )}

          </Container>
        ) : (
            <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
              <ActivityIndicator size={'large'} color={'blue'} />
            </Container>
          )
      }
    </>


  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro"
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductContainer;