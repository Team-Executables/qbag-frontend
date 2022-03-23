import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      //   if (newValue instanceof DefaultValue) {
      //     localStorage.removeItem(key);
      //   } else {
      localStorage.setItem(key, JSON.stringify(newValue));
      //   }
    });
  };

export const userData = atom({
  key: "userData",
  default: {},
  effects_UNSTABLE: [localStorageEffect("userData")],
});

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isLoggedIn")],
});

export const question = atom({
  key: "question",
  default: {
    title: "",
    options: [
      {
        option: "",
        correct: true,
      },
    ],
  },
});

export const resQues = atom({
  key: "resQues",
  default: [],
  effects_UNSTABLE: [localStorageEffect("resQues")],
});
