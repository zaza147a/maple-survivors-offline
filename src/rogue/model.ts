import {playableClasses,type PlayableJob} from '../module-loader/active.ts';
export type Job = PlayableJob;
export type Room = 'battle'|'elite'|'rest'|'treasure'|'boss';
export type Affix = 'power'|'vitality'|'haste';
export type Blessing = 'power'|'vitality'|'haste'|'pierce'|'leech';
export interface Gear { id:string; name:string; affix:Affix; value:number }
export interface Profile { version:2; job:Job; xp:number; gold:number; points:number; talents:Affix[]; gear:Gear[]; equipped:string|null }
export interface Run { seed:number; depth:number; hp:number; maxHp:number; blessings:Blessing[]; loot:Gear[]; xp:number; gold:number; status:'active'|'won'|'lost'; phase:'route'|'combat'|'reward'|'finished'; room:Room|null }
export const classes = playableClasses;
export const blessings:Blessing[]=['power','vitality','haste','pierce','leech'];
export const labels={power:'強擊',vitality:'生命',haste:'迅捷',pierce:'連鎖',leech:'汲取'};
export function fresh(job:Job='hero'):Profile{return {version:2,job,xp:0,gold:0,points:2,talents:[],gear:[],equipped:null}}
export function rng(seed:number){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
export function routes(run:Run):Room[]{if(run.depth===4)return ['boss'];const r=rng(run.seed+run.depth*97);return ['battle',(['elite','rest','treasure'] as const)[Math.floor(r()*3)]]}
export function stats(p:Profile,r?:Run){const b=classes[p.job];const g=p.gear.find(x=>x.id===p.equipped);const count=(a:Blessing)=>p.talents.filter(x=>x===a).length+(r?.blessings.filter(x=>x===a).length||0);return {power:b.power+count('power')*6+(g?.affix==='power'?g.value:0),hp:b.hp+count('vitality')*20+(g?.affix==='vitality'?g.value:0),range:b.range,cooldown:Math.max(.15,b.cooldown-count('haste')*.06-(g?.affix==='haste'?g.value/100:0)),pierce:1+count('pierce'),leech:count('leech')*2}}
export function start(p:Profile,seed:number):Run{const hp=stats(p).hp;return {seed,depth:0,hp,maxHp:hp,blessings:[],loot:[],xp:0,gold:0,status:'active',phase:'route',room:null}}
export function chooseRoom(r:Run,room:Room):Run{if(r.status!=='active'||r.phase!=='route'||!routes(r).includes(room))throw Error('invalid route');const next={...r,room,phase:'combat' as const};if(room==='rest')return clearRoom({...next,hp:Math.min(r.maxHp,r.hp+30)});if(room==='treasure')return clearRoom(next);return next}
export function clearRoom(r:Run):Run{if(r.phase!=='combat'||r.status!=='active')throw Error('invalid clear');const random=rng(r.seed+r.depth*131);const affix=(['power','vitality','haste'] as const)[Math.floor(random()*3)];const drop=r.room==='elite'||r.room==='boss'||r.room==='treasure';const loot=drop?[...r.loot,{id:`${r.seed}-${r.depth}`,name:`遺跡${labels[affix]}護符`,affix,value:4+Math.floor(random()*7)}]:r.loot;return {...r,loot,gold:r.gold+10,xp:r.xp+20,phase:r.room==='boss'?'finished':'reward',status:r.room==='boss'?'won':'active'}}
export function offers(r:Run):Blessing[]{const random=rng(r.seed+r.depth*241);const pool=[...blessings];return Array.from({length:3},()=>pool.splice(Math.floor(random()*pool.length),1)[0])}
export function bless(r:Run,b:Blessing):Run{if(r.phase!=='reward'||!offers(r).includes(b))throw Error('invalid blessing');return {...r,depth:r.depth+1,phase:'route',room:null,blessings:[...r.blessings,b],hp:r.hp+(b==='vitality'?20:0),maxHp:r.maxHp+(b==='vitality'?20:0)}}
export function hurt(r:Run,n:number):Run{if(r.phase!=='combat')return r;const hp=Math.max(0,r.hp-Math.max(0,n));return {...r,hp,status:hp?'active':'lost',phase:hp?'combat':'finished'}}
export function settle(p:Profile,r:Run):Profile{if(r.status!=='won')return p;const xp=p.xp+r.xp;return {...p,xp,gold:p.gold+r.gold,points:p.points+Math.floor(xp/100)-Math.floor(p.xp/100),gear:[...p.gear,...r.loot]}}
export function allocate(p:Profile,a:Affix):Profile{if(p.points<=0||!['power','vitality','haste'].includes(a)||p.talents.filter(x=>x===a).length>=5)throw Error('invalid talent');return {...p,points:p.points-1,talents:[...p.talents,a]}}
export function equip(p:Profile,id:string):Profile{if(!p.gear.some(g=>g.id===id))throw Error('unknown gear');return {...p,equipped:id}}
