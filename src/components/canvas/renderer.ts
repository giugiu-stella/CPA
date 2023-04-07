import * as conf from './conf'
import { State } from './state'
import imageMur from './images/mur.png'
import imageCoeur from './images/coeur.png'
import imagePerso from './images/megaMan_static1.png'

const COLORS = {
  RED: '#ff0000',
  GREEN: '#008800',
  BLUE: '#0000ff',
}




let stateImageMur = false
let stateImageCoeur = false
let stateImagePerso = false

const imageCoeurUrl = new Image();
const imageMurUrl = new Image();
const imagePersoUrl = new Image();

imageCoeurUrl.src = imageCoeur;
imageMurUrl.src = imageMur;
imagePersoUrl.src = imagePerso;

imageMurUrl.onload = () => {
  stateImageMur = true
}

imageCoeurUrl.onload = () => {
  stateImageCoeur = true
}

imagePersoUrl.onload = () => {
  stateImagePerso = true
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
}

const diplayGameText = (ctx: CanvasRenderingContext2D) => (state: State) => {
  
  /*ctx.font = '96px arial'
  ctx.strokeText(`life ${state.player.life}`, 20, 100)
  ctx.strokeText(
    `balls life ${state.pos
      .map((p) => p.life)
      .reduce((acc, val) => acc + val, 0)}`,
    20,
    200
  )*/
  if(stateImageMur)
    ctx.drawImage(imageMurUrl,0,680,1400,100);

  if(stateImageCoeur)
    ctx.drawImage(imageCoeurUrl,0,0,100,50);
    ctx.drawImage(imageCoeurUrl,100,0,100,50);

  

}

const computeColor = (life: number, maxLife: number, baseColor: string) =>
  rgbaTorgb(baseColor, (maxLife - life) * (1 / maxLife))

export const render =
  (ctx: CanvasRenderingContext2D, props: RenderProps) => (state: State) => {
    clear(ctx)

    diplayGameText(ctx)(state)
    state.pos.map((c) =>
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
    )
    if(stateImagePerso){
      ctx.drawImage(imagePersoUrl,state.joueur.pos.x,state.joueur.pos.y,200,200);
    }
    
    /*if (state.endOfGame) {
      const text = 'END'
      ctx.font = '48px'
      ctx.strokeText(text, state.size.width / 2 - 100, state.size.height / 2)
    }*/
  }
