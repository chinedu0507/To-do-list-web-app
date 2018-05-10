
  // Used to populate to-do lst if there are any elements in the session storage
  document.addEventListener("DOMContentLoaded", populateList);

  // Array for session storage
  var listArray = [];

  // Functions

  function clock(){

    // Extract current time and Date
    var current = new Date(); // create date object
    var curr_mins = current.getMinutes();
    var curr_hour = current.getHours();
    var curr_date = current.toDateString();

    // Add zero for minutes and hours less than 10
    curr_mins = curr_mins < 10 ? "0" + curr_mins : curr_mins;
    curr_hour = curr_hour < 10 ? "0" + curr_hour : curr_hour;

    // Displaying time and date on the page
    document.getElementById('hour').innerHTML = curr_hour;
    document.getElementById('min').innerHTML = ":"+curr_mins;
    document.getElementById('date').innerHTML = curr_date;
  }

  setInterval(clock, 1000);

    var body = document.body;
    body.style.backgroundImage = 'none'; // removes background image

  // function to change greetings and background image depending on the time of the day
  function greet_background(){

    // Extract current time and Date
    var current = new Date(); // create date object
    var curr_secs = current.getSeconds();
    var curr_mins = current.getMinutes();
    var curr_hour = current.getHours();

    // Afternoon properties
    if(curr_hour >= 12 && curr_hour < 17){
      document.getElementById('greet').innerHTML = "<h2> Good afternoon</h2>";
      body.style.backgroundImage = "url('images/img5.jpg')";
      body.style.backgroundPosition = 'center';
      body.style.backgroundAttachment = 'fixed';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundSize = 'cover';
      document.getElementById('item').style.borderColor = '#000';
    }

    // Evening Properties
    if(curr_hour >= 17){
      document.getElementById('greet').innerHTML = "<h2> Good evening</h2>";
      body.style.backgroundImage = "url('images/img8.jpeg')";
      body.style.backgroundPosition = 'center';
      body.style.backgroundAttachment = 'fixed';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundSize = 'cover';
      body.style.color = 'white';
      document.getElementById('item').style.color = 'white';
      document.getElementById('footer').style.color = 'white';
      document.getElementById('item').style.borderColor = '#f4f4f4';
    }

    // Morning Properties 1
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
      document.getElementById('item').style.borderColor = '#f4f4f4';
    }

    // Morning Properties 2
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
      document.getElementById('item').style.borderColor = '#000';
    }
  }

  setInterval(greet_background, 200);

  // DOM Elements
  var addForm = document.getElementById('form');
  var listt = document.getElementById('list');

  // Event listeners
  addForm.addEventListener('submit', addItem);// form event listener
  listt.addEventListener('click', removeItem); // ul event listener

  // Add items to unordered list
  function addItem(e){
    e.preventDefault(); // prevents default behavior of event
    // console.log('submitted'); // no need to add a submit button

      // Get input value
      var newItem = document.getElementById('item').value;

      // Check to ensure that empty entries are not added to the to-do list
    if(newItem != "")
    {
      // Adding inputs to the list array
      listArray.push(newItem);

      // Stringify in order to store in session storage
      var listString = JSON.stringify(listArray);

      sessionStorage.setItem('toDo', listString);

      var retrieve = sessionStorage.getItem('toDo');
      // var ree = JSON.parse(retrieve); // convert it back to an object -> array

      // Create li element
      var li = document.createElement('li');

      // Create checkbox element
      var check = document.createElement('input');
      check.setAttribute('type', 'checkbox');
      check.className = 'checks';
      check.addEventListener('change', checkBox);

      // Add class
      li.className = 'listItems editable';

      // Append checkbox to list
      li.appendChild(check);

      // Create a span to tailor the editing to just that span element
      var spann = document.createElement('span');
      spann.className = 'editable';

      // Add text node with input value
      spann.appendChild(document.createTextNode(newItem));

      // Append span to list item
      li.appendChild(spann);

      // list event listener
      spann.addEventListener('click', editItems);

      // Create delete button
      var deleteBtn = document.createElement('button');

      // Add classes to button with font awesome
      deleteBtn.className = 'fas fa-trash-alt fa-md btn delete';

      // Append button to li
      li.appendChild(deleteBtn);

      // Add li to list
      listt.appendChild(li);

      // Reset form entry
      addForm.reset();
    }
  }

  // Remove item from the list
  function removeItem(e){
    if(e.target.classList.contains('delete')){ // check to see if the element being clicked contains the delete class
      if(confirm('Are you sure?')){
        var li = e.target.parentElement; // the li is the parent element of the button

        // Session storage update
        sessionTweaking(li);

        // Removing li from ul
      listt.removeChild(li); // li is a child of the ul
      }
    }
  }

  // Edit list items
  function editItems(e){
     var li = e.target;
     if(li.classList.contains('editable'))
     {
       li.contentEditable = "true";
     } else li.contentEditable = "false";
  }

  // Removes checked items from the list
  function checkBox(e){
      // if(e.target.classList.contains('checks')) same as if statement below
       if(this.checked){
         setTimeout(function(){
       // setTimeout used to add a delay in milliseconds so that the checkbox is ticked before the item is deleted
       var li = e.target.parentElement; // the li is the parent element of the button

       // Session storage update
       sessionTweaking(li);

       // Removing li from ul
        listt.removeChild(li); // li is a child of the ul
      }, 50);
   }
 }

 // Function to handle session storage
 function sessionTweaking(element){

    // Assign session storage key to a variable
    var retrieve = sessionStorage.getItem('toDo');

    // need to convert it to array then we can access the values
    var retrieveString = JSON.parse(retrieve);

    // Loop through session storage in array form
    for(var i = 0; i < retrieveString.length; i++)
    {
      if(element.textContent == retrieveString[i]){
      console.log('Yes');
      // At position i in the array, remove 1 item
      retrieveString.splice(i,1);
      console.log(retrieveString);

      // Updating session storage with the new array
      sessionStorage.setItem('toDo', JSON.stringify(retrieveString));
     }
   }
}

// This function populates list with elements from session storage when the web page is reloaded
function populateList(){

  // Retrieve array from session storage
  var retrieve = sessionStorage.getItem('toDo');
  var retrieveArray = JSON.parse(retrieve); // convert it back to an object -> array

  for(var i = 0; i < retrieveArray.length; i++)
  {
    var newItem = retrieveArray[i];

    // Create li element
    var li = document.createElement('li');

    // Create checkbox element
    var check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.className = 'checks';
    check.addEventListener('change', checkBox);

    // Add class
    li.className = 'listItems editable';

    // Append checkbox to list
    li.appendChild(check);

    // Create a span to tailor the editing to just that span element
    var spann = document.createElement('span');
    spann.className = 'editable';

    // Add text node with input value
    spann.appendChild(document.createTextNode(newItem));

    // Append span to list item
    li.appendChild(spann);

    // list event listener
    spann.addEventListener('click', editItems);

    // Create delete button
    var deleteBtn = document.createElement('button');

    // Add classes to button with font awesome
    deleteBtn.className = 'fas fa-trash-alt fa-md btn delete';

    // Append button to li
    li.appendChild(deleteBtn);

    // Add li to list
    listt.appendChild(li);
  }
}
