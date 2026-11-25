import {Registry} from './registry.ts';
import {maple} from '../../modules/maple/index.ts';
export const registry=new Registry();registry.register(maple);
export const activeModule=maple;
export type PlayableJob=Extract<typeof maple.jobs[number],{prototype:unknown}>['id'];
export const playableClasses=Object.fromEntries(maple.jobs.flatMap(j=>'prototype' in j?[[j.id,{name:j.name,...j.prototype}]]:[])) as Record<PlayableJob,{name:string;power:number;hp:number;range:number;cooldown:number}>;
