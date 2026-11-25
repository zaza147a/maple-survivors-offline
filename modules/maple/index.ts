import type {ContentModule} from '../../src/module-loader/types.ts';
export const maple = {id:'maple',version:'0.0.3',apiVersion:1,jobs:[
{id:'hero',name:'英雄',attribute:'STR',weapons:['sword','shield','greatsword'],prototype:{power:18,hp:120,range:80,cooldown:.55}},
{id:'paladin',name:'聖騎士',attribute:'STR',weapons:['mace','shield','greatmace']},
{id:'dark-knight',name:'黑騎士',attribute:'STR',weapons:['spear','polearm']},
{id:'fire-poison',name:'火毒大魔導士',attribute:'INT',weapons:['wand','staff']},
{id:'ice-lightning',name:'冰雷大魔導士',attribute:'INT',weapons:['wand','staff'],prototype:{power:26,hp:80,range:230,cooldown:.8}},
{id:'bishop',name:'主教',attribute:'INT',weapons:['wand','staff']},
{id:'bowmaster',name:'箭神',attribute:'DEX',weapons:['bow'],prototype:{power:14,hp:90,range:270,cooldown:.42}},
{id:'marksman',name:'神射手',attribute:'DEX',weapons:['crossbow']},
{id:'night-lord',name:'夜使者',attribute:'LUK',weapons:['claw'],prototype:{power:22,hp:85,range:210,cooldown:.65}},
{id:'shadower',name:'暗影神偷',attribute:'LUK',weapons:['dagger','shield']},
{id:'buccaneer',name:'拳霸',attribute:'STR',weapons:['knuckle']},
{id:'corsair',name:'槍神',attribute:'DEX',weapons:['gun']}
],sprites:[],monsters:[],skills:[]} as const satisfies ContentModule;
