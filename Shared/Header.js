  
import React from "react"
import { StyleSheet, Image, SafeAreaView } from "react-native"

export const Header = () => {
    return(
        <SafeAreaView style={styles.header}>
            <Image
                source={require("./../assets/logo.jpg")}
                resizeMode="contain"
                style={{ height: 50 }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 20
    }
})