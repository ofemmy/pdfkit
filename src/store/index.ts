import { createStore } from "vuex";
export const store = createStore({
  state() {
    return {
      fileList: [
        {
          name: "Jean",
          id: 2,
        },
        {
          name: "John",
          id: 0,
        },
        {
          name: "Joao",
          id: 1,
        },
      ],
    };
  },
  mutations: {},
});
