/**
 * Created by dulimarh on 3/7/15.
 */
var SwingArm = function() {

}

SwingArm.prototype = {
    build: function() {
        var armGeo = new THREE.CylinderGeometry (0.2, 0.2, 20);
        var armMat = new THREE.MeshBasicMaterial({color:0x5463C0, wireframe:true});
        var armL = new THREE.Mesh (armGeo, armMat);
        var armR = armL.clone();

        var armGroup = new THREE.Group();
        armL.translateZ (-0.5);
        armR.translateZ (+0.5);
        armGroup.add(armL);
        armGroup.add(armR);
        armGroup.translateY (10);
        return armGroup;
    }
}