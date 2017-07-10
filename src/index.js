import * as THREE from 'three'

let containerCanvas = document.querySelector('#container canvas')

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, 100 / 50, 0.1, 1000)

let renderer = new THREE.WebGLRenderer({
  canvas: containerCanvas,
  antialias: true
})
renderer.setSize(100, 50)

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let light = new THREE.AmbientLight(0x404040)
scene.add(light)

let geometry = new THREE.BoxGeometry(1, 2, 1)
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00
})
let cube = new THREE.Mesh(geometry, material)
cube.rotation.x += 50
cube.rotation.y -= 50
scene.add(cube)

camera.position.z = 5

renderer.render(scene, camera)
