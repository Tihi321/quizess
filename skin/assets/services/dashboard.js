/* global quizessDashboard */
import {getBackend, patchBackend} from './api';

export async function getDashboardData() {
  const {dashboardApi} = quizessDashboard;

  return getBackend(dashboardApi).then((res) => res.json());
}

export async function patchScoresData(body) {
  const {scoresApi} = quizessDashboard;

  return patchBackend(scoresApi, body).then((res) => res.json());
}

export async function savaOptionsData(body) {
  const {optionsApi} = quizessDashboard;

  return patchBackend(optionsApi, body).then((res) => res.json());
}
