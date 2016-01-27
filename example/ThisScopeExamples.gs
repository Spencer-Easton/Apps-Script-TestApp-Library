//when invoked from Apps Script this runs in the Global Scope 
//thus this is the Global Object
function testThis(){  
  var th = this;
  th.foo = "bar"  
  Logger.log(th.foo);  // bar <- initial value
  Logger.log(o.t1());              // baz 
  Logger.log(th.foo);  // bar <- not mutated
  Logger.log(t2.apply(t2));        // foo 
  Logger.log(th.foo);  // bar <- not mutated  
  Logger.log(t2());                // foo
  Logger.log(th.foo); // foo <- mutated
}

// object always get there own "this"
var o = { 
  t1: function(){  
  var th1 = this;
  th1.foo = "baz";
  return th1.foo;
  } 
};

// methods get their this based on how they are invoked
function t2(){
  var th2 = this; 
  th2.foo = "foo";
  return th2.foo;
}
