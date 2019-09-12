/* global quizessOptions, quizessDashboard, userLogged */

export function getFrontend(model) {
  const {
    root,
  } = quizessOptions;
  return fetch(`${root}${model}`);
}

export function getFrontendParam(model, params) {
  const {
    root,
  } = quizessOptions;
  return fetch(`${root}${model}`, params);
}

export function postFrontend(model, body) {
  const {
    root,
  } = quizessOptions;
  const {
    nonce,
  } = userLogged;
  return fetch(`${root}${model}`, {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'X-WP-Nonce': nonce,
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(body),
  });
}

export function getBackend(model) {
  const {
    root,
  } = quizessDashboard;
  return fetch(`${root}${model}`);
}

export function patchBackend(model, body) {
  const {
    root,
    dashboardNonce,
    nonce,
  } = quizessDashboard;
  return fetch(`${root}${model}`, {
    method: 'PATCH',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'X-WP-Nonce': nonce,
      'dashboard-nonce': dashboardNonce,
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(body),
  });
}
