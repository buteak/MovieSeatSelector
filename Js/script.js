const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movie = document.getElementById('movieOptions');
const count = document.getElementById('count');
const total = document.getElementById('total');
populateUI();
let ticketPrice = movie.value;



function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeat'));
   if (selectedSeats !== null && selectedSeats.length > 0){
       seats.forEach((seat, index) => {
        if(selectedSeats.indexOf(index) > -1){
          seat.classList.add('selected');
        }
       });
   }
   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   if(selectedMovieIndex !== null){
      movie.selectedIndex = selectedMovieIndex;
   }
}


function setMovieData( movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice )
}

function updateCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatIndex = [...selectedSeats].map((seat) =>{
        return [...seats].indexOf(seat);
       });

       localStorage.setItem('selectedSeat', JSON.stringify(seatIndex));
    
     selectedSeatCount = selectedSeats.length;
     count.textContent = selectedSeatCount;
     total.innerText = ticketPrice * selectedSeatCount;
     

}

movie.addEventListener('change', (e) => {
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateCount();
});

container.addEventListener('click', (e) => {
 if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
     e.target.classList.toggle('selected')
     updateCount();
 }
});

updateCount();