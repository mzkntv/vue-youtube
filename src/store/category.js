import firebase from 'firebase/app';

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};

        // Object.keys(categories).forEach((key) => {
        //   cats.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key,
        //   });
        // });
        // return cats;

        return Object.keys(categories).map((key) => ({ ...categories[key], id: key }));
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit });
        return { title, limit, id: category.key };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
