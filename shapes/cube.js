var MyCube = function() {

}

MyCube.prototype.build = function() {
    var geometry	= new THREE.BufferGeometry();
    var vertexPos = [
        +0.8, +.8, +1,
        +0.8, -.8, +1,
        +1, -1, -1,
        +1, +1, -1,
        -0.8, +.8, +1,
        -0.8, -.8, +1,
        -1, -1, -1,
        -1, +1, -1
    ];
    var vertexNormals = [
        1, 0, 0,
        1, 0, 1,
        0, 0, -1,
        0, 0, -1,
        0, 0, +1,
        0, 0, +1,
        -1, 0, 0,
        -1, 0, 0
    ];
    var vertexColors = [
        0.5, 0.5, 0.0,
        1.0, 1.0, 1.0,
        0.3, 0.22, 0.0,
        0.02, 0.1, 0.0,
        0.33, 0.28, 0.45,
        0.66, 0.71, 0.1,
        0.34, 0.67, 0.163,
        0.335, 0.431, 0.155
    ];

    /* Three JS will render triangles */
    var indices = [
        0, 1, 2, 0, 2, 3,
        4,0,3,4,3,7,
        4,7,6,5,4,6,
        1,5,6,1,6,2,
        5,1,0,5,0,4,
        3,2,6,3,6,7
    ];

    /* similar to glVertexPointer */
    var vertexArr = new Float32Array(vertexPos.length);
    for (var k = 0; k < vertexPos.length; k++)
        vertexArr[k] = vertexPos[k];
    geometry.addAttribute ('position', new THREE.BufferAttribute (vertexArr, 3));

    /* similar to glNormalPointer */
    var normalArr = new Float32Array(vertexNormals.length);
    for (var k = 0; k < vertexNormals.length; k++)
        normalArr[k] = vertexNormals[k];
    geometry.addAttribute ('normal', new THREE.BufferAttribute (normalArr, 3));

    /* similar to glColorPointer */
    var colorArr = new Float32Array(vertexColors.length);
    var color = new THREE.Color;
    for (var k = 0; k < vertexColors.length; k += 3) {
        color.setRGB(vertexColors[k], vertexColors[k+1], vertexColors[k+2]);
        colorArr[k] = color.r;
        colorArr[k+1] = color.g;
        colorArr[k+2] = color.b;
    }
    geometry.addAttribute ('color', new THREE.BufferAttribute (colorArr, 3));

    var indexArr = new Uint32Array(indices.length);
    for (var k = 0; k < indices.length; k++)
        indexArr[k] = indices[k];
    geometry.addAttribute ('index', new THREE.BufferAttribute (indexArr, 1));

    geometry.computeBoundingSphere();
    return geometry;
}