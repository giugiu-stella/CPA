import * as conf from './conf'
import * as jeu from './game'

import { dimPersoX , dimPersoY} from './renderer'

type Player = jeu.Player
type Platform = jeu.Plateforme
type Camera = jeu.Camera
type Ennemi = jeu.Ennemi

type Coord = { x: number; y: number; dx: number; dy: number }
type Ball = { coord: Coord; life: number; invincible?: number }
type Size = { height: number; width: number }
export type State = {
  pos: Array<Ball>
  press?: { start: number; pos: { x: number; y: number } }
  size: Size
  player: Ball
  endOfGame: boolean
  joueur : Player
  platforms: Array<Platform>
  camera: Camera
  ennemis: Array<Ennemi>
}

export var walkcycle = false

export var rotate = false

export var walkcycleEnnemis = false

export var rotateEnnemis = false

const jump = (state: State) =>
  state.joueur.velY = -20;

const dist2 = (o1: Coord, o2: Coord) =>
  Math.pow(o1.x - o2.x, 2) + Math.pow(o1.y - o2.y, 2)

const collide = (o1: Coord, o2: Coord) =>
  dist2(o1, o2) < Math.pow(2 * conf.RADIUS, 2)

const collideBoing = (p1: Coord, p2: Coord) => {
  const nx = (p2.x - p1.x) / (2 * conf.RADIUS)
  const ny = (p2.y - p1.y) / (2 * conf.RADIUS)
  const gx = -ny
  const gy = nx

  const v1g = gx * p1.dx + gy * p1.dy
  const v2n = nx * p2.dx + ny * p2.dy
  const v2g = gx * p2.dx + gy * p2.dy
  const v1n = nx * p1.dx + ny * p1.dy
  p1.dx = nx * v2n + gx * v1g
  p1.dy = ny * v2n + gy * v1g
  p2.dx = nx * v1n + gx * v2g
  p2.dy = ny * v1n + gy * v2g
  p1.x += p1.dx
  p1.y += p1.dy
  p2.x += p2.dx
  p2.y += p2.dy
}

let cpt = 0

let t = 0.0;

let currentTime = Date.now()

let friction = 0.95

let gravity = 1.25

let auSol = false

let currenty = 0

let previousy = 0

export const collide_plat = (state: State) => {
  console.log(state.joueur.pos.x +" "+ state.joueur.pos.y )
  for(let i=0; i<state.platforms.length;i++){

    /*gauche*/
    if (state.joueur.pos.x+dimPersoX/2 > state.platforms[i].x && state.joueur.pos.y+dimPersoY/2 >=state.platforms[i].y 
      && state.joueur.pos.y - dimPersoY/2 <=(state.platforms[i].y + state.platforms[i].largeur)&& state.joueur.pos.x+dimPersoX/2 <(state.platforms[i].x +10)){
        state.joueur.pos.x =state.platforms[i].x-dimPersoX/2;
    }
    /*droite*/
    if (state.joueur.pos.x-dimPersoX/2 < (state.platforms[i].x +state.platforms[i].longueur )&& state.joueur.pos.y+dimPersoY/2 >=state.platforms[i].y 
      && state.joueur.pos.y - dimPersoY/2 <=(state.platforms[i].y + state.platforms[i].largeur) && state.joueur.pos.x-dimPersoX/2 > (state.platforms[i].x +state.platforms[i].longueur -10) ){
        state.joueur.pos.x =state.platforms[i].x +state.platforms[i].longueur+dimPersoX/2;
    }
    /*bas*/
    if (state.joueur.pos.y-dimPersoY/2 < (state.platforms[i].y+state.platforms[i].largeur) && state.joueur.pos.x+dimPersoX/2 >state.platforms[i].x 
      && state.joueur.pos.x-dimPersoX/2<(state.platforms[i].x + state.platforms[i].longueur)&& state.joueur.pos.y+dimPersoY/2> (state.platforms[i].y+state.platforms[i].largeur-35)){
        state.joueur.pos.y =state.platforms[i].y + state.platforms[i].largeur + dimPersoY/2;
    }
    
    /*haut*/
    if (state.joueur.pos.y+dimPersoY/2 > state.platforms[i].y && state.joueur.pos.x+dimPersoX/2 > state.platforms[i].x 
      && state.joueur.pos.x-dimPersoX/2 < (state.platforms[i].x + state.platforms[i].longueur) && (state.joueur.pos.y-dimPersoY/2 <state.platforms[i].y +35)){
        state.joueur.pos.y =state.platforms[i].y-dimPersoY/2;
        state.joueur.velY=0;
    }
  }
}
  export const collide_ennemi = (state: State) => {
    console.log(state.joueur.pos.x +" "+ state.joueur.pos.y )
    for(let i=0; i<state.ennemis.length;i++){
  
      /*gauche*/
      if (state.joueur.pos.x+dimPersoX/2 > state.ennemis[i].x && state.joueur.pos.y+dimPersoY/2 >=state.ennemis[i].y 
        && state.joueur.pos.y - dimPersoY/2 <=(state.ennemis[i].y + 80)&& state.joueur.pos.x+dimPersoX/2 <(state.ennemis[i].x +10)){
          state.joueur.pos.x =state.ennemis[i].x-dimPersoX/2;
      }
      /*droite*/
      if (state.joueur.pos.x-dimPersoX/2 < (state.ennemis[i].x +80 )&& state.joueur.pos.y+dimPersoY/2 >=state.ennemis[i].y 
        && state.joueur.pos.y - dimPersoY/2 <=(state.ennemis[i].y + 80) && state.joueur.pos.x-dimPersoX/2 > (state.ennemis[i].x +80-10) ){
          state.joueur.pos.x =state.ennemis[i].x +80+dimPersoX/2;
      }
      /*bas*/
      if (state.joueur.pos.y-dimPersoY/2 < (state.ennemis[i].y+80) && state.joueur.pos.x+dimPersoX/2 >state.ennemis[i].x 
        && state.joueur.pos.x-dimPersoX/2<(state.ennemis[i].x + 80)&& state.joueur.pos.y+dimPersoY/2> (state.ennemis[i].y+80-35)){
          state.joueur.pos.y =state.ennemis[i].y + 80 + dimPersoY/2;
      }
      
      /*haut*/
      if (state.joueur.pos.y+dimPersoY/2 > state.ennemis[i].y && state.joueur.pos.x+dimPersoX/2 > state.ennemis[i].x 
        && state.joueur.pos.x-dimPersoX/2 < (state.ennemis[i].x + 80) && (state.joueur.pos.y-dimPersoY/2 <state.ennemis[i].y +35)){
          state.joueur.pos.y =state.ennemis[i].y-dimPersoY/2;
          state.joueur.velY=0;
      }
    }

}

export const collide_platEnnemis = (state: State) => {
  for(let i=0; i<state.platforms.length;i++){
    for(let j=0; j<state.ennemis.length;j++){
      /*gauche*/
      if (state.ennemis[j].x+80/2 > state.platforms[i].x && state.ennemis[j].y+80/2 >=state.platforms[i].y 
        && state.ennemis[j].y - 80/2 <=(state.platforms[i].y + state.platforms[i].largeur)&& state.ennemis[j].x+80/2 <(state.platforms[i].x +10)){
          state.ennemis[j].x =state.platforms[i].x-80/2;
      }
      /*droite*/
      if (state.ennemis[j].x-80/2 < (state.platforms[i].x +state.platforms[i].longueur )&& state.ennemis[j].y+80/2 >=state.platforms[i].y 
        && state.ennemis[j].y - 80/2 <=(state.platforms[i].y + state.platforms[i].largeur) && state.ennemis[j].x-80/2 > (state.platforms[i].x +state.platforms[i].longueur -10) ){
          state.ennemis[j].x =state.platforms[i].x +state.platforms[i].longueur+80/2;
      }
      /*bas*/
      if (state.ennemis[j].y-80/2 < (state.platforms[i].y+state.platforms[i].largeur) && state.ennemis[j].x+80/2 >state.platforms[i].x 
        && state.ennemis[j].x-80/2<(state.platforms[i].x + state.platforms[i].longueur)&& state.ennemis[j].y+80/2> (state.platforms[i].y+state.platforms[i].largeur-35)){
          state.ennemis[j].y =state.platforms[i].y + state.platforms[i].largeur + 80/2;
      }
      
      /*haut*/
      if (state.ennemis[j].y+80/2 > state.platforms[i].y && state.ennemis[j].x+80/2 > state.platforms[i].x 
        && state.ennemis[j].x-80/2 < (state.platforms[i].x + state.platforms[i].longueur) && (state.ennemis[j].y-80/2 <state.platforms[i].y +35)){
          state.ennemis[j].y =state.platforms[i].y-80/2;
          state.joueur.velY=0;
      }
    }
  }
}


export const step = (state: State) => {
  console.log(state.platforms)

  currenty = state.joueur.pos.y

  let newTime = Date.now();
  let frameTime = newTime - currentTime;
  currentTime = newTime;
   


  state.pos.map((p1, i, arr) => {
    arr.slice(i + 1).map((p2) => {
      if (collide(p1.coord, p2.coord)) {
        if (!p1.invincible) {
          p1.life--
          p1.invincible = 20
        }
        if (!p2.invincible) {
          p2.life--
          p2.invincible = 20
        }
        collideBoing(p1.coord, p2.coord)
      }
    })
  })

  

  //if (frameTime > 1000/60) {

    //newTime = currentTime - (frameTime % (1000/60));

    document.addEventListener('keydown', (event) => {
      var name = event.key;
  
      if(name==='z'){
        if (auSol) {
          jump(state);
          //state.joueur.velY = -7;
        }
        //state.joueur.pos = perso.moveUp(state.joueur,frameTime)
      }
      /*
      if(name==='s'){
        if (state.joueur.velY < state.joueur.speed) {
          state.joueur.velY=7;
        }
         //state.joueur.pos=perso.moveDown(state.joueur,frameTime)
      }
      */
      if(name==='q'){
        if (state.joueur.velX > -state.joueur.speed) {
          state.joueur.velX=-7;
          walkcycle = true;
          if(rotate == true)
            rotate = false
        }
         //state.joueur.pos= perso.moveLeft(state.joueur,frameTime)
      }
      if(name==='d'){
        if (state.joueur.velX < state.joueur.speed) {
          state.joueur.velX=7;
          walkcycle = true;
          if(rotate == false)
            rotate = true
        }
        // state.joueur.pos= perso.moveRight(state.joueur,frameTime)
      }
  
    }, false);

    document.addEventListener('keyup', (event) => {
      var name = event.key;
  
      /*if(name==='z'){
        if (state.joueur.velY > -state.joueur.speed) {
          state.joueur.velY = 0;
        }
        //state.joueur.pos = perso.moveUp(state.joueur,frameTime)
      }
      if(name==='s'){
        if (state.joueur.velY < state.joueur.speed) {
          state.joueur.velY=0;
        }
         //state.joueur.pos=perso.moveDown(state.joueur,frameTime)
      }*/
      if(name==='q'){
        if (state.joueur.velX > -state.joueur.speed) {
          state.joueur.velX=0;
          walkcycle = false
        }
         //state.joueur.pos= perso.moveLeft(state.joueur,frameTime)
      }
      if(name==='d'){
        if (state.joueur.velX < state.joueur.speed) {
          state.joueur.velX=0;
          walkcycle = false
        }
        // state.joueur.pos= perso.moveRight(state.joueur,frameTime)
      }
  
    }, false);


  //}

  //state.joueur.velY *= friction;
  state.joueur.pos.y += state.joueur.velY;
  //state.joueur.velX *= friction;
  state.joueur.pos.x += state.joueur.velX;


  
  
  state.joueur.velY += gravity;

  if(state.joueur.pos.y > 625){
    state.joueur.pos.y = 625
  }
  collide_plat(state);
  collide_ennemi(state);
  if(currenty == previousy){
    auSol = true
  }
  else{
    auSol = false
  }

  previousy = currenty

  //mouvement Camera
  state.camera.x = state.joueur.pos.x
  state.camera.y = state.joueur.pos.y


  

  if (state.player.invincible) state.player.invincible--
  state.pos.map((p1, i) => {
    if (collide(p1.coord, state.player.coord)) {
      collideBoing(p1.coord, state.player.coord)
      if (!state.player.invincible) {
        state.player.life--
        state.player.invincible = 20
      }
      if (!p1.invincible) {
        p1.life--
        p1.invincible = 20
      }
    }
  })
  return {
    ...state,
    //player: iterate(state.joueur)(state.size)(state.player),
    //pos: state.pos.map(iterate(state.joueur)(state.size)).filter((p) => p.life > 0),
  }
}

export const stepAuto = (state: State) => {

  for(let j=0; j<state.ennemis.length;j++){
    state.ennemis[j].velX=-7;
    walkcycleEnnemis = true;
    if(rotateEnnemis == true)
      rotateEnnemis = false
    
    
    state.ennemis[j].y += state.joueur.velY;
    state.ennemis[j].x += state.joueur.velX;

    state.ennemis[j].velY += gravity;

    collide_platEnnemis(state);
  }
  return {
    ...state,
    //player: iterate(state.joueur)(state.size)(state.player),
    //pos: state.pos.map(iterate(state.joueur)(state.size)).filter((p) => p.life > 0),
  }
}
export const mouseMove =
  (state: State) =>
  (event: PointerEvent): State => {
    return state
  }

export const endOfGame = (state: State): boolean =>
  state.player.life > 0 && state.pos.length > 0
