import React from 'react'
import { useRef, useEffect } from 'react'
import { State, step, stepAuto,endOfGame} from './state'
import { render} from './renderer'

import * as jeu from './game'

const initCanvas =
  (iterate: (ctx: CanvasRenderingContext2D) => void) =>
  (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    requestAnimationFrame(() => iterate(ctx))
  }


//Initialisation des plateformes (global car on les connait toutes à l'avance)
export let ensPlat = 
  [new jeu.Plateforme({x : 0, y:0, longueur:100, largeur:810}),new jeu.Plateforme({x : 700, y:580, longueur:200, largeur:70}),
  new jeu.Plateforme({x : 2000, y:470, longueur:200, largeur:70}), new jeu.Plateforme({x : 1200, y:615, longueur:70, largeur:70}),
  new jeu.Plateforme({x : 1800, y:615, longueur:70, largeur:70}),new jeu.Plateforme({x:2400, y:390, longueur:100, largeur:300}),
  new jeu.Plateforme({x:2250, y:340, longueur:100, largeur:70}),new jeu.Plateforme({x:2700, y:340, longueur:200, largeur:70}),new jeu.Plateforme({x:3050, y:340, longueur:200, largeur:70}),
  new jeu.Plateforme({x:3400, y:390, longueur:100, largeur:300}),new jeu.Plateforme({x:2500, y:525, longueur:100, largeur:70}),
  new jeu.Plateforme({x:3500, y:480, longueur:100, largeur:70}),new jeu.Plateforme({x:3650, y:550, longueur:100, largeur:70}),
  new jeu.Plateforme({x:6000, y:0, longueur:100, largeur:810}),new jeu.Plateforme({x:3650, y:550, longueur:100, largeur:70})]

//Initialisation des ennemis (global car on les connait tous à l'avance)
export let ensEnnemis = 
  [new jeu.Ennemi({x: 2800,y: 610, HP:3, speed:4,velX:0,velY:0,dist_parcouru:0,dist_max:200}),new jeu.Ennemi({x: 1400,y: 610, HP:3, speed:6,velX:0,velY:0,dist_parcouru:0,dist_max:300}),
    new jeu.Ennemi({x: 2900,y: 610, HP:3, speed:6,velX:0,velY:0,dist_parcouru:0,dist_max:200}),new jeu.Ennemi({x: 4600,y: 610, HP:3, speed:6,velX:0,velY:0,dist_parcouru:0,dist_max:300}),
    new jeu.Ennemi({x: 2500,y: 240, HP:2, speed:3,velX:0,velY:0,dist_parcouru:0,dist_max:300,type:'volant'}),new jeu.Ennemi({x: 4100,y: 450, HP:2, speed:5,velX:0,velY:0,dist_parcouru:0,dist_max:300,type:'volant'}),
    new jeu.Ennemi({x: 5500,y: 550, HP:2, speed:5,velX:0,velY:0,dist_parcouru:0,dist_max:300,type:'volant'})]

//le tableau s'occupant de tracker les balles instantiees
export let ensBalle = []

let i = -1
let j = -1
const Canvas = ({ height, width }: { height: number; width: number }) => {
  //initialisation
  const initialState: State = {
    joueur: {
      pos: {
        x: 200,
        y: 600,
      },
      HP: 5,
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

  const iterate = (ctx: CanvasRenderingContext2D) => {

    state.current = step(state.current)
    state.current=stepAuto(state.current)
    state.current.endOfGame = !endOfGame(state.current)
    render(ctx,ensPlat)(state.current)
    if (!state.current.endOfGame) requestAnimationFrame(() => iterate(ctx))
  }

  useEffect(() => {  
    initCanvas(iterate)(ref.current)
  }, [])
  return <canvas {...{ height, width, ref }} />
}

export default Canvas
