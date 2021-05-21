(function() {
  var Studium, s;

  Studium = {
    'Semester1' : 
	{
		'Name': "Semester 1",
		'id': "123",
		'Module' : 
			'Modul1' :
			{
			  'Name' : "Algebra und höhere Mathematik I",
			  'Credits' : 4
			},
			'Modul2' :
			{
			  'Name' : "Betriebssysteme",
			  'Credits' : 5
			}
    },
    'Semester2' : 
	{
		'gesCr' : 30,
		'Name' : "Semester 2",
		'Module' :
			'Modul1' :
			{
			  'Name' : "Algebra und höhere Mathematik I",
			  'Credits' : 4
			},
			'Modul2' :
			{
			  'Name' : "Betriebssysteme",
			  'Credits' : 5
			}
    }
  };

  print("hallo2");

  //print(Studium.Semester1.Name);

//Studium: {Semester1, Semester2}
//print "#{Studium}"
//print "#{Studium[0]}"
 /* for (s in Studium) {
    print(s);
    print($s.Name);
    print(`${s.Name}`);
  }
  */
  for (s in Studium) {
	  print(s);
	  print(s.Name);
  }

}).call(this);


//# sourceMappingURL=test.js.map
//# sourceURL=coffeescript