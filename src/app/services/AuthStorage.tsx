import AsyncStorage from '@react-native-community/async-storage';

export default class AuthStorage {
	static readonly sessionToken = "session-token";

	static async getToken() {
		return await AsyncStorage.getItem(AuthStorage.sessionToken);
	}

	static async setToken(token: string) {
		return await AsyncStorage.setItem(AuthStorage.sessionToken, token);
	}

	static async removeToken() {
		return await AsyncStorage.removeItem(AuthStorage.sessionToken);
	}
}
