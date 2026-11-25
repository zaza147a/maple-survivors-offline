import test from 'node:test';import assert from 'node:assert/strict';
import {maple} from '../modules/maple/index.ts';import {Registry,validateModule} from '../src/module-loader/registry.ts';import {playableClasses} from '../src/module-loader/active.ts';
test('Maple module has twelve unique jobs and four playable prototypes',()=>{validateModule(maple);assert.equal(maple.jobs.length,12);assert.equal(Object.keys(playableClasses).length,4)});
test('registry rejects duplicate module',()=>{const r=new Registry();r.register(maple);assert.equal(r.get('maple'),maple);assert.throws(()=>r.register(maple));assert.throws(()=>r.get('missing'))});
test('invalid API and duplicated jobs rejected',()=>{assert.throws(()=>validateModule({...maple,apiVersion:2 as 1}));assert.throws(()=>validateModule({...maple,jobs:[maple.jobs[0],maple.jobs[0]]}))});
test('dangling sprite and skill references rejected',()=>{assert.throws(()=>validateModule({...maple,monsters:[{id:'m',name:'m',hp:10,sprite:'missing'}]}));assert.throws(()=>validateModule({...maple,skills:[{id:'s',name:'s',job:'missing',kind:'attack'}]}))});
