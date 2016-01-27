function TestBuilder(){return new TestBuilder_()};

function TestBuilder_(){
  var thisTestBuilder = this,
      TESTOBJ = {};
  
  thisTestBuilder.addFunction = 
    function(name,params,returnVal){
      TESTOBJ[name] = {"params":params,"returnVal":returnVal};
      return thisTestBuilder;
    };
  
  thisTestBuilder.removeFunction = 
    function(name){
      if(name in TESTOBJ){
        delete TESTOBJ[name];
      }
      return thisTestBuilder;
    };
  
  thisTestBuilder.toString = 
    function(){
      return  JSON.stringify(TESTOBJ);
    };
  thisTestBuilder.TestObject = 
    function(){
      return TESTOBJ;
    };
  return thisTestBuilder;
}