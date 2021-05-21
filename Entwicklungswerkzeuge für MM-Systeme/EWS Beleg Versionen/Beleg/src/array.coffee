class Style
    @page1: 
        header:
            color: "white"
            backgroundColor: "#A4FFBF"
            #backgroundColor: "transparent"
        lineOdd: 
            color: "white"
            backgroundColor: "#A4FFBF"
        lineEven:
            color: "black"
            backgroundColor: "#FFFEA4"
            border: "2px solid black"
        white:
            color: "white"
            backgroundColor: "#fff"
            border: "5px solid white"
    @page2: 
        header:
            color: "white"
            backgroundColor: "#A4FFBF"
        lineOdd: 
            color: "white"
            backgroundColor: "#A4FFBF"
        lineEven:
            color: "black"
            backgroundColor: "#FFFEA4"
    @head:
      #  html: "<center> <h2> Semesterübersicht</h2> </center>"
        top : 0
        color: "black"
        backgroundColor: "#FFFEA4"


class PageLabel extends Layer
    pLabel: null
    constructor: (layerObj, @info) ->
        layerObj.width = 334
        layerObj.height = 70
        #layerObj.shadowY = 10
        #layerObj.shadowColor = "rgba(30,30,30,.6)"
        #layerObj.shadowBlur = 10
        super(layerObj)
        this.pLabel = new TextLayer
            fontFamily: "Verdana"
            text: this.info
            fontSize: 24
            padding:
                bottom: 30
        this.pLabel.parent = this
        this.pLabel.center()
    setStyle: (style) ->
        this.style = style
        this.pLabel.color = style.color

tapped = ""

class ListEntry extends Layer
    Name: null
    Credits: null
    myString: null
   # nSP: null
    expanded: false

    setStyle: (style) ->
        this.style = style
        this.Name.color = style.color
        this.Credits.color = style.color

    getName: () ->
        return this.Name.text
        
    tapHandler: () ->
        bc = this.style["backgroundColor"]
        
        this.backgroundColor = "white"
        this.animate
            backgroundColor: bc
        
        tapped = this.Name.text
        #print tapped
        #print modulTable[tapped]
        #modulTable[tapped].x = 30
        #print modulTable

        if this.expanded is true
            this.expanded = false
            flag = false
            for key, value of modulTable
                if flag is true
                    ypos = value.y
                    value.animate
                        y: ypos-70
                        options:
                            curve: Spring(damping: 5)
                            time: 0.5
                if key is tapped    
                    flag = true
                    value.height = 70
                    value.Credits.opacity = 0.0
                    value.myString.opacity = 0.0

        else if this.expanded is false
            this.expanded = true
            flag = false
            for key, value of modulTable
                if flag is true
                    ypos = value.y
                    value.animate
                        y: ypos+70
                        options:
                           # curve: Spring(damping: 0.5)
                            time: 0.5
                if key is tapped    
                    flag = true
                    value.height = 140
                    value.Credits.opacity = 1.0
                    value.myString.opacity = 1.0
                    value.myString.y = 90
                  
    constructor: (layerObj, @info) ->
        layerObj.width = 180
        layerObj.height = 70
        layerObj.x = 11
        super(layerObj)

        this.Name = new TextLayer
            fontFamily: "Verdana"
            fontSize: 14
            text: this.info.Name
        this.Name.parent = this
        this.Name.center()
        this.Name.y = Align.center()        

        this.Credits = new TextLayer
            fontFamily: "Verdana"
            fontSize: 12
            text: "Credits: " + this.info.Credits
        this.Credits.parent = this
        this.Credits.center()
        this.Credits.y = Align.bottom()
        this.Credits.opacity = 0.0

        this.myString = new TextLayer
            fontFamily: "Verdana"
            fontSize: 12
            text: this.info.myString
        this.myString.parent = this
        this.myString.center()
        this.myString.y = Align.bottom()
        this.myString.opacity = 0.0

        this.onTap this.tapHandler

readTextFile = (file) ->
    rawFile = new XMLHttpRequest()
    rawFile.open "GET", file, false
    rawFile.onreadystatechange = () ->
        if rawFile.readyState is 4
            if rawFile.status is 200 or rawFile.status == 0
                init JSON.parse rawFile.responseText
    rawFile.send null

clear = () ->  #zerstört die alten ListEntrys. 
    for key, value of modulTable
        value.Name.destroy()
        value.Credits.destroy()
        value.destroy()

modulTable = {}

init = (json) ->    

    container = new Layer
        width: 334
        height: 680
        borderRadius: 50
    container.clip = true

    container.center()

    subcontainer = new Layer
        width: 334
        height: 680
        borderRadius: 50
        backgroundColor: "#fff"
        parent: container
    subcontainer.clip = true

    subcontainer.center()

    pageHead = new Layer 
        width: 328
        height: 40
        x: 2
        y: 73
        parent: container
        backgroundColor: "#A4FFBF"

    pageHead.clip = true
        
    pageHeadLabel = new TextLayer
        parent: pageHead
        fontFamily: "Verdana"
        fontSize: 20
        fontStyle: "bold"
       # textAlign: "right"
        text: "Semesterübersicht" 
        color: "black"
        padding:
            bottom: 5
    pageHeadLabel.center()    

    semFeld = new PageComponent #Platz für Semesterbeschriftung
        width: 328
        height: 140
        scrollVertical: false
        parent: container
        x: 2
        y: 110

    for val, idx in json.studium # SemesterSeiten
        subPage = new Layer
            width: semFeld.width
            height: semFeld.height
            backgroundColor: "transparent"
        if idx isnt 0
            semFeld.addPage subPage, "right"
        else
            semFeld.content.addChild subPage
        
        pl = new PageLabel  #Semester Nr.
            parent: subPage, val.Name
        pl.setStyle Style["page1"].header

        flugzeug = new Layer #Flugzeug Breite Bild: 295px!!!
            width: 306
            height: 100
            x: 11
            y: 40
            parent: subPage

        if idx is 0
            flugzeug.image = "./img/f1.png"
        if idx is 1
            flugzeug.image = "./img/f2.png"
        if idx is 2
            flugzeug.image = "./img/f3.png"
        if idx is 3
            flugzeug.image = "./img/f4.png"
        if idx is 4
            flugzeug.image = "./img/f5.png"
        if idx is 5
            flugzeug.image = "./img/f6.png"

    modList = new ScrollComponent #scrollbare Modulliste
        width: 295
        height: 612
        parent: subcontainer
        x: 11
        scrollHorizontal: false

    pos = (semFeld.currentPage.x / 328) + 1 #liefert aktuelle Seite (Semster x)
    modcount = json.studium[pos-1].anzModul #wie viel module hat aktuelles semester? für clear

    clean = new Layer     # dieses layer brauchen wir eigentlich nicht mehr, aber ohne das layer buggt es beim scrollen manchmal... :D
        width: modList.width
        height: modList.height
        backgroundColor: "white"
        parent: modList.content

    for value2, index2 in json.studium[pos-1].Module #Ansicht Semester 1 
        le = new ListEntry({superLayer: modList.content, x: 2, y: 250 + ((index2) * 70)}, {Name: value2.Name, Credits: value2.Credits, myString: value2.myString})
        modulTable[le.Name.text] = le     
        if (index2%2 is 0)
            le.setStyle Style["page1"].lineEven
        else
            le.setStyle Style["page1"].lineOdd        
 
    semFeld.on Events.ScrollEnd, (event) ->  # Scroll-Event

        clear() #zerstört vorherige modulliste
        modulTable = {} #leert Modulmap
        
        pos = (semFeld.currentPage.x / 328) + 1
        modcount = json.studium[pos-1].anzModul 

        for value2, index2 in json.studium[pos-1].Module
            le = new ListEntry({superLayer: modList.content, y: 250 + ((index2) * 70)}, {Name: value2.Name, Credits: value2.Credits})
            modulTable[le.Name.text] = le
            if (index2%2 is 0)
                le.setStyle Style["page1"].lineEven
            else
                le.setStyle Style["page1"].lineOdd

    
    phone = new Layer
        width: 334
        height: 680
        image: "./img/phone.png"
        parent: container

readTextFile "src/studium.json"