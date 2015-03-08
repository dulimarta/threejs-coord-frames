/**
 * Created by dulimarh on 3/6/15.
 */
Wheel = function() {
    var NUM_SPOKES = 6;
    var tubeGeo = new THREE.TorusGeometry(3.5,.4, 15, 30);
    var tubeMat = new THREE.MeshPhongMaterial({color: 0x000000});
    var tube = new THREE.Mesh (tubeGeo, tubeMat);

    var spokeGeo = new THREE.CylinderGeometry(0.3, 0.3, 3.5);
    var spokeMat = new THREE.MeshPhongMaterial({color: 0x848484});
    var spoke = new THREE.Mesh (spokeGeo, spokeMat);
    var wheel_group = new THREE.Group();

    wheel_group.add (tube);
    var dAng = 2 * Math.PI / NUM_SPOKES;
    for (var k = 0; k < NUM_SPOKES; k++) {
        var s = spoke.clone();
        s.rotateZ(k * dAng);
        s.translateY(1.75);
        wheel_group.add (s);
    }
    return wheel_group;
}

/* Inherit Wheel from THREE.Object3D */
Wheel.prototype = Object.create (THREE.Object3D.prototype);
Wheel.prototype.constructor = Wheel;