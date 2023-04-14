import * as conf from './conf'
import * as jeu from './game'

type Player = jeu.Player
type Platform = jeu.Plateforme


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
}

export var cptMarche = -1

const jump = (state: State) =>
  state.joueur.velY = -20;



const dist2 = (o1: Coord, o2: Coord) =>
  Math.pow(o1.x - o2.x, 2) + Math.pow(o1.y - o2.y, 2)

/*const iterate =
  (player: Player) =>
  (bound: Size) =>
  (ball: Ball): Ball => {
    const invincible = ball.invincible ? ball.invincible - 1 : ball.invincible
    const coord = ball.coord
    const dx =
      (coord.x + conf.RADIUS > bound.width || coord.x < conf.RADIUS
        ? -coord.dx
        : coord.dx) * conf.FRICTION
    const dy =
      (coord.y + conf.RADIUS > bound.height || coord.y < conf.RADIUS
        ? -coord.dy
        : coord.dy) * conf.FRICTION
    if (Math.abs(dx) + Math.abs(dy) < conf.MINMOVE)
      return { ...ball, invincible, coord: { ...coord, dx: 0, dy: 0 } }
    return {
      ...ball,
      invincible,
      coord: {
        x: coord.x + dx,
        y: coord.y + dy,
        dx,
        dy,
      },
    }
  }*/

export const clickEnd =
  (state: State) =>
  (_event: PointerEvent): State => {
    if (state.press) {
      const t = (Date.now() - state.press.start) / 20000
      const dx = state.player.coord.x - state.press.pos.x
      const dy = state.player.coord.y - state.press.pos.y
      state.player.coord.dx = state.player.coord.dx + dx * t
      state.player.coord.dy = state.player.coord.dy + dy * t
      state.press = undefined
    }
    return state
  }

export const click =
  (state: State) =>
  (event: PointerEvent): State => {
    const { offsetX: x, offsetY: y } = event
    state.press = { start: Date.now(), pos: { x, y } }
    return state
  }

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
          cptMarche++
        }
         //state.joueur.pos= perso.moveLeft(state.joueur,frameTime)
      }
      if(name==='d'){
        if (state.joueur.velX < state.joueur.speed) {
          state.joueur.velX=7;
          cptMarche++
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
          cptMarche = -1
        }
         //state.joueur.pos= perso.moveLeft(state.joueur,frameTime)
      }
      if(name==='d'){
        if (state.joueur.velX < state.joueur.speed) {
          state.joueur.velX=0;
          cptMarche = -1
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

  if(state.joueur.pos.y > 520){
    state.joueur.pos.y = 520
  }

  console.log(state.joueur.pos.y)

  if(currenty == previousy){
    auSol = true
  }
  else{
    auSol = false
  }

  previousy = currenty


  

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

export const mouseMove =
  (state: State) =>
  (event: PointerEvent): State => {
    return state
  }

export const endOfGame = (state: State): boolean =>
  state.player.life > 0 && state.pos.length > 0
