# Render Using Coordinate Frames

The animation shows the following dependency among the three
main components of the swing:

* The swing arm is attached to the support frame
* The wheel is attached to the swing arm

To render the correct animation of these objects,

* The wheel must be rendered with respect to the swing arm coordinate frame
* The swing arm must be rendered with respect to the support coordinate frame

## OpenGL

In OpenGL we express the above dependencies using the following
code:

```
glPushMatrix();
   glMulMatrixf (__support_frame_cf__);
   support_frame.render();
   glPushMatrix();
      glMulMatrixf (__arm_cf__);
      arm.render();

      glPushMatrix();
         glMultMatrixf (__wheel_cf__);
         wheel.render();
      glPopMatrix();
   glPopMatrix();
glPopMatrix();
```

## three.js

In three.js, these dependencies are expressed as 'parent-child'
relationships:

```
frame = new THREE.Mesh (____, ____);
arm   = new THREE.Mesh (____, ____);
wheel = new THREE.Mesh (____, ____);

arm.add (wheel);   /* wheel is a child of arm */
frame.add (arm);   /* arm is a child of support frame */

scene.add (frame);
```

The render loop then updates each coordinate frame as follows:

```
/* update the coordinate frame */
wheel_cf.multiply (_____);

/* decompose it into its translation, rotation, and scale constituents */
wheel_cf.decompose (vpos, qrot, vscale);

/* update the object transformation matrix */
wheel.position.copy (vpos);
wheel.quaternion.copy (qrot);
wheel.scale.copy (vscale);     /* if desired */
wheel.updateMatrix();
```

## Using Vertex Buffers

In ThreeJS, vertex buffers are managed by the BufferGeometry class.
The code sample `shapes/cone.js` shows an example of buidling an object. 
The cone constructor function creates only the geometry, it is missing the material setup.

To use the Cone in a THREE.Mesh object, we must supply a material. 

```
var coneGeo = new Cone(40);   // 40 points around the base circle
var coneMat = new THREE.MeshPhongMaterial();  // customize with your own color
var coneMesh = new THREE.Mesh (coneGeo, coneMat);
scene.add(coneMesh);    /* place it on the scene */
```
