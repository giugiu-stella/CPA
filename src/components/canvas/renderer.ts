import * as conf from './conf'
import { State } from './state'
import * as jeu from './game'

import {cptMarche} from './state'

import imageSol from './images/sol.png'
import imageCoeur from './images/coeur.png'
import imagePerso from './images/megaMan_static1.png'
import fond1 from './images/background_1.png'
import fond2 from './images/background_2.png'
import fond3 from './images/background_3.png'
import fond4 from './images/background_4.png'

import marche1 from './images/megaMan_run1.png'
import marche2 from './images/megaMan_run2.png'
import marche3 from './images/megaMan_run3.png'
import marche4 from './images/megaMan_run4.png'

const COLORS = {
  RED: '#ff0000',
  GREEN: '#008800',
  BLUE: '#0000ff',
}


let frame = 0

let stateImageSol = false
let stateImageCoeur = false
let stateImagePerso = false
let stateFond = false

const imageCoeurUrl = new Image();
const imageSolUrl = new Image();
const imagePersoUrl = new Image();
const imageFond1Url = new Image();
const imageFond2Url = new Image();
const imageFond3Url = new Image();
const imageFond4Url = new Image();
const imageMarche1Url = new Image();
const imageMarche2Url = new Image();
const imageMarche3Url = new Image();
const imageMarche4Url = new Image();

imageCoeurUrl.src = imageCoeur;
imageSolUrl.src = imageSol;
imagePersoUrl.src = imagePerso;
imageFond1Url.src = fond1;
imageFond2Url.src = fond2;
imageFond3Url.src = fond3;
imageFond4Url.src = fond4;
imageMarche1Url.src = marche1;
imageMarche2Url.src = marche2;
imageMarche3Url.src = marche3;
imageMarche4Url.src = marche4;

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

const diplayImages = (ctx: CanvasRenderingContext2D) => (state: State) => {
  
  
  /*ctx.font = '96px arial'
  ctx.strokeText(`life ${state.player.life}`, 20, 100)
  ctx.strokeText(
    `balls life ${state.pos
      .map((p) => p.life)
      .reduce((acc, val) => acc + val, 0)}`,
    20,
    200
  )*/
  if(stateFond){
    if(frame<5)
      ctx.drawImage(imageFond1Url,0,-200,1400,1000)
    else if (frame>=5 && frame < 10)
      ctx.drawImage(imageFond2Url,0,-200,1400,1000)
    else if (frame>=10 && frame < 15)
      ctx.drawImage(imageFond3Url,0,-200,1400,1000)
    else{
      ctx.drawImage(imageFond4Url,0,-200,1400,1000)
    }
  }
  if(stateImageSol)
    ctx.drawImage(imageSolUrl,0,680,500,100);
    ctx.drawImage(imageSolUrl,495,680,500,100);
    ctx.drawImage(imageSolUrl,990,680,500,100);

  if(stateImageCoeur)
    ctx.drawImage(imageCoeurUrl,10,10,50,50);
    ctx.drawImage(imageCoeurUrl,70,10,50,50);
    ctx.drawImage(imageCoeurUrl,130,10,50,50);

  if(stateImagePerso){
    console.log(cptMarche)
    let cptTmp = cptMarche%60
    if(cptTmp==-1)
      ctx.drawImage(imagePersoUrl,state.joueur.pos.x,state.joueur.pos.y,100,100);
    else if(cptTmp<15)
      ctx.drawImage(imageMarche1Url,state.joueur.pos.x,state.joueur.pos.y,100,100)
    else if (cptTmp>=15 && cptTmp < 30)
      ctx.drawImage(imageMarche2Url,state.joueur.pos.x,state.joueur.pos.y,100,100)
    else if (cptTmp>=30 && cptTmp < 45)
      ctx.drawImage(imageMarche3Url,state.joueur.pos.x,state.joueur.pos.y,100,100)
    else{
      ctx.drawImage(imageMarche4Url,state.joueur.pos.x,state.joueur.pos.y,100,100)
    }
  }

/* Pour image run vers la droite :  
context.translate(state.joueur.pos.x + 50, state.joueur.pos.y + 50);
context.rotate(Math.PI/2);
context.drawImage(imageMarche1Url, -100 / 2, -100/ 2, 100,100);
*/

/* décider si faire variable stateJoueurGauche et stateJoueurDroite  */

  

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
    for(let i = 0; i<plats.length; i++){
      ctx.fillStyle = 'red'
      ctx.fillRect(plats[i].x, plats[i].y, plats[i].longueur, plats[i].largeur)
    }
    
    //console.log(plats[0][0])
    
    /*if (state.endOfGame) {
      const text = 'END'
      ctx.font = '48px'
      ctx.strokeText(text, state.size.width / 2 - 100, state.size.height / 2)
    }*/
  }
