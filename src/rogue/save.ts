import {fresh,classes,type Profile,type Job} from './model.ts';
const key='maple-rogue.profile.v2';
export function loadProfile(storage:Storage=localStorage):Profile{try{const raw=storage.getItem(key);if(!raw)return fresh();const p=JSON.parse(raw);if(p.version!==2||!Object.hasOwn(classes,p.job)||!['xp','gold','points'].every(k=>Number.isInteger(p[k])&&p[k]>=0)||!Array.isArray(p.talents)||!p.talents.every((x:unknown)=>['power','vitality','haste'].includes(String(x)))||!Array.isArray(p.gear)||!p.gear.every((g:any)=>typeof g.id==='string'&&typeof g.name==='string'&&['power','vitality','haste'].includes(g.affix)&&Number.isFinite(g.value)&&g.value>=0)||!(p.equipped===null||p.gear.some((g:any)=>g.id===p.equipped)))throw Error('bad profile');return p as Profile}catch{return fresh()}}
export function saveProfile(p:Profile,storage:Storage=localStorage){storage.setItem(key,JSON.stringify(p))}
export function changeJob(p:Profile,job:Job):Profile{return {...p,job}}
