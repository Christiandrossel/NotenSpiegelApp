(function() {
  var ListEntry, PageLabel, PicEntry, Style, clear, init, modulTable, picTable, readTextFile, tapped;

  Style = (function() {
    class Style {};

    Style.page1 = {
      header: {
        color: "white",
        backgroundColor: "#1f6da1"
      },
      //backgroundColor: "transparent" 
      lineOdd: {
        
        //color: "red"
        backgroundColor: "#bedaed",
        border: "2px solid black"
      },
      lineEven: {
        
        //color: "blue"##
        backgroundColor: "#dbe2ec",
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
        backgroundColor: "#1f6da1"
      },
      lineOdd: {
        color: "white",
        backgroundColor: "#bedaed"
      },
      lineEven: {
        //color: "black"
        backgroundColor: "#dbe2ec"
      }
    };

    Style.head = {
      //  html: "<center> <h2> Semesterübersicht</h2> </center>"
      top: 0,
      color: "#000",
      backgroundColor: "#dbe2ec"
    };

    return Style;

  }).call(this);

  PageLabel = (function() {
    class PageLabel extends Layer {
      constructor(layerObj, info) {
        layerObj.width = 334;
        layerObj.height = 40;
        super(layerObj);
        this.info = info;
        this.pLabel = new TextLayer({
          fontFamily: "Verdana",
          text: this.info,
          fontSize: 24,
          padding: {
            bottom: 3
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
        this.Name.color = "black"; //style.color
        this.Credits.color = "black"; //style.color
        return this.Versuche.color = "red"; //style.color
      }

      getName() {
        return this.Name.text;
      }

      tapHandler() {
        var bc, flag, key, results, results1, value, ypos;
        bc = this.style["backgroundColor"];
        this.backgroundColor = "#fff";
        this.animate({
          backgroundColor: bc
        });
        tapped = this.Name.text;
        if (this.expanded === true) {
          this.expanded = false;
          flag = false;
          results = [];
          for (key in modulTable) {
            value = modulTable[key];
            if (flag === true) {
              ypos = value.y;
              picTable[key].animate({
                y: ypos - 70,
                options: {
                  curve: Spring({
                    damping: 5
                  }),
                  time: 0.5
                }
              });
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
              value.myString.opacity = 0.0;
              results.push(value.Versuche.opacity = 0.0);
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
              picTable[key].animate({
                y: ypos + 70,
                options: {
                  time: 0.5
                }
              });
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
              results1.push(value.Versuche.opacity = 1.0);
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }
      }

      //#value.myString.y = 90
      //#value.Versuche.y = 120
      constructor(layerObj, info) {
        layerObj.width = 180;
        layerObj.height = 70;
        layerObj.x = 11;
        super(layerObj);
        this.info = info;
        this.Name = new TextLayer({ //Modulname
          fontFamily: "Verdana",
          fontSize: 14,
          text: this.info.Name,
          color: "black",
          textAlign: "center",
          padding: {
            left: 15,
            right: 10
          }
        });
        this.Name.parent = this;
        this.Name.center();
        this.Name.y = Align.center();
        this.Credits = new TextLayer({ //Credits
          parent: this,
          fontFamily: "Verdana",
          fontSize: 12,
          text: "Credits: " + this.info.Credits,
          x: 0,
          y: 60,
          color: "black",
          opacity: 0.0,
          padding: {
            left: 20
          }
        });
        //#this.Credits.parent = this
        //#this.Credits.center()
        //#this.Credits.y = Align.bottom()
        //#this.Credits.opacity = 0.0
        /*
                if flag isnt null   
                    this.Versuche = new TextLayer
                    ...
        */
        this.myString = new TextLayer({ //Noten
          parent: this,
          fontFamily: "Verdana",
          fontSize: 11,
          fontWeight: 900,
          text: this.info.myString,
          x: 5,
          y: 80,
          color: "black",
          opacity: 0.0,
          padding: {
            left: 15
          }
        });
        this.Versuche = new TextLayer({ //Versuche/Wiederholungen
          parent: this,
          fontFamily: "Verdana",
          fontWeight: 500,
          fontSize: 15,
          //font:
          //    color: "#FF0000"
          text: this.info.Versuche,
          //color: "red"
          x: 20,
          y: 115,
          color: "red",
          opacity: 0.0,
          padding: {
            left: 4
          }
        });
        //this.Versuche.color = "red"
        this.onTap(this.tapHandler);
      }

    };

    ListEntry.prototype.Name = null;

    ListEntry.prototype.Credits = null;

    ListEntry.prototype.myString = null;

    ListEntry.prototype.Versuche = null;

    ListEntry.prototype.expanded = false;

    return ListEntry;

  }).call(this);

  PicEntry = (function() {
    class PicEntry extends Layer {
      constructor(layerObj, info) {
        layerObj.width = 98;
        layerObj.height = 68;
        layerObj.x = 200;
        super(layerObj);
        this.info = info;
        this.Name = new Layer({
          width: 100,
          height: 70,
          backgroundColor: "#fff"
        });
        this.Name.parent = this;
        this.Name.center();
        //print this.info.Name
        if (this.info.Sem === 1) {
          if (this.info.Name === "Algebra und höhere Mathematik I") {
            this.Name.image = "./img/s1/mathe.jpg";
          } else if (this.info.Name === "Betriebssysteme") {
            this.Name.image = "./img/s1/bs.jpg";
          } else if (this.info.Name === "Digitale Bildbearbeitung") {
            this.Name.image = "./img/s1/dbb.jpg";
          } else if (this.info.Name === "Elektronik für Medieninformatiker") {
            this.Name.image = "./img/s1/el.jpg";
          } else if (this.info.Name === "Englisch") {
            this.Name.image = "./img/s1/eng.jpg";
          } else if (this.info.Name === "Grundlagen der Gestaltung") {
            this.Name.image = "./img/s1/gdg.jpg";
          } else if (this.info.Name === "Grundlagen der Informatik I") {
            this.Name.image = "./img/s1/gdi.jpg";
          } else if (this.info.Name === "Programmierung I") {
            this.Name.image = "./img/s1/prog.jpg";
          } else {
            this.Name.image = "./img/s6/bachelor.jpg";
          }
        } else if (this.info.Sem === 2) {
          if (this.info.Name === "Algebra und höhere Mathematik II") {
            this.Name.image = "./img/s2/mathe.jpg";
          } else if (this.info.Name === "Betriebswirt- \nschaftslehre") {
            this.Name.image = "./img/s2/bwl.jpg";
          } else if (this.info.Name === "Datenbanken- \nsysteme I") {
            this.Name.image = "./img/s2/db.jpg";
          } else if (this.info.Name === "Digitale Signalverarbeitung") {
            this.Name.image = "./img/s2/dsv.jpg";
          } else if (this.info.Name === "Englisch") {
            this.Name.image = "./img/s2/eng.jpg";
          } else if (this.info.Name === "Grundlagen der Gestaltung") {
            this.Name.image = "./img/s2/gdg.jpg";
          } else if (this.info.Name === "Grundlagen der Informatik II") {
            this.Name.image = "./img/s2/gdi.jpg";
          } else if (this.info.Name === "Konstruktive Geometrie") {
            this.Name.image = "./img/s2/kg.jpg";
          } else if (this.info.Name === "Programmierung II") {
            this.Name.image = "./img/s2/prog.jpg";
          } else {
            this.Name.image = "./img/s6/bachelor.jpg";
          }
        } else if (this.info.Sem === 3) {
          if (this.info.Name === "Computergrafik/\nVisualisierung I") {
            this.Name.image = "./img/s3/cg.jpg";
          } else if (this.info.Name === "Datenbanken-\nsysteme II") {
            this.Name.image = "./img/s3/db.jpg";
          } else if (this.info.Name === "Rechnerarchitektur") {
            this.Name.image = "./img/s3/ra.jpg";
          } else if (this.info.Name === "Rechnernetze/\nKommunikations-\nsysteme") {
            this.Name.image = "./img/s3/rnks.jpg";
          } else if (this.info.Name === "Programmierung III") {
            this.Name.image = "./img/s3/prog.jpg";
          } else if (this.info.Name === "Software \nEngineering I") {
            this.Name.image = "./img/s3/se.jpg";
          } else {
            this.Name.image = "./img/s6/bachelor.jpg";
          }
        } else if (this.info.Sem === 4) {
          if (this.info.Name === "Audio- und Videosysteme I") {
            this.Name.image = "./img/s4/avs.jpg";
          } else if (this.info.Name === "Computergrafik/\nVisualisierung II") {
            this.Name.image = "./img/s4/cg.jpg";
          } else if (this.info.Name === "Entwicklungswerk-\nzeuge f. multimediale Systeme") {
            this.Name.image = "./img/s4/ews.jpg";
          } else if (this.info.Name === "Gestaltung interaktiver Systeme") {
            this.Name.image = "./img/s4/gis.jpg";
          } else if (this.info.Name === "Internet-\nTechnologien I") {
            this.Name.image = "./img/s4/it.jpg";
          } else if (this.info.Name === "Medienproduktion") {
            this.Name.image = "./img/s4/mp.jpg";
          } else if (this.info.Name === "Software \nEngineering II") {
            this.Name.image = "./img/s4/se.jpg";
          } else if (this.info.Name === "Wahlpflichtmodul I") {
            this.Name.image = "./img/s4/wo.jpg";
          } else {
            this.Name.image = "./img/s6/bachelor.jpg";
          }
        } else if (this.info.Sem === 5) {
          if (this.info.Name === "Audio- und Videosysteme II") {
            this.Name.image = "./img/s5/avs.jpg";
          } else if (this.info.Name === "Audio-, Video-, Grafik-\nprogrammierung") {
            this.Name.image = "./img/s5/avg.jpg";
          } else if (this.info.Name === "Beleuchtung und Rendering") {
            this.Name.image = "./img/s5/br.jpg";
          } else if (this.info.Name === "Computeranimation") {
            this.Name.image = "./img/s5/ca.jpg";
          } else if (this.info.Name === "Informatikrecht") {
            this.Name.image = "./img/s5/ir.jpg";
          } else if (this.info.Name === "Internet-\nTechnologien II") {
            this.Name.image = "./img/s5/it.jpg";
          } else if (this.info.Name === "Wahlpflichtmodul II") {
            this.Name.image = "./img/s5/wo.jpg";
          } else {
            this.Name.image = "./img/s6/bachelor.jpg";
          }
        } else if (this.info.Sem === 6) {
          if (this.info.Name === "Praxisprojekt") {
            this.Name.image = "./img/s6/praxis.jpg";
          } else if (this.info.Name === "Bachelorarbeit") {
            this.Name.image = "./img/s6/bachelor.jpg";
          } else {
            this.Name.image = "./img/s6/bachelor.jpg";
          }
        }
      }

    };

    PicEntry.prototype.Name = null;

    PicEntry.prototype.Sem = null;

    return PicEntry;

  }).call(this);

  // this.onTap this.tapHandler
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

  clear = function() { //zerstört die alten ListEntrys und bilder. 
    var key, results, value;
    for (key in modulTable) {
      value = modulTable[key];
      value.Name.destroy();
      value.Credits.destroy();
      value.Versuche.destroy();
      value.destroy();
    }
    results = [];
    for (key in picTable) {
      value = picTable[key];
      value.Name.destroy();
      results.push(value.destroy());
    }
    return results;
  };

  modulTable = {};

  picTable = {};

  init = function(json) {
    var auto, clean, container, flugzeug, i, idx, index2, j, le, len, len1, modList, modcount, pageHead, pageHeadLabel, pe, phone, pl, pos, ref, ref1, semFeld, subPage, subcontainer, val, value2;
    container = new Layer({
      width: 334,
      height: 680, //680
      borderRadius: 50
    });
    container.clip = true;
    container.center();
    subcontainer = new Layer({
      width: 334,
      height: 680, //680
      borderRadius: 50,
      backgroundColor: "#fff",
      parent: container
    });
    subcontainer.center();
    pageHead = new Layer({
      width: 328,
      height: 40,
      x: 2,
      y: 72,
      parent: container,
      backgroundColor: "#014a7b"
    });
    pageHead.clip = true;
    pageHeadLabel = new TextLayer({
      parent: pageHead,
      fontFamily: "Verdana",
      fontSize: 18,
      fontStyle: "bold",
      // textAlign: "right"
      text: "Semesterfortschritt",
      color: "white",
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
      backgroundColor: "white",
      x: 2,
      y: 110
    });
    semFeld.shadowY = 2;
    semFeld.shadowColor = "rgba(40,40,40,.6)";
    semFeld.shadowBlur = 10;
    auto = new Layer({
      width: 100,
      height: 45,
      x: -100, //finish at 220
      y: 178,
      parent: container,
      backgroundColor: "transparent"
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
        width: 334,
        height: 55,
        x: 25,
        y: 70,
        parent: subPage
      });
      flugzeug.image = "./img/flugzeug/finish.jpg";
      if (idx === 0) {
        auto.image = "./img/flugzeug/car100.png";
        auto.animate({
          x: 220,
          options: {
            time: 2,
            curve: 'ease-in'
          }
        });
      }
    }
    modList = new ScrollComponent({ //scrollbare Modulliste
      width: 295,
      height: 1100, //618
      parent: subcontainer,
      x: 11,
      scrollHorizontal: false
    });
    modList.mouseWheelEnabled = true;
    modList.contentInset = {
      top: 15,
      bottom: 400
    };
    modList.scrollFrame = { //zusammen mit modList.scrollpoint dafür zuständig, dass Liste beim Seitenwechsel wieder hochscrollt
      x: 0,
      y: 0,
      width: 250,
      height: 1000
    };
    pos = (semFeld.currentPage.x / 328) + 1; //liefert aktuelle Seite (Semster x)
    modcount = json.studium[pos - 1].anzModul; //wie viel module hat aktuelles semester? für clear
    clean = new Layer({ // dieses layer brauchen wir eigentlich nicht mehr, aber ohne das layer buggt es beim scrollen manchmal... :D
      width: modList.width,
      height: modList.height + 140,
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
        y: 250 + (index2 * 72)
      }, {
        Name: value2.Name,
        Credits: value2.Credits,
        myString: value2.myString,
        Versuche: value2.Versuche
      });
      modulTable[le.Name.text] = le;
      if (index2 % 2 === 0) {
        le.setStyle(Style["page1"].lineEven);
      } else {
        le.setStyle(Style["page1"].lineOdd);
      }
      pe = new PicEntry({
        superLayer: modList.content,
        x: 102,
        y: 250 + (index2 * 72)
      }, {
        Name: value2.Name,
        Sem: pos
      });
      picTable[le.Name.text] = pe;
    }
    modList.scrollPoint = { //damit Liste beim Seitenwechsel wieder hochscrollt
      x: 0,
      y: 0
    };
    semFeld.on(Events.ScrollEnd, function(event) { // Scroll-Event
      var diff, k, len2, ref2, t;
      clear(); //zerstört vorherige modulliste
      modulTable = {}; //leert Modulmap
      pos = (semFeld.currentPage.x / 328) + 1;
      modcount = json.studium[pos - 1].anzModul;
      ref2 = json.studium[pos - 1].Module;
      for (index2 = k = 0, len2 = ref2.length; k < len2; index2 = ++k) {
        value2 = ref2[index2];
        le = new ListEntry({
          superLayer: modList.content,
          y: 250 + (index2 * 72)
        }, {
          Name: value2.Name,
          Credits: value2.Credits,
          myString: value2.myString,
          Versuche: value2.Versuche
        });
        modulTable[le.Name.text] = le;
        if (index2 % 2 === 0) {
          le.setStyle(Style["page1"].lineEven);
        } else {
          le.setStyle(Style["page1"].lineOdd);
        }
        pe = new PicEntry({
          superLayer: modList.content,
          x: 102,
          y: 250 + (index2 * 72)
        }, {
          Name: value2.Name,
          Sem: pos
        });
        picTable[le.Name.text] = pe;
      }
      modList.scrollToPoint({
        x: 0,
        y: 0
      }, true, {
        curve: Spring({
          damping: 1
        }),
        time: 1.0
      });
      diff = 0;
      t = 0;
      auto.x = -100;
      if (pos === 1) {
        auto.image = "./img/flugzeug/c1.png";
        diff = 1.0;
        t = 1;
      }
      if (pos === 2) {
        auto.image = "./img/flugzeug/c2.png";
        diff = 0.69;
        t = 0.89;
      }
      if (pos === 3) {
        auto.image = "./img/flugzeug/c3.png";
        diff = 0.63;
        t = 0.83;
      }
      if (pos === 4) {
        auto.image = "./img/flugzeug/c4.png";
        diff = 0.35;
        t = 0.5;
      }
      if (pos === 5) {
        auto.image = "./img/flugzeug/c5.png";
        diff = 0.14;
        t = 0.3;
      }
      if (pos === 6) {
        auto.image = "./img/flugzeug/c6.png";
        diff = -0.1;
        t = 0.2;
      }
      return auto.animate({
        x: 220.0 * diff,
        options: {
          curve: 'ease-in',
          time: t * 1.5
        }
      });
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