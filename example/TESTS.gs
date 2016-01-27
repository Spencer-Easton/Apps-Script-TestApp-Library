function runTests(){
 
 var testObj = TestApp.TestBuilder();
 testObj.addFunction("return12",[],12)
        .addFunction("return13",[],13)
        .addFunction("showSidebar",[],null)
        .addFunction("onOpen",[],null)
        .addFunction("DoesNotExist",[],null)
        .addFunction("addOne",[1],2);
        
  var tr = new TestApp.TestRunner(this);  //global this
  tr.RunTest(testObj.TestObject(),checkResults);
}

function checkResults(testLog){
  Logger.log("TESTS FAILED:");
  for(var test in testLog.getResults()){
    if(testLog.getResults()[test].status == "FAILED"){
      Logger.log(testLog.getResults()[test]);    
    }
  }
  
  Logger.log("TESTS PASSED:");
  for(var test in testLog.getResults()){      
    if(testLog.getResults()[test].status == "PASSED"){
      Logger.log(testLog.getResults()[test]);    
    }  
  }  
}


