class Style
    @page1: 
        header:
            color: "white"
            backgroundColor: "#4286f4"
           # backgroundColor: "transparent"
        lineOdd: 
            color: "white"
            backgroundColor: "#88b2f7"
        lineEven:
            color: "black"
            backgroundColor: "#d9e6fc"
    @page2: 
        header:
            color: "white"
            backgroundColor: "#1ca530"
        lineOdd: 
            color: "white"
            backgroundColor: "#5d9966"
        lineEven:
            color: "black"
            backgroundColor: "#9bdba5"
    @head:
      #  html: "<center> <h2> Semesterübersicht</h2> </center>"
        top : 0
        color: "black"
        backgroundColor: "white"



class PageLabel extends Layer
    pLabel: null
    constructor: (layerObj, @info) ->
        layerObj.width = 334
        layerObj.height = 70
        layerObj.shadowY = 10
        layerObj.shadowColor = "rgba(30,30,30,.6)"
        layerObj.shadowBlur = 10
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

class ListEntry extends Layer
    Name: null
    Credits: null

    setStyle: (style) ->
        this.style = style
        this.Name.color = style.color
        this.Credits.color = style.color

    tapHandler: () ->
        bc = this.style["backgroundColor"]
        
        this.backgroundColor = "white"
        this.animate
            backgroundColor: bc
                  
    constructor: (layerObj, @info) ->
        layerObj.width = 334
        layerObj.height = 70
        super(layerObj)

        this.Name = new TextLayer
            fontFamily: "Verdana"
            fontSize: 18
            text: this.info.Name
        this.Name.parent = this
        this.Name.center()
        this.Name.y = Align.top()        

        this.Credits = new TextLayer
            fontFamily: "Verdana"
            fontSize: 14
            text: this.info.Credits
        this.Credits.parent = this
        this.Credits.center()
        this.Credits.y = Align.bottom()

        this.onTap this.tapHandler

readTextFile = (file) ->
    rawFile = new XMLHttpRequest()
    rawFile.open "GET", file, false
    rawFile.onreadystatechange = () ->
        if rawFile.readyState is 4
            if rawFile.status is 200 or rawFile.status == 0
                init JSON.parse rawFile.responseText
    rawFile.send null

init = (json) ->    

    container = new Layer
        width: 334
        height: 680
        borderRadius: 50
    container.clip = true

    container.center()

    pageHead = new Layer 
        width: 334
        height: 40
        y: 73
        parent: container
        backgroundColor: "white"

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

 ###   scroll = new ScrollComponent
        width: 334
        height: 700
        scrollVertical: false
        parent: container
        y: 110 ###
###
    semFeld = new PageComponent
        width: 334
        height: 140
        scrollVertical: false
        parent: container
        y: 110

    for val, idx in json.studium
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

        flugzeug = new Layer 
            width: 334
            height: 100
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
###
###
        print "hallo"

        subPage.states = 
            null:
                #flugzeug.image = "./img/f1.png"
                print "sem1"
            eins:
                #flugzeug.image = "./img/f2.png"
                print "sem2"
            zwei: 
                #flugzeug.image = "./img/f3.png"
                print "sem3"
    


    print "hallo"
 ###
   # semFeld.on Events.ScrollEnd, (event) ->
  #      print "scroll"
     #   x = 7 %% 5
        #subPage.stateSwitch(semFeld.content.x %% 334)
       ### print semFeld.content.x
        z = 5
        console.log z###

#square = (x) -> x * x
#modulo = function(a, b) { return (+a % (b = +b) + b) % b; };     
#modulo  = (a, b) ->   {(+a %% (b = +b) + b) %% b }


    pageComp = new PageComponent
        width: 334
        height: 600
        scrollVertical: false
        parent: container
        y: 110 #250 

    for value, index in json.studium
        subPage = new Layer
            width: pageComp.width
            height: pageComp.height
            backgroundColor: "transparent"
        if index isnt 0
            pageComp.addPage subPage, "right"
        else
            pageComp.content.addChild subPage

        pl = new PageLabel
            parent: subPage, value.Name
        #pl.setStyle Style[value.id].header
        pl.setStyle Style["page1"].header

        for value2, index2 in value.Module
            le = new ListEntry({parent: subPage, y: (index2 + 1) * pl.height}, {Name: value2.Name, Credits: value2.Credits})
            if (index2%2 is 0)
                #le.setStyle Style[value.id].lineEven
                le.setStyle Style["page1"].lineEven
            else
               # le.setStyle Style[value.id].lineOdd
                le.setStyle Style["page1"].lineOdd
        
        pl.bringToFront()

###
    pageComp.draggable.enabled = true
    pageComp.draggable.horizontal = false
    pageComp.draggable.propagateEvents = false
###


###
    bgImage.draggable.enabled = true
bgImage.draggable.horizontal = false
bgImage.draggable.constraints = 
    x:0
    y: -offset + 75
    width: 400
    height: bgImage.height + offset
###
    
    phone = new Layer
        width: 334
        height: 680
        image: "./img/phone.png"
        parent: container

readTextFile "src/studium.json"