var selection = 0;

var fps = { startTime : 0, frameNumber : 0,
  getFPS : function() {
    this.frameNumber++;
    var d = new Date().getTime(), currentTime = ( d - this.startTime ) / 1000, result = Math.floor( ( this.frameNumber / currentTime ) );
    if( currentTime > 1 ) {
      this.startTime = new Date().getTime();
      this.frameNumber = 0;
    }
    return result;
  }
};

function Enum(constantsList) {
	for (var i in constantsList) {
 		this[constantsList[i]] = i;
	}
}

var ObjTyp = new Enum(['EMPTY', 'SPHERE', 'CUBOID', 'CYLINDER', 'CONE', 'TRIANGLE']);


var camera = [
	0,1.8,15,                  // x,y,z 
	0,3,0,                     // Vector
	45                         // field of view : example 45
];

var lights = [
	2,                                                                                
	-30,-10,10, 1,1,1,        // light 1, x,y,z location, and rgb 
	30,3,20, 1,1,1,        // light 2, x,y,z location, and rgb 
];


var objects = [
	4, // number of objects                               
	ObjTyp.SPHERE,      13, 0.0,0.0,1.0,0.2,0.7,0.1,1.0, 0,3,-5,2,        
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,            
	ObjTyp.SPHERE,      13, 1.0,0.0,0.0,0.2,0.7,0.1,1.0, -4,2,-5,0.2,           
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,           
  	ObjTyp.SPHERE,      13, 0.0,1.0,0.0,0.2,0.7,0.1,1.0, -3,3,-5,0.6,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 0,13,-10,0.1        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,       
];



/*
var objects = [
	16, // number of objects                               
	ObjTyp.SPHERE,      13, 0.0,0.0,1.0,0.2,0.7,0.1,1.0, 0,3,-1,0.1,        
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,            
	ObjTyp.SPHERE,      13, 1.0,0.0,0.0,0.2,0.7,0.1,1.0, 0,3.5,-1,0.1,           
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,           
  	ObjTyp.SPHERE,      13, 0.0,1.0,0.0,0.2,0.7,0.1,1.0, 0,2.5,-1,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 0.5,3,-1,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 1.5,3,-1,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 0,3,-0.5,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 0,3,-1.5,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 1.2,3.3,-1.5,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 0.0,0.0,1.0,0.2,0.7,0.1,1.0, 0.8,3.1,-1.7,0.1,        
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,            
	ObjTyp.SPHERE,      13, 1.0,0.0,0.0,0.2,0.7,0.1,1.0, 0.5,2,-1.3,0.1,           
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad, 

	ObjTyp.SPHERE,      13, 0.0,0.0,1.0,0.2,0.7,0.1,1.0, 0.4,3,-2,0.1,        
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,            
	ObjTyp.SPHERE,      13, 1.0,0.0,0.0,0.2,0.7,0.1,1.0, 0.3,3.5,-2.7,0.1,           
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,           
  	ObjTyp.SPHERE,      13, 0.0,1.0,0.0,0.2,0.7,0.1,1.0, 0,2.5,-2,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 0.5,3,-2.1,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 1.5,3,-3,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 0,3,-2,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 0,3,-2,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, 1.2,3.3,-2,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 0.0,0.0,1.0,0.2,0.7,0.1,1.0, 0.8,3.1,-1.7,0.1,        
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,            
	ObjTyp.SPHERE,      13, 1.0,0.0,0.0,0.2,0.7,0.1,1.0, 0.5,2,-1.4,0.1,           
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,        

	ObjTyp.SPHERE,      13, 0.0,0.0,1.0,0.2,0.7,0.1,1.0, -0.4,3,-2,0.1,        
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,            
	ObjTyp.SPHERE,      13, 1.0,0.0,0.0,0.2,0.7,0.1,1.0, -0.3,3.5,-2.7,0.1,           
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,           
  	ObjTyp.SPHERE,      13, 0.0,1.0,0.0,0.2,0.7,0.1,1.0, -0.1,2.5,-2,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, -0.2,3,-2.1,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, -1.5,3,-3,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, -0.3,3,-2,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, -0.6,3,-2,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 1.0,1.0,0.0,0.2,0.7,0.1,1.0, -0.2,3.3,-2,0.1,        
  	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,      
  	ObjTyp.SPHERE,      13, 0.0,0.0,1.0,0.2,0.7,0.1,1.0, -0.1,3.1,-1.7,0.1,        
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,            
	ObjTyp.SPHERE,      13, 1.0,0.0,0.0,0.2,0.7,0.1,1.0, -0.7,2,-1.4,0.1,           
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,    

	ObjTyp.SPHERE,      13, 0.0,0.0,1.0,0.2,0.7,0.1,1.0, 0.1,3,-2,0.1,        
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,            
	ObjTyp.SPHERE,      13, 1.0,0.0,0.0,0.2,0.7,0.1,1.0, 1,3.5,-2.7,0.1,           
	// typ,recsz,r,g,b,spec,lamb,amb,opac,x,y,z,rad,         
];
*/









