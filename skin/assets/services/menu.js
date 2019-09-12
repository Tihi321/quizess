/* global quizessOptions */
import {getFrontend} from './api';

export async function getMenuData() {
  const {menusApi} = quizessOptions;

  return getFrontend(menusApi).then((res) => res.json());
}
