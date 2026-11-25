import type {ContentModule} from './types.ts';
export function validateModule(m:ContentModule):void {
 if(m.apiVersion!==1||!m.id||!m.version)throw Error('unsupported module');
 for(const list of [m.jobs,m.sprites,m.monsters,m.skills]) {const ids=new Set<string>();for(const x of list){if(!x.id||ids.has(x.id))throw Error('duplicate or empty id: '+x.id);ids.add(x.id)}}
 for(const j of m.jobs){if(!j.name||!['STR','DEX','INT','LUK'].includes(j.attribute)||!j.weapons.length)throw Error('invalid job');if(j.prototype&&Object.values(j.prototype).some(x=>!Number.isFinite(x)||x<=0))throw Error('invalid combat stats')}
 for(const s of m.sprites){if(!s.texture||!s.frames.length||!Number.isFinite(s.fps)||s.fps<=0||s.anchor.length!==2||s.anchor.some(x=>!Number.isFinite(x)||x<0||x>1))throw Error('invalid sprite')}
 for(const x of m.monsters)if(!m.sprites.some(s=>s.id===x.sprite)||!Number.isFinite(x.hp)||x.hp<=0)throw Error('invalid monster');
 for(const x of m.skills)if(!m.jobs.some(j=>j.id===x.job))throw Error('unknown skill job');
}
export class Registry {private modules=new Map<string,ContentModule>();register(m:ContentModule){validateModule(m);if(this.modules.has(m.id))throw Error('duplicate module');this.modules.set(m.id,m)}get(id:string){const m=this.modules.get(id);if(!m)throw Error('unknown module');return m} }
