import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Context, Provider } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

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
		<ImageBackground source={require('../../assets')} style={{ width: '100%', height: '100%' }}>
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
		</ImageBackground>
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
		fontSize: 17,
		color: 'white'
	},
	icon: {
		fontSize: 24,
		color: 'red'
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
	}
});

export default IndexScreen;
