class Collage {
  constructor(parent_id, data_object = [], source_url = "") {
    this.parent = parent_id;
    this.data = data_object;
    this.parent_orig = parent_id;
    this.previous_index = 0;
  }
  get paint() {
    this.traverseObject(this.data, "");
  }
  /*
  Element builder for the collagejs json format e,t,a,b keys short for etab
  Create attributes specified in json as 'a' key
  */
  makeDomElement(parent, obj) {
    var attribute_key = Object.keys(obj.a);
    var attribute_value = Object.values(obj.a);
    var el = document.createElement(obj.t);
    attribute_key.forEach((item, index) => {
      if (Array.isArray(attribute_value[index])) {
        el.setAttribute(attribute_key[index], attribute_value[index].join(" "));
      } else {
        if (item == "id") {
          this.parent = attribute_value[index];
        }
        if (attribute_key[index].includes("_")) {
          var rep_k = attribute_key[index].replace("_", "-"); // for data-*
          el.setAttribute(rep_k, attribute_value[index]);
        } else {
          el.setAttribute(attribute_key[index], attribute_value[index]);
        }
      }
    });
    if (typeof obj.b == "string") {
      el.innerText = obj.b;
    }
    document.getElementById(parent).appendChild(el);
  }
  /*
  The scanJson was a modified flatten code by Bergi stackoverflow answer in Sept 30 2013
  https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
  */
  traverseObject(cur, prop) {
    if (Object(cur) !== cur) {
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) {
        this.traverseObject(cur[i], prop + i);
      }
    } else {
      for (var p in cur) {
        if (p == "t") {
          var element_index = prop.split(".");
          var element_index = parseInt(element_index[0]);
          if (this.previous_index == element_index) {
            this.makeDomElement(this.parent, cur);
          } else {
            this.previous_index = element_index;
            this.makeDomElement(this.parent_orig, cur);
          }
        }
        this.traverseObject(cur[p], prop ? prop + "." + p : p);
      }
    }
  }
}

module.exports = Collage;
