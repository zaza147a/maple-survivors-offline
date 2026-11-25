import {activeModule} from '../module-loader/active.ts';
export const jobs=activeModule.jobs.map(j=>[j.id,j.name,j.attribute,j.weapons[0]] as const);
export type JobId=typeof jobs[number][0];
