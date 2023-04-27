import * as conf from './conf'
import { State } from './state'
import * as jeu from './game'

import {walkcycle,rotate} from './state'

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

import pf from './images/plateforme_city.png'

import { ensPlat } from './index'

const COLORS = {
  RED: '#ff0000',
  GREEN: '#008800',
  BLUE: '#0000ff',
}

let oldrotate = false

let frame = 0

export var dimPersoX = 120
export var dimPersoY = 120

let stateImageSol = false
let stateImageCoeur = false
let stateImagePerso = false
let stateFond = false

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
const imagePF = new Image();

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


let cptTmp = 0
const diplayImages = (ctx: CanvasRenderingContext2D) => (state: State) => {
  
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
  /*if(stateImageSol){
    ctx.drawImage(imageSolUrl,0,680,500,100);
    ctx.drawImage(imageSolUrl,495,680,500,100);
    ctx.drawImage(imageSolUrl,990,680,500,100);
  }*/

  //affichage des plateformes
  for(let i = 0; i<20; i++){
      ctx.drawImage(imageSolUrl,i*495, 680, 500, 100)
  }

  if(stateImageCoeur)
    ctx.drawImage(imageCoeurUrl,10+state.camera.x-ctx.canvas.width/2,10,50,50);
    ctx.drawImage(imageCoeurUrl,70+state.camera.x-ctx.canvas.width/2,10,50,50);
    ctx.drawImage(imageCoeurUrl,130+state.camera.x-ctx.canvas.width/2,10,50,50);


  for(let i = 0; i<ensPlat.length; i++){
      ctx.drawImage(imagePF,ensPlat[i].x, ensPlat[i].y, ensPlat[i].longueur, ensPlat[i].largeur)
      //ctx.fillStyle = 'red'
      //ctx.fillRect(plats[i].x, plats[i].y, plats[i].longueur, plats[i].largeur)
  }
  if(stateImagePerso){

    

    console.log("frame: " + cptTmp)
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

    diplayImages(ctx)(state)
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
