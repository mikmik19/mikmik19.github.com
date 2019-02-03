
// Degining the scene
var scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(255, 255, 255)");

// Degining the camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var width = 400
var height = 400

var renderer = new THREE.WebGLRenderer();
renderer.setSize( width, height );

// Grab the div created for this animation
document.getElementById('beating-heart').appendChild( renderer.domElement );

var boxWidth = 3
var geometry = new THREE.BoxGeometry( boxWidth, boxWidth, boxWidth );


var vertices = [
	new THREE.Vector3(1, 3, 1),
	new THREE.Vector3(1, 3, -1),
	new THREE.Vector3(1, -1, 1),
	new THREE.Vector3(1, -1, -1),
	new THREE.Vector3(-1, 3, -1),
	new THREE.Vector3(-1, 3, 1),
	new THREE.Vector3(-1, -1, -1),
	new THREE.Vector3(-1, -1, 1)
];
var faces = [
	new THREE.Face3(0, 2, 1),
	new THREE.Face3(2, 3, 1),
	new THREE.Face3(4, 6, 5),
	new THREE.Face3(6, 7, 5),
	new THREE.Face3(4, 5, 1),
	new THREE.Face3(5, 0, 1),
	new THREE.Face3(7, 6, 2),
	new THREE.Face3(6, 3, 2),
	new THREE.Face3(5, 7, 0),
	new THREE.Face3(7, 2, 0),
	new THREE.Face3(1, 3, 4),
	new THREE.Face3(3, 6, 4),
];
var geom = new THREE.Geometry();
geom.vertices = vertices;
geom.faces = faces;
geom.computeFaceNormals();


var material = new THREE.MeshBasicMaterial( {
	color: "rgb(250,0,0)",
	wireframe: true
} );

var cube = new THREE.Mesh( geom, material );

scene.add( cube );

camera.position.z = 5;

var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.scale += 0.001

	renderer.render( scene, camera );
};

animate();
