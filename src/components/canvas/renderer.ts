import { State } from './state'
import * as jeu from './game'

import {walkcycle,rotate,walkcycleEnnemis,rotateEnnemis} from './state'

import imageSol from './images/sol.png'
import imageCoeur from './images/coeur.png'
import imagePerso from './images/megaMan_static1.png'
import imagePersoD from './images/megaMan_static1_droite.png'
import fond1 from './images/background_1.png'
import fond2 from './images/background_2.png'
import fond3 from './images/background_3.png'
import fond4 from './images/background_4.png'

import marche1 from './images/megaMan_run1.png'
import marche2 from './images/megaMan_run2.png'
import marche3 from './images/megaMan_run3.png'
import marche4 from './images/megaMan_run4.png'

import marche1d from './images/megaMan_run1_droite.png'
import marche2d from './images/megaMan_run2_droite.png'
import marche3d from './images/megaMan_run3_droite.png'
import marche4d from './images/megaMan_run4_droite.png'
import ennemi1 from './images/enemy_boule/enemy_boule_3.png'
import ennemi2 from './images/enemy_boule/enemy_boule_4.png'
import ennemi3 from './images/enemy_boule/enemy_boule_5.png'
import ennemi1D from './images/enemy_boule/enemy_boule_3_droite.png'
import ennemi2D from './images/enemy_boule/enemy_boule_4_droite.png'
import ennemi3D from './images/enemy_boule/enemy_boule_5_droite.png'

import ennemiv1 from './images/ennemy_volant/ennemy_volant_1.png'
import ennemiv2 from './images/ennemy_volant/ennemy_volant_2.png'
import ennemiv3 from './images/ennemy_volant/ennemy_volant_3.png'

import balleImg from './images/oeuf.png'

import mort1 from './images/mort/mort_1.png'
import mort2 from './images/mort/mort_2.png'
import mort3 from './images/mort/mort_3.png'
import mort4 from './images/mort/mort_4.png'
import mort5 from './images/mort/mort_5.png'
import mort6 from './images/mort/mort_6.png'
import mort7 from './images/mort/mort_7.png'
import mort8 from './images/mort/mort_8.png'


import pf from './images/plateforme_city.png'
import imageMur from './images/mur.png'

import { ensEnnemis, ensPlat } from './index'

const COLORS = {
  RED: '#ff0000',
  GREEN: '#008800',
  BLUE: '#0000ff',
}


let frame = 0

export var dimPersoX = 100
export var dimPersoY = 100

let stateImageSol = false
let stateImageCoeur = false
let stateImagePerso = false
let stateFond = false
let stateEnnemi=false


//----------recuperer les images--------------
const imageCoeurUrl = new Image();
const imageSolUrl = new Image();
const imagePersoUrl = new Image();
const imagePersoUrlD = new Image();
const imageFond1Url = new Image();
const imageFond2Url = new Image();
const imageFond3Url = new Image();
const imageFond4Url = new Image();
const imageMarche1Url = new Image();
const imageMarche2Url = new Image();
const imageMarche3Url = new Image();
const imageMarche4Url = new Image();
const imageMarche1DUrl = new Image();
const imageMarche2DUrl = new Image();
const imageMarche3DUrl = new Image();
const imageMarche4DUrl = new Image();
const imageEnnemi1Url = new Image();
const imageEnnemi2Url = new Image();
const imageEnnemi3Url = new Image();
const imageEnnemi1DUrl = new Image();
const imageEnnemi2DUrl = new Image();
const imageEnnemi3DUrl = new Image();

const ennemiV1Url = new Image();
const ennemiV2Url = new Image();
const ennemiV3Url = new Image();

const imageBalleUrl = new Image();

const mort1URL = new Image();
const mort2URL = new Image();
const mort3URL = new Image();
const mort4URL = new Image();
const mort5URL = new Image();
const mort6URL = new Image();
const mort7URL = new Image();
const mort8URL = new Image();


const imagePF = new Image();
const imageMurUrl = new Image();

imagePF.src = pf;
imageCoeurUrl.src = imageCoeur;
imageSolUrl.src = imageSol;
imagePersoUrl.src = imagePerso;
imagePersoUrlD.src = imagePersoD;
imageFond1Url.src = fond1;
imageFond2Url.src = fond2;
imageFond3Url.src = fond3;
imageFond4Url.src = fond4;
imageMarche1Url.src = marche1;
imageMarche2Url.src = marche2;
imageMarche3Url.src = marche3;
imageMarche4Url.src = marche4;
imageMarche1DUrl.src = marche1d;
imageMarche2DUrl.src = marche2d;
imageMarche3DUrl.src = marche3d;
imageMarche4DUrl.src = marche4d;
imageEnnemi1Url.src = ennemi1;
imageEnnemi2Url.src = ennemi2;
imageEnnemi3Url.src = ennemi3;
imageEnnemi1DUrl.src = ennemi1D;
imageEnnemi2DUrl.src = ennemi2D;
imageEnnemi3DUrl.src = ennemi3D;

ennemiV1Url.src = ennemiv1;
ennemiV2Url.src = ennemiv2;
ennemiV3Url.src = ennemiv3;

imageBalleUrl.src = balleImg;

mort1URL.src = mort1;
mort2URL.src = mort2;
mort3URL.src = mort3;
mort4URL.src = mort4;
mort5URL.src = mort5;
mort6URL.src = mort6;
mort7URL.src = mort7;
mort8URL.src = mort8;

imageMurUrl.src = imageMur;

imageSolUrl.onload = () => {
  stateImageSol = true
}

imageCoeurUrl.onload = () => {
  stateImageCoeur = true
}

imagePersoUrl.onload = () => {
  stateImagePerso = true
}

imageFond1Url.onload = () => {
  stateFond = true
}
imageEnnemi1Url.onload = () =>{
  stateEnnemi = true
}

//---------------------------------------


const clear = (ctx: CanvasRenderingContext2D) => {
  const { height, width } = ctx.canvas
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)
}



let listMurs = [[0, -20, 100, 800],[2400, 385, 100, 300],[2400, 385, 100, 300],[3400, 385, 100, 300],[6000, -20, 100, 800]]

//booleen pour verifier si l'on peut animer la mort d'un ennemi ou non
let canAnim = false

//compteur pour l'animation de mort
let cptMort = 0

//fonction d'animation de mort des ennemis
const animMort = (ctx: CanvasRenderingContext2D, state: State, x:number,y:number) => {
  cptMort = (cptMort+1)%61
  if(cptMort<7)
    ctx.drawImage(mort1URL,x, y,80,80)
  else if(cptMort>=7 && cptMort<15)
    ctx.drawImage(mort2URL,x, y,80,80)
  else if(cptMort>=15 && cptMort<22)
    ctx.drawImage(mort3URL,x, y,80,80)
  else if(cptMort>=22 && cptMort<30)
    ctx.drawImage(mort4URL,x, y,80,80)
  else if(cptMort>=30 && cptMort<37)
    ctx.drawImage(mort5URL,x, y,80,80)
  else if(cptMort>=37 && cptMort<45)
    ctx.drawImage(mort6URL,x, y,80,80)
  else if(cptMort>=45 && cptMort<52)
    ctx.drawImage(mort7URL,x, y,80,80)
  else if(cptMort>=52 && cptMort<60)
    ctx.drawImage(mort8URL,x, y,80,80)
  else{
    canAnim = false
    cptMort = (cptMort+1)%61
  }

}

//coordonnées du dernier ennemi mort pour l'animation de mort
let xMort=0
let yMort=0

//compteurs de frames pour les animation du personnage et des ennemis
let cptTmpPerso = 0
let cptTmpEnnemis=0

const displayImages = (ctx: CanvasRenderingContext2D) => (state: State) => {
  
  //on déplace la caméra en prenant le joueur comme réferentiel
  ctx.save();
  ctx.translate(-(state.camera.x-ctx.canvas.width/2),0);

  /*Il faut s'assurer que tous les éléments du fond (points de vie etc.. suivent la caméra)
    Mais que tous les éléments fixes (plateformes/ennemis ne la suivent pas)
  */
  if(stateFond){
    if(frame<5)
      ctx.drawImage(imageFond1Url,state.camera.x-ctx.canvas.width/2,-200,1400,1000)
    else if (frame>=5 && frame < 10)
      ctx.drawImage(imageFond2Url,state.camera.x-ctx.canvas.width/2,-200,1400,1000)
    else if (frame>=10 && frame < 15)
      ctx.drawImage(imageFond3Url,state.camera.x-ctx.canvas.width/2,-200,1400,1000)
    else{
      ctx.drawImage(imageFond4Url,state.camera.x-ctx.canvas.width/2,-200,1400,1000)
    }
  }
  

  //affichage du sol
  for(let i = 0; i<20; i++){
      ctx.drawImage(imageSolUrl,i*495, 680, 500, 100)
  }

  //affichage des plateformes
  for(let i = 0; i<ensPlat.length; i++){
      ctx.drawImage(imagePF,ensPlat[i].x, ensPlat[i].y, ensPlat[i].longueur, ensPlat[i].largeur)
  }

  //affichage des murs
  for(let m=0; m<listMurs.length; m++){
    ctx.drawImage(imageMurUrl,listMurs[m][0],listMurs[m][1] ,listMurs[m][2], listMurs[m][3])
  }

  //affichage des points de vie
  for(let i=0; i<state.joueur.HP; i++){
    ctx.drawImage(imageCoeurUrl,(state.camera.x-ctx.canvas.width/2)+i*60,10,50,50);
  }

  //animation deplacements ennemis
  if(stateEnnemi){
    if(walkcycleEnnemis==true){
      cptTmpEnnemis= (cptTmpEnnemis+1)%60
      for(let i = 0; i<ensEnnemis.length; i++){
        if(ensEnnemis[i].rotate == true){
          if(cptTmpEnnemis<15){
            if(ensEnnemis[i].type == 'boule')
              ctx.drawImage(imageEnnemi1DUrl,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
            else
              ctx.drawImage(ennemiV1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else if(cptTmpEnnemis>=15 && cptTmpEnnemis < 30){
            if(ensEnnemis[i].type == 'boule')
              ctx.drawImage(imageEnnemi2DUrl,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
            else
              ctx.drawImage(ennemiV2Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else if(cptTmpEnnemis>=30 && cptTmpEnnemis < 45){
            if(ensEnnemis[i].type == 'boule')
              ctx.drawImage(imageEnnemi1DUrl,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
            else
              ctx.drawImage(ennemiV1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else{
            if(ensEnnemis[i].type == 'boule')
              ctx.drawImage(imageEnnemi3DUrl,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
            else
              ctx.drawImage(ennemiV3Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        }
        else{
          if(cptTmpEnnemis<15){
            if(ensEnnemis[i].type == 'boule')
              ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
            else
              ctx.drawImage(ennemiV1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else if(cptTmpEnnemis>=15 && cptTmpEnnemis < 30){
            if(ensEnnemis[i].type == 'boule')
              ctx.drawImage(imageEnnemi2Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
            else
              ctx.drawImage(ennemiV2Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else if(cptTmpEnnemis>=30 && cptTmpEnnemis < 45){
            if(ensEnnemis[i].type == 'boule')
              ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
            else
              ctx.drawImage(ennemiV1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else{
            if(ensEnnemis[i].type == 'boule')
              ctx.drawImage(imageEnnemi3Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
            else
              ctx.drawImage(ennemiV3Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        }
      }  
    }
      
  }

//animation mort ennemis
for(let i=0; i<state.ennemis.length; i++){
  if(state.ennemis[i].HP <=0){
    xMort = state.ennemis[i].x
    yMort = state.ennemis[i].y
    state.ennemis.splice(i,1)
    canAnim = true
  } 
}
if(canAnim){
  animMort(ctx,state,xMort,yMort)
}


//affichage des balles
for(let i=0; i<state.balle.length; i++){
  ctx.drawImage(imageBalleUrl,state.balle[i].x,state.balle[i].y,25,25)
}

//animations Personnage
if(stateImagePerso){

  if(walkcycle==false){
    cptTmpPerso = 0
    if(rotate == true){
      ctx.drawImage(imagePersoUrlD,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY);
    }
    else{
        ctx.drawImage(imagePersoUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY);
      }
  }
  else{
    if(rotate==true){
      cptTmpPerso= (cptTmpPerso+1)%60
      if(cptTmpPerso<15)
        ctx.drawImage(imageMarche1DUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY)
      else if (cptTmpPerso>=15 && cptTmpPerso < 30)
        ctx.drawImage(imageMarche2DUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX-30,dimPersoY)
      else if (cptTmpPerso>=30 && cptTmpPerso < 45)
        ctx.drawImage(imageMarche3DUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY)
      else{
        ctx.drawImage(imageMarche4DUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX-30,dimPersoY)
      }
    }
    else{
      cptTmpPerso= (cptTmpPerso+1)%60
      if(cptTmpPerso<15)
        ctx.drawImage(imageMarche1Url,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY)
      else if (cptTmpPerso>=15 && cptTmpPerso < 30)
        ctx.drawImage(imageMarche2Url,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX-30,dimPersoY)
      else if (cptTmpPerso>=30 && cptTmpPerso < 45)
        ctx.drawImage(imageMarche3Url,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY)
      else{
        ctx.drawImage(imageMarche4Url,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX-30,dimPersoY)
      }
    }
  }
}

//affichage fin du niveau
ctx.drawImage(imageCoeurUrl,5900,580,100,100)


//le tout est englobe dans un save + restore pour que les images ne se deplacent pas par rapport à la camera
ctx.restore();
}

export const render =
  (ctx: CanvasRenderingContext2D, plats: Array<jeu.Plateforme>) => (state: State) => {
    clear(ctx)
    frame ++
    frame = frame%20

    displayImages(ctx)(state)

    
    
    if (state.endOfGame) {
      const text = "FIN DE LA PARTIE"
      ctx.fillStyle = COLORS.RED
      ctx.font = "100px serif"
      ctx.fillText(text, ctx.canvas.width/2-420,ctx.canvas.height/2)
    }
  }
