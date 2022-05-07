class Collage {
  constructor(parent_id, data_object = []) {
    this.parent = parent_id;
    this.data = data_object;
    this.parent_orig = parent_id;
    this.previous_index = 0;
  }
  get paint() {
    this.traverseObject(this.data, "");
  }
  /*
	rebuild element without reload by 
	specifying the new json, used for 
	whole json object
  */  
  rePaint(new_data) {
    var elements = document.getElementById(this.parent_orig);
    while (elements.hasChildNodes()) {
      elements.removeChild(elements.firstChild);
    }
    this.traverseObject(new_data, "");
  }
  /*
	rebuild element without reload by 
	specifying parent id and the new json
	used for json object parts
  */  
  rePaint(parent_id, new_data) {
    var elements = document.getElementById(parent_id);
    while (elements.hasChildNodes()) {
      elements.removeChild(elements.firstChild);
    }
    this.traverseObject(new_data, "");
  }
  /*
  Element builder for the collagejs json format e,t,p,a,b keys short for etpab
  Create attributes specified in json as 'a' key
  */
  makeDomElement(parent_id, obj) {
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
          var replace_key = attribute_key[index].replace("_", "-"); // for data-*
          el.setAttribute(replace_key, attribute_value[index]);
        } else {
          el.setAttribute(attribute_key[index], attribute_value[index]);
        }
      }
    });
    if (obj["p"] !== undefined) {
      parent_id = obj.p;
    }
    if (typeof obj.b == "string") {
      el.innerText = obj.b;
    }
    document.getElementById(parent_id).appendChild(el);
  }
  /*
  The traverseObject was a modified flatten code by Bergi stackoverflow answer in Sept 30 2013
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
          var element_idx = prop.split(".");
          var element_index = parseInt(element_idx[0]);
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
