import * as jeu from './game'

import { dimPersoX , dimPersoY} from './renderer'

type Player = jeu.Player
type Platform = jeu.Plateforme
type Camera = jeu.Camera
type Ennemi = jeu.Ennemi
type Balle = jeu.Balle

export type State = {
  endOfGame: boolean
  joueur : Player
  platforms: Array<Platform>
  camera: Camera
  ennemis: Array<Ennemi>
  balle: Array<Balle>
}

export var walkcycle = false

export var rotate = false

export var walkcycleEnnemis = false

export var rotateEnnemis = false

const jump = (state: State) =>
  state.joueur.velY = -20;


let cpt = 0

let t = 0.0;

let currentTime = Date.now()

let gravity = 1.25

let auSol = false

let currenty = 0

let previousy = 0

let invincible = false
let invulnCpt = 0

let reload = 0

//verifie les collisions entre le joueur et les plateformes
export const collide_plat = (state: State) => {
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

//verifie les collisions entre le joueur et les ennemis
export const collide_ennemi = (state: State) => {
  if(invincible){
    invulnCpt++
  }
  if(invulnCpt>100)
    invincible = false
  
  for(let i=0; i<state.ennemis.length;i++){
    
    if (state.joueur.pos.x+dimPersoX/2 > state.ennemis[i].x && state.joueur.pos.y+dimPersoY/2 >=state.ennemis[i].y 
      && state.joueur.pos.y - dimPersoY/2 <=(state.ennemis[i].y + 80)&& state.joueur.pos.x+dimPersoX/2 <(state.ennemis[i].x +10)){
        if(!invincible){
          state.joueur.HP--;
          if(state.joueur.HP<0)
            state.joueur.HP=0;
          invincible = true
          invulnCpt=0;
        }
    }
    
    if (state.joueur.pos.x-dimPersoX/2 < (state.ennemis[i].x +80 )&& state.joueur.pos.y+dimPersoY/2 >=state.ennemis[i].y 
      && state.joueur.pos.y - dimPersoY/2 <=(state.ennemis[i].y + 80) && state.joueur.pos.x-dimPersoX/2 > (state.ennemis[i].x +80-10) ){
        if(!invincible){
          state.joueur.HP--;
          if(state.joueur.HP<0)
            state.joueur.HP=0;
          invincible = true
          invulnCpt=0;
        }
    }
    
    if (state.joueur.pos.y-dimPersoY/2 < (state.ennemis[i].y+80) && state.joueur.pos.x+dimPersoX/2 >state.ennemis[i].x +10
      && state.joueur.pos.x-dimPersoX/2<(state.ennemis[i].x + 80)&& state.joueur.pos.y+dimPersoY/2> (state.ennemis[i].y+80-40)){
        if(!invincible){
          state.joueur.HP--;
          if(state.joueur.HP<0)
            state.joueur.HP=0;
          invincible = true
          invulnCpt=0;
        }
    }
    
    
    if (state.joueur.pos.y+dimPersoY/2 > state.ennemis[i].y && state.joueur.pos.x+dimPersoX/2 > state.ennemis[i].x +10
      && state.joueur.pos.x-dimPersoX/2 < (state.ennemis[i].x + 80) && (state.joueur.pos.y-dimPersoY/2 <state.ennemis[i].y +40)){
        if(!invincible){
          state.joueur.HP--;
          if(state.joueur.HP<0)
            state.joueur.HP=0;
          invincible = true
          invulnCpt=0;
        }
    }
  }
}

//verifie les collisions entre les ennemis et les plateformes
export const collide_platEnnemis = (state: State) => {
  for(let i=0; i<state.platforms.length;i++){
    for(let j=0; j<state.ennemis.length;j++){
      /*gauche*/
      if (state.ennemis[j].x+80/2 > state.platforms[i].x && state.ennemis[j].y+80/2 >=state.platforms[i].y 
        && state.ennemis[j].y - 80/2 <=(state.platforms[i].y + state.platforms[i].largeur)&& state.ennemis[j].x+80 <(state.platforms[i].x +10)){
          state.ennemis[j].x =state.platforms[i].x-80/2;
          state.ennemis[j].speed = -state.ennemis[j].speed;
          state.ennemis[j].dist_parcouru = 0
          //rotation si collision
          if(state.ennemis[j].rotate == true)
            state.ennemis[j].rotate = false;
          else
            state.ennemis[j].rotate = true
      }
      /*droite*/
      if (state.ennemis[j].x-80/2 < (state.platforms[i].x +state.platforms[i].longueur )&& state.ennemis[j].y+80/2 >=state.platforms[i].y 
        && state.ennemis[j].y - 80/2 <=(state.platforms[i].y + state.platforms[i].largeur) && state.ennemis[j].x-80/2 > (state.platforms[i].x +state.platforms[i].longueur -10) ){
          state.ennemis[j].x =state.platforms[i].x +state.platforms[i].longueur+80/2;
          state.ennemis[j].speed = -state.ennemis[j].speed;
          state.ennemis[j].dist_parcouru = 0
          //rotation si collision
          if(state.ennemis[j].rotate == true)
            state.ennemis[j].rotate = false;
          else
            state.ennemis[j].rotate = true
      }
    }
  }
}

//Verification de collision entre les balles et les ennemis ou plateformes
const collide_balle = (state: State, i: number) =>{
  for(let j=0; j<state.ennemis.length; j++){
    if(state.balle[i].x+25/2>state.ennemis[j].x && state.balle[i].x+25/2<state.ennemis[j].x+80 && state.balle[i].y+25/2>state.ennemis[j].y && state.balle[i].y+25/2<state.ennemis[j].y+80){
      state.ennemis[j].HP--
      return true
    }
  }
  for(let j=0; j<state.platforms.length; j++){
    if(state.balle[i].x+25/2>state.platforms[j].x && state.balle[i].x+25/2<state.platforms[j].x+state.platforms[j].longueur && state.balle[i].y+25/2>state.platforms[j].y && state.balle[i].y+25/2<state.platforms[j].y+state.platforms[j].largeur){
      return true
    }
  }
  return false
}

//update le deplacement des balles
const update_balles = (state: State) => {
  for(let i=0; i<state.balle.length; i++){
    state.balle[i].x+=state.balle[i].speed*state.balle[i].rotation
    state.balle[i].dist_parcouru+=state.balle[i].speed*state.balle[i].rotation
    //on retire la balle de la liste quand la distance est parcourue ou s'il y a collision
    if((Math.abs(state.balle[i].dist_parcouru)>state.balle[i].dist_max) || collide_balle(state,i)){
      state.balle.splice(i,1)
    }
  }
  if (reload !=0){
    reload = (reload+1)%20
  }

}



export const step = (state: State) => {

  currenty = state.joueur.pos.y

  update_balles(state);

  document.addEventListener('keydown', (event) => {
    var name = event.key;
    if(name===' ' && reload == 0){
      reload = 1;
      if(rotate){
        state.balle.push(new jeu.Balle({x : state.joueur.pos.x+dimPersoX-50, y:state.joueur.pos.y, speed:14, dist_parcouru:0,dist_max:500,rotation:1}))
      }
      else{
        state.balle.push(new jeu.Balle({x : state.joueur.pos.x-dimPersoX+40, y:state.joueur.pos.y, speed:14, dist_parcouru:0,dist_max:500,rotation:-1}))
      }
    
    }

    if(name==='z'){
      if (auSol) {
        jump(state);
      }
    }
    if(name==='q'){
      if (state.joueur.velX > -state.joueur.speed) {
        state.joueur.velX=-state.joueur.speed+3;
        walkcycle = true;
        if(rotate == true)
          rotate = false
      }
    }
    if(name==='d'){
      if (state.joueur.velX < state.joueur.speed) {
        state.joueur.velX=state.joueur.speed-3;
        walkcycle = true;
        if(rotate == false)
          rotate = true
      }
    }

  }, false);

  document.addEventListener('keyup', (event) => {
    var name = event.key;

   
    if(name==='q'){
      if (state.joueur.velX > -state.joueur.speed) {
        state.joueur.velX=0;
        walkcycle = false
      }
    }
    if(name==='d'){
      if (state.joueur.velX < state.joueur.speed) {
        state.joueur.velX=0;
        walkcycle = false
      }
    }

  }, false);


  //actualisation de la position du joueur en fonction de sa vélocite et de la gravite
  state.joueur.pos.y += state.joueur.velY;
  state.joueur.pos.x += state.joueur.velX;
  state.joueur.velY += gravity;


  //le sol
  if(state.joueur.pos.y > 635){
    state.joueur.pos.y = 635
  }

  //deplacement Ennemis
  for(let j=0; j<state.ennemis.length;j++){
    
    //on verifie si l'ennemi doit changer de direction car il a parcouru sa distance
    if(Math.abs(state.ennemis[j].dist_parcouru)>state.ennemis[j].dist_max){
      state.ennemis[j].speed = -state.ennemis[j].speed;
      state.ennemis[j].dist_parcouru
      if(state.ennemis[j].rotate == true)
        state.ennemis[j].rotate = false;
      else
        state.ennemis[j].rotate = true
    }


    state.ennemis[j].velX=state.ennemis[j].speed;
    walkcycleEnnemis = true;
    

    if(state.ennemis[j].type != 'volant'){
      state.ennemis[j].y += state.ennemis[j].velY;
      state.ennemis[j].velY += gravity;
    }

    state.ennemis[j].x += state.ennemis[j].velX;
    //distance parcourue
    state.ennemis[j].dist_parcouru+=state.ennemis[j].velX;
      

    if(state.ennemis[j].y > 612){
      state.ennemis[j].y = 612
    }

    //on verifie si l'ennemi doit changer de direction car il a recontré une plateforme
    collide_platEnnemis(state);
  }


  collide_plat(state);
  collide_ennemi(state);

  //verifie si le joueur est pose au sol ou sur une plateforme en comparant les ordonnees sur 2 frames differentes
  if(currenty == previousy){
    auSol = true
  }
  else{
    auSol = false
  }

  previousy = currenty

  //mouvement Camera
  if(state.joueur.pos.x>700 && state.joueur.pos.x<5400){
    state.camera.x = state.joueur.pos.x
    state.camera.y = state.joueur.pos.y
  }
  

  return {
    ...state,
  }
}

export const stepAuto = (state: State) => {

  return {
    ...state,
  }
}

export const endOfGame = (state: State): boolean =>
  (state.joueur.HP > 0 && state.joueur.pos.x <= 5900)
