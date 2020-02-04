import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Context } from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
	const { state } = useContext(Context);
	const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));

	return (
		<ImageBackground source={require('../../assets/bg3.jpg')} style={{ width: '100%', height: '100%' }}>
			<View>
				<Text style={styles.postTitle}>{blogPost.title}</Text>
				<Text style={styles.postContent}>{blogPost.content}</Text>
			</View>
		</ImageBackground>
	);
};

ShowScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: (
			<TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') })}>
				<EvilIcons name="pencil" size={35} />
			</TouchableOpacity>
		)
	};
};

const styles = StyleSheet.create({
	postTitle: {
		fontSize: 18,
		alignSelf: 'center',
		paddingBottom: 10,
		marginTop: 5,
		fontWeight: '600',
		color: 'purple',
		textTransform: 'uppercase'
	},
	postContent: {
		fontSize: 16,
		marginLeft: 10
	}
});

export default ShowScreen;
