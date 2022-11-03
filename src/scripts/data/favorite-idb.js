import { openDB } from 'idb';
import config from '../global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = config;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    },
});

const FavoriteRestaurantIdb = {
    async getRestaurant(id) {
        return (await dbPromise).get(OBJECT_STORE_NAME, id);
    },

    async getAllRestaurant() {
        return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },

    async addRestauarant(restaurant) {
        return (await dbPromise).add(OBJECT_STORE_NAME, restaurant);
    },

    async putRestauarant(restaurant) {
        return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    },

    async deleteRestaurant(id) {
        return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    },
};

export default FavoriteRestaurantIdb;