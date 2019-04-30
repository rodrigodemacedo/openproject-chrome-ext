jQuery(function(){
    //alert(11);
    setInterval(highlight, 2000);
});

const STYLE_BG_INITIAL = "background-color: initial";
const STYLE_BG_HIGH_PRIORITY = "color: #F00 !important";
const STYLE_BG_LATE = "background-color: #fcf2ba !important; color: #F00";
const STYLE_BG_READY2DEPLOY = "background-color: #bbf9a9 !important";




function paintRow(element, style){
    element.attr('style',  style);
}

//
//
//

function highlight(){
    processRow();



    // highlightPriority();
    // highlightReadyToDeploy();
}



function processRow(){
    jQuery("tr.wp-table--row").each(function(){
        let row = $(this);
        paintRow(row, STYLE_BG_INITIAL);
        highlightPriority(row);
        highlightSituation(row);
        highlightLateTasks(row);
    });
    
}


function highlightPriority(row){
    let isHighPriority = (txt) => {
        return txt.toLowerCase().indexOf('alta') !== -1;
    }
    let col = row.find("span.wp-table--cell-container.priority");
    let strValueColumn = row.find("span.wp-table--cell-container.priority").text();
    
    if(isHighPriority(strValueColumn)){
        paintRow(col.parent(), STYLE_BG_HIGH_PRIORITY);
    }
}


function highlightSituation(row){
    let isReadyToDeploy = (txt) => {
        return txt.toLowerCase().indexOf('pronto para deploy') !== -1;
    }
    let col = row.find("span.wp-table--cell-container.status");
    let strValueColumn = col.text();
    
    if(isReadyToDeploy(strValueColumn)){
        paintRow(col.parent(), STYLE_BG_READY2DEPLOY);
    }
}


function highlightLateTasks(row){
    let isReadyToDeploy = (txt) => {
        var parts = txt.split("/");
        var dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
        return dt < (new Date);
    }
    
    let col = row.find("span.wp-table--cell-container.dueDate");
    let strValueColumn = col.text();
    
    if(isReadyToDeploy(strValueColumn)){
        paintRow(col.parent(), STYLE_BG_LATE);
    }
}