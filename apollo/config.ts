import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { setContext } from "apollo-link-context";
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
        ApolloClient,
        InMemoryCache,
        NormalizedCacheObject,
} from '@apollo/client'

interface Definition {
        kind: string;
        operation?: string;
}

// const environment: boolean = process.env.NODE_ENV === 'development'

const environment: boolean = true

// const URL: string = environment ? 'http://localhost:5000/graphql' : 'https://discourse-007.herokuapp.com/graphql'

const URL: string = 'http://10.0.2.2:5000/graphql'

// const URL_WS: string = environment ? 'ws://localhost:5000/graphql' : 'wss://discourse-007.herokuapp.com/graphql'

const URL_WS: string = 'ws://10.0.2.2:5000/graphql'

const token = async () => {
        return await AsyncStorage.getItem('@auth_token')
}

const wsLink = new WebSocketLink({
        uri: URL_WS,
        options: {
                lazy: true,
                reconnect: true,
                connectionParams: async () => {
                        return {
                                headers: {
                                        Authorization: `Bearer ${await token()}`,
                                        authToken: await token()
                                },
                        }
                },
        },
})

const httpLink = new HttpLink({
        uri: URL,
});

const authLink = setContext(async () => {
        return {
                headers: {
                        Authorization: `Bearer ${await token()}`,
                },
        };
});

const link: any = split(
        ({ query }) => {
                const { kind, operation }: Definition = getMainDefinition(query);
                return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        authLink.concat(httpLink)
)

export const cache = new InMemoryCache({})

export default new ApolloClient({
        link,
        cache,
});
