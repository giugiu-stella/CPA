export { type Player, type Coord, moveUp, moveDown, moveLeft, moveRight };
type Coord = { x: number; y: number}
type Player ={
    pos:Coord,
    HP:number,
    speed:number,
    velX: number,
    velY: number,
}
const moveUp=(player:Player,delta:number)=>{
    return {x:player.pos.x, y:player.pos.y-(player.speed * delta)}
}
const moveDown=(player:Player,delta:number)=>{
    return {x:player.pos.x, y:player.pos.y+(player.speed * delta)}
}
const moveLeft=(player:Player,delta:number)=>{
    return {x:player.pos.x-(player.speed * delta),y: player.pos.y}
}
const moveRight=(player:Player,delta:number)=>{
    return {x:player.pos.x+(player.speed * delta), y:player.pos.y}
}

/*export const step = (player: Player,k:number) =>{
    var key_pressed=String.fromCharCode(k);
    if(key_pressed=='Z'){
       return player.pos= moveUp(player)
    }
    if(key_pressed=='S'){
        return player.pos=moveDown(player)
    }
    if(key_pressed=='Q'){
        return player.pos= moveLeft(player)
    }
    if(key_pressed=='D'){
        return player.pos= moveRight(player)
    }
    else{
        return player.pos
    }
  }

export const iterate = (event: KeyboardEvent)=>(player: Player) => {
    const coord = player.pos
    
    player.pos=step(player,event.keyCode)
   
    return{
        player
    }
    
    
  }*/