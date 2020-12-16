export const ClientStore = {
    state: () => ({
        client: undefined,
    }),
    getters: {
        getClient(client) {
            return client;
        }
    }
}