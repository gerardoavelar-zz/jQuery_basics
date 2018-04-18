 function editStudent (code) {

   // Go through Student list and retreive values by code
   var students;
   for (var i = 0; i < localStorage.length; i++) {
     var key = localStorage.key(i);
     // When item is found, retrieve to form fields
     if (key == code) {
       students = $.parseJSON(localStorage.getItem(key));
       $("#code").val(students.code);
       $("#name").val(students.name);
       $("#note").val(students.note);
     };
   };
 };

 function listStudents () {
   var txt = "",
       table = $("#table");

   // Create table headers
   txt += '<table border="2" border-color="red">';
   txt += '<tr>';
   txt += '<th>Código</th>';
   txt += ' <th>Nombre</th>';
   txt += '<th>Nota</th>';
   txt += '<th>Editar</th>';
   txt += '<th>Eliminar</th>';
   txt += '</tr>';

   // Go through localStorage to list all items
   for (var i = 0; i < localStorage.length; i++) {
     var key = localStorage.key(i);
     var students = $.parseJSON(localStorage.getItem(key));

     // Add list items to the table and create buttons
     txt += '<tr>';
     txt += '<td>' + students.code + '</td>';
     txt += '<td>' + students.name + '</td>';
     txt += '<td>' + students.note + '</td>';
     txt += '<td><button onclick="editStudent(\'' + students.code + '\');">Editar</button></td>';
     txt += '<td><button onclick="removeStudent(\'' + students.code + '\');">Eliminar</button></td>';
     txt += '</tr>';
   }

   // Close table and append to html
   txt += '</table>';
   $(table).html(txt);
 }

// Remove item based on code key
 function removeStudent (code) {
   localStorage.removeItem(code);
   listStudents();
 }

// Clear form fields
 function clearValues() {
   $("#code").val("");
   $("#name").val("");
   $("#note").val("");
 }


$(document).ready(function() {

  listStudents();

  $("#button1").click(function() {
    // Register form values
    var code = $("#code").val(),
        name = $("#name").val(),
        note = $("#note").val();
    // Validate form values
    if (Number(code) == 0 || Number(note) == 0 || Number(name) == 0){
      alert("Ningún campo debe estar vacío");
    } else {
        students = {
          code: code,
          name: name,
          note: note
        };
        // Store in localStorage
        localStorage.setItem(code, JSON.stringify(students));
        listStudents();
        clearValues()
    };
  });

  // Function to calculate average from notes in localStorage
  $("#button2").click(function() {
    var nmbrs = 0;
    for(var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      var students = $.parseJSON(localStorage.getItem(key));
      nmbrs += Number(students.note);
    }
    alert("El promedio de notas es: " + (nmbrs / localStorage.length));
  });

  // Function to retreive highest note from localStorage
  $("#button3").click(function() {
    var max = 0;
    for(var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      var students = $.parseJSON(localStorage.getItem(key));
      var nmbr = Number(students.note);
      if(nmbr > max){
        max = nmbr;
      }
    }
    alert("La nota más alta es: " + max);
  });

  // Function to retreive lowest note from localStorage
  $("#button4").click(function() {
    var min = Infinity;
    for(var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      var students = $.parseJSON(localStorage.getItem(key));
      var nmbr = Number(students.note);
      if(nmbr < min){
        min = nmbr;
      }
    }
    alert("La nota más baja es: " + min);
  });
});
