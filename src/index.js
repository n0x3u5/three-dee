import * as THREE from 'three'

let container = document.querySelector('#container')
let xSlider = document.querySelector('#x-slider')
let ySlider = document.querySelector('#y-slider')
let canvas = document.createElement('canvas')
container.appendChild(canvas)

let flag = 0
let dragFlag = -1

canvas.addEventListener('mousedown', event => {
  flag = 1
  dragFlag = 0
}, false)

canvas.addEventListener('mousemove', event => {
  if (flag === 1) {
    if (dragFlag === 0) {
      console.log('drag start')
    } else {
      console.log('dragging')
    }
    dragFlag = 1
  } else {
    console.log('mouse move')
  }
}, false)

document.addEventListener('mouseup', event => {
  if (dragFlag === 1) {
    console.log('drag end')
  } else if (dragFlag !== -1) {
    console.log('click')
  }
  flag = 0
  dragFlag = -1
}, false)

let prevXRotate
let prevYRotate
let step = 0.055

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, 640 / 480, 0.1, 1000)
let renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
})

renderer.setSize(640, 480)

let geometry = new THREE.BoxGeometry(0.5, 2, 0.5)

let material = new THREE.MeshLambertMaterial({
  color: 0x00ff00
})

let pointLight = new THREE.PointLight(0xFFFFFF)

pointLight.position.x = 0
pointLight.position.y = 1
pointLight.position.z = 2

scene.add(pointLight)

let cube = new THREE.Mesh(geometry, material)

scene.add(cube)

camera.position.z = 5
renderer.render(scene, camera)

xSlider.addEventListener('input', event => {
  !prevXRotate && (prevXRotate = event.target.value)
  if (prevXRotate < event.target.value) {
    cube.rotation.x += step
  } else {
    cube.rotation.x -= step
  }
  prevXRotate = event.target.value
  renderer.render(scene, camera)
})

ySlider.addEventListener('input', event => {
  !prevYRotate && (prevYRotate = event.target.value)
  if (prevYRotate < event.target.value) {
    cube.rotation.y += step
  } else {
    cube.rotation.y -= step
  }
  prevYRotate = event.target.value
  renderer.render(scene, camera)
})
