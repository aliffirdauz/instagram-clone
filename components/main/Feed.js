import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';

import firebase from 'firebase/compat/app';
require("firebase/compat/firestore")

function Feed(props) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let posts = [];
    if (props.usersFollowingLoaded == props.following.length) {
      for (let i = 0; i < props.following.length; i++) {  
        const user = props.users.find(el => el.uid === props.following[i]);
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }

      posts.sort(function (x, y) {
        return x.creation - y.creation;
      })
      console.log(posts);
      setPosts(posts);
    }

  }, [props.usersFollowingLoaded])

  return (
    <View style={styles.container} >
      <View style={styles.containerGallery} >
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.container}>{item.user.name}</Text>
              <Image
                style={styles.image}
                source={{ uri: item.downloadURL }}
              />
              <Text
                onPress={() =>
                  props.navigation.navigate('Comment',
                    { postId: item.id, uid: item.user.uid })
                }>
                View Comments...
              </Text>

            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1
  },
  containerImage: {
    flex: 1 / 3
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1
  },

})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
})

export default connect(mapStateToProps, null)(Feed);