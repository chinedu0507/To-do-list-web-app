  // // Constants
  // const chkbx= [];

  function clock(){

    // Extract current time and Date
    var current = new Date(); // create date object
    var curr_secs = current.getSeconds();
    var curr_mins = current.getMinutes();
    var curr_hour = current.getHours();

      var curr_date = current.toDateString();

      if(curr_hour < 10) {
        curr_hour = "0" + curr_hour;
      }

      if(curr_mins < 10) {
        curr_mins = "0" + curr_mins;
      }

      if(curr_secs < 10) {
        curr_secs = "0" + curr_secs;
      }
      // Declarations
      document.getElementById('hour').innerHTML = curr_hour;
      document.getElementById('min').innerHTML = ":"+curr_mins;
      document.getElementById('date').innerHTML = curr_date;
  }

  setInterval(clock, 1000);

  // ADD TRANSITIONS TOO

    var body = document.body;
    body.style.backgroundImage = 'none'; // removes background image
  // function to change greetings and background image depending on the time of the day
  function greet_background(){
    // Extract current time and Date
    var current = new Date(); // create date object
    var curr_secs = current.getSeconds();
    var curr_mins = current.getMinutes();
    var curr_hour = current.getHours();

    if(curr_hour >= 12 && curr_hour < 17){
      document.getElementById('greet').innerHTML = "<h2> Good afternoon</h2>";
      body.style.backgroundImage = "url('images/img5.jpg')";
      body.style.backgroundPosition = 'center';
      body.style.backgroundAttachment = 'fixed';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundSize = 'cover';
      // body.style.color = 'white';
    }

    if(curr_hour >= 17){
      document.getElementById('greet').innerHTML = "<h2> Good evening</h2>";
      body.style.backgroundImage = "url('images/img7.jpeg')";
      body.style.backgroundPosition = 'center';
      body.style.backgroundAttachment = 'fixed';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundSize = 'cover';
      body.style.color = 'white';
      document.getElementById('item').style.color = 'white';
      document.getElementById('footer').style.color = 'white';
    }

    if(curr_hour >= 19 || curr_hour < 4){
      document.getElementById('greet').innerHTML = "<h2> Good evening</h2>";
      body.style.backgroundImage = "url('images/img6.jpg')";
      body.style.backgroundPosition = 'center';
      body.style.backgroundAttachment = 'fixed';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundSize = 'cover';
      body.style.color = 'white';
      document.getElementById('item').style.color = 'white';
      document.getElementById('footer').style.color = 'white';
    }

    if(curr_hour >= 4 && curr_hour < 12){
      document.getElementById('greet').innerHTML = "<h2> Good morning</h2>";
      body.style.backgroundImage = "url('images/img4.jpeg')";
      body.style.backgroundPosition = 'center';
      body.style.backgroundAttachment = 'fixed';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundSize = 'cover';
      body.style.color = 'black';
      document.getElementById('item').style.color = 'black';
      document.getElementById('footer').style.color = 'black';
    }
  }

  setInterval(greet_background, 200);

  var addForm = document.getElementById('form');
  var listt = document.getElementById('list');

  // Event listeners
  addForm.addEventListener('submit', addItem);// form event listener
  listt.addEventListener('click', removeItem); // ul event listener

  function addItem(e){
    e.preventDefault(); // prevents default behavior of event
    // console.log('submitted'); // no need to add a submit button

    // Get input value
    var newItem = document.getElementById('item').value;

    if(newItem !== ''){
      // Create li element
      var li = document.createElement('li');

      // Create checkbox element
      var check = document.createElement('input');
      check.setAttribute('type', 'checkbox');
      check.className = 'checks';
      check.addEventListener('change', checkBox);

      // Add class
      li.className = 'listItems editable';

      // set attribute
      li.setAttribute('contentEditable', 'false');

      li.appendChild(check);

      // Create a span to tailor the editing to just that span element
      var spann = document.createElement('span');
      spann.className = 'editable';

      // Add text node with input value
      spann.appendChild(document.createTextNode(newItem));

      // Appen span to list item
      li.appendChild(spann);

      spann.addEventListener('click', editItems); // list event listener

      // Create delete button
      var deleteBtn = document.createElement('button');

      // Add classes to button
      deleteBtn.className = 'fas fa-trash-alt fa-md btn delete';

      // Append button to li
      li.appendChild(deleteBtn);

      // Add li to list
      listt.appendChild(li);

      document.getElementById('item').value = '';
    }
  }

  function removeItem(e){
    if(e.target.classList.contains('delete')){ // check to see if the element being clicked contains the delete class
      if(confirm('Are you sure?')){
        var li = e.target.parentElement; // the li is the parent element of the button
        listt.removeChild(li); // li is a child of the ul
      }
    }
  }

  // SORT OUT KEEPING ELEMENTS FIXED WHEN THE PAGE IS REFRESHED

  function editItems(e){
     var li = e.target;
     if(li.classList.contains('editable'))
     {
       li.contentEditable = "true";
     }
  }


  function checkBox(e){
//     if(e.target.classList.contains('checks')){ // check to see if the element being clicked contains the delete class
       if(this.checked){
         setTimeout(function(){
           // setTimeout used to add a delay in milliseconds so that the checkbox is ticked before the item is deleted

            var li = e.target.parentElement; // the li is the parent element of the button
            listt.removeChild(li); // li is a child of the ul
         }, 50);
       }
}
