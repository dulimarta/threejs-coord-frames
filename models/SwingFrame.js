/**
 * Created by dulimarh on 3/7/15.
 */
SwingFrame = function() {
    var FRAME_WIDTH = 16;
    var ELBOW_RAD = 2;
    var FRAME_HEIGHT = 23;
    var group = new THREE.Group();
    var pipeGeo = new THREE.CylinderGeometry(0.75, 0.75, FRAME_WIDTH, 20);
    var frameMat = new THREE.MeshPhongMaterial({color:0x64591F});
    var topBar = new THREE.Mesh (pipeGeo, frameMat);

    var elbowGeo = new THREE.TorusGeometry(ELBOW_RAD, 0.75, 20, 12, Math.PI / 2);
    var leftElbow = new THREE.Mesh (elbowGeo, frameMat);
    var rightElbow = leftElbow.clone();
    leftElbow.rotateY (Math.PI / 2);
    leftElbow.position.set (0, -2, -FRAME_WIDTH/2);
    rightElbow.rotateY (-Math.PI / 2);
    rightElbow.position.set (0, -2, +FRAME_WIDTH/2);
    var leftBar = topBar.clone();
    leftBar.scale.set(1, FRAME_HEIGHT/FRAME_WIDTH, 1);
    leftBar.position.set (0, - (FRAME_HEIGHT/2 + ELBOW_RAD), FRAME_WIDTH/2 + ELBOW_RAD);
    var rightBar = topBar.clone();
    rightBar.scale.set(1, FRAME_HEIGHT/FRAME_WIDTH, 1);
    rightBar.position.set (0, - (FRAME_HEIGHT/2 + ELBOW_RAD), -(FRAME_WIDTH/2 + ELBOW_RAD));
    topBar.rotateX (Math.PI / 2);
    group.add (topBar);
    group.add (leftElbow);
    group.add (rightElbow);
    group.add (leftBar);
    group.add (rightBar);
    group.translateY (FRAME_HEIGHT + ELBOW_RAD);
    return group;
}

/* Inherit from Object3D */
SwingFrame.prototype = Object.create (THREE.Object3D.prototype);
SwingFrame.prototype.constructor = SwingFrame;