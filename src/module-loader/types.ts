export type Attribute = 'STR'|'DEX'|'INT'|'LUK';
export interface JobDefinition { id:string; name:string; attribute:Attribute; weapons:readonly string[]; prototype?:{power:number;hp:number;range:number;cooldown:number} }
export interface SpriteDefinition {id:string; texture:string; frames:readonly string[]; fps:number; anchor:readonly [number,number]}
export interface ContentModule {id:string; version:string; apiVersion:1; jobs:readonly JobDefinition[]; sprites:readonly SpriteDefinition[]; monsters:readonly {id:string;name:string;sprite:string;hp:number}[]; skills:readonly {id:string;job:string;name:string;kind:string}[]}
