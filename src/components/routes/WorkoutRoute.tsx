import * as _ from 'lodash';
import * as React from 'react';
import makeAsyncScript from 'react-async-script';

const CLIENT_ID = '760961266236-7v3ttieeu4s6b2j0rt36u4oj6k91t96u.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDjiM8E_d4COizXHBkd-qjUYmuWpMxSiNk';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

interface WorkoutRouteProps {
  gapi: any;
}

interface ExerciseData {
  name: string;
  set: number;
  reps: number;
  weight: number;
}

interface WorkoutRouteState {
  loaded: boolean;
  exercises: string[];
  sets: ExerciseData[][];
}

function getRange() {
  const day = new Date().getDay();
  const ranges = [ 'G', 'A', 'B', 'C', 'D', 'E', 'F' ];

  return `${ranges[day]}1:${ranges[day]}100`;
}

class WorkoutRoute extends React.Component<WorkoutRouteProps, WorkoutRouteState> {
  constructor(props: WorkoutRouteProps) {
    super(props);

    this.state = { loaded: false, exercises: [], sets: [] };
  }

  public componentDidUpdate(prevProps: WorkoutRouteProps) {
    if (window.gapi && !this.state.loaded) {
      gapi.load('client', async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        const api: any = gapi.client;

        const data = await api.sheets.spreadsheets.values.get({
          spreadsheetId: '19HptMcqA_-y61FjZoXIA1ojNjGzaKDazBPGQvJFb9Qs',
          range: getRange(),
        })

        const exercises: string[] = _.slice(data.result.values, 2).map((d: any) => d[0]);

        const set = exercises.map(name => ({ name, set: 0, reps: 0, weight: 0 }));

        this.setState({ loaded: true, exercises, sets: [set] });
      });
    }
  }

  public render() {
    return (
      <div>
        {this.state.sets.map(this.makeExerciseForm)}
      </div>
    );
  }

  private makeExerciseForm(set: ExerciseData[], i: number) {
    return set.map((exercise, j) => {
      const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {...this.state};
        newState.sets[exercise.set][j].reps = parseInt(e.target.value, undefined);
        this.setState(updateState);
      };

      return <div key={`${i}${j}`} style={{ display: 'flex', flexDirection: 'row', padding: '5px' }}>
        <span style={{ flex: '1 1 0' }}>{exercise.name} - Set {exercise.set}:</span>
        <input style={{ flex: '1 1 0' }} type='number' value={exercise.reps} onChange={updateState} />
      </div>
    });
  }
}

export default makeAsyncScript("https://apis.google.com/js/api.js")(WorkoutRoute);
