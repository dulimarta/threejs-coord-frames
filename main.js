require([], function(){
	// detect WebGL
	if( !Detector.webgl ){
		Detector.addGetWebGLMessage();
		throw 'WebGL Not Available'
	} 
	// setup webgl renderer full page
	var renderer	= new THREE.WebGLRenderer();
    var CANVAS_WIDTH = 600, CANVAS_HEIGHT = 400;
	renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    var gbox = document.getElementById('graphicsbox');
    //document.body.appendChild(gbox);
	gbox.appendChild( renderer.domElement );

	// setup a scene and camera
	var scene	= new THREE.Scene();
	var camera	= new THREE.PerspectiveCamera(60, CANVAS_WIDTH / CANVAS_HEIGHT, 0.01, 1000);
//    camera.up.set (0, 0, 1); /* use the Z axis as the upright direction */
//    camera.position.x = 3;
    camera.position.y = 25;
	camera.position.z = 30;

//    scene.add (new THREE.GridHelper(10, 1));
	// declare the rendering loop
	var onRenderFcts= [];

	// handle window resize events
	var winResize	= new THREEx.WindowResize(renderer, camera)

	//////////////////////////////////////////////////////////////////////////////////
	//		default 3 points lightning					//
	//////////////////////////////////////////////////////////////////////////////////
	
	var ambientLight= new THREE.AmbientLight( 0x202020 )
	scene.add( ambientLight)
	var frontLight	= new THREE.DirectionalLight(0xffffff, 1);
	frontLight.position.set(10, 35, 0.0)
	scene.add( frontLight )
    scene.add ( new THREE.DirectionalLightHelper (frontLight, 1));
	var backLight	= new THREE.SpotLight('white', 1, 0, Math.PI / 6);
    backLight.castShadow = true;
	backLight.position.set(-4, 20, 10)
	scene.add( backLight )
    scene.add ( new THREE.SpotLightHelper (backLight, 0.2));

	//////////////////////////////////////////////////////////////////////////////////
	//		add an object and make it move					//
	//////////////////////////////////////////////////////////////////////////////////	
    var wheel_cf = new THREE.Matrix4();
    wheel_cf.makeTranslation(0, -20, 0);
    var arm_cf = new THREE.Matrix4();
    arm_cf.makeRotationZ(THREE.Math.degToRad(40));
    var wheel = new Wheel();
    var arm = new SwingArm(20);
//    arm.add (new THREE.AxisHelper(2));
    var frame = new SwingFrame();
    arm.add (wheel);
    frame.add(arm);
    scene.add (frame);
//    scene.add (new THREE.AxisHelper(4));
    var groundPlane = new THREE.PlaneBufferGeometry(40, 40, 5, 5);
    var groundMat = new THREE.MeshPhongMaterial({color:0x1d6438, ambient:0x1d6438});
    var ground = new THREE.Mesh (groundPlane, groundMat);
    ground.rotateX(THREE.Math.degToRad(-90));
    scene.add (ground);
//    var grid = new THREE.GridHelper(50, 1);
//    scene.add (grid);
    camera.lookAt(new THREE.Vector3(0, 30, 0));
//    mesh.matrixAutoUpdate = false;

	onRenderFcts.push(function(delta, now){
        var tran = new THREE.Vector3();
        var quat = new THREE.Quaternion();
        var rot = new THREE.Quaternion();
        var vscale = new THREE.Vector3();

        wheel_cf.multiply(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(delta * 72)));
        wheel_cf.decompose(tran, quat, vscale);
        wheel.position.copy(tran);
        wheel.quaternion.copy(quat);

        var prev_angle = 40.0 * Math.cos(now - delta);
        var curr_angle = 40.0 * Math.cos(now);
        arm_cf.multiply(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(curr_angle - prev_angle)));
        arm_cf.decompose (tran, quat, vscale);
//        rot.setFromAxisAngle( new THREE.Vector3(0,0,1), THREE.Math.degToRad(arm_angle));
        arm.position.copy(tran);
        arm.quaternion.copy(quat);
	});
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Camera Controls							//
	//////////////////////////////////////////////////////////////////////////////////
	var mouse	= {x : 0, y : 0};
	document.addEventListener('mousemove', function(event){
		mouse.x	= ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
		mouse.y	= 1 - ((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height);
	}, false);

	onRenderFcts.push(function(delta, now){
		camera.position.x += (mouse.x*30 - camera.position.x) * (delta*3);
		camera.position.y += (mouse.y*30 - camera.position.y) * (delta*3);
//		camera.lookAt( scene.position )
	});

	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	onRenderFcts.push(function(){
		renderer.render( scene, camera );		
	});
	
	//////////////////////////////////////////////////////////////////////////////////
	//		Rendering Loop runner						//
	//////////////////////////////////////////////////////////////////////////////////
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(f){
			f(deltaMsec/1000, nowMsec/1000)
		})
	})
});
