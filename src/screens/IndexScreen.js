import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context, Provider } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';
require('../../assets/bg.png')
	
const IndexScreen = ({ navigation }) => {
	const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

	useEffect(() => {
		getBlogPosts();

		const listener = navigation.addListener('didFocus', () => {
			getBlogPosts();
		});

		return () => {
			listener.remove();
		};
	}, []);

	return (
		<Image>
		<View>
			<FlatList
				data={state}
				keyExtractor={(blogPost) => blogPost.title}
				ListEmptyComponent={<Text style={styles.post}>No posts to show...</Text>}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
							<View style={styles.row}>
								<Text style={styles.title}>
									{item.title} - {item.id}
								</Text>
								<TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
									<Feather style={styles.icon} name="trash" />
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
		</Image>
	);
};

IndexScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: (
			<TouchableOpacity onPress={() => navigation.navigate('Create')}>
				<Feather style={styles.create} name="plus" />
			</TouchableOpacity>
		)
	};
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderColor: 'gray'
	},
	title: {
		fontSize: 17
	},
	icon: {
		fontSize: 24
	},
	create: {
		fontSize: 30,
		marginRight: 6
	},
	post: {
		fontSize: 18,
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: 5
	},
	backgroundImage: 'url(https://mir-s3-cdn-cf.behance.net/project_modules/disp/496ecb14589707.562865d064f9e.png)'
	
});

export default IndexScreen;
