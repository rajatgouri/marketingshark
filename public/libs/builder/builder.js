/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/VvvebJs
*/


// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
(function(){
	var cache = {};
	
	this.tmpl = function tmpl(str, data){
	  // Figure out if we're getting a template, or if we need to
	  // load the template - and be sure to cache the result.
	  var fn = /^[-a-zA-Z0-9]+$/.test(str) ?
		cache[str] = cache[str] ||
		  tmpl(document.getElementById(str).innerHTML) :
				
		// Generate a reusable function that will serve as a template
		// generator (and which will be cached).
		new Function("obj",
		  "var p=[],print=function(){p.push.apply(p,arguments);};" +
		   
		  // Introduce the data as local variables using with(){}
		  "with(obj){p.push('" +
		   
		  // Convert the template into pure JavaScript
		  str
			.replace(/[\r\t\n]/g, " ")
			.split("{%").join("\t")
			.replace(/((^|%})[^\t]*)'/g, "$1\r")
			.replace(/\t=(.*?)%}/g, "',$1,'")
			.split("\t").join("');")
			.split("%}").join("p.push('")
			.split("\r").join("\\'")
		+ "');}return p.join('');");
	  // Provide some basic currying to the user
	  return data ? fn( data ) : fn;
	};
  })();
  

(function($) {
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("visibility", "collapse");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("visibility", "visible");
        });
    };
}(jQuery));

  var delay = (function(){
	var timer = 0;
	return function(callback, ms){
	  clearTimeout (timer);
	  timer = setTimeout(callback, ms);
	};
  })();
  
  function isElement(obj){
	 return (typeof obj==="object") &&
		(obj.nodeType===1) && (typeof obj.style === "object") &&
		(typeof obj.ownerDocument ==="object")/* && obj.tagName != "BODY"*/;
  }
  
  
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  
  if (Vvveb === undefined) var Vvveb = {};
  
  Vvveb.defaultComponent = "_base";
  Vvveb.preservePropertySections = true;
  Vvveb.dragIcon = 'icon';//icon = use component icon when dragging | html = use component html to create draggable element
  
  Vvveb.baseUrl =  document.currentScript?document.currentScript.src.replace(/[^\/]*?\.js$/,''):'';
  
  Vvveb.ComponentsGroup = {};
  Vvveb.BlocksGroup = {};
  
  Vvveb.Components = {
	  
	  _components: {},
	  
	  _nodesLookup: {},
	  
	  _attributesLookup: {},
  
	  _classesLookup: {},
	  
	  _classesRegexLookup: {},
	  
	  componentPropertiesElement: "#right-panel .component-properties",
  
	  componentPropertiesDefaultSection: "content",
  
	  get: function(type) {
		  return this._components[type];
	  },
  
	  add: function(type, data) {
		  data.type = type;
		  this._components[type] = data;
		  if (data.nodes) 
		  {
			  for (var i in data.nodes)
			  {	
				  this._nodesLookup[ data.nodes[i] ] = data;
			  }
		  }
  
		  if (data.attributes) 
		  {
			  if (data.attributes.constructor === Array)
			  {
				  for (var i in data.attributes)
				  {	
					  this._attributesLookup[ data.attributes[i] ] = data;
				  }
			  } else
			  {
				  for (var i in data.attributes)
				  {	
					  if (typeof this._attributesLookup[i] === 'undefined')
					  {
						  this._attributesLookup[i] = {};
					  }
  
					  if (typeof this._attributesLookup[i][ data.attributes[i] ] === 'undefined')
					  {
						  this._attributesLookup[i][ data.attributes[i] ] = {};
					  }
  
					  this._attributesLookup[i][ data.attributes[i] ] = data;
				  }
			  }
		  }
  
		  if (data.classes) 
		  {
			  for (var i in data.classes)
			  {	
				  this._classesLookup[ data.classes[i] ] = data;
			  }
		  }
		  
		  if (data.classesRegex) 
		  {
			  for (var i in data.classesRegex)
			  {	
				  this._classesRegexLookup[ data.classesRegex[i] ] = data;
			  }
		  }
	  },
	  
	  extend: function(inheritType, type, data) {
		   
		   var newData = data;
		  
		   if (inheritData = this._components[inheritType])
		   {
			  newData = $.extend(true,{}, inheritData, data);
			  newData.properties = $.merge( $.merge([], inheritData.properties?inheritData.properties:[]), data.properties?data.properties:[]);
		   }
		   
		   //sort by order
		   newData.properties.sort(function (a,b) 
			  {
				  if (typeof a.sort  === "undefined") a.sort = 0;
				  if (typeof b.sort  === "undefined") b.sort = 0;
  
				  if (a.sort < b.sort)
					  return -1;
				  if (a.sort > b.sort)
					  return 1;
				  return 0;
			  });
  /*		 
		  var output = array.reduce(function(o, cur) {
  
			// Get the index of the key-value pair.
			var occurs = o.reduce(function(n, item, i) {
			  return (item.key === cur.key) ? i : n;
			}, -1);
  
			// If the name is found,
			if (occurs >= 0) {
  
			  // append the current value to its list of values.
			  o[occurs].value = o[occurs].value.concat(cur.value);
  
			// Otherwise,
			} else {
  
			  // add the current item to o (but make sure the value is an array).
			  var obj = {name: cur.key, value: [cur.value]};
			  o = o.concat([obj]);
			}
  
			return o;
		  }, newData.properties);		 
  */
							  
		  this.add(type, newData);
	  },
	  
	  
	  matchNode: function(node) {
		  var component = {};
		  if (!node || !node.tagName) return false;
		  
		  if (node.attributes && node.attributes.length)
		  {
			  //search for attributes
			  for (var i in node.attributes)
			  {
				  if (node.attributes[i])
				  {
				  attr = node.attributes[i].name;
				  value = node.attributes[i].value;
				  if (attr in this._attributesLookup) 
				  {
					  component = this._attributesLookup[ attr ];
					  
					  //currently we check that is not a component by looking at name attribute
					  //if we have a collection of objects it means that attribute value must be checked
					  if (typeof component["name"] === "undefined")
					  {
						  if (value in component)
						  {
							  return component[value];
						  }
					  } else 
					  return component;
				  }
			  }
			  }
				  
			  for (var i in node.attributes)
			  {
				  attr = node.attributes[i].name;
				  value = node.attributes[i].value;
				  //check for node classes
				  if (attr == "class")
				  {
					  classes = value.split(" ");
					  
					  for (j in classes) 
					  {
						  if (classes[j] in this._classesLookup)
						  return this._classesLookup[ classes[j] ];	
					  }
					  
					  for (regex in this._classesRegexLookup) 
					  {
						  regexObj = new RegExp(regex);
						  if (regexObj.exec(value)) 
						  {
							  return this._classesRegexLookup[ regex ];	
						  }
					  }
				  }
			  }
		  }
  
		  tagName = node.tagName.toLowerCase();
		  if (tagName in this._nodesLookup) return this._nodesLookup[ tagName ];
	  
		  return false;
		  //return false;
	  },
	  
	  render: function(type) {
		  
		  var x = 0;
          
          var component = this._components[type];
		  var componentsPanel = jQuery(this.componentPropertiesElement);
		  var defaultSection = this.componentPropertiesDefaultSection;
		  var componentsPanelSections = {};
          
  		  function GetVimeoIDbyUrl(url) {
			var id = false;
			var request = new XMLHttpRequest();
			request.open('GET', 'https://vimeo.com/api/oembed.json?url='+url , false);
			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
				var response = JSON.parse(request.responseText);
				if(response.video_id) {
				  id = response.video_id;
				}
			  }
			};
			request.send();
			return id;
		  }
  
		  function GetYoutubeIDbyUrl(url) {
  
			  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
			  const match = url.match(regExp);
  
			  return (match && match[2].length === 11)
				? match[2]
				: null;
		  }
          
          function createElementFromHTML(htmlString) {
            var div = document.createElement('div');
            div.innerHTML = htmlString.trim();
              
            // Change this to div.childNodes to support multiple top-level nodes
            return div.firstChild; 
        }

		  
		  function getSrc(url) {
  
			  var videoId = "";
			  var src = "";
  
			  if(url.includes("youtube"))
			  {
				  videoId = GetYoutubeIDbyUrl(url);
				  src="https://www.youtube.com/embed/" + videoId + "?&showinfo=0&controls=0";
			  }
			  else
			  if(url.includes("vimeo"))    
			  {
				  videoId = GetVimeoIDbyUrl(url);
				  src = "https://player.vimeo.com/video/" + videoId;
			  }
			  
			  return src;
		  }
			
		  jQuery(this.componentPropertiesElement + " .tab-pane").each(function ()
		  {
			  var sectionName = this.dataset.section;
			  componentsPanelSections[sectionName] = $(this);
			  
		  });
          
          var nodeElement = Vvveb.Builder.selectedEl;
          var valueselected = "";
          
          var slide = nodeElement.get(0);
          var slide_type = slide.getAttribute("data-type_sub");
          var slide_number = 0;
          
		  var section = componentsPanelSections[defaultSection].find('.section[data-section="default"]');
		  if (!(Vvveb.preservePropertySections && section.length))
		  {
			  componentsPanelSections[defaultSection].html('').append(tmpl("vvveb-input-sectioninput", {key:"default", header:component.name}));
			  section = componentsPanelSections[defaultSection].find(".section");
		  }
          
          componentsPanelSections[defaultSection].find('[data-header="default"] span').html(component.name);
          
          if(slide_type == "slide_element")
          {
              slide_number = slide.getAttribute("slide_number");
              
              componentsPanelSections[defaultSection].find('[data-header="default"] span').html('Slide '+ slide_number);
          }   
		  
		  section.html("")	
	  
		  if (component.beforeInit) component.beforeInit(Vvveb.Builder.selectedEl.get(0));
		  
		    var element;
		    var fn = function(component, property) {
              
            return property.input.on('propertyChange', function (event, value, input) {
			      
            if(property.key == "number")
            {
                var slider_element = document.getElementById("iframe1").contentWindow.document.getElementsByClassName('carousel-inner')[0];

				var num_slides = slider_element.children.length;
				var slides_to_add = value - num_slides +1;
                   
				if(slides_to_add > 0)
				{
					for(var i=0;i<=slides_to_add;i++)
					{
                        var carouselInnerContent = '<div  data-type="builder_element" data-type_sub="slide_element" slide_numanswer="0" slide_number='+(num_slides+i-1)+' data-sub-type="sub_element" class="carousel-item DummyItem"><h2 class="slider_questions">Question #'+ (num_slides+i-1) + '</h2><br/><div class="red SlideContent"><p>Are you a homeowner?</p><form action="#" class="questionFirst1"><fieldset id="radiogroup'+ (num_slides+i-1) + '"><input type="radio" id="yes" value="yes" name="question">&nbsp;<label for="yes">Yes</label>&nbsp; &nbsp;<input type="radio" id="no" value="no" name="question">&nbsp;<label for="no">No</label></form></div><a class="carousel-control-next next_button" href="#carouselExampleIndicators" role="button" data-slide="next"><span class="sr-only dummyIcon2">NEXT</span></a></div>';
                         slider_element.insertBefore(createElementFromHTML(carouselInnerContent),slider_element.children[num_slides - 1 + i]);
                    }
                }
            }
                
            if(property.key == "slide_numanswer")
            {
              
            var radiogroupID = "radiogroup"+slide_number;
                
            var radioGroup  = document.getElementById("iframe1").contentWindow.document.getElementById(radiogroupID);
            var radioGroupContent = '';
                
            for(var j=0; j<value; j++){
                
                radioGroupContent = radioGroupContent + '<input type="radio" id="option'+(j+1)+'" value="option" name="question">&nbsp;<label for="option" id="optionLabel'+(j+1)+'">option '+(j+1)+'</label>&nbsp; &nbsp;';
                
            }
                
            radioGroup.innerHTML = radioGroupContent;
            
            slide.setAttribute("slide_numanswer", value);
               
            var numberOfAnswers = slide.getAttribute("slide_numanswer");
                
               for(var m=1;m<=5;m++){
                
                var el =  document.querySelectorAll('[data-key="slide_key_answer'+m+'"]').item(0);
                    
                if(m <= parseInt(value))
                {
                    el.style.display = "block";
                    el.classList.add("d-inline-block");
                }
                else
                {
                    el.style.display = "none";
                    el.classList.remove("d-inline-block");
                }
            }
                
                
            //document.getElementById("websiteLink").style.display = "none";
						
            //document.querySelectorAll('[data-key="slide_key_answer1"]').item(0).style.display = "none";    
                
            //$("[data-key=slide_key_answer1]").invisible();
            /*
            for(var k=1;k<=value;k++){    
            }*/
            
            }
                
            if(property.key == "filler")
					  {
						  if(value == "WEBSITE URL" || value == "custom"){
							  
                              document.getElementById("websiteLink").style.display = "block";
						  }
                          else
						  {
							  document.getElementById("websiteLink").style.display = "none";
						  }
					  }
                   
                      if(component.name === "Video" )
				      {
                         if(property.key === "src")
                         {
                            value = getSrc(value);
                            //console.log(value);
                         }
                      }
                  
					  var element = Vvveb.Builder.selectedEl;
                       
					  if (property.child) element = element.find(property.child);
					  if (property.parent) element = element.parent(property.parent);
					  if (property.onChange)
					  {
						  element = property.onChange(element, value, input, component);
					  }
					  if (property.htmlAttr)
					  {
						  oldValue = element.attr(property.htmlAttr);
						  if (property.htmlAttr == "class" && property.validValues) 
						  {
							  element.removeClass(property.validValues.join(" "));
							  element = element.addClass(value);
						  }
						  else if (property.htmlAttr == "style") 
						  {
                              
                              if(property.key === "margin-top")
				              {
                                  value = value.replace('%','px');
                             }
							  if(property.key === "opacity")
							  {
								  value = value.replace('%','');
								  // console.log(value);
							  }
                              
                              element = Vvveb.StyleManager.setStyle(element, property.key, value);
							 
                              if(component.name === "Video" )
				              {
                                  if(property.key === "width")
                                  {
                                      value = value.replace('%','');
                                      var val = element.parent()[0].offsetWidth;
                                      val = val * 0.56 * value * 0.01;
                                      element = Vvveb.StyleManager.setStyle(element, "height", val);
                                  }
                                  
                              }
                          }
						  else if (property.htmlAttr == "innerHTML") 
						  {
							  element = Vvveb.ContentManager.setHtml(element, value);
						  }
						  else
						  {
							  element = element.attr(property.htmlAttr, value);
						  }
						  
						  Vvveb.Undo.addMutation({type: 'attributes', 
												  target: element.get(0), 
												  attributeName: property.htmlAttr, 
												  oldValue: oldValue, 
												  newValue: element.attr(property.htmlAttr)});
					  }
		  
			  
					  if (component.onChange) 
					  {
						  element = component.onChange(element, property, value, input);
					  }
					  
					  if (!property.child && !property.parent)
                      Vvveb.Builder.selectNode(element);
                  
                      if (property.child){      
                          Vvveb.Builder.selectNode(element.parent());
                      }
            	
                  return element;
			  });				
		  };			
	  
          //console.log(slide_type);
          
//          var numberOfAnswers = element.get(0).getAttribute("slide_numanswer");
//                
//               for(var m=1;m<=5;m++){
//                
//                var el =  document.querySelectorAll('[data-key="slide_key_answer'+m+'"]').item(0);
//                    
//                if(m <= parseInt(numberOfAnswers))
//                {
//                    el.style.display = "block";
//                    el.classList.add("d-inline-block");
//                }
//                else
//                {
//                    el.style.display = "none";
//                    el.classList.remove("d-inline-block");
//                }
//            }
		  
          for (var i in component.properties)
		  {
              var property = component.properties[i];
              var element = nodeElement;
              
              //console.log(nodeElement.children);
              if(slide_type == "slider")
              {
                if(property.key.includes("slide_"))
                    continue;
              }
              else
              if(slide_type == "slide_element"){
             
                  if(!property.key.includes("slide_"))
                    continue;
                  
                  
                  if(property.key.includes("slide_key_answer"))
                  {
                      var numberOfAnswers = element.get(0).getAttribute("slide_numanswer");
                      var propertysliderkey = property.key.substr(property.key.length-1);
                      
                      if(parseInt(propertysliderkey) > parseInt(numberOfAnswers))
                        continue;
                  }
                  
                  /*  var answerproperty = property.key.substr(property.key.length - 1);
                      
                      console.log(answerproperty);
                      console.log(numberOfAnswers);
                      
                      if(parseInt(answerproperty) > parseInt(numberOfAnswers))
                      continue;
                      //var numberofanswerselected =  property.key.
                  }*/
              }
              
			  if (property.beforeInit) property.beforeInit(element.get(0)) 
			  if (property.child) element = element.find(property.child);
			  
              if (property.data) {
				  property.data["key"] = property.key;
			  } else
			  {
				  property.data = {"key" : property.key};
			  }
  
			  if (typeof property.group  === 'undefined') property.group = null;
  
			  property.input = property.inputtype.init(property.data);
			  if (property.init)
			  {
				  property.inputtype.setValue(property.init(element.get(0)));
			  
			  } else if (property.htmlAttr)
			  
			  {
				  if (property.htmlAttr == "style")
				  {
					  //value = element.css(property.key);//jquery css returns computed style
                      var value = Vvveb.StyleManager.getStyle(element, property.key);//getStyle returns declared style
                  } else
				  if (property.htmlAttr == "innerHTML")
				  {
					  var value = Vvveb.ContentManager.getHtml(element);
				  }
                  else
				  {
					  var value = element.attr(property.htmlAttr);
				  }
  
				  //if attribute is class check if one of valid values is included as class to set the select
				  if (value && property.htmlAttr == "class" && property.validValues)
				  {
					  value = value.split(" ").filter(function(el) {
						  return property.validValues.indexOf(el) != -1
					  });
				  } 
				  
				  property.inputtype.setValue(value);
			  }
			  
			  fn(component, property);
			 
			  var propertySection = defaultSection;
			  if (property.section)
			  {
				  propertySection = property.section;
			  }
  
			  if (property.inputtype == SectionInput)
			  {
				  section = componentsPanelSections[propertySection].find('.section[data-section="' + property.key + '"]');	
				  if (Vvveb.preservePropertySections && section.length)
				  {
					  section.html("");
				  } 
                  else 
				  {
					  componentsPanelSections[propertySection].append(property.input);
					  section = componentsPanelSections[propertySection].find('.section[data-section="' + property.key + '"]');
				  }
			  }
			  else
			  {
				  var row = $(tmpl('vvveb-property', property)); 
				  row.find('.input').append(property.input);
				  
				  if(property.key == "filler"){
						
						  if(value == "WEBSITE URL" || value == "custom")
						  x = 1;
				  }
				  
				  section.append(row);
			     
                  if(property.key == "href" || property.key == "placeholder"){
				  
				  if(x == 1){
				    
                      document.getElementById("websiteLink").style.display = "block";
				      x = 0;
				  
                  }else{
						  document.getElementById("websiteLink").style.display = "none";
					  }
				  }
              }
			  
			  if (property.inputtype.afterInit)
			  {
				  property.inputtype.afterInit(property.input);
			  }
  		  }
		 
		  if (component.init) component.init(Vvveb.Builder.selectedEl.get(0));
	  }
  };	
  
  
  Vvveb.Blocks = {
	  
	  _blocks: {},
  
	  get: function(type) {
		  return this._blocks[type];
	  },
  
	  add: function(type, data) {
		  data.type = type;
		  this._blocks[type] = data;
	  },
  };	
  
  
  
  Vvveb.WysiwygEditor = {
	  isActive: false,
	  oldValue: '',
	  doc:false,
	  
	  init: function(doc) {
		  this.doc = doc;
		  
		  $("#bold-btn").on("click", function (e) {
				  doc.execCommand('bold',false,null);
				  e.preventDefault();
				  return false;
		  });
  
		  $("#italic-btn").on("click", function (e) {
				  doc.execCommand('italic',false,null);
				  e.preventDefault();
				  return false;
		  });
  
		  $("#underline-btn").on("click", function (e) {
				  doc.execCommand('underline',false,null);
				  e.preventDefault();
				  return false;
		  });
		  
		  $("#strike-btn").on("click", function (e) {
				  doc.execCommand('strikeThrough',false,null);
				  e.preventDefault();
				  return false;
		  });
  
		  $("#link-btn").on("click", function (e) {
				  doc.execCommand('createLink',false,"#");
				  e.preventDefault();
				  return false;
		  });
	  },
	  
	  undo: function(element) {
		  this.doc.execCommand('undo',false,null);
	  },
  
	  redo: function(element) {
		  this.doc.execCommand('redo',false,null);
	  },
	  
	  edit: function(element) {
		  element.attr({'contenteditable':true, 'spellcheckker':false});
		  $("#wysiwyg-editor").show();
  
		  this.element = element;
		  this.isActive = true;
		  this.oldValue = element.html();
	  },
  
	  destroy: function(element) {
		  element.removeAttr('contenteditable spellcheckker');
		  $("#wysiwyg-editor").hide();
		  this.isActive = false;
  
	  
		  // node = this.element.get(0);
		  // Vvveb.Undo.addMutation({type:'characterData', 
		  // 						target: node, 
		  // 						oldValue: this.oldValue, 
		  // 						newValue: node.innerHTML});
	  }
  }
	  
  Vvveb.Builder = {
	  component : {},
	  dragMoveMutation : false,
	  isPreview : false,
	  runJsOnSetHtml : false,
	  ishoverDisabled : false, 
      isSidebarOpened : false,
      isEditorSelected : false,
      designerMode : false,
	  
	  init: function(url, callback) {
  
		  var self = this;
		  
		  self.loadControlGroups();
		  self.loadBlockGroups();
		  
		  self.selectedEl = null;
		  self.highlightEl = null;
		  self.initCallback = callback;
		  
		  self.documentFrame = $("#iframe-wrapper > iframe");
		  self.canvas = $("#canvas");
  
		  self._loadIframe(url);
		  
		  self._initDragdrop();
		  
		  self._initBox();
  
		  self.dragElement = null;
	  },
  
	  getElementType : function(element) {
		  var element_type;
		  if(element.includes("html/container"))
		  { 
  
			  element_type = "container";
		  }
		  else if(element.includes("html/section")){
			  element_type = "section";
		  }
		  else 
		  {
			  element_type = "element";
		  }
		  return element_type;
	  },
  
	  /* controls */    	
	  loadControlGroups : function() {	
  
		  var componentsList = $(".components-list");
		  componentsList.empty();
		  var item = {}, component = {};
		  var count = 0;
		  
		  var localType = "";	
		  // if(componenttype === "DIV")
		  // 	localType = "gridrow";
		  // else
		  // if(componenttype === "BODY")
		  // 	localType = "section";
		  // else
		  // 	localType = "element";
		  componentsList.each(function ()
		  {
			  var list = $(this);
			  var type = this.dataset.type;
			  count ++;
			  
			  for (group in Vvveb.ComponentsGroup)	
			  {
  
				  list.append('<li class="header clearfix" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_comphead_' + group + count + '">' + group + '  <div class="header-arrow"></div>\
										 </label><input class="header_check" type="checkbox" checked="true" id="' + type + '_comphead_' + group + count + '">  <ol></ol></li>');
				  var componentsSubList = list.find('li[data-section="' + group + '"]  ol');
				  
				  components = Vvveb.ComponentsGroup[ group ];
				  
				  for (i in components)
				  {
					  componentType = components[i];
					  component = Vvveb.Components.get(componentType);
					  if (component)
					  {
						  if(componentType.includes("gridrow"))
						  {
							  localType = "builder_container";
						  }
						  else
						  if(componentType.includes("section"))
						  {
							  //console.log(componentType);
  
							  localType = "builder_section";
						  }
						  else
						  {
							  localType = "builder_element";
						  }
						  
						  
						  item = $('<li  class="' + localType + '"   data-section="' + group + '" data-drag-type=component data-type="' + componentType + '" data-search="' + component.name.toLowerCase() + '"><a href="#">' + component.name + "</a></li>");
						  // console.log(localType);
						  if (component.image) {
  
							  item.css({
								  backgroundImage: "url(" + 'libs/builder/' + component.image + ")",
								  backgroundRepeat: "no-repeat"
							  })
						  }
						  
						  componentsSubList.append(item)
					  }
				  }
			  }
		  });
	   },
  
	   loadCustomControlGroups : function(componenttype) {	
  
		  var componentsList = $(".components-list");
		  componentsList.empty();
		  var item = {}, component = {};
		  var count = 0;
  
	   
		  var localType = "";	
		  if(componenttype === "DIV")
			  localType = "gridrow";
		  else
		  if(componenttype === "BODY")
			  localType = "section";
		  else
			  localType = "element";
  
		  componentsList.each(function ()
		  {
			  var list = $(this);
			  var type = this.dataset.type;
  
			  count ++;
			  
			  for (group in Vvveb.ComponentsGroup)	
			  { 
  
				  list.append('<li class="header clearfix" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_comphead_' + group + count + '">' + group + '  <div class="header-arrow"></div>\
										 </label><input class="header_check" type="checkbox" checked="true" id="' + type + '_comphead_' + group + count + '">  <ol></ol></li>');
				  var componentsSubList = list.find('li[data-section="' + group + '"]  ol');
				  components = Vvveb.ComponentsGroup[ group ];				
				  for (i in components)
				  {
					  componentType = components[i];
					  component = Vvveb.Components.get(componentType);
					  
					  
					  if(componentType.includes(localType)){
  
					  if (component)
					  {
  
						  item = $('<li id="' + localType + 'custom"   data-section="' + group + '" data-drag-type=component data-type="' + componentType + '" data-search="' + component.name.toLowerCase() + '"><a href="#">' + component.name + "</a></li>");
						  if (component.image) {
  
							  item.css({
								  backgroundImage: "url(" + 'libs/builder/' + component.image + ")",
								  backgroundRepeat: "no-repeat"
							  })
						  }
						  
						  componentsSubList.append(item)
					  }
				  }else if(localType === "element"){
  
  
					  if(!componentType.includes("gridrow") && !componentType.includes("section") ){
  
					  if (component)
					  {
						  item = $('<li data-section="' + group + '" data-drag-type=component data-type="' + componentType + '" data-search="' + component.name.toLowerCase() + '"><a href="#">' + component.name + "</a></li>");
						   
  
						  if (component.image) {
  
							  item.css({
								  backgroundImage: "url(" + 'libs/builder/' + component.image + ")",
								  backgroundRepeat: "no-repeat"
							  })
						  }
						  
						  componentsSubList.append(item)
					  }
				  }
				  }
			  }
		  }
		  });
	   },
	   
	   
	  loadBlockGroups : function() {	
		  var blocksList = $(".blocks-list");
		  blocksList.empty();
		  var item = {};
		  //console.log(item);
		  blocksList.each(function ()
		  {
  
			  var list = $(this);
			  var type = this.dataset.type;
			  
			  for (group in Vvveb.BlocksGroup)	
			  {
				  // list.append('<li class="header" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_blockhead_' + group + '">' + group + '  <div class="header-arrow"></div>\
				  // 					   </label><input class="header_check" type="checkbox" checked="true" id="' + type + '_blockhead_' + group + '">  <ol></ol></li>');
				  list.append('<li class="header" data-section="' + group + '"  data-search=""><input class="header_check" type="checkbox" checked="true" id="' + type + '_blockhead_' + group + '">  <ol></ol></li>');
  
				  var blocksSubList = list.find('li[data-section="' + group + '"]  ol');
				  blocks = Vvveb.BlocksGroup[ group ];
				  for (i in blocks)
				  {
					  blockType = blocks[i];
					  block = Vvveb.Blocks.get(blockType);
					  // if(blockType.includes("signin-split"))
				  
					  // {
					  // 	localType = "builder_section";
					  // }
					  if (block)
					  {
						  item = $('<li data-section="' + group + '" data-drag-type=block data-type="' + blockType + '" data-search="' + block.name.toLowerCase() + '"><a href="#">' + block.name + "</a></li>");
						  //console.log(blockType);
						  if (block.image) {
  
							  item.css({
								  backgroundImage: "url(" + ((block.image.indexOf('//') == -1) ? 'libs/builder/':'') + block.image + ")",
								  backgroundRepeat: "no-repeat"
							  })
						  }
						  
						  blocksSubList.append(item)
					  }
				  }
			  }
  
  
  
		  //}
		  });
	   },
	  
	  loadUrl : function(url, callback) {	
		  var self = this;
		  jQuery("#select-box").hide();
		  
		  self.initCallback = callback;
		  if (Vvveb.Builder.iframe.src != url) Vvveb.Builder.iframe.src = url;
	  },
	  
  /* iframe */
	  _loadIframe : function(url) {	
  
		  var self = this;
		  self.iframe = this.documentFrame.get(0);
		  self.iframe.src = url;
  
		  return this.documentFrame.on("load", function() 
		  {
				  window.FrameWindow = self.iframe.contentWindow;
				  window.FrameDocument = self.iframe.contentWindow.document;
				  var addSectionBox = jQuery("#add-section-box"); 
				  var highlightBox = jQuery("#highlight-box").hide(); 
				  
  
				  $(window.FrameWindow).on( "beforeunload", function(event) {
					  if (Vvveb.Undo.undoIndex <= 0)
					  {
						  var dialogText = "You have unsaved changes";
						  event.returnValue = dialogText;
						  return dialogText;
					  }
				  });
				  
				  jQuery(window.FrameWindow).on("scroll resize", function(event) {
				  
						  if (self.selectedEl)
						  {
							  var offset = self.selectedEl.offset();
							//   var x = $("#select-box").parent().width();
							// 	alert(x);
							//console.log(x);
							  jQuery("#select-box").css(
								  {
								  "top": offset.top - self.frameDoc.scrollTop() , 
								   "left": offset.left - self.frameDoc.scrollLeft() , 
								   "width" : self.selectedEl.outerWidth(), 
								   "height": self.selectedEl.outerHeight(),
								   "display": "block"
								   });			
								   
						  }
						  
						  if (self.highlightEl)
						  {
							  var offset = self.highlightEl.offset();
							  
							  highlightBox.css(
								  {
								  "top": offset.top - self.frameDoc.scrollTop() , 
								   "left": offset.left - self.frameDoc.scrollLeft() , 
								   "width" : self.highlightEl.outerWidth(), 
								   "height": self.highlightEl.outerHeight(),
								   "display": "block"
								   });		
								   
							  
							  addSectionBox.hide();
						  }
						  
				  });
			  
				  Vvveb.WysiwygEditor.init(window.FrameDocument);
				  if (self.initCallback) self.initCallback();
  
				  return self._frameLoaded();
		  });		
		  
	  },	
	  
	  _frameLoaded : function() {
		  
		  var self = Vvveb.Builder;
		  
		  self.frameDoc = $(window.FrameDocument);
		  self.frameHtml = $(window.FrameDocument).find("html");
		  self.frameBody = $(window.FrameDocument).find("body");
		  self.frameHead = $(window.FrameDocument).find("head");
		  
		  //insert editor helpers like non editable areas
		  self.frameHead.append('<link data-vvveb-helpers href="' + Vvveb.baseUrl + '../../css/vvvebjs-editor-helpers.css" rel="stylesheet">');
  
		  self._initHighlight();
		  
		  $(window).triggerHandler("vvveb.iframe.loaded", self.frameDoc);
	  },	
	  
	  _getElementType: function(el) {
		  
		  //search for component attribute
		  componentName = '';  
			 
		  if (el.attributes)
		  for (var j = 0; j < el.attributes.length; j++){
			  
			if (el.attributes[j].nodeName.indexOf('data-component') > -1)	
			{
  
  
			  //console.log(el.attributes[j].nodeName);
			  componentName = el.attributes[j].nodeName.replace('data-component-', '');
			  //componentName = el.attributes[j].nodeName.replace('data-component-', '');
			  
  
			}
		  }
		  
		  if (componentName != '') return componentName;
  
		  return el.tagName;
	  },
  
   
	  
	  loadNodeComponent:  function(node) {
          
		  data = Vvveb.Components.matchNode(node);
		  var component;
		  if (data) 
			  component = data.type;
		  else 
			  component = Vvveb.defaultComponent;
			  
		  Vvveb.Components.render(component);
		  // if (data.type === "html/heading"){
		  // 	alert(data.type);
		  // }
  
	  },
  
	  selectNode:  function(node) {
		  var self = this;
		  //console.log(node);
		  
		  if (!node)
		  {
			  jQuery("#select-box").hide();
			  return;
		  }
		  
		  if (self.texteditEl && self.selectedEl.get(0) != node) 
		  {
			  Vvveb.WysiwygEditor.destroy(self.texteditEl);
			  jQuery("#select-box").removeClass("text-edit").find("#select-actions").show();
			  self.texteditEl = null;
		  }
          
		  var target = jQuery(node);
		  
		  if (target)
		  {
			  self.selectedEl = target;
               try {
				  var offset = target.offset();
				  jQuery("#select-box")
				  .css(
					  {"top": offset.top - self.frameDoc.scrollTop() , 
					   "left": offset.left - self.frameDoc.scrollLeft() , 
					   "width" : target.outerWidth(), 
					   "height": target.outerHeight(),
					   "display": "block",
					   });
					  
			  } catch(err) {
				  console.log(err);
				  return false;
			  }
          }
			  
		  //console.log(target);
		  
		  //node = node.get(0);
		  jQuery("#highlight-name").html(node.getAttribute("data-type"));
	  },
  
  /* iframe highlight */    
	  _initHighlight: function() {
		  
		  var self = Vvveb.Builder;		  
		  self.frameHtml.on("mousemove touchmove", function(event) {
          var element_type = event.target.getAttribute('data-type');
          if(!element_type)
             element_type = "other";
             
	  if (element_type.includes("builder_") || element_type.includes("add_element") || element_type.includes("add_container"))
	  {
			  if (event.target && isElement(event.target) && event.originalEvent)
			  {
				  self.highlightEl = target = jQuery(event.target);
				  var offset = target.offset();
				  var height = target.outerHeight();
				  var halfHeight = Math.max(height / 2, 50);
				  var width = target.outerWidth();
				  var halfWidth = Math.max(width / 2, 50);
				  
				  var x = (event.clientX || event.originalEvent.clientX);
				  var y = (event.clientY || event.originalEvent.clientY);
				  
				  if (self.isDragging)
				  {
					  var parent = self.highlightEl;
  
					  try {
						  if (event.originalEvent)
						  {
							  if ((offset.top  < (y - halfHeight)) || (offset.left  < (x - halfWidth)))
							  {
								   if (isIE11) 
									  self.highlightEl.append(self.dragElement); 
								   else 
									  self.dragElement.appendTo(parent);
							  } else
							  {
								  if (isIE11) 
								   self.highlightEl.prepend(self.dragElement); 
								  else 
									  self.dragElement.prependTo(parent);
							  };
							  
							  if (self.designerMode)
							  {
								  var parentOffset = self.dragElement.offsetParent().offset();
								  self.dragElement.css({
									  "position": "absolute",
									  'left': x - (parentOffset.left - self.frameDoc.scrollLeft()), 
									  'top': y - (parentOffset.top - self.frameDoc.scrollTop()),
									  });
							  }
						  }
						  
					  } catch(err) {
						  console.log(err);
						  return false;
					  }
					  
					  if (!self.designerMode && self.iconDrag) self.iconDrag.css({'left': x + 275/*left panel width*/, 'top':y - 30 });					
				  }// else //uncomment else to disable parent highlighting when dragging
				  {
					  
					  jQuery("#highlight-box").css(
						  {"top": offset.top - self.frameDoc.scrollTop() , 
						   "left": offset.left - self.frameDoc.scrollLeft() , 
						   "width" : width, 
						   "height": height,
							"display" : event.target.hasAttribute('contenteditable')?"none":"block",
							"border":self.isDragging?"1px dashed aqua":"",//when dragging highlight parent with green
						   });
  
					  if (height < 50) 
					  {
						  jQuery("#section-actions").addClass("outside");	 
					  }else
					  {
						  jQuery("#section-actions").removeClass("outside");	
					  }
  
					  jQuery("#highlight-name").html(self._getElementType(event.target));
                      
					  if(!self.ishoverDisabled)
					  {
					  
                       self.selectNode(event.target);
                       self.loadNodeComponent(event.target);  
                      //self.loadNodeComponent(event.target);
                      if(event.target.getAttribute('data-type') == "add_gridrow"){
                          self.selectNode(event.target.parentNode.parentNode);
                          self.loadNodeComponent(event.target.parentNode.parentNode);
                      }   
                          
                      if(event.target.getAttribute('data-type') == "builder_element"){
                          self.loadNodeComponent(event.target.firstChild);
                    
                          if(event.target.getAttribute('data-sub-type') == "sub_element"){
                           self.loadNodeComponent(event.target);
                          }
                      } 
                         
                      var element_type = event.target.getAttribute('data-type');
					  
						  //jQuery("#add-section-btn").css("left", "50%");
						  jQuery("#add-section-btn").css("bottom", "0px");
						  jQuery("#select-actions").css("display", "block");
						  if(element_type === 'builder_section' ){
							  //self.selectNode(event.target);
							  jQuery("#add-section-btn").css("background-color", "#22ab79");
							  jQuery("#select-box").css("border", "3px solid #22ab79");
							  jQuery(".custom-btn_1").css("background-color", "#22ab79");
							  jQuery(".custom-button").css("background-color", "#22ab79");
							  jQuery(".custom-btn_1").css("display", "block");
							  jQuery("#add-section-btn").css("display", "block");
							
							  jQuery("#wysiwyg-editor").css("display", "none");
							  jQuery("#wysiwyg-editor").css("background-color", "#22ab79");
							  
							  
						  }
						  else
						  
						  if(element_type === 'builder_container'){
							  jQuery("#add-section-btn").css("background-color", "#FFEB00");
							  jQuery("#select-box").css("border", "3px solid #FFEB00");
							  // jQuery("#select-box").css("margin-bottom", "20px");
							  jQuery(".custom-btn_1").css("background-color", "#FFEB00");
							  jQuery(".custom-button").css("background-color", "#FFEB00");
							  jQuery(".custom-button").css("margin-top", "-26px");
							  jQuery(".custom-btn_1").css("display", "block");
								jQuery("#add-section-btn").css("display", "block");
							  jQuery("#wysiwyg-editor").css("display", "none");
							  jQuery("#select-actions").css("display", "#FFEB00");
										  
						  }
						  else
						  if(element_type === 'builder_element')
						  {
													  
							  jQuery("#add-section-btn").css("background-color", "#4285f4");
							  jQuery("#select-box").css("border", "3px solid #4285f4");
							  //jQuery("#select-actions").css("background-color", "#4285f4");
							  jQuery(".custom-btn_1").css("display", "none");
							  jQuery("#add-section-btn").css("display", "block");
							  jQuery("#wysiwyg-editor").css("margin-top", "-26px");
							  //jQuery("#wysiwyg-editor").css("display", "block");
							  jQuery(".custom-button").css("margin-top", "-26px");
							  jQuery(".custom-button").css("background-color", "#4285f4");
							  jQuery("#wysiwyg-editor").css("background-color", "#4285f4");
						  
						  
						  }
						  else
						  if(element_type === 'add_element')
						  {
							  jQuery("#add-section-btn").css("background-color", "#4285f4");
							  jQuery("#select-box").css("border", "1px solid #4285f4");							
							  jQuery("#add-section-btn").css("display", "block");
							  jQuery("#wysiwyg-editor").css("margin-top", "-26px");
							  
							  //jQuery("#add-section-btn").css("bottom", (height/2 -7) );
							  jQuery("#add-section-btn").css("bottom", "23px");
							  jQuery("#select-actions").css("display", "none");
  
						  }
						  else
						  
						  if(element_type === 'add_container'){
							  jQuery("#add-section-btn").css("background-color", "#FFEB00");
							  jQuery("#select-box").css("border", "1px solid #FFEB00");
							  jQuery("#add-section-btn").css("bottom", "23px");
							  //jQuery("#add-section-btn").css("left", "1%");
							  jQuery("#select-actions").css("display", "none");						
						  }

						  else
						    if(element_type === 'add_gridrow'){
                            
                              //jQuery("#add-section-btn").css("background-color", "#FFEB00");
							  jQuery("#select-box").css("border", "3px solid #FFEB00");
							  // jQuery("#select-box").css("margin-bottom", "20px");
							  jQuery(".custom-btn_1").css("background-color", "#FFEB00");
							  jQuery(".custom-button").css("background-color", "#FFEB00");
                              jQuery("#add-section-btn").css("display", "none");    
							  jQuery(".custom-button").css("margin-top", "-26px");
							  jQuery(".custom-btn_1").css("display", "block");
							  jQuery("#wysiwyg-editor").css("display", "none");
							  jQuery("#select-actions").css("display", "#FFEB00");    
                              jQuery("#select-box1").css("border", "1px dashed yellow");
						  }
						  else
						  if(element_type === 'add_section'){
							  jQuery("#add-section-btn").css("background-color", "#22ab79");
							  jQuery("#select-box").css("border", "3px solid #22ab79");
						  
							  jQuery("#select-actions").css("display", "none");						
						  }
				          else
						  {
				               jQuery("#select-box").css("display", "none");
							   jQuery("#add-section-btn").css("display", "none");
						  }
                       }
  
					  if (self.isDragging) jQuery("#highlight-name").hide(); //else jQuery("#highlight-name").show();//hide tag name when dragging
				  }
			  }	
		  }
		  });
		  
		  self.frameHtml.on("mouseup touchend", function(event) {
  
			  self.ishoverDisabled = false;
			  jQuery("#add-section-btn").css("display", "block");
              
              if (self.isDragging)
			  {
				  
				  self.isDragging = false;
				  if (self.iconDrag) self.iconDrag.remove();
				  $("#component-clone").remove();
  
				  if (self.dragMoveMutation === false)
				  {				
					  if (self.component.dragHtml) //if dragHtml is set for dragging then set real component html
					  {
						  newElement = $(self.component.html);
						  self.dragElement.replaceWith(newElement);
						  self.dragElement = newElement;
					  }
					  if (self.component.afterDrop) self.dragElement = self.component.afterDrop(self.dragElement);
				  }
				  
				  self.dragElement.css("border", "");
				  
				  node = self.dragElement.get(0);
				  self.selectNode(node);
                  
                  if(node.getAttribute('data-type') === "child")
				    self.loadNodeComponent(node.parentNode);
                  else
				    self.loadNodeComponent(node);
                  
				  if (self.dragMoveMutation === false)
				  {
					  Vvveb.Undo.addMutation({type: 'childList', 
											  target: node.parentNode, 
											  addedNodes: [node], 
											  nextSibling: node.nextSibling});
				  } else
				  {
					  self.dragMoveMutation.newParent = node.parentNode;
					  self.dragMoveMutation.newNextSibling = node.nextSibling;
					  
					  Vvveb.Undo.addMutation(self.dragMoveMutation);
					  self.dragMoveMutation = false;
				  }
			  }
		  });
  /*
		  self.frameHtml.on("dblclick", function(event) {
			  
			  if (Vvveb.Builder.isPreview == false)
			  {
				  self.texteditEl = target = jQuery(event.target);
				  if(event.target.nodeName === "H3"){
				  Vvveb.WysiwygEditor.edit(self.texteditEl);
				  
				  self.texteditEl.attr({'contenteditable':true, 'spellcheckker':false});
				  
				  self.texteditEl.on("blur keyup paste input", function(event) {
  
					  jQuery("#select-box").css({
							  "width" : self.texteditEl.outerWidth(), 
							  "height": self.texteditEl.outerHeight()
						   });
				  });		
				  
				  jQuery("#select-box").addClass("text-edit").find("#select-actions").hide();
				  jQuery("#highlight-box").hide();
                  self.ishoverDisabled = true;
			  }
			 
			  }
		  });
          */
  self.frameHtml.on("click", function(event) {

  var element_type = event.target.getAttribute('data-type');
  var element_type_parent = event.target.parentNode.getAttribute('data-type');
       
  if(event.target.nodeName === "H3" || event.target.parentNode.nodeName === "H3"){
  if (Vvveb.Builder.isPreview == false)
  {
      self.texteditEl = target = jQuery(event.target);
      Vvveb.WysiwygEditor.edit(self.texteditEl);
      self.texteditEl.attr({'contenteditable':true, 'spellcheckker':false});
      self.texteditEl.on("blur keyup paste input", function(event) {
            jQuery("#select-box").css({
                  "width" : self.texteditEl.outerWidth(true), 
                  "height": self.texteditEl.outerHeight(true)
               });
      });		
      jQuery("#select-box").addClass("text-edit").find("#select-actions").hide();
      jQuery("#highlight-box").hide();
      jQuery("#add-section-btn").css("display", "none");  
      return false;
  }
  }
      
  if(element_type === 'builder_element' || element_type_parent === 'builder_element'){
     
      if(self.isSidebarOpened){
          
      var element = document.getElementById("right-panel");
      var element1 = document.getElementById("canvas");
      jQuery("#add-section-btn").css("display", "none");  
      element.style.width = "0px";
      element1.style.width = "100%";
      self.ishoverDisabled = false;
      self.isSidebarOpened = false;
          
      }else{
          
      $("#vvveb-builder #right-panel").css("width", "20%");		
      $("#vvveb-builder #right-panel").css("display", "block");
      $("#vvveb-builder").toggleClass("no-right-panel");	
      $("#vvveb-builder #canvas").css("width", "calc( 100% - 20%)");
      $(".component-properties-tab").toggle();
      jQuery("#add-section-btn").css("display", "none");
      self.ishoverDisabled = true;
      self.isSidebarOpened = true;
          
      }
      
      return false; 
  }
      
    /*  
  if(element_type === "builder_section" || element_type === "builder_container")
  {
	  
  if (Vvveb.Builder.isPreview == false)
  {
  if(event.target.nodeName === 'SECTION' || event.target.nodeName === 'DIV')
  {
  }
  else
  {
	  self.texteditEl = target = jQuery(event.target);
  Vvveb.WysiwygEditor.edit(self.texteditEl);
  Vvveb.WysiwygEditor.edit(self.texteditEl);
  self.texteditEl.attr({'contenteditable':true, 'spellcheckker':false});
  
  self.texteditEl.on("blur keyup paste input", function(event) {
  
		  jQuery("#select-box").css({
			  "width" : self.texteditEl.outerWidth(), 
			  "height": self.texteditEl.outerHeight()
  });
  });
	  
  jQuery("#select-box").addClass("text-edit").find("#select-actions").hide();
  jQuery("#highlight-box").hide();
	  
  }
  }
  }
  else
  if(element_type === "add_element")
  {
  
  $(".builder_container").hide(); 
  $(".builder_section").hide(); 
  $(".builder_element").show(); 
  
  //var element = document.getElementById("add-section-box");
  var element1 = document.getElementById("select-actions");
  $("#vvveb-builder").addClass("no-right-panel");
  // element.style.width = "300px";
  // element.style.display = "block";
  element1.style.display = "none";   
  }*/
      
  });
  
  self.frameBody.on("click", function(event) {			
  if (Vvveb.Builder.isPreview == false)
  {
      var element = document.getElementById("add-section-box");
      element.style.width = "0px";
  }	
  
  });
  
  self.frameBody.on("click", function(event) {			
  if (Vvveb.Builder.isPreview == false)
  {
      var element = document.getElementById("right-panel");
      var element1 = document.getElementById("canvas");
      element.style.width = "0px";
      element1.style.width = "100%";
  }		
  });
  },
  
	  _initBox: function() {
		  var self = this;
		  
		  $("#drag-btn").on("mousedown", function(event) {
			  jQuery("#select-box").hide();
			  self.dragElement = self.selectedEl.css("position","");
			  self.isDragging = true;
			  
			  node = self.dragElement.get(0);
  
			  self.dragMoveMutation = {type: 'move', 
								  target: node,
								  oldParent: node.parentNode,
								  oldNextSibling: node.nextSibling};
				  
			  //self.selectNode(false);
			  event.preventDefault();
			  return false;
		  });
		  
		  $("#down-btn").on("click", function(event) {
			  jQuery("#select-box").hide();
  
			  node = self.selectedEl.get(0);
			  oldParent = node.parentNode;
			  oldNextSibling = node.nextSibling;
              
              next = self.selectedEl.next();
			  
			  if (next.length > 0)
			  {
				  next.after(self.selectedEl);
			  } else
			  {
				  self.selectedEl.parent().after(self.selectedEl);
			  }
			  
			  newParent = node.parentNode;
			  newNextSibling = node.nextSibling;
			  
			  Vvveb.Undo.addMutation({type: 'move', 
									  target: node,
									  oldParent: oldParent,
									  newParent: newParent,
									  oldNextSibling: oldNextSibling,
									  newNextSibling: newNextSibling});
  
			  event.preventDefault();
			  return false;
		  });
		  
		  $("#up-btn").on("click", function(event) {
			  jQuery("#select-box").hide();
  
			  node = self.selectedEl.get(0);
			  oldParent = node.parentNode;
			  oldNextSibling = node.nextSibling;
  
			  next = self.selectedEl.prev();
			  
			  if (next.length > 0)
			  {
				  next.before(self.selectedEl);
			  } else
			  {
				  self.selectedEl.parent().before(self.selectedEl);
			  }
  
			  newParent = node.parentNode;
			  newNextSibling = node.nextSibling;
			  
			  Vvveb.Undo.addMutation({type: 'move', 
									  target: node,
									  oldParent: oldParent,
									  newParent: newParent,
									  oldNextSibling: oldNextSibling,
									  newNextSibling: newNextSibling});
  
			  event.preventDefault();
			  return false;
		  });
		  
		  $("#clone-btn").on("click", function(event) {
			  
			  clone = self.selectedEl.clone();
			  
			  self.selectedEl.after(clone);
			  
			  self.selectedEl = clone.click();
			  
			  node = clone.get(0);
			  Vvveb.Undo.addMutation({type: 'childList', 
									  target: node.parentNode, 
									  addedNodes: [node],
									  nextSibling: node.nextSibling});
			  
			  event.preventDefault();
			  return false;
		  });
		  
		  // $("#parent-btn").on("click", function(event) {
		  // 	$("#vvveb-builder").toggleClass("no-right-panel");
		  // 	node = self.selectedEl.parent().get(0);
			  
		  // 	self.selectNode(node);
		  // 	self.loadNodeComponent(node);
			  
		  // 	event.preventDefault();
		  // 	return false;
		  // });
		  // $("#add-section-btn").on("click", function(event) {
		  // 	 $("#vvveb-builder #canvas").css("width", "calc( 100% - 20%)");
		  // 	 $("#vvveb-builder #add-section-box").css("width", "20%");
  
		  // 	// $(".component-properties-tab").toggle();
		  // 	//  jQuery("#add-section-btn").css("display", "none");
		  // 	//  self.ishoverDisabled = true;
		  // 	//  return false;
			   
		  // 	});
		  // $("#add-section-btn").on("click", function(event) {
		  // 	$("#add-section-box").css("width", "20%");		
		  // 	$("#add-section-box").css("display", "block");
  
		  // 	$("#vvveb-builder #canvas").css("width", "calc( 100% - 20%)");
		  // 	//$(".sidebar").show();
			   
		  // });
  
		  // $("#add-section-btn").on("click", function(event) {
		  // 	//$("#vvveb-builder #right-panel").css("width", "19vw");
		  // 	$("#vvveb-builder #add-section-box").css("width", "20%");		
		  
		  // 	$("#vvveb-builder #add-section-box").css("display", "block");
		  // 	$("#vvveb-builder").toggleClass("no-right-panel");	
		  // 	 //$("#vvveb-builder #canvas").css("width", "calc( 100vw - 262px)");
		  // 	 $("#vvveb-builder #canvas").css("width", "calc( 100% - 20%)");
  
		  // 	//$(".component-properties-tab").toggle();
		  // 	 jQuery("#add-section-btn").css("display", "none");
		  // 	 self.ishoverDisabled = true;
		  // 	 return false;
			   
		  // 	});
		//   $("#seo").on("click", function(event) {
		// 	//$("#vvveb-builder #right-panel").css("width", "19vw");
		// 	$("#vvveb-builder #right-panel").css("width", "20%");		
		
		// 	$("#vvveb-builder #right-panel").css("display", "block");
		// 	$("#vvveb-builder").toggleClass("no-right-panel");	
		// 	 //$("#vvveb-builder #canvas").css("width", "calc( 100vw - 262px)");
		// 	 $("#vvveb-builder #canvas").css("width", "calc( 100% - 20%)");

		// 	$(".component-properties-tab").toggle();
		// 	 jQuery("#add-section-btn").css("display", "none");
		// 	 self.ishoverDisabled = true;
		// 	 return false;
			 
		// 	});


		  $("#parent-btn").on("click", function(event) {
              
              
            //$("#vvveb-builder #right-panel").css("width", "19vw");
			  $("#vvveb-builder #right-panel").css("width", "20%");		
		  
			  $("#vvveb-builder #right-panel").css("display", "block");
			  $("#vvveb-builder").toggleClass("no-right-panel");	
			   //$("#vvveb-builder #canvas").css("width", "calc( 100vw - 262px)");
			   $("#vvveb-builder #canvas").css("width", "calc( 100% - 20%)");
  
			  $(".component-properties-tab").toggle();
			   jQuery("#add-section-btn").css("display", "none");
			   self.ishoverDisabled = true;
			   return false;
			   
			  });
		  $("#delete-btn").on("click", function(event) {
			  jQuery("#select-box").hide();
			  
			  node = self.selectedEl.get(0);
             
              if(node.parentNode.children.length === 2)
			  {
				  node.parentNode.children[0].style.display = "block";
			  }
	  
			  Vvveb.Undo.addMutation({type: 'childList', 
									  target: node.parentNode, 
									  removedNodes: [node],
									  nextSibling: node.nextSibling});
  
			  self.selectedEl.remove();
			  event.preventDefault();
              
  			  return false;
		  });
  
		  var addSectionBox = jQuery("#add-section-box");
		  var addSectionElement = {};
		  
		  $("#add-section-btn").on("click", function(event) {
			  //alert("hiiii");
			  //$("#vvveb-builder #canvas").css("width", "80%");		
		  
			  //$("#vvveb-builder #add-section-box").css("display", "block");
			  addSectionElement = self.highlightEl; 
			  
  
			  var offset = jQuery(addSectionElement).offset();			
			  var top = (offset.top - self.frameDoc.scrollTop()) + addSectionElement.outerHeight();
			  var left = (offset.left - self.frameDoc.scrollLeft()) + (addSectionElement.outerWidth() / 2) - (addSectionBox.outerWidth() / 2);
			  var outerHeight = $(window.FrameWindow).height() + self.frameDoc.scrollTop();
  
			  //check if box is out of viewport and move inside
			  if (left < 0) left = 0;
			  if (top < 0) top = 0;
			  if ((left + addSectionBox.outerWidth()) > self.frameDoc.outerWidth()) left = self.frameDoc.outerWidth() - addSectionBox.outerWidth();
			  if (((top + addSectionBox.outerHeight()) + self.frameDoc.scrollTop()) > outerHeight) top = top - addSectionBox.outerHeight();
			  
			  
			  addSectionBox.css(
				  {
				  // "top": top, 
				   //"left": left, 
				   "display": "block",
				   });
			  
			  event.preventDefault();
			  return false;
		  });
		  
		  $("#close-section-btn").on("click", function(event) {
			  addSectionBox.hide();
		  });
		  
		  function addSectionComponent(html, after = true) 
		  {
			  
			  var node = $(html);
			  
			  if (after)
			  {
				  addSectionElement.after(node);
			  } else
			  {
				  addSectionElement.append(node);
			  }
			  
			  node = node.get(0);
			  var node_type = node.parentNode.children[0].getAttribute("data-type");
  
			  if(node_type === "add_element" || node_type === "add_container"){
		  
				  node.parentNode.children[0].style.display = "none";
			  }	
  
			   Vvveb.Undo.addMutation({type: 'childList', 
									  target: node.parentNode, 
									  addedNodes: [node], 
									  nextSibling: node.nextSibling});
  
		  }
		  
		  $(".components-list li ol li", addSectionBox).on("click", function(event) {
			  var html = Vvveb.Components.get(this.dataset.type).html;
  
			  addSectionComponent(html, (jQuery("[name='add-section-insert-mode']:checked").val() == "after"));
  
			  addSectionBox.hide();
		  });
  
		  $(".blocks-list li ol li", addSectionBox).on("click", function(event) {
			  var html = Vvveb.Blocks.get(this.dataset.type).html;
  
			  addSectionComponent(html, (jQuery("[name='add-section-insert-mode']:checked").val() == "after"));
  
			  addSectionBox.hide();
		  });
		  
	  },	
  
  /* drag and drop */
	  _initDragdrop : function() {
  
		  var self = this;
		  self.isDragging = false;	
		  
		  $('.drag-elements-sidepane ul > li > ol > li').on("mousedown touchstart", function(event) {
			  
			  $this = jQuery(this);
			  
			  $("#component-clone").remove();
			  
			  if ($this.data("drag-type") == "component")
				  self.component = Vvveb.Components.get($this.data("type"));
			  else
				  self.component = Vvveb.Blocks.get($this.data("type"));
			  
			  if (self.component.dragHtml)
			  {
				  html = self.component.dragHtml;
			  } else
			  {
				  html = self.component.html;
			  }
			  
			  self.dragElement = $(html);
			  self.dragElement.css("border", "1px dashed #4285f4");
			  
			  if (self.component.dragStart) self.dragElement = self.component.dragStart(self.dragElement);
  
			  self.isDragging = true;
			  if (Vvveb.dragIcon == 'html')
			  {
				  self.iconDrag = $(html).attr("id", "dragElement-clone").css('position', 'absolute');
			  }
			  else if (self.designerMode == false)
			  {
				  self.iconDrag = $('<img src=""/>').attr({"id": "dragElement-clone", 'src': $this.css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1')}).
				  css({'z-index':100, 'position':'absolute', 'width':'64px', 'height':'64px', 'top': event.originalEvent.y, 'left': event.originalEvent.x});
			  }
				  
			  $('body').append(self.iconDrag);
			  
			  event.preventDefault();
			  return false;
		  });
		  
		  $('body').on('mouseup touchend', function(event) {
			  if (self.iconDrag && self.isDragging == true)
			  {
				  self.isDragging = false;
				  $("#component-clone").remove();
				  self.iconDrag.remove();
				  if(self.dragElement){
					  self.dragElement.remove();
				  }
			  }
		  });
		  
		  $('body').on('mousemove touchmove', function(event) {
			  if (self.iconDrag && self.isDragging == true)
			  {
				  var x = (event.clientX || event.originalEvent.clientX);
				  var y = (event.clientY || event.originalEvent.clientY);
  
				  self.iconDrag.css({'left': x - 60, 'top': y - 30});
  
				  elementMouseIsOver = document.elementFromPoint(x - 60, y - 40);
				  
				  //if drag elements hovers over iframe switch to iframe mouseover handler	
				  if (elementMouseIsOver && elementMouseIsOver.tagName == 'IFRAME')
				  {
  
					  self.frameBody.trigger("mousemove", event);
					  event.stopPropagation();
					  self.selectNode(false);
				  }
			  }
		  });
		  
		  $('.drag-elements-sidepane ul > ol > li > li').on("mouseup touchend", function(event) {
			  self.isDragging = false;
			  $("#component-clone").remove();
		  });
			  
	  },
	  
	  removeHelpers: function (html, keepHelperAttributes = false)
	  {
		  //tags like stylesheets or scripts 
		  html = html.replace(/<.*?data-vvveb-helpers.*?>/gi, "");
		  //attributes
		  if (!keepHelperAttributes)
		  {
			  html = html.replace(/\s*data-vvveb-\w+(=["'].*?["'])?\s*/gi, "");
		  }
		  
		  return html;
	  },
  
	  getHtml: function(keepHelperAttributes = true) 
	  {
		  var doc = window.FrameDocument;
		  var hasDoctpe = (doc.doctype !== null);
		  var html = "";
		  
		  $(window).triggerHandler("vvveb.getHtml.before", doc);
		  
		  if (hasDoctpe) html =
		  "<!DOCTYPE "
		   + doc.doctype.name
		   + (doc.doctype.publicId ? ' PUBLIC "' + doc.doctype.publicId + '"' : '')
		   + (!doc.doctype.publicId && doc.doctype.systemId ? ' SYSTEM' : '') 
		   + (doc.doctype.systemId ? ' "' + doc.doctype.systemId + '"' : '')
		   + ">\n";
			
		   html +=  doc.documentElement.innerHTML + "\n</html>";
		   
		   html = this.removeHelpers(html, keepHelperAttributes);
		   
		   var filter = $(window).triggerHandler("vvveb.getHtml.after", html);
		   if (filter) return filter;
		   
		   return html;
	  },
	  
	  setHtml: function(html) 
	  {
		  //update only body to avoid breaking iframe css/js relative paths
		  start = html.indexOf("<body");
		  end = html.indexOf("</body");		
  
		  if (start >= 0 && end >= 0) {
			  body = html.slice(html.indexOf(">", start) + 1, end);
		  } else {
			  body = html
		  }
		  
		  if (this.runJsOnSetHtml)
			  self.frameBody.html(body);
		  else
			  window.FrameDocument.body.innerHTML = body;
		  
		  
		  //below methods brake document relative css and js paths
		  //return self.iframe.outerHTML = html;
		  //return self.documentFrame.html(html);
		  //return self.documentFrame.attr("srcdoc", html);
	  },
	  
	  saveAjax: function(fileName, startTemplateUrl, callback)
	  {
		  var data = {};
		  data["fileName"] = (fileName && fileName != "") ? fileName : Vvveb.FileManager.getCurrentUrl();
		  data["startTemplateUrl"] = startTemplateUrl;
		  if (!startTemplateUrl || startTemplateUrl == null)
		  {
			  data["html"] = this.getHtml();
		  }
  
		  $.ajax({
			  type: "POST",
			  url: '/save-template', 
			  data: data,
			  cache: false,
			  success: function (data) {
				  if (callback) callback(data);	
			  },
			  error: function (data) {
				  alert(data.responseText);
			  }
		  });					
	  },
	  
	  setDesignerMode: function(designerMode = false)
	  {
		  this.designerMode = designerMode;
	  }
  
  };
  
  Vvveb.CodeEditor = {
	  
	  isActive: false,
	  oldValue: '',
	  doc:false,
	  
	  init: function(doc) {
		  $("#vvveb-code-editor textarea").val(Vvveb.Builder.getHtml());
  
		  $("#vvveb-code-editor textarea").keyup(function () 
		  {
			  delay(Vvveb.Builder.setHtml(this.value), 1000);
		  });
  
		  //load code on document changes
		  Vvveb.Builder.frameBody.on("vvveb.undo.add vvveb.undo.restore", function (e) { Vvveb.CodeEditor.setValue();});
		  //load code when a new url is loaded
		  Vvveb.Builder.documentFrame.on("load", function (e) { Vvveb.CodeEditor.setValue();});
  
		  this.isActive = true;
	  },
  
	  setValue: function(value) {
		  if (this.isActive)
		  {
			  $("#vvveb-code-editor textarea").val(Vvveb.Builder.getHtml());
		  }
	  },
  
	  destroy: function(element) {
		  //this.isActive = false;
	  },
  
	  toggle: function() {
		  if (this.isActive != true)
		  {
			  this.isActive = true;
			  return this.init();
		  }
		  this.isActive = false;
		  this.destroy();
	  }
  }
  
  Vvveb.Gui = {
	  init: function() {
		  $("[data-vvveb-action]").each(function () {
			  on = "click";
			  if (this.dataset.vvvebOn) on = this.dataset.vvvebOn;
			  
			  $(this).on(on, Vvveb.Gui[this.dataset.vvvebAction]);
			  if (this.dataset.vvvebShortcut)
			  {
				  $(document).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
				  $(window.FrameDocument, window.FrameWindow).bind('keydown', this.dataset.vvvebShortcut, Vvveb.Gui[this.dataset.vvvebAction]);
			  }
		  });
	  },
	  
	  undo : function () {
		  if (Vvveb.WysiwygEditor.isActive) 
		  {
			  Vvveb.WysiwygEditor.undo();
		  } else
		  {
			  Vvveb.Undo.undo();
		  }
		  Vvveb.Builder.selectNode();
	  },
	  
	  redo : function () {
		  if (Vvveb.WysiwygEditor.isActive) 
		  {
			  Vvveb.WysiwygEditor.redo();
		  } else
		  {
			  Vvveb.Undo.redo();
		  }
		  Vvveb.Builder.selectNode();
	  },
	  
	  //show modal with html content
	  save : function () {
		  $('#textarea-modal textarea').val(Vvveb.Builder.getHtml());
		  $('#textarea-modal').modal();
	  },
	  
	  //post html content through ajax to save to filesystem/db
	  saveAjax : function () {
		  var url = Vvveb.FileManager.getCurrentUrl();
		  return Vvveb.Builder.saveAjax(url, null, function (data) {
			  $('#message-modal').modal().find(".modal-body").html();
		  });		
	  },
	  
	  download : function () {
		  filename = /[^\/]+$/.exec(Vvveb.Builder.iframe.src)[0];
		  uriContent = "data:application/octet-stream,"  + encodeURIComponent(Vvveb.Builder.getHtml());
  
		  var link = document.createElement('a');
		  if ('download' in link)
		  {
			  link.dataset.download = filename;
			  link.href = uriContent;
			  link.target = "_blank";
			  
			  document.body.appendChild(link);
			  result = link.click();
			  document.body.removeChild(link);
			  link.remove();
			  
		  } else
		  {
			  location.href = uriContent;
		  }
	  },
	  
	  viewport : function () {
		  $("#canvas").attr("class", this.dataset.view);
	  },
	  
	  toggleEditor : function () {
		  $("#vvveb-builder").toggleClass("bottom-panel-expand");
		  $("#toggleEditorJsExecute").toggle();
		  Vvveb.CodeEditor.toggle();
	  },
	  
	  toggleEditorJsExecute : function () {
		  Vvveb.Builder.runJsOnSetHtml = this.checked;
	  },
	  
	  preview : function () {
		  (Vvveb.Builder.isPreview == true)?Vvveb.Builder.isPreview = false:Vvveb.Builder.isPreview = true;
		  $("#iframe-layer").toggle();
		  $("#vvveb-builder").toggleClass("preview");
	  },
	  
	  fullscreen : function () {
		  launchFullScreen(document); // the whole page
	  },
	  
	  componentSearch : function () {
		  searchText = this.value;
		  
		  $("#left-panel .components-list li ol li").each(function () {
			  $this = $(this);
			  
			  $this.hide();
			  if ($this.data("search").indexOf(searchText) > -1) $this.show();
		  });
	  },
	  
	  clearComponentSearch : function () {
		  $(".component-search").val("").keyup();
	  },
	  
	  blockSearch : function () {
		  searchText = this.value;
		  
		  $("#left-panel .blocks-list li ol li").each(function () {
			  $this = $(this);
			  
			  $this.hide();
			  if ($this.data("search").indexOf(searchText) > -1) $this.show();
		  });
	  },
	  
	  clearBlockSearch : function () {
		  $(".block-search").val("").keyup();
	  },
	  
	  addBoxComponentSearch : function () {
		  searchText = this.value;
		  
		  $("#add-section-box .components-list li ol li").each(function () {
			  $this = $(this);
			  
			  $this.hide();
			  if ($this.data("search").indexOf(searchText) > -1) $this.show();
		  });
	  },
	  
	  
	  addBoxBlockSearch : function () {
		  searchText = this.value;
		  
		  $("#add-section-box .blocks-list li ol li").each(function () {
			  $this = $(this);
			  
			  $this.hide();
			  if ($this.data("search").indexOf(searchText) > -1) $this.show();
		  });
	  },
  
  //Pages, file/components tree 
	  newPage : function () {
		  
		console.log('new page')
		  var newPageModal = $('#new-page-modal');
		  
		  newPageModal.modal("show").find("form").off("submit").submit(function( event ) {
  
			  var title = $("input[name=title]", newPageModal).val();
			  var startTemplateUrl = $("select[name=startTemplateUrl]", newPageModal).val();
			  var fileName = $("input[name=fileName]", newPageModal).val();
			  
			  //replace nonalphanumeric with dashes and lowercase for name
			  var name = title.replace(/\W+/g, '-').toLowerCase();
				  //allow only alphanumeric, dot char for extension (eg .html) and / to allow typing full path including folders
				  fileName = fileName.replace(/[^A-Za-z0-9\.\/]+/g, '-').toLowerCase();
			  
			  //add your server url/prefix/path if needed
			  var url = "" + fileName;
			  
  
			  Vvveb.FileManager.addPage(name, title, url);
			  event.preventDefault();
  
			  return Vvveb.Builder.saveAjax(url, startTemplateUrl, function (data) {
					  Vvveb.FileManager.loadPage(name);
					  Vvveb.FileManager.scrollBottom();
					  newPageModal.modal("hide");
			  });
		  });
		  
	  },
	  
	  deletePage : function () {
		  
	  },
  
	  setDesignerMode : function () {
		  //aria-pressed attribute is updated after action is called and we check for false instead of true
		  var designerMode = this.attributes["aria-pressed"].value != "true";
		  Vvveb.Builder.setDesignerMode(designerMode);
	  },
  //layout
	  togglePanel: function (panel, cssVar) {
		  var panel = $(panel);
		  var body = $("body");
		  var prevValue = body.css(cssVar);
		  if (prevValue !== "0px") 
		  {
			  panel.data("layout-toggle", prevValue);
			  body.css(cssVar, "0px");
			  panel.hide();
		  } else
		  {
			  prevValue= panel.data("layout-toggle");
			  body.css(cssVar, '');
			  panel.show();
			  
		  }
	  },
  
	  toggleFileManager: function () {
		  Vvveb.Gui.togglePanel("#filemanager", "--builder-filemanager-height");
	  },
	  
	  toggleLeftColumn: function () {
		  Vvveb.Gui.togglePanel("#left-panel", "--builder-left-panel-width");
	  },
	  
	  toggleRightColumn: function () {
		  Vvveb.Gui.togglePanel("#right-panel", "--builder-right-panel-width");
		  var rightColumnEnabled = this.attributes["aria-pressed"].value == "true";
  
		  $("#vvveb-builder").toggleClass("no-right-panel");
		  $(".component-properties-tab").toggle();
		  
		  Vvveb.Components.componentPropertiesElement = (rightColumnEnabled ? "#right-panel" :"#left-panel") +" .component-properties";
		  if ($("#properties").is(":visible")) $('.component-tab a').show().tab('show'); 
  	  },
  }
  
  Vvveb.StyleManager = {
	  setStyle: function(element, styleProp, value) {
		  return element.css(styleProp, value);
	  },
	  
	  
	  _getCssStyle: function(element, styleProp){
		  var value = "";
		  var el = element.get(0);
          if(el != undefined)
          {
		  
		  if (el.style && el.style.length > 0 && el.style[styleProp])//check inline
			  var value = el.style[styleProp];
		  else
		  if (el.currentStyle)	//check defined css
			  var value = el.currentStyle[styleProp];
		  else if (window.getComputedStyle)
		  {
			  var value = document.defaultView.getDefaultComputedStyle ? 
							  document.defaultView.getDefaultComputedStyle(el,null).getPropertyValue(styleProp) : 
							  window.getComputedStyle(el,null).getPropertyValue(styleProp);
		  }
          }
		  return value;
	  },
	  
	  getStyle: function(element,styleProp){
		  return this._getCssStyle(element, styleProp);
	  }
  }
  
  Vvveb.ContentManager = {
	  getAttr: function(element, attrName) {
		  return element.attr(attrName);
	  },
	  
	  setAttr: function(element, attrName, value) {
		  return element.attr(attrName, value);
	  },
	  
	  setHtml: function(element, html) {
		  return element.html(html);
	  },
	  
	  getHtml: function(element) {
		  return element.html();
	  },
  }
  
  
  Vvveb.FileManager = {
	  tree:false,
	  pages:{},
	  currentPage: false,
  
	  init: function() {
		  this.tree = $("#filemanager .tree > ol").html("");
		  
		  $(this.tree).on("click", "a", function (e) {
			  e.preventDefault();
			  return false;
		  });
		  
		  $(this.tree).on("click", "li[data-page] label", function (e) {
			  var page = $(this.parentNode).data("page");
			  
			  if (page) Vvveb.FileManager.loadPage(page);
			  return false;			
		  })
		  
		  $(this.tree).on("click", "li[data-component] label ", function (e) {
			  node = $(e.currentTarget.parentNode).data("node");
			  
			  Vvveb.Builder.frameHtml.animate({
				  scrollTop: $(node).offset().top
			  }, 1000);
  
			  Vvveb.Builder.selectNode(node);
			  Vvveb.Builder.loadNodeComponent(node);
              
			  //e.preventDefault();
			  //return false;
		  }).on("mouseenter", "li[data-component] label", function (e) {
  
			  node = $(e.currentTarget).data("node");
			  $(node).trigger("mousemove");
			  
		  });
	  },
	  
	  addPage: function(name, data) {
		  
		  this.pages[name] = data;
		  data['name'] = name;
  
		  var folder = this.tree;
		  if (data.folder)
		  {
			  if (!(folder = this.tree.find('li[data-folder="' + data.folder + '"]')).length) 
			  {
				  data.folderTitle = data.folder[0].toUpperCase() + data.folder.slice(1);
				  folder = $(tmpl("vvveb-filemanager-folder", data));
				  this.tree.append(folder);
			  }
			  
			  folder = folder.find("> ol");
		  } 
		  
		  folder.append(
			  tmpl("vvveb-filemanager-page", data));
	  },
	  
	  addPages: function(pages) {
		  for (page in pages)
		  {
			  this.addPage(pages[page]['name'], pages[page]);
		  }
	  },
	  
	  addComponent: function(name, url, title, page) {
		  $("[data-page='" + page + "'] > ol", this.tree).append(
			  tmpl("vvveb-filemanager-component", {name:name, url:url, title:title}));
	  },
	  
	  getComponents: function(allowedComponents = {}) {
  
			  var tree = [];
			  function getNodeTree (node, parent) {
				  if (node.hasChildNodes()) {
					  for (var j = 0; j < node.childNodes.length; j++) {
						  child = node.childNodes[j];
						  
						  if (child && child["attributes"] != undefined && 
							  (matchChild = Vvveb.Components.matchNode(child))) 
						  {
							  if (Array.isArray(allowedComponents)
								  && allowedComponents.indexOf(matchChild.type) == -1)
							  continue;
						  
							  element = {
								  name: matchChild.name,
								  image: matchChild.image,
								  type: matchChild.type,
								  node: child,
								  children: []
							  };
							  element.children = [];
							  parent.push(element);
							  element = getNodeTree(child, element.children);
						  } else
						  {
							  element = getNodeTree(child, parent);	
						  }
					  }
				  }
  
				  return false;
			  }
		  
		  getNodeTree(window.FrameDocument.body, tree);
		  
		  return tree;
	  },
	  
	  loadComponents: function(allowedComponents = {}) {
  
		  var tree = this.getComponents(allowedComponents);
		  var html = drawComponentsTree(tree);
		  var j = 0;
  
		  function drawComponentsTree(tree)
		  {
			  var html = $("<ol></ol>");
			  j++;
			  for (i in tree)
			  {
				  var node = tree[i];
				  
				  if (tree[i].children.length > 0) 
				  {
					  var li = $('<li data-component="' + node.name + '">\
					  <label for="id' + j + '" style="background-image:url(libs/builder/' + node.image + ')"><span>' + node.name + '</span></label>\
					  <input type="checkbox" id="id' + j + '">\
					  </li>');		
					  li.data("node", node.node);
					  li.append(drawComponentsTree(node.children));
					  html.append(li);
				  }
				  else 
				  {
					  var li =$('<li data-component="' + node.name + '" class="file">\
							  <label for="id' + j + '" style="background-image:url(libs/builder/' + node.image + ')"><span>' + node.name + '</span></label>\
							  <input type="checkbox" id="id' + j + '"></li>');
					  li.data("node", node.node);							
					  html.append(li);
				  }
			  }
			  
			  return html;
		  }
		  
		  $("[data-page='" + this.currentPage + "'] > ol", this.tree).replaceWith(html);
	  },
	  
	  getCurrentUrl: function() {
		  if (this.currentPage)
		  return this.pages[this.currentPage]['url'];
	  },
	  
	  reloadCurrentPage: function() {
		  if (this.currentPage)
		  return this.loadPage(this.currentPage);
	  },
	  
	  loadPage: function(name, allowedComponents = false, disableCache = true) {
		  $("[data-page]", this.tree).removeClass("active");
		  $("[data-page='" + name + "']", this.tree).addClass("active");
		  
		  this.currentPage = name;
		  var url = this.pages[name]['url'];
		  
		  Vvveb.Builder.loadUrl(url + (disableCache ? (url.indexOf('?') > -1?'&':'?') + Math.random():''), 
			  function () { 
				  Vvveb.FileManager.loadComponents(allowedComponents); 
			  });
	  },
  
	  scrollBottom: function() {
		  var scroll = this.tree.parent();	
		  scroll.scrollTop(scroll.prop("scrollHeight"));	
	  },
  }
  
  
  // Toggle fullscreen
  function launchFullScreen(document) {
	if(document.documentElement.requestFullScreen) {
	  
		  if (document.FullScreenElement)
			  document.exitFullScreen();
		  else
			  document.documentElement.requestFullScreen();
  //mozilla		
	} else if(document.documentElement.mozRequestFullScreen) {
  
		  if (document.mozFullScreenElement)
			  document.mozCancelFullScreen();
		  else
			  document.documentElement.mozRequestFullScreen();
  //webkit	  
	} else if(document.documentElement.webkitRequestFullScreen) {
  
		  if (document.webkitFullscreenElement)
			  document.webkitExitFullscreen();
		  else
			  document.documentElement.webkitRequestFullScreen();
  //ie	  
	} else if(document.documentElement.msRequestFullscreen) {
  
		  if (document.msFullScreenElement)
			  document.msExitFullscreen();
		  else
			  document.documentElement.msRequestFullscreen();
	}
  }
  
  // document.querySelectorAll(".form-control").forEach(function(el) {   
  
  // 	el.oninput =function(){            
  // 	var valPercent = (el.valueAsNumber  - parseInt(el.min)) / 
  // 						(parseInt(el.max) - parseInt(el.min));
  // 	  var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop('+ valPercent+', #29907f), color-stop('+ valPercent+', #f5f6f8));';
  // 	  el.style = style;
  // 	  console.log(el.style);
  // 	};
  // 	el.oninput();
  //   });$('input[type="range"]').change(function () {
  