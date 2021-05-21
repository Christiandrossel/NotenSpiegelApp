container = new Layer
    width: 334
    height: 680
    borderRadius: 50
container.clip = true


bg = container.copy()
bg.parent = container

container.center()

bgImage = new Layer
    width: 335 * .9
    height: 1292 * .9
    image: "./img/background.png"
    parent: bg
bgImage.center()

phone = new Layer
    width: 334
    heigth: 680
    image: "./img/phone.png"
    parent: container

offset = bgImage.heigth - phone.height

bgImage.draggable.enabled = true
bgImage.draggable.horizontal = false
bgImage.draggable.constraints =
    x: 0
    y: -offset + 75
    width: 400
    heigth: bgImage.height + offset

btn = new Layer
    width: bg.width
    height: 200
    parent: bgImage
    y: 360
    backgroundColor: "transparent"



overlay = new Layer
    width: bg.width
    height: 400
    backgroundColor: "transparent"
    parent: bg

overlay.center()
overlay.clip = true         #clipt bilder weg also abschneiden

zoomImg = new Layer
    image: "./img/zoom.jpg"
    parent: overlay
    width: 528
    height:318
    shadowX: 10
    shadowY: 10
    shaddowBlur: 10
zoomImg.draggable.enabled = true


btn.onTap ->
    print "button tap"

plusBtn = new Layer
    width: 30
    heigth: 30
    html: "<div>+</div>"
    style:     
        backgroundColor: "white"
        color: "black"
        frontSize: "30px"
        textAlign: "center"
        lineHeight: "30px"
        border: "1px solid black"
        margin: "0px"

plusBtn.onTap _>
    zoomImg.scale *= 1.1

#css einbinden
Utils.insertCSS "
    .minus {
    line-heigth: 30px;
    font-size: 30px;
    text-align: center;

}

"

minus = new Layer
    width: 30
    height: 30
    x: 40
    html: "<div class='minus'>&minus</div>"

minus.onTap ->
    zoomImg.scale *= 0.9