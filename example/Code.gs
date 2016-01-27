var UI = function (menuName, menuFunction, sidebarFile, sidebarTitle) {
    
    this.menuName = menuName;
    this.menuFunction = menuFunction;
    this.sidebarFile = sidebarFile;
    this.sidebarTitle = sidebarTitle;
    
};

UI.prototype.createAddonMenu = function () {
    try {          
        SpreadsheetApp.getUi()
            .createAddonMenu()
            .addItem(this.menuName, this.menuFunction)
            .addToUi();       
    } catch (e) {
        throw new Error('onOpen (fail): ' +  e);
        
    }
   
};

UI.prototype.showSidebar = function () {
    var ui = HtmlService.createTemplateFromFile(this.sidebarFile)
        .evaluate()
        .setTitle(this.sidebarTitle)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);

    return SpreadsheetApp.getUi()
        .showSidebar(ui);
};



var ui = new UI('Show', 'showSidebar', 'index', 'Awesome Title');

// onOpen is a built-in Google Apps Script function that gets called when the spreadsheet is opened
function onOpen(e) {    
    return ui.createAddonMenu(); 
}

// showSidebar is a standalone function and returns the ui showSidebar method. needs to be this way in order to be called from createAddonMenu
function showSidebar() {
    return ui.showSidebar();
}

function return13(){
  return 12;
}

function return12(){
  return 12;
}


function addOne(num){
   return 1+num;
}
