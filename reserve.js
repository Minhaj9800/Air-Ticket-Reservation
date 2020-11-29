//generating random price for 3 type seats(A, B,C).
// Calling randomPrice() method with paraameter 1, 6,11 where parameters 1 is for SeatA, 6 is of B, 11 is for C section.
const priceA = randomPrice(1);
const priceB = randomPrice(6);
const priceC = randomPrice(11);
var high = "X";
var mid = "X";
var low = "X";
var showA = "Section A: $" + priceA + "<br>";
var showB = "Section B: $" + priceB + "<br>";
var showC = "Section C: $" + priceC + "<br>";

var seats = [,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var ticketCount = 15;


function start()
{
  showPriceOrder();
  var secPrice = document.getElementById("pricess");

  secPrice.innerHTML = "<b>Current Section Prices</b><br>" + low + mid + high;

  outputArray(document.getElementById( "output1" ) );
}


function showPriceOrder(){

  if(priceA == Math.max(priceA,Math.max(priceB,priceC))){
    high = showA;
    if(priceB > priceC){
      mid = showB;
      low = showC;
    }else{
      mid = showC;
      low = showB;
    }
  }else if(priceB > priceC){
    high = showB;
    if(priceA > priceC){
      mid = showA;
      low = showC;
    }else{
      mid = showC;
      low = showA;
    }
  }else{
    high = showC;
    if(priceA > priceB){
      mid = showA;
      low = showB;
    }else{
      mid = showB;
      low = showA;
    }
  }
}




/* */
function outputArray(output)
{
/*--------------------------------form-----------------------*/
  var content = "<form action='#'><select id='selectSeat'>"; //start form
  var section = "A";

  for(var i=1; i<=15; ++i)
  {
    if(i==6)
      section = "B";
    else if(i==11)
      section = "C";

    if(seats[i]==0)
      content += "<option value = '"+ i +"'>Seat " + section + i + "</option>";
  }
  content += "</select>";
  content += "<input id='buyButton' type='button' value = 'Purchase'>";
  content += "</form>"//end form
  /*-----------------------------end form-----------------------*/

  output.innerHTML = content;

  var button = document.getElementById('buyButton');

/*---------check if tickets are still available----------*/
  if(ticketCount==0){
    button.disabled=true;
    var out3 = document.getElementById("output3");
    out3.innerHTML = "<br><b><u><h2>The information for the next flight will be available soon.</u></b><br></h2><hr>";
  }
/*--------------------------------------------------------*/

  button.addEventListener('click', function(){checkOut();}, false);
}

function checkOut()
{
  var selection = document.getElementById("selectSeat");
  var seatNum = parseInt(selection.value);

  //Choose which area the chosen seat is
  var section = "Non";
  var price = -1;
  if(1<=seatNum && seatNum<=5){
    section ="A";
    price = priceA;
  }
  else if(6<=seatNum && seatNum<=10){
    section ="B";
    price = priceB;
  }
  else if(11<=seatNum && seatNum<=15){
    section ="C";
    price = priceC;
  }

    var name = window.prompt("Enter your name: ", "Here")
    //Set the picture setSold
    setSold(seatNum);
    //Make a seat occupied in Array
    seats[seatNum]=1;

    document.getElementById('ticket').innerHTML="<b>Your Flight Ticket<b><hr>"+
    "Name:          "+name+"<br>"+
    "Seat Section:  "+section+"<br>"+
    "Seat Number:   "+seatNum +"<br>"+
    "Price:         $"+price;

    ticketCount--;

    outputArray(document.getElementById( "output1" ) );
}

/* */
function setSold(seatNum)
{
  var seatImg = document.getElementById('s' + seatNum);
  seatImg.setAttribute("src", 'Buttons/Unavailable.jpeg');
}


/* */
function randomPrice(seatNum)
{
  var price = -1;

  if(1<=seatNum && seatNum<=5)
    price = Math.floor(100+Math.random()*100);
  else if(6<=seatNum && seatNum<=15)
    price = Math.floor(100+Math.random()*200);

    return price;

}


window.addEventListener( "load", start, false );
