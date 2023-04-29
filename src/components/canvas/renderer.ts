import * as conf from './conf'
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

let oldrotate = false

let frame = 0

export var dimPersoX = 100
export var dimPersoY = 100

let stateImageSol = false
let stateImageCoeur = false
let stateImagePerso = false
let stateFond = false
let stateEnnemi=false

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

const toDoubleHexa = (n: number) =>
  n < 16 ? '0' + n.toString(16) : n.toString(16)

export const rgbaTorgb = (rgb: string, alpha = 0) => {
  let r = 0
  let g = 0
  let b = 0
  if (rgb.startsWith('#')) {
    const hexR = rgb.length === 7 ? rgb.slice(1, 3) : rgb[1]
    const hexG = rgb.length === 7 ? rgb.slice(3, 5) : rgb[2]
    const hexB = rgb.length === 7 ? rgb.slice(5, 7) : rgb[3]
    r = parseInt(hexR, 16)
    g = parseInt(hexG, 16)
    b = parseInt(hexB, 16)
  }
  if (rgb.startsWith('rgb')) {
    const val = rgb.replace(/(rgb)|\(|\)| /g, '')
    const splitted = val.split(',')
    r = parseInt(splitted[0])
    g = parseInt(splitted[1])
    b = parseInt(splitted[2])
  }

  r = Math.max(Math.min(Math.floor((1 - alpha) * r + alpha * 255), 255), 0)
  g = Math.max(Math.min(Math.floor((1 - alpha) * g + alpha * 255), 255), 0)
  b = Math.max(Math.min(Math.floor((1 - alpha) * b + alpha * 255), 255), 0)
  return `#${toDoubleHexa(r)}${toDoubleHexa(g)}${toDoubleHexa(b)}`
}

const clear = (ctx: CanvasRenderingContext2D) => {
  const { height, width } = ctx.canvas
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)
}


/*
export type RenderProps = {
  pos: { x: number; y: number }
  scale: number
}

const drawCirle = (
  ctx: CanvasRenderingContext2D,
  renderProps: RenderProps,
  { x, y }: { x: number; y: number },
  color: string
) => {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(
    (x + renderProps.pos.x) * renderProps.scale,
    (y + renderProps.pos.y) * renderProps.scale,
    conf.RADIUS * renderProps.scale,
    0,
    2 * Math.PI
  )
  ctx.fill()
}*/

//booleen pour verifier si l'on peut animer la mort d'un ennemi ou non
let canAnim = false

//compteur pour l'animation de mort
let cptMort = 0

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

let xMort=0
let yMort=0


let cptTmp = 0
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




  for(let i = 0; i<ensPlat.length; i++){
      ctx.drawImage(imagePF,ensPlat[i].x, ensPlat[i].y, ensPlat[i].longueur, ensPlat[i].largeur)
      //ctx.fillStyle = 'red'
      //ctx.fillRect(plats[i].x, plats[i].y, plats[i].longueur, plats[i].largeur)
  }

  ctx.drawImage(imageMurUrl,0, -20, 100, 800)

  for(let i=0; i<state.joueur.HP; i++){
    ctx.drawImage(imageCoeurUrl,(state.camera.x-ctx.canvas.width/2)+i*60,10,50,50);
  }
  /*
  if(stateImageCoeur){
    ctx.drawImage(imageCoeurUrl,10+state.camera.x-ctx.canvas.width/2,10,50,50);
    ctx.drawImage(imageCoeurUrl,70+state.camera.x-ctx.canvas.width/2,10,50,50);
    ctx.drawImage(imageCoeurUrl,130+state.camera.x-ctx.canvas.width/2,10,50,50);
  }*/

  if(stateEnnemi){
    if(walkcycleEnnemis==true){
      cptTmpEnnemis= (cptTmpEnnemis+1)%60
      console.log(cptTmpEnnemis)
      for(let i = 0; i<ensEnnemis.length; i++){
        if(ensEnnemis[i].rotate == true){
          if(cptTmpEnnemis<15){
            ctx.drawImage(imageEnnemi1DUrl,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else if(cptTmpEnnemis>=15 && cptTmpEnnemis < 30){
            ctx.drawImage(imageEnnemi2DUrl,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else if(cptTmpEnnemis>=30 && cptTmpEnnemis < 45){
            ctx.drawImage(imageEnnemi1DUrl,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else{
            ctx.drawImage(imageEnnemi3DUrl,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        }
        else{
          if(cptTmpEnnemis<15){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else if(cptTmpEnnemis>=15 && cptTmpEnnemis < 30){
            ctx.drawImage(imageEnnemi2Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else if(cptTmpEnnemis>=30 && cptTmpEnnemis < 45){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
          else{
            ctx.drawImage(imageEnnemi3Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
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


    /*
    else{
      if(rotateEnnemis==true){
        cptTmpEnnemis= (cptTmpEnnemis+1)%60
        if(cptTmpEnnemis<15)
          for(let i = 0; i<ensEnnemis.length; i++){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        else if (cptTmpEnnemis>=15 && cptTmpEnnemis < 30)
          for(let i = 0; i<ensEnnemis.length; i++){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        else if (cptTmp>=30 && cptTmp < 45)
          for(let i = 0; i<ensEnnemis.length; i++){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        else{
          for(let i = 0; i<ensEnnemis.length; i++){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        }
      }
      else{
        cptTmpEnnemis= (cptTmpEnnemis+1)%60
        if(cptTmpEnnemis<15)
          for(let i = 0; i<ensEnnemis.length; i++){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        else if (cptTmpEnnemis>=15 && cptTmpEnnemis < 30)
          for(let i = 0; i<ensEnnemis.length; i++){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        else if (cptTmp>=30 && cptTmp < 45)
          for(let i = 0; i<ensEnnemis.length; i++){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        else{
          for(let i = 0; i<ensEnnemis.length; i++){
            ctx.drawImage(imageEnnemi1Url,ensEnnemis[i].x, ensEnnemis[i].y,80,80)
          }
        }
      }
    }*/
  
  for(let i=0; i<state.balle.length; i++){
    /*for(let j=0; j<state.ennemis.length; j++){
      if(state.balle[i].x!=state.ennemis[j].x && state.balle[i].y!=state.ennemis[j].y){
        ctx.drawImage(imageBalleUrl,state.balle[i].x,state.balle[i].y,25,25)
      }
    }*/
    ctx.drawImage(imageBalleUrl,state.balle[i].x,state.balle[i].y,25,25)
  }

  if(stateImagePerso){

    if(walkcycle==false){
      cptTmp = 0
      if(rotate == true){
        ctx.drawImage(imagePersoUrlD,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY);
      }
      else{
          ctx.drawImage(imagePersoUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY);
        }
    }
    else{
      if(rotate==true){
        cptTmp= (cptTmp+1)%60
        if(cptTmp<15)
          ctx.drawImage(imageMarche1DUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY)
        else if (cptTmp>=15 && cptTmp < 30)
          ctx.drawImage(imageMarche2DUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX-30,dimPersoY)
        else if (cptTmp>=30 && cptTmp < 45)
          ctx.drawImage(imageMarche3DUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY)
        else{
          ctx.drawImage(imageMarche4DUrl,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX-30,dimPersoY)
        }
      }
      else{
        cptTmp= (cptTmp+1)%60
        if(cptTmp<15)
          ctx.drawImage(imageMarche1Url,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY)
        else if (cptTmp>=15 && cptTmp < 30)
          ctx.drawImage(imageMarche2Url,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX-30,dimPersoY)
        else if (cptTmp>=30 && cptTmp < 45)
          ctx.drawImage(imageMarche3Url,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX,dimPersoY)
        else{
          ctx.drawImage(imageMarche4Url,state.joueur.pos.x-(dimPersoX/2),state.joueur.pos.y-(dimPersoY/2),dimPersoX-30,dimPersoY)
        }
      }
    }
  }


  
  ctx.restore();
}

const computeColor = (life: number, maxLife: number, baseColor: string) =>
  rgbaTorgb(baseColor, (maxLife - life) * (1 / maxLife))

export const render =
  (ctx: CanvasRenderingContext2D/*, props: RenderProps*/, plats: Array<jeu.Plateforme>) => (state: State) => {
    clear(ctx)
    frame ++
    frame = frame%20

    displayImages(ctx)(state)
    /*state.pos.map((c) =>
      drawCirle(
        ctx,
        props,
        c.coord,
        computeColor(c.life, conf.BALLLIFE, COLORS.GREEN)
      )
    )
    drawCirle(
      ctx,
      props,
      state.player.coord,
      computeColor(state.player.life, conf.PLAYERLIFE, COLORS.BLUE)
    )*/

    
    //console.log(plats[0][0])
    
    /*if (state.endOfGame) {
      const text = 'END'
      ctx.font = '48px'
      ctx.strokeText(text, state.size.width / 2 - 100, state.size.height / 2)
    }*/
  }
