Studium = 
    Semester1: 
        Name: "Semester 1"
        Fächer: [
                Name: "Grundlagen der Informatik 1"
                Credits: 5
                SWS: "2/0/2"
            ,
                Name: "Mathamatik"
                Credits: 2
                SWS: "2/0/2",
        ]



dragger = new layer
  width: base * 2
  height: base * 2
  borderRadius: base
dragger.center()

dragger.draggable.enable = true
dragger.draggable.horizontal = false

resetLayers = () ->
    activeIndex = getActiveLayer()
    for value, index in childs
        value.stateSwitch 'inactive'

getActiveLayer = () ->
    for value, index in child   
        if value.states.current.name is 'active'
            return index

getHighlightedlayer = () ->
    for value, index in child   
        if value.states.current.name is 'active'
            return index


dragger.on Events.DragMove ->
  distance = dragger.draggable.offset
  distance = Math.abs distance
  fac = semester / base
  sem = Math.round distance * face



#higlighting  Layer aktiv darstellen
resetLayers()
activeIndex = getActiveLayer()
if sem < semester and sem isnt 
  child[sem].stateSwitch 'highlight'

dragger.on Events.DragEnd, ->
    dragger.center()
    h1 = getHighlightedlayer()
    ac = getActiveLayer()
    if h1 isnt undefined
    childs[ac].stateSwitch 'inactive'
    child[h1].stateSwitch 'active'
    labelSemester.text = 'Semester' + (h1 + 1)
