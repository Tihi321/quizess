/* global quizessOptions, userLogged */
import {getFrontendParam, postFrontend} from './api';

export async function getQuizessData(quizId) {
  const {nonce} = userLogged;
  const {quizApi} = quizessOptions;

  const params = {
    method: 'GET',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
  };

  if (nonce) {
    params.headers['X-WP-Nonce'] = nonce;
  }

  return getFrontendParam(`${quizApi}${quizId}`, params).then((res) => res.json());
}

export async function saveScoresData(body) {
  const {scoresApi} = userLogged;

  return postFrontend(scoresApi, body).then((res) => res.json());
}
