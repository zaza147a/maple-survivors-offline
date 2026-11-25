export interface Point { x:number; y:number }
export interface Actor extends Point { hp:number; maxHp:number; speed:number }
export function move(p:Point, direction:Point, speed:number, seconds:number):Point {
 const length=Math.hypot(direction.x,direction.y); if (!length) return {...p};
 return {x:p.x+direction.x/length*speed*seconds,y:p.y+direction.y/length*speed*seconds};
}
export function damage(attack:number, defense:number):number { return Math.max(1,Math.floor(attack-defense)); }
export function hit(actor:Actor, amount:number):Actor { return {...actor,hp:Math.max(0,actor.hp-Math.max(0,amount))}; }
