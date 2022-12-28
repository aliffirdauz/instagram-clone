import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image, FlatList, Button } from 'react-native'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
require("firebase/compat/firestore")

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../redux/actions/index';

function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {

        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }
                const user = props.users.find(x => x.uid === comments[i].creator)
                if (user === undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                } else {
                    comments[i].user = user;
                }
            }
            setComments(comments)
        }

        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .doc(props.route.params.postId)
                .collection("comments")
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    matchUserToComment(comments);
                })
            setPostId(props.route.params.postId)
        }
        else {
            matchUserToComment(comments);
        }
    }, [props.route.params.postId, props.users])

    const onCommentSend = () => {
        firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .doc(props.route.params.postId)
            .collection("comments")
            .add({
                creator: firebase.auth().currentUser.uid,
                text,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.commentsContainer}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={comments}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            {item.user !== undefined ?
                                <Text style={styles.name}>{item.user.name}</Text>
                                : null}
                            <Text style={styles.comment}>{item.text}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.commentContainer}>
                <TextInput
                    style={styles.comment}
                    placeholder="Comment..."
                    onChangeText={(text) => setText(text)}
                />
                <Button
                    title="Send"
                    onPress={() => onCommentSend()}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    users: store.userState.users
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Comment)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commentsContainer: {
        flex: 1,
    },
    commentContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
    },
    comment: {
        width: "85%",
        fontSize: 18,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
})
