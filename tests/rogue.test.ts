import test from 'node:test';import assert from 'node:assert/strict';
import {fresh,start,routes,chooseRoom,clearRoom,offers,bless,hurt,settle,allocate,stats,equip} from '../src/rogue/model.ts';
test('seeded routes and distinct offers',()=>{const r=start(fresh(),42);assert.deepEqual(routes(r),routes(start(fresh(),42)));assert.equal(new Set(offers(r)).size,3)});
test('full run and permanent rewards',()=>{let p=fresh(),r=start(p,42);for(let i=0;i<5;i++){r=chooseRoom(r,routes(r)[0]);if(r.phase==='combat')r=clearRoom(r);if(r.phase==='reward')r=bless(r,offers(r)[0])}assert.equal(r.status,'won');p=settle(p,r);assert.equal(p.xp,100);assert.equal(p.points,3);assert.ok(p.gear.length);assert.equal(start(p,99).blessings.length,0);assert.equal(equip(p,p.gear[0].id).equipped,p.gear[0].id)});
test('death discards loot',()=>{const p=fresh();const r=hurt(chooseRoom(start(p,1),'battle'),999);assert.equal(r.status,'lost');assert.deepEqual(settle(p,r),p)});
test('permanent talent affects stats and consumes point',()=>{const p=fresh();const q=allocate(p,'power');assert.equal(q.points,1);assert.equal(stats(q).power,stats(p).power+6);assert.throws(()=>allocate({...p,points:0},'power'))});
test('phase prevents duplicate room reward',()=>{const r=clearRoom(chooseRoom(start(fresh(),1),'battle'));assert.throws(()=>clearRoom(r));assert.throws(()=>chooseRoom(r,'battle'))});
