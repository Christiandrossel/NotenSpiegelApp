(function() {
  var ListEntry, PageLabel, Style, clear, init, modulTable, readTextFile, tapped;

  Style = (function() {
    class Style {};

    Style.page1 = {
      header: {
        color: "white",
        backgroundColor: "#A4FFBF"
      },
      //backgroundColor: "transparent"
      lineOdd: {
        color: "white",
        backgroundColor: "#A4FFBF"
      },
      lineEven: {
        color: "black",
        backgroundColor: "#FFFEA4",
        border: "2px solid black"
      },
      white: {
        color: "white",
        backgroundColor: "#fff",
        border: "5px solid white"
      }
    };

    Style.page2 = {
      header: {
        color: "white",
        backgroundColor: "#A4FFBF"
      },
      lineOdd: {
        color: "white",
        backgroundColor: "#A4FFBF"
      },
      lineEven: {
        color: "black",
        backgroundColor: "#FFFEA4"
      }
    };

    Style.head = {
      //  html: "<center> <h2> Semesterübersicht</h2> </center>"
      top: 0,
      color: "black",
      backgroundColor: "#FFFEA4"
    };

    return Style;

  }).call(this);

  PageLabel = (function() {
    class PageLabel extends Layer {
      constructor(layerObj, info) {
        layerObj.width = 334;
        layerObj.height = 70;
        super(layerObj);
        this.info = info;
        this.pLabel = new TextLayer({
          fontFamily: "Verdana",
          text: this.info,
          fontSize: 24,
          padding: {
            bottom: 30
          }
        });
        this.pLabel.parent = this;
        this.pLabel.center();
      }

      setStyle(style) {
        this.style = style;
        return this.pLabel.color = style.color;
      }

    };

    PageLabel.prototype.pLabel = null;

    return PageLabel;

  }).call(this);

  tapped = "";

  ListEntry = (function() {
    class ListEntry extends Layer {
      setStyle(style) {
        this.style = style;
        this.Name.color = style.color;
        return this.Credits.color = style.color;
      }

      getName() {
        return this.Name.text;
      }

      tapHandler() {
        var bc, flag, key, results, results1, value, ypos;
        bc = this.style["backgroundColor"];
        this.backgroundColor = "white";
        this.animate({
          backgroundColor: bc
        });
        tapped = this.Name.text;
        //print tapped
        //print modulTable[tapped]
        //modulTable[tapped].x = 30
        //print modulTable
        if (this.expanded === true) {
          this.expanded = false;
          flag = false;
          results = [];
          for (key in modulTable) {
            value = modulTable[key];
            if (flag === true) {
              ypos = value.y;
              value.animate({
                y: ypos - 70,
                options: {
                  curve: Spring({
                    damping: 5
                  }),
                  time: 0.5
                }
              });
            }
            if (key === tapped) {
              flag = true;
              value.height = 70;
              value.Credits.opacity = 0.0;
              results.push(value.myString.opacity = 0.0);
            } else {
              results.push(void 0);
            }
          }
          return results;
        } else if (this.expanded === false) {
          this.expanded = true;
          flag = false;
          results1 = [];
          for (key in modulTable) {
            value = modulTable[key];
            if (flag === true) {
              ypos = value.y;
              value.animate({
                y: ypos + 70,
                options: {
                  // curve: Spring(damping: 0.5)
                  time: 0.5
                }
              });
            }
            if (key === tapped) {
              flag = true;
              value.height = 140;
              value.Credits.opacity = 1.0;
              value.myString.opacity = 1.0;
              results1.push(value.myString.y = 90);
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }
      }

      constructor(layerObj, info) {
        layerObj.width = 180;
        layerObj.height = 70;
        layerObj.x = 11;
        super(layerObj);
        this.info = info;
        this.Name = new TextLayer({
          fontFamily: "Verdana",
          fontSize: 14,
          text: this.info.Name
        });
        this.Name.parent = this;
        this.Name.center();
        this.Name.y = Align.center();
        this.Credits = new TextLayer({
          fontFamily: "Verdana",
          fontSize: 12,
          text: "Credits: " + this.info.Credits
        });
        this.Credits.parent = this;
        this.Credits.center();
        this.Credits.y = Align.bottom();
        this.Credits.opacity = 0.0;
        this.myString = new TextLayer({
          fontFamily: "Verdana",
          fontSize: 12,
          text: this.info.myString
        });
        this.myString.parent = this;
        this.myString.center();
        this.myString.y = Align.bottom();
        this.myString.opacity = 0.0;
        this.onTap(this.tapHandler);
      }

    };

    ListEntry.prototype.Name = null;

    ListEntry.prototype.Credits = null;

    ListEntry.prototype.myString = null;

    // nSP: null
    ListEntry.prototype.expanded = false;

    return ListEntry;

  }).call(this);

  readTextFile = function(file) {
    var rawFile;
    rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          return init(JSON.parse(rawFile.responseText));
        }
      }
    };
    return rawFile.send(null);
  };

  clear = function() { //zerstört die alten ListEntrys. 
    var key, results, value;
    results = [];
    for (key in modulTable) {
      value = modulTable[key];
      value.Name.destroy();
      value.Credits.destroy();
      results.push(value.destroy());
    }
    return results;
  };

  modulTable = {};

  init = function(json) {
    var clean, container, flugzeug, i, idx, index2, j, le, len, len1, modList, modcount, pageHead, pageHeadLabel, phone, pl, pos, ref, ref1, semFeld, subPage, subcontainer, val, value2;
    container = new Layer({
      width: 334,
      height: 680,
      borderRadius: 50
    });
    container.clip = true;
    container.center();
    subcontainer = new Layer({
      width: 334,
      height: 680,
      borderRadius: 50,
      backgroundColor: "#fff",
      parent: container
    });
    subcontainer.clip = true;
    subcontainer.center();
    pageHead = new Layer({
      width: 328,
      height: 40,
      x: 2,
      y: 73,
      parent: container,
      backgroundColor: "#A4FFBF"
    });
    pageHead.clip = true;
    pageHeadLabel = new TextLayer({
      parent: pageHead,
      fontFamily: "Verdana",
      fontSize: 20,
      fontStyle: "bold",
      // textAlign: "right"
      text: "Semesterübersicht",
      color: "black",
      padding: {
        bottom: 5
      }
    });
    pageHeadLabel.center();
    semFeld = new PageComponent({ //Platz für Semesterbeschriftung
      width: 328,
      height: 140,
      scrollVertical: false,
      parent: container,
      x: 2,
      y: 110
    });
    ref = json.studium;
    // SemesterSeiten
    for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
      val = ref[idx];
      subPage = new Layer({
        width: semFeld.width,
        height: semFeld.height,
        backgroundColor: "transparent"
      });
      if (idx !== 0) {
        semFeld.addPage(subPage, "right");
      } else {
        semFeld.content.addChild(subPage);
      }
      pl = new PageLabel({ //Semester Nr.
        parent: subPage
      }, val.Name);
      pl.setStyle(Style["page1"].header);
      flugzeug = new Layer({ //Flugzeug Breite Bild: 295px!!!
        width: 306,
        height: 100,
        x: 11,
        y: 40,
        parent: subPage
      });
      if (idx === 0) {
        flugzeug.image = "./img/f1.png";
      }
      if (idx === 1) {
        flugzeug.image = "./img/f2.png";
      }
      if (idx === 2) {
        flugzeug.image = "./img/f3.png";
      }
      if (idx === 3) {
        flugzeug.image = "./img/f4.png";
      }
      if (idx === 4) {
        flugzeug.image = "./img/f5.png";
      }
      if (idx === 5) {
        flugzeug.image = "./img/f6.png";
      }
    }
    modList = new ScrollComponent({ //scrollbare Modulliste
      width: 295,
      height: 612,
      parent: subcontainer,
      x: 11,
      scrollHorizontal: false
    });
    pos = (semFeld.currentPage.x / 328) + 1; //liefert aktuelle Seite (Semster x)
    modcount = json.studium[pos - 1].anzModul; //wie viel module hat aktuelles semester? für clear
    clean = new Layer({ // dieses layer brauchen wir eigentlich nicht mehr, aber ohne das layer buggt es beim scrollen manchmal... :D
      width: modList.width,
      height: modList.height,
      backgroundColor: "white",
      parent: modList.content
    });
    ref1 = json.studium[pos - 1].Module;
    //Ansicht Semester 1 
    for (index2 = j = 0, len1 = ref1.length; j < len1; index2 = ++j) {
      value2 = ref1[index2];
      le = new ListEntry({
        superLayer: modList.content,
        x: 2,
        y: 250 + (index2 * 70)
      }, {
        Name: value2.Name,
        Credits: value2.Credits,
        myString: value2.myString
      });
      modulTable[le.Name.text] = le;
      if (index2 % 2 === 0) {
        le.setStyle(Style["page1"].lineEven);
      } else {
        le.setStyle(Style["page1"].lineOdd);
      }
    }
    semFeld.on(Events.ScrollEnd, function(event) { // Scroll-Event
      var k, len2, ref2, results;
      clear(); //zerstört vorherige modulliste
      modulTable = {}; //leert Modulmap
      pos = (semFeld.currentPage.x / 328) + 1;
      modcount = json.studium[pos - 1].anzModul;
      ref2 = json.studium[pos - 1].Module;
      results = [];
      for (index2 = k = 0, len2 = ref2.length; k < len2; index2 = ++k) {
        value2 = ref2[index2];
        le = new ListEntry({
          superLayer: modList.content,
          y: 250 + (index2 * 70)
        }, {
          Name: value2.Name,
          Credits: value2.Credits
        });
        modulTable[le.Name.text] = le;
        if (index2 % 2 === 0) {
          results.push(le.setStyle(Style["page1"].lineEven));
        } else {
          results.push(le.setStyle(Style["page1"].lineOdd));
        }
      }
      return results;
    });
    return phone = new Layer({
      width: 334,
      height: 680,
      image: "./img/phone.png",
      parent: container
    });
  };

  readTextFile("src/studium.json");

}).call(this);


//# sourceMappingURL=array.js.map
//# sourceURL=coffeescript