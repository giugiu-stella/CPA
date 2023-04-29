import React from 'react'
import * as conf from './conf'
import { useRef, useEffect } from 'react'
import { State, step, stepAuto,mouseMove,endOfGame} from './state'
import { render/*, RenderProps*/ } from './renderer'

import * as jeu from './game'

const randomInt = (max: number) => Math.floor(Math.random() * max)
const randomSign = () => Math.sign(Math.random() - 0.5)

const initCanvas =
  (iterate: (ctx: CanvasRenderingContext2D) => void) =>
  (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    requestAnimationFrame(() => iterate(ctx))
  }


//Initialisation des plateformes (global car on les connait toutes à l'avance)
export let ensPlat = [new jeu.Plateforme({x : 0, y:0, longueur:100, largeur:810}),new jeu.Plateforme({x : 400, y:400, longueur:200, largeur:70}), new jeu.Plateforme({x : 800, y:470, longueur:200, largeur:70}), new jeu.Plateforme({x : 1200, y:615, longueur:70, largeur:70}),new jeu.Plateforme({x : 1800, y:615, longueur:70, largeur:70})]
export let ensEnnemis = [new jeu.Ennemi({x: 500,y: 610, HP:3, speed:4,velX:0,velY:0,dist_parcouru:0,dist_max:300}),new jeu.Ennemi({x: 1400,y: 610, HP:3, speed:6,velX:0,velY:0,dist_parcouru:0,dist_max:300})/*,
new jeu.Ennemi({x: 500,y: 200, HP:3, speed:4,velX:0,velY:0,dist_parcouru:0,dist_max:300,type:''})*/]
export let ensBalle = []
//new jeu.Plateforme({x : 300, y:400, longueur:200, largeur:70}),
//new jeu.Plateforme({x : 200, y:300, longueur:200, largeur:70}),new jeu.Plateforme({x : 100, y:200, longueur:200, largeur:70}[400, 520, 200, 70],[300, 400, 200, 70],[200, 300, 200, 70],[100, 200, 200, 70]]

let i = -1
let j = -1
const Canvas = ({ height, width }: { height: number; width: number }) => {
  const initialState: State = {
    joueur: {
      pos: {
        x: 200,
        y: 600,
      },
      HP: 3,
      speed: 10,
      velX: 0,
      velY: 0,
    },


    endOfGame: true,
    platforms: ensPlat,
    camera: {
      x: 700,
      y: 0,

      widthC: width,
      heightC: height,
    },
    ennemis: ensEnnemis,
    balle: ensBalle,
  }

  const ref = useRef<any>()
  const state = useRef<State>(initialState)
  const scaleRef = useRef<number>(1)
  const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const drag = useRef<boolean>(false)
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const downTS = useRef<number>(Date.now())

  const iterate = (ctx: CanvasRenderingContext2D) => {
    /*const fps = 60;
    const interval = 1000 / fps;
    let lastRenderTime = 0;

    setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - lastRenderTime;
      if (elapsed > interval) {
        lastRenderTime = currentTime;

        // votre code de rendu de canvas ici
      }
  }, interval);*/



    state.current = step(state.current)
    state.current=stepAuto(state.current)
    state.current.endOfGame = !endOfGame(state.current)
    render(ctx, /*{
      pos: posRef.current,
      scale: scaleRef.current,
    },*/ensPlat)(state.current)
    if (!state.current.endOfGame) requestAnimationFrame(() => iterate(ctx))
  }


  const onMove = (e: PointerEvent) => {
    state.current = mouseMove(state.current)(e)
  }

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const { offsetX, offsetY, deltaY } = e
      const zoomFactor = 0.98
      if (scaleRef.current > 0.5 || deltaY < 0) {
        const factor = e.deltaY > 0 ? zoomFactor : 1 / zoomFactor
        scaleRef.current = scaleRef.current * factor
        const dx = (offsetX / scaleRef.current) * (factor - 1)
        const dy = (offsetY / scaleRef.current) * (factor - 1)
        posRef.current = {
          x: posRef.current.x - dx,
          y: posRef.current.y - dy,
        }
      }
    }
    const onDragStart = (e: PointerEvent) => {
      const { x, y } = e
      dragStart.current = { x, y }
      drag.current = true
      downTS.current = Date.now()
    }
    const onDragEnd = (_e: any) => (drag.current = false)
    const onDragMove = (e: PointerEvent) => {
      if (drag.current) {
        const { x, y } = e
        const scale = scaleRef.current
        const pos = posRef.current
        posRef.current = {
          x: (x - dragStart.current.x) / scale + pos.x,
          y: (y - dragStart.current.y) / scale + pos.y,
        }
        dragStart.current = { x, y }
      }
    }

    ref.current.addEventListener('mousemove', onMove)
    ref.current.addEventListener('wheel', onWheel)
    ref.current.addEventListener('mouseupoutside', onDragEnd)
    ref.current.addEventListener('touchendoutside', onDragEnd)
    ref.current.addEventListener('mousemove', onDragMove)
    ref.current.addEventListener('mousedown', onDragStart)
    ref.current.addEventListener('touchstart', onDragStart)
    ref.current.addEventListener('mouseup', onDragEnd)
    ref.current.addEventListener('touchend', onDragEnd)
    ref.current.addEventListener('mousemove', onDragMove)
    ref.current.addEventListener('touchmove', onDragMove)
    initCanvas(iterate)(ref.current)

    return () => {
      ref.current.removeEventListener('mousemove', onMove)
      ref.current.removeEventListener('wheel', onWheel)
      ref.current.removeEventListener('mouseupoutside', onDragEnd)
      ref.current.removeEventListener('touchendoutside', onDragEnd)
      ref.current.removeEventListener('mousemove', onDragMove)
      ref.current.removeEventListener('mousedown', onDragStart)
      ref.current.removeEventListener('touchstart', onDragStart)
      ref.current.removeEventListener('mouseup', onDragEnd)
      ref.current.removeEventListener('touchend', onDragEnd)
      ref.current.removeEventListener('mousemove', onDragMove)
      ref.current.removeEventListener('touchmove', onDragMove)
    }
  }, [])
  return <canvas {...{ height, width, ref }} />
}

export default Canvas
