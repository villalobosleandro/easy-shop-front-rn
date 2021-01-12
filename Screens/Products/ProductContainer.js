import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Icon, Item, Input, Text } from 'native-base';

import { ProductList } from './ProductList';
import { SearchedProduct  } from './SearchedProduct ';
import { Banner } from './../../Shared/Banner';
import { CategoryFilter } from './CategoryFilter';

const data = require('./../../assets/data/products.json');
const productsCategories = require('./../../assets/data/categories.json');
var { height } = Dimensions.get('window')

const ProductContainer = (props) => {

  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState()
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productsCategories);
    setProductsCtg(data);
    setActive(-1);
    setInitialState(data);

    return() => {
      setProducts([])
      setProductsFiltered([])
      setFocus()
      setCategories([])
      setActive()
      setInitialState()
    }
  }, [])

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
            products.filter((i) => i.category.$oid === ctg),
            setActive(true)
          )
        ]
    }
  }

  
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name='ios-search'/>
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus ? (
            <Icon onPress={closeSearch} name='ios-close'/>
          ) : null}
        </Item>
      </Header>
      {focus ? (
        <SearchedProduct
          productsFiltered={productsFiltered}
          navigation={props.navigation}
        />
      ): (
        <ScrollView>
          <View style={styles.container}>
              <View>
                <Banner/>
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
                    {productsCtg. map((item) => {
                      return(
                        <ProductList
                          navigation={props.navigation}
                          key={item._id.$oid}
                          item={item}
                        />
                      )
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, {height: height / 2}]}>
                    <Text>No products found</Text>
                  </View>
                )
              }
              
            </View>
        </ScrollView>
      )}
      
    </Container>
    
  )
}

const styles = StyleSheet.create({
  container: {
    // flexWrap: "wrap",
    // backgroundColor: "gainsboro",
    flex: 1
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