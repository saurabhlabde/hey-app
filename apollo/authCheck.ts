import AsyncStorage from '@react-native-community/async-storage';

export const authCheck = async () => {
        try {
                const token = await AsyncStorage.getItem('@auth_token')
                if (token !== null) {
                        return true
                }
        } catch (error) {
                console.log(error, 'error auth check');

                return false
        }
}