/**
 * Created by dulimarh on 3/6/15.
 */
var Wheel = function() {

}

Wheel.prototype = {
    //tire: {},
    NUM_SPOKES : 6,
    build: function() {
        var tubeGeo = new THREE.TorusGeometry(3.5,.4, 15, 30);
        var tubeMat = new THREE.MeshBasicMaterial({color: 0x74556A, wireframe:true});
        var tube = new THREE.Mesh (tubeGeo, tubeMat);

        var spokeGeo = new THREE.CylinderGeometry(0.3, 0.3, 3.5);
        var spokeMat = new THREE.MeshBasicMaterial({color: 0x848484, wireframe:true});
        var spoke = new THREE.Mesh (spokeGeo, spokeMat);
        var wheel_group = new THREE.Group();

        wheel_group.add (tube);
        var dAng = 2 * Math.PI / this.NUM_SPOKES;
        for (var k = 0; k < this.NUM_SPOKES; k++) {
            var s = spoke.clone();
            s.rotateZ(k * dAng);
            s.translateY(1.75);
            wheel_group.add (s);
        }
        return wheel_group;
    }

    //render : function() {
    //
    //}
}