var TestRunner = function(applicationObject){
  this.appFunctions = applicationObject;
};

TestRunner.appFunctions = {};
TestRunner.prototype.setAppFunctions = function(appObject){this.appFunctions = appObject};
TestRunner.prototype.getAppFunctions = function(appObject){return this.appFunctions};


TestRunner.prototype.RunTest = function(testObj, callback) {  
  var newLog = new this.TestLog;    
  for(var func in testObj){    
      this.Assert(func, testObj[func].params, testObj[func].returnVal,newLog);    
   }
  return callback(newLog);
}


TestRunner.prototype.Assert =  function(func, params, returnVal,log){   
   try{
      var returnedVal = this.appFunctions[func].apply(this.appFunctions,params);    
    }
    catch(e){      
      log({name:func, status:"FAILED",error:e});
      return 1;
    }
   
   if(returnedVal === returnVal || returnVal == null){ // if the returnVal == null the function has completed without throwing an error
     log({name:func, status:"PASSED"}); 
   }else{
     log({name:func, status:"FAILED",error:"Invalid Return Value: " + returnedVal});
     return 1;
   }
   return 0;
}

TestRunner.prototype.TestLog = function(){
  var results = [];
  var addResult = function(result){results.push(result);}
  addResult.toString = function(){return JSON.stringify(results);}
  addResult.getResults = function(){return results;}
  return addResult;
}