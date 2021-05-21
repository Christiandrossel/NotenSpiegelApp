##Der HintergrundLayer
BackLayer = new ScrollComponent
    width: Screen.width
    height: Screen.height




## Layer mit dem Text Semesterübersicht
SemÜber = new Layer
    x: 0
    y: 0;
    width: 300
    height: 70
    html: "<center> <h1> Semesterübersicht</h1> </center>"

## Layer auf dem die Button drauf sind
Navigation = new Layer
    x: 0
    y: 70
    width: 300
    height: 50
    backgroundColor: "grey"
    fontColor: "black"
Navigation.clip = true

## Semster Buttons
k=0
Sembtn = []
for i in [1..6]
    Sembtn[i] = new Layer
        name: "button"
        parent: Navigation
        backgroundColor: "black"
        x: k
        y: 5
        width: 100
        height: 30
        html: "<center>" + i + ". Semester </center>"
    k += 113
    Sembtn[i].placeBehind(BackLayer)
    Sembtn[i].draggable.enabled = true
    Sembtn[i].draggable.horizontal = true
    Sembtn[i].draggable.vertical = false
    # Make horizontal dragging slow 
    Sembtn[i].draggable.speedX = 1
    Sembtn[i].on Events.DragMove, ->
        Sembtn[i].draggable.isMoving

    
        

## Layer in der das Bild mit dem Flugzeug und dem Ziel ist
Image = new Layer
    x: 0
    y: 120;
    width: 300
    height: 100
    backgroundColor: "white"
    image: "images/übersicht.jpg"
    

## Array mit Modulnamen zu den Modulen
moduleName = [ "Algebra und höhere Mathematik I", 
            "Digitale Bildbearbeitung", 
            "Grundlagen der Gestaltung",
            "Programmierung I",
            "Grundlagen der Informatik I",
            "Betriebssysteme",
            "Elektronik für Medieninformatiker",
            "Technisches Englisch" ]



## Die einzelnen Module im 1. Semester
Modul = []
k = 100
j=130
for i in [0..7]
    Modul[i] =new TextLayer
        x: 30
        y: j += 110
        width: 200
        height: k = 100
        font: "20px Comic Sans MS, cursive, sans-serif"
        padding: 15
        textAlign: "center"
        textColor: "black"
        backgroundColor: "white"
        borderWidth: 2
        borderColor: "black"
        text: moduleName[i]

    ##Modul[i].centerX()

    ##Layer änderung wenn es angeklickt wird
    Modul[i].states.add
        stateA:
            x: 30
            height: k = 100
        stateB:
            x: 240
            height: k = 300
        stateC:
            y: j += 310
        stateD:
            y: j -= 310
    ##Layer Klick Event, änderungen werden aufgerufen
    Modul[i].onTap ->
        @states.next("stateA", "stateB")
        #Modulbeschreibung.parent= Modul[i]
        

###
Module = new TextLayer
    font: "20px Comic Sans MS, cursive, sans-serif"
    backgroundColor: "white"
    borderWidth: 2
    borderColor: "black"
    padding: 15
    textAlign: "center"
    textColor: "black"
    x: 0
    y: i=210;
    width: 200
    height: 100

Module.states.inactive =
    backgroundColor: "black"
    width: 300
    height: 100

Module.states.active =
    backgroundColor: "white"
    width: 300
    height: 400


Mathe1 = new TextLayer
    font: "20px Comic Sans MS, cursive, sans-serif"
    backgroundColor: "white"
    borderWidth: 2
    borderColor: "black"
    padding: 15
    textAlign: "center"
    textColor: "black"
    x: 0
    y: i=210;
    text: "Algebra & höhere Mathematik"
    width: 200
    height: 100

Mathe1.centerX()
mathe1.on Events.MouseOver, (event, layer) ->
	Mathe1.stateSwitch 'active'

Mathe1.on Events.MouseOut, (event, layer) ->
	Mathe1.stateSwicth 'inactive'


DBB = new TextLayer
    font: "20px Comic Sans MS, cursive, sans-serif"
    padding: 15
    textAlign: "center"
    textColor: "black"
    x: 0
    y: i += 120
    width: 200
    height: 100
    backgroundColor: "white"
    borderWidth: 2
    borderColor: "black"
    text: "Digitale Bildbearbeitung"

GdG = new TextLayer
    font: "20px Comic Sans MS, cursive, sans-serif"
    padding: 15
    textAlign: "center"
    textColor: "black"
    x: 0
    y: i += 120
    width: 200
    height: 100
    backgroundColor: "white"
    borderWidth: 2
    borderColor: "black"
    text: "Grundlagen der Gestaltung"

Prog1 = new TextLayer
    font: "20px Comic Sans MS, cursive, sans-serif"
    padding: 15
    textAlign: "center"
    textColor: "black"
    x: 0
    y: i += 120
    width: 200
    height: 100
    backgroundColor: "white"
    borderWidth: 2
    borderColor: "black"
    text: "Programmieren I"

GdI = new TextLayer
    font: "20px Comic Sans MS, cursive, sans-serif"
    padding: 15
    textAlign: "center"
    textColor: "black"
    x: 0
    y: i += 120
    width: 200
    height: 100
    backgroundColor: "white"
    borderWidth: 2
    borderColor: "black"
    text: "Grundlagen der Informatik"

Bs = new TextLayer
    font: "20px Comic Sans MS, cursive, sans-serif"
    padding: 15
    textAlign: "center"
    textColor: "black"
    x: 0
    y: i += 120
    width: 200
    height: 100
    backgroundColor: "white"
    borderWidth: 2
    borderColor: "black"
    text: "Betriebssysteme"

Elek = new TextLayer
    font: "20px Comic Sans MS, cursive, sans-serif"
    padding: 15
    textAlign: "center"
    textColor: "black"
    x: 0
    y: i += 120
    width: 200
    height: 100
    backgroundColor: "white"
    borderWidth: 2
    borderColor: "black"
    text: "Elektronik"

Eng = new TextLayer
    font: "20px Comic Sans MS, cursive, sans-serif"
    padding: 15
    textAlign: "center"
    textColor: "black"
    x: 0
    y: i += 120
    width: 200
    height: 100
    backgroundColor: "white"
    borderWidth: 2
    borderColor: "black"
    text: "Englisch I"
###


###
layerA = new Layer
    x: 0
    y: 400
    width: 200
    height: 200
    backgroundColor: "orange"
    html: "<center> <b>HTML TEXT</b> <br/>blablablablabla </center>"
 
layerB = new Layer
    x: 880
    y: 370
    width: 100
    height: 100
    backgroundColor: "green"
    shadow1:
        y: 2
        blur: 4
        color: "black"
    shadow2:
        y: 2
        blur: 4
        color: "red"
    
 


 
##layerB.center()
 


layerA.animate
    x: 400
    options:
        curve: Spring(damping: 1.5)
        time: 2.5

layerB.animate
    x: 330
    options:
        curve: Spring(damping: 1.5)
        time: 2.5
###

