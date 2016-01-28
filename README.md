# Apps-Script-TestApp-Library
TestApp is a service for unit testing in Google Apps Script.  
It can be added with the key `Mm17sZ23ccjNtfj2PvKV798h00DPSBbB3` or from the source in the src folder.  

#### Using TestApp  
#####Build the Test Configuration Object for TestApp.  
######You can use either method:  

1) Build the object manually.  
The test config object is a object following the convention:  
`{"functionName":{params:[array of params],returnVal:"the expected return value"}, ...}`  
Example test object:  
  
    var testObject = 
        {
          "addOne":{params:[1],returnVal:2},
          "subtract":{params:[20,10],returnVal:10},
          "removeChar":{params:["mississippi","i"],returnVal:"msssspp"},
          "notTrue":{params:[true],returnVal:false}
        };

2) Use the TestBuilder service in TestApp.  

    var testObject = TestApp.TestBuilder();
    testObject.addFunction("addOne",[1],2)  
              .addFunction("subtract",[20,10],10)
              .addFunction("removeChar",["mississippi","i"],"msssspp")
              .addFunction("notTrue",[true],false);
    testObject.TestObject(); // returns the test config object  
      
##### Using TestRunner to run your tests  
To use the TestRunner service you need to create a new TestRunner object passing it the `this` scope you are testing in. Typical case would be the Global Object `this`, but you can pass the `this` of any scope you are testing in.  If you need a reminder of `this` scoping look in the example directory for `ThisScopeExamples.gs`. Then you can use the `RunTest(TestConfigObject, callback)`.  
Example:  

    function runTests(){
     var testObject = TestApp.TestBuilder();
     testObject.addFunction("addOne",[1],2)  
               .addFunction("subtract",[20,10],10)
               .addFunction("removeChar",["mississippi","i"],"msssspp")
               .addFunction("notTrue",[true],false);
        
      //When runTests() is invoked by the Apps Script service it's 'this' is the Global Object.
      var tr = new TestApp.TestRunner(this);  
      tr.RunTest(testObject.TestObject(),checkResults);
    }  

##### Handling the RunTest callback  
The callback will recieve a TestResults object as its first paramater.  
The TestResults object has two methods. `getResults` will return the results as an array. `toString` will return the results as a string.  The results array follows the following convention:  
`[{name:"functionName",status:"PASSED/FAILED" [,error:"error message"]} , ... ]`  
  
The following example callback writes the sorted results to the Logger service,  with some [imagination](http://vignette2.wikia.nocookie.net/spongebob/images/9/9d/Spongebob_Imagination_by_kssael.png/revision/latest?cb=20120225122618)  you can respond to the tests with emails, github updates, badges, banners?, etc.  
  
      function checkResults(testLog){
        Logger.log("TESTS FAILED:");
        for(var test in testLog.getResults()){
          if(testLog.getResults()[test].status == "FAILED"){
            Logger.log(testLog.getResults()[test].name +" : "+testLog.getResults()[test].error );    
          }
        }
       Logger.log("TESTS PASSED:");
       for(var test in testLog.getResults()){      
        if(testLog.getResults()[test].status == "PASSED"){
          Logger.log(testLog.getResults()[test].name);    
        }  
       }   
     }
