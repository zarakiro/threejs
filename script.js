import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 10000);
camera.position.set(0, 1, 3);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const canvas = document.getElementById("Mycanvas");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, canvas);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

const ambientlight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientlight);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
const raycaster = new THREE.Raycaster();
let pointerPosition = { x: 0, y: 0 };

let  statusSphere, statusTextMesh,launchTextMesh;
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/gentilis_bold.typeface.json', (font) => {
    const textGeometry = new TextGeometry('PopShock', {
        font: font,size: 0.4,height: 0.05,curveSegments: 12,bevelEnabled: true,bevelThickness: 0.01,bevelSize: 0.005,bevelSegments: 5
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); 
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-1.1, 1.5, 0); 
    textMesh.rotation.x = Math.PI / 10; 
    scene.add(textMesh); 

    const textGeometry2 = new TextGeometry('Launch a Ball', {
        font: font,size: 0.2,height: 0.05,curveSegments: 12, bevelEnabled: true,bevelThickness: 0.01,bevelSize: 0.005,bevelSegments: 5
    });
    const textMaterial2 = new THREE.MeshStandardMaterial({ color: 0x000000 }); 
    launchTextMesh = new THREE.Mesh(textGeometry2, textMaterial2);
    launchTextMesh.position.set(-0.8, -1.5, 0); 
    launchTextMesh.rotation.x = -Math.PI / 5; 
    scene.add(launchTextMesh); 

    const statusTextGeometry = new TextGeometry('No Shock Detected', {
        font:font, size: 0.15, height: 0.05
    });
    statusTextMesh = new THREE.Mesh(statusTextGeometry, new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
    statusTextMesh.position.set(1.7, -0.5, 0);
    statusTextMesh.rotation.x = -Math.PI / 8;
    statusTextMesh.rotation.y = -Math.PI / 8;
    scene.add(statusTextMesh);

    statusSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );
    statusSphere.position.set(1.5, -0.45, 0);
    scene.add(statusSphere);
});
function launchBall() {
    const size = Math.random() * 0.5 + 0.1;
    const ball = new THREE.Mesh(
        new THREE.SphereGeometry(size, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    ball.position.set(5, 0.5, 0);

    const speed = 0.1;
    const interval = setInterval(() => {
        ball.position.x -= speed;
        if (ball.position.x < .5) {
            scene.remove(ball);
            clearInterval(interval);
            // Mise à jour du statut
            if (size > 0.35) {
                statusSphere.material.color.set(0xff0000);
                updateStatusMessage(true); // Choc violent détecté
            } else {
                statusSphere.material.color.set(0x00ff00);
                updateStatusMessage(false); // Aucun choc détecté
            }
        }
    }, 16);
    scene.add(ball);
}
function updateStatusMessage(isSevere) {
    scene.remove(statusTextMesh); // Supprimez l'ancien texte
    // Créez une nouvelle géométrie pour le texte
    const newText = isSevere ? 'Severe Shock Detected !' : 'No Shock Detected';
    const textMaterial = new THREE.MeshStandardMaterial({ color: isSevere ? 0xff0000 : 0x00ff00 });
    fontLoader.load('https://threejs.org/examples/fonts/gentilis_bold.typeface.json', (font) => {
        const textGeometry = new TextGeometry(newText, {
            font: font,size: 0.15,height: 0.05
        });

        // Créez un nouveau mesh pour le texte
        statusTextMesh = new THREE.Mesh(textGeometry, textMaterial);
        statusTextMesh.position.set(1.7, -0.5, 0); // Même position
        statusTextMesh.rotation.x = -Math.PI / 8;
        statusTextMesh.rotation.y = -Math.PI / 8;
        scene.add(statusTextMesh); // Ajoutez à la scène
    });
}
fontLoader.load('https://threejs.org/examples/fonts/droid/droid_sans_regular.typeface.json', (font) => {
    const textGeometry3 = new TextGeometry('Press Space to rotate the helmet', {
        font: font,size: 0.1,height: 0.02,curveSegments: 12,bevelEnabled: true,bevelThickness: 0.01,bevelSize: 0.005,bevelSegments: 5
    });
    const textMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffff00 }); 
    const textMesh3 = new THREE.Mesh(textGeometry3, textMaterial3);
    textMesh3.position.set(-1, -2, 0); 
    textMesh3.rotation.x = -Math.PI / 4; 
    scene.add(textMesh3); 

    const textGeometry4 = new TextGeometry('Click on the yellow spheres to learn more', {
        font: font,size: 0.1,height: 0.02,curveSegments: 12,bevelEnabled: true,bevelThickness: 0.01,bevelSize: 0.005,bevelSegments: 5
    });
    const textMaterial4 = new THREE.MeshStandardMaterial({ color: 0xffff00 }); 
    const textMesh4 = new THREE.Mesh(textGeometry4, textMaterial4);
    textMesh4.position.set(-1.2, -2.5, 0); 
    textMesh4.rotation.x = -Math.PI / 4; 
    scene.add(textMesh4); 
});

const tooltip = document.getElementById("tooltip");
const tooltipTitle = document.getElementById("tooltip-title");
const tooltipDescription = document.getElementById("tooltip-description");
const tooltipImage = document.getElementById("tooltip-image");

window.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect(); // Correction des coordonnées du pointeur
    pointerPosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerPosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.style.top = `${event.clientY + 10}px`;
});

// Charger le modèle PopShock
let popshockmesh;
const gltfloader = new GLTFLoader();
gltfloader.load(
    "./popshocktete.glb", (popshock) => {
        popshockmesh= popshock.scene;
        popshockmesh.scale.set(1, 1, 1);
        // popshockmesh.rotation.y = Math.PI / 2;
        popshockmesh.position.set(0, 0, 0);
        scene.add(popshockmesh);
        // const box = new THREE.BoxHelper( popshockmesh, 0xffff00 );
        // scene.add(box);
        addStars(popshockmesh);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.log(error);
    }
);

// Fonction pour ajouter des étoiles
const stars = [];
const starDescriptions = {
    star1: {
        titre:"Piezo Sensor",
        description:"This piezoelectric sensor is located on the forehead to detect frontal shocks during play.",
        image:"./images/piezo.jpeg"
    }, 
    star2:{
        titre:"Piezo Sensor",
        description:"This piezoelectric sensor is located on the left side of the helmet to detect shocks during play.",
        image:"./images/piezo.jpeg"
    }, 
    star3:{
        titre:"Piezo Sensor",
        description:"This piezoelectric sensor is located on the right side of the helmet to detect shocks during play.",
        image:"./images/piezo.jpeg"
    },
    star4:{
        titre:"Piezo Sensor",
        description:"This piezoelectric sensor is located on the top of the helmet to detect shocks that may occur during play, particularly during scrums.",
        image:"./images/piezo.jpeg"
    }, 
    star5:{
        titre:"ESP32-C3 mini",
        description: "The ESP32-C3 Mini centralizes data from the MPU 6050 accelerometer and piezoelectric sensors. Thanks to its Bluetooth module, it transmits this information to the main Python code, responsible for generating alerts.",
        image:"./images/esp32.jpeg"
    }, 
    star6:{
        titre:"MPU 6050 Accelerometer",
        description: "The MPU 6050 accelerometer measures head acceleration during impacts, enabling the detection of potentially dangerous impacts.",
        image:"./images/accelero.jpeg"
    }, 
    star7:{
        titre:"Electronic Wires",
        description:"These wires are located in the grooves of the helmet to connect the electronic components, in particular the sensors, to the microcontroller. They are painted black for aesthetic appeal.",
        image:"./images/wires.jpeg"
    }, 
};

// Fonction pour ajouter des étoiles avec correction de la rotation
function addStars(parent) {
    const positions = [
        new THREE.Vector3(0.1, 1, 0.32), // Position sensor front
        new THREE.Vector3(0.4, 0.75, -0.1), // Position sensor droit
        new THREE.Vector3(-0.4, 0.7, 0.08), // Position sensor gauche
        new THREE.Vector3(-0.05, 1.05, -0.3), // Position sensor top
        new THREE.Vector3(-0.3, 0.3, 0), // Position ESP32 
        new THREE.Vector3(-0.28, 0.3, -0.1), // Position accelero
        new THREE.Vector3(0, 1.15, 0), // Position des Wires
    ];

    // Matrice de rotation pour corriger l'orientation des positions
    const rotationMatrix = new THREE.Matrix4().makeRotationY(-Math.PI / 2);
    positions.forEach((position, index) => {
        // Convertir la position dans le référentiel local du casque
        position.applyMatrix4(rotationMatrix);

        const star = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0xffff00 })
        );
        star.position.copy(position);
        star.name = `star${index + 1}`; // Nom unique pour chaque étoile
        parent.add(star); // Ajouter l'étoile en tant qu'enfant du parent
        stars.push(star);
    });
}

// Détection de bar espace pour la rotation du casque
let currentrotating=false;
window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        currentrotating = !currentrotating; // Alterne l'état de rotation
    }
});

// Détection de clic pour afficher la description des "étoiles"
window.addEventListener('click', () => {
    raycaster.setFromCamera(pointerPosition, camera);
    const intersects = raycaster.intersectObjects(stars);

    if (intersects.length > 0) {
        const star = intersects[0].object;
        const stardetails = starDescriptions[star.name];
        if (stardetails) {
            tooltip.style.display = "block";
            tooltipTitle.textContent=stardetails.titre;
            tooltipDescription.textContent = stardetails.description;
            tooltipImage.src = stardetails.image;
        }
    } else {
        tooltip.style.display = "none";
    }
    const intersects2 = raycaster.intersectObjects([launchTextMesh]);

    if (intersects2.length > 0 && intersects2[0].object === launchTextMesh) {
        launchBall();
    }
});

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0';
document.body.appendChild(labelRenderer.domElement);

// Créer un élément HTML pour le texte
const div = document.createElement('div');
div.className = 'label';
div.innerHTML = `
  <p>Popshock is a connected rugby helmet created for the prevention and management of concussions in the sport. It features discreet electronics to gather as much data as possible, promoting the safety of both professional and amateur players. Its design and comfort are indistinguishable from traditional rugby helmets.</p>
  
  <p>Popshock uses an accelerometer and multiple pressure sensors distributed across the entire helmet. An alert is sent directly to a coach or medical staff via an app whenever a player receives a hit deemed too violent. This allows for quick action, such as notifying the referee to remove the player and initiate a concussion protocol (HIA1).</p>

  <p>It is important to note that Popshock does not replace the current steps of the concussion protocol. It is complementary to other protective equipment like mouthguards. While Popshock may not provide the same level of protection as a custom-made mouthguard, its affordable cost and compatibility with all head sizes make it an accessible safety solution for all rugby players, enhancing safety on the field.</p>
`;
div.style.color = "white";
div.style.fontSize = "14px";
div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
div.style.padding = "5px";
div.style.borderRadius = "5px";

// Convertir en CSS2DObject
const text2D = new CSS2DObject(div);
text2D.position.set(-3, 0, 0); // Position dans la scène
scene.add(text2D);

const animate = () => {
    requestAnimationFrame(animate);
    if(currentrotating && popshockmesh){
        popshockmesh.rotation.y+=0.01;
    }
    raycaster.setFromCamera(pointerPosition, camera);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera); 

};

animate();
