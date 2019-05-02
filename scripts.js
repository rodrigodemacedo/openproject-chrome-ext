jQuery(function(){
    //alert(11);
    setInterval(highlight, 2000);
    //setTimeout(highlight, 2000);
});

const STYLE_BG_INITIAL = "background-color: initial";
const STYLE_BG_PRIORITY_HIGH = "color: #F00 !important";

const STYLE_BG_DATE_LATE = "background-color: #ffbaba !important; color: #F00";
const STYLE_BG_DATE_TODAY = "background-color: #fcf2ba !important; color: #847500";

const STYLE_BG_STATUS_READY2DEPLOY = "background-color: #bbf9a9 !important";




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
        highlightTodayTasks(row);
        highlightLateTasks(row);
    });
    
}


function highlightPriority(row){
    let willPaintRow = (txt) => {
        return txt.toLowerCase().indexOf('alta') !== -1;
    }
    let col = row.find("span.wp-table--cell-container.priority");
    let strValueColumn = row.find("span.wp-table--cell-container.priority").text();
    
    if(willPaintRow(strValueColumn)){
        paintRow(col.parent(), STYLE_BG_PRIORITY_HIGH);
    }
}


function highlightSituation(row){
    let willPaintRow = (txt) => {
        return txt.toLowerCase().indexOf('pronto para deploy') !== -1;
    }
    let col = row.find("span.wp-table--cell-container.status");
    let strValueColumn = col.text();
    
    if(willPaintRow(strValueColumn)){
        paintRow(col.parent(), STYLE_BG_STATUS_READY2DEPLOY);
    }
}


function highlightTodayTasks(row){
    let willPaintRow = (txt) => {
        let date = parseInt(txt.split('/').reverse().join(''));
        let today = parseInt((new Date).toLocaleString().split(" ")[0].split('/').reverse().join(''))
        //console.log('_rdmf_ highlightLateTasks dt: ', dt, (new Date), dt < (new Date));
        return date == today;
    }
    
    let col = row.find("span.wp-table--cell-container.dueDate");
    let strValueColumn = col.text();
    
    if(willPaintRow(strValueColumn)){
        //console.log(strValueColumn + " highlightTodayTasks");
        paintRow(col.parent(), STYLE_BG_DATE_TODAY);
    }
}


function highlightLateTasks(row){
    let willPaintRow = (txt) => {
        let date = parseInt(txt.split('/').reverse().join(''));
        let today = parseInt((new Date).toLocaleString().split(" ")[0].split('/').reverse().join(''))
        //console.log('_rdmf_ highlightLateTasks dt: ', dt, (new Date), dt < (new Date));
        return date < today;
    }
    
    let col = row.find("span.wp-table--cell-container.dueDate");
    let strValueColumn = col.text();
    
    if(willPaintRow(strValueColumn)){
        //console.log(strValueColumn + " highlightLateTasks");
        paintRow(col.parent(), STYLE_BG_DATE_LATE);
    }
}