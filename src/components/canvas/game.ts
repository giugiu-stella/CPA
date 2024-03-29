//definitions de nos types et classes
export {type Camera, type Player, type Coord, moveLeft, moveRight };
type Coord = { x: number; y: number}
type Player ={
    pos:Coord,
    HP:number,
    speed:number,
    velX: number,
    velY: number,
}
type Camera = {
    x : number,
    y : number,
  
    widthC: number,
    heightC: number,
  
  }
export class Plateforme{
    x: number = 0
    y: number =0
    longueur: number =0
    largeur: number =0
    public constructor(init?:Partial<Plateforme>) {
        Object.assign(this, init);
    }
}
export class Ennemi{
    x: number = 0
    y: number =0
    HP:number=0
    speed:number=0
    velX: number=0
    velY: number=0
    dist_parcouru: number = 0
    dist_max: number = 0
    rotate: boolean = true
    type: string = 'boule'
    public constructor(init?:Partial<Ennemi>) {
        Object.assign(this, init);
    }
}
export class Balle{
    x: number = 0
    y: number =0
    speed:number=0
    dist_parcouru: number = 0
    dist_max: number = 0
    rotation: number = 0
    public constructor(init?:Partial<Balle>) {
        Object.assign(this, init);
    }
}


const moveLeft=(player:Player,delta:number)=>{
    return {x:player.pos.x-(player.speed * delta),y: player.pos.y}
}
const moveRight=(player:Player,delta:number)=>{
    return {x:player.pos.x+(player.speed * delta), y:player.pos.y}
}

