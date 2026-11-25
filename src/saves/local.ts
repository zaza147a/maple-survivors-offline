import {jobs,type JobId} from '../jobs/catalog.ts';
export interface Save { version:1; job:JobId; level:number; xp:number }
export const key='maple-survivors.save.v1';
export function decode(raw:string):Save {
 const s=JSON.parse(raw); if(s?.version!==1 || !jobs.some(j=>j[0]===s.job) || !Number.isInteger(s.level) || s.level<1 || !Number.isFinite(s.xp) || s.xp<0) throw new Error('Invalid save');
 return {version:1,job:s.job,level:s.level,xp:s.xp};
}
export function save(s:Save, storage:Storage=localStorage){ storage.setItem(key,JSON.stringify(decode(JSON.stringify(s)))); }
