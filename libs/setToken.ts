import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token: string) => {
        try {
                await AsyncStorage.setItem('@auth_token', token)
                return true
        } catch (e) {
                console.log(e, 'set token error');
                return false
        }
}