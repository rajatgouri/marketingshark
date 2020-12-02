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

https://github.com/givanz/Vvvebjs
*/

bgcolorClasses = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-light", "bg-dark", "bg-white"]

bgcolorSelectOptions =
[{
value: "Default",
text: ""
},
{
value: "bg-primary",
text: "Primary"
}, {
value: "bg-secondary",
text: "Secondary"
}, {
value: "bg-success",
text: "Success"
}, {
value: "bg-danger",
text: "Danger"
}, {
value: "bg-warning",
text: "Warning"
}, {
value: "bg-info",
text: "Info"
}, {
value: "bg-light",
text: "Light"
}, {
value: "bg-dark",
text: "Dark"
}, {
value: "bg-white",
text: "White"
}];

function changeNodeName(node, newNodeName) {
var newNode;
newNode = document.createElement(newNodeName);
attributes = node.get(0).attributes;

for (i = 0, len = attributes.length; i < len; i++) {
newNode.setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
}

$(newNode).append($(node).contents());
$(node).replaceWith(newNode);

return newNode;
}

Vvveb.ComponentsGroup['Elements'] =
["html/container", "html/popup", "html/section", "html/seo", "html/section1", "html/section2", "html/section3", "html/gridrow1", "html/gridrow2", "html/gridrow3", "html/gridrow", "html/gridrow4", "html/gridrow5", "html/slider", "html/link", "html/buttongroup", "html/buttontoolbar", "html/heading", "html/image", "html/jumbotron", "html/alert", "html/card", "html/listgroup", "html/hr", "html/taglabel", "html/badge", "html/progress", "html/navbar", "html/breadcrumbs", "html/pagination", "html/form", "html/textinput", "html/textareainput", "html/selectinput", "html/fileinput", "html/checkbox", "html/radiobutton", "html/table", "html/paragraph", "html/button", "html/video"];

var base_sort = 100;//start sorting for base component from 100 to allow extended properties to be first
var style_section = 'style';
Vvveb.Components.extend("_base", "html/heading", {
image: "icons/Text.svg",
name: "Text",
nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
html: '<h3 class="pt-2 pb-2" data-sub-type="sub_element" data-type="builder_element" style="text-align:center;color:#0098f0; margin:0 auto;margin-top:5px;margin-bottom:5px;">Your Heading Here</h3>',
properties: [{
name: "Font",
key: "font-family",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 8,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "Arial, Helvetica, sans-serif",
text: "Font"
},
{
value: "Arial, Helvetica, sans-serif",
text: "Arial"
},
{
value: "Lucida, Sans-Unicode",
text: "Lucida Grande"
},
{
value: "Georgia, serif",
text: "Georgia, serif"
}, {
value: "Tahoma, Geneva, sans-serif",
text: "Tahoma"
}, {
value: 'Comic, cursive, sans-serif',
text: 'Comic Sans'
}, {
value: 'Verdana, Geneva, sans-serif',
text: 'Verdana'
},
{
value: "Open, Sans",
text: "Open Sans"
}, {
value: 'Impact, Charcoal, sans-serif',
text: 'Impact'
},
// {
//     value: 'Arial Black, Gadget, sans-serif',
//     text: 'Arial Black'
// }, 
// {
//     value: 'Trebuchet MS, Helvetica, sans-serif',
//     text: 'Trebuchet'
// }, 
// {
//     value: 'Courier New", Courier, monospace',
//     text: 'Courier New", Courier, monospace'
// }, {
//     value: 'Brush Script MT, sans-serif',
//     text: 'Brush Script'
// },
{
value: 'Palatino, Linotype',
text: 'Palatino Linotype'
}, {
value: 'font Raleway, Bold',
text: 'font Raleway Bold'
}, {
value: 'font PT Sans, Regular',
text: 'font PT Sans Regular'
}, {
value: 'Poppins, Light',
text: 'Poppins Light'
},
{
value: "Poppins, medium",
text: "Poppins, medium"
}, {
value: "Poppins, ExtraLight",
text: "Poppins, ExtraLight"
}, {
value: "Open Sans, Bold",
text: "Open Sans, Bold"
}, {
value: "Acumin Pro Condensed, Bold",
text: "Acumin Pro Condensed, Bold"
}, {
value: "font poppins, medium",
text: "font poppins, medium"
}]
}
},
{
name: "Size",
key: "font-size",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 4,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "10px",
text: "10"
},{
value: "11px",
text: "11"
},{
value: "12px",
text: "12"
},{
value: "13px",
text: "13"
},{
value: "14px",
text: "14"
},
{
value: "15px",
text: "15"
}, {
value: "16px",
text: "16"
}, {
value: "17px",
text: "17"
}, {
value: "18px",
text: "18"
}, {
value: "19px",
text: "19"
}, {
value: "20px",
text: "20"
}, {
value: "21px",
text: "21"
}, {
value: "22px",
text: "22"
}, {
value: "23px",
text: "23"
},
{
value: "24px",
text: "24"
}, {
value: "25px",
text: "25"
}, {
value: "26px",
text: "26"
}, {
value: "27px",
text: "27"
}, {
value: "28px",
text: "28"
}, {
value: "29px",
text: "29"
}, {
value: "30px",
text: "30"
},
{
value: "31px",
text: "31"
}, {
value: "32px",
text: "32"
}, {
value: "33px",
text: "33"
}, {
value: "34px",
text: "34"
}, {
value: "35px",
text: "35"
}, {
value: "36px",
text: "36"
}, {
value: "37px",
text: "37"
},
{
value: "38px",
text: "38"
}, {
value: "39px",
text: "39"
}, {
value: "40px",
text: "40"
}]
}
},
{
name: "Font Weight",
key: "font-weight",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "100",
text: "100"
}, {
value: "200",
text: "200"
}, {
value: "300",
text: "300"
}, {
value: "400",
text: "400"
}, {
value: "500",
text: "500"
}, {
value: "600",
text: "600"
}, {
value: "700",
text: "700"
}, {
value: "800",
text: "800"
},
{
value: "900",
text: "900"
}, {
value: "bold",
text: "bold"
}, {
value: "normal",
text: "normal"
}]
}
},
{
name: "Mobile Size",
key: "font-size",
htmlAttr: "class",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "pt-2 pb-2 font_15",
text: "15"
}, {
value: "pt-2 pb-2 font_16",
text: "16"
}, {
value: "pt-2 pb-2 font_17",
text: "17"
}, {
value: "pt-2 pb-2 font_18",
text: "18"
}, {
value: "pt-2 pb-2 font_19",
text: "19"
}, {
value: "pt-2 pb-2 font_20",
text: "20"
}]
}
},
// {
// //name: "Text decoration",
// key: "text-decoration-line",
// htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
// col:12,
// inline:true,
// inputtype: RadioButtonInput,
// data: {
//     extraclass:"btn-group-sm btn-group-fullwidth",
//     options: [           
//     {
//         value: "underline",
//         //text: "Left",
//         title: "underline",
//         icon:"la la-underline",
//         checked:false,
//     },        
//     {
//         value: "line-through",
//         //text: "Right",
//         title: "Line Through",
//         icon:"la la-strikethrough",
//         checked:false,
//     }]
// }
// },
// {
// //name: "Text decoration",
// key: "text-transform",
// htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
// col:12,
// inline:true,
// inputtype: RadioButtonInput,
// data: {
// extraclass:"btn-group-sm btn-group-fullwidth",
// options: [ 
// {
// value: "uppercase",
// //text: "Left",
// title: "uppercase",
// icon:"la la-Uppercase",
// checked:false,
// },
// {
// value: "lowercase",
// //text: "Left",
// title: "lowercase",
// icon:"la la-lowercase",
// checked:false,
// },
// {
// value: "capitalize",
// //text: "Left",
// title: "capitalize",
// icon:"la la-capitalize",
// checked:false,
// }]
// }
// },
{
name: "Text Shadow",
key: "text-shadow",
htmlAttr: "class",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
parent: "",
inputtype: SelectInput,
data: {
options: [{
value: "pt-2 pb-2 none",
text: "Default"
}, {
value: "pt-2 pb-2 light",
//value: "2px 2px #f5f1f14a",
text: "Light Shadow"
}, {
value: "pt-2 pb-2 medium",
text: "Medium shadow"
}, {
value: "pt-2 pb-2 heavy",
text: "Heavy shadow"
}],
},
},
{
name: "Text Placement",
key: "text-align",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "left",
text: "Left"
}, {
value: "center",
text: "Center"
}, {
value: "right",
text: "Right"
}],
},
},
{
name: "Font Color",
key: "color",
sort: base_sort++,
section: style_section,
col: 6,
inline: true,
htmlAttr: "style",
inputtype: ColorInput,
},
{
name: "Bold Color",
key: "color",
sort: base_sort++,
section: style_section,
col: 6,
inline: true,
child: "b",
htmlAttr: "style",
inputtype: ColorInput,
}
// {
// name: "Opacity",
// key: "Opacity",
// htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
// col:6,
// inline:true,
// inputtype: SelectInput,
// data: {
//     options: [{
//         value: "0",
//         text: "0"
//     }, {
//         value: "0.1",
//         text: "0.1"
//     }, {
//         value: "0.2",
//         text: "0.2"
//     }, {
//         value: "0.3",
//         text: "0.3"
//     },
//     {
//     value: "0.4",
//     text: "0.4"
//     }, {
//         value: "0.5",
//         text: "0.5"
//     }, {
//         value: "0.6",
//         text: "0.6"
//     }, {
//         value: "0.7",
//         text: "0.7"
//     },{
//         value: "0.8",
//         text: "0.8"
//     },
//     {
//         value: "0.9",
//         text: "0.9"
//     },{
//         value: "1",
//         text: "1.0"
//     }],
// },
// },
// {
// name: "Size",
// key: "width",
// htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
// col:6,
// inline:true,
// parent:"",
// inputtype:SelectInput,
// data:{
// options: [{
//     value: "",
//     text: "Default"
// }, {	
//     value: "10%",
//     text: "10%"
// }, {
//     value: "15%",
//     text: "15%"
// }, {
//     value: "20%",
//     text: "20%"
// }, {
//     value: "25%",
//     text: "25%"
// }, {
//     value: "30%",
//     text: "30%"
// }, {
//     value: "35%",
//     text: "35%"
// }, {
//     value: "40%",
//     text: "40%"
// }, {
//     value: "45%",
//     text: "45%"
// }, {
//     value: "50%",
//     text: "50%"
// },
// {
// value: "55%",
// text: "55%"
// }, {
// value: "60%",
// text: "65%"
// }, {
// value: "70%",
// text: "70%"
// }, {
// value: "75%",
// text: "75%"
// }, {
// value: "80%",
// text: "80%"
// }, {
// value: "85%",
// text: "85%"
// }, {
// value: "90%",
// text: "95%"
// },
// {
// value: "100%",
// text: "100%"
// }],
// },
// },
// {
// name: "Padding",
// key: "padding",
// htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
// col:12,
// inline:true,
// // parent:"",
// inputtype: RangeInput,
// data:{
//     value: 1,
//     max:40, 
//     min:0,
//     step:1
// },
// }
// {
//     name: "Margin Top",
// key: "margin-top",
// htmlAttr: "style",
//     sort: base_sort++,
//     section: style_section,
// col:12,
// inline:true,
// inputtype: SelectInput,
// data: {
// options: [{
//     value: "",
//     text: "Default"
// }, {	
//     value: "1%",
//     text: "1%"
// }, {
//     value: "2%",
//     text: "2%"
// }, {
//     value: "3%",
//     text: "3%"
// }, {
//     value: "4%",
//     text: "4%"
// }, {
//     value: "5%",
//     text: "5%"
// }, {
//     value: "6%",
//     text: "6%"
// }, {
//     value: "7%",
//     text: "7%"
// }, {
//     value: "8%",
//     text: "8%"
// }, {
//     value: "9%",
//     text: "9%"
// },
// {
// value: "10%",
// text: "10%"
// }, {
// value: "11%",
// text: "11%"
// }, {
// value: "12%",
// text: "12%"
// }, {
// value: "13%",
// text: "13%"
// }, {
// value: "14%",
// text: "14%"
// }, {
// value: "15%",
// text: "15%"
// }, {
// value: "16%",
// text: "16%"
// },
// {
// value: "17%",
// text: "17%"
// }, {
// value: "18%",
// text: "18%"
// }, {
// value: "19%",
// text: "19%"
// }, {
// value: "20%",
// text: "20%"
// }, {
// value: "21%",
// text: "21%"
// }, {
// value: "22%",
// text: "22%"
// }, {
// value: "23%",
// text: "23%"
// },
// {
// value: "24%",
// text: "24%"
// }, {
// value: "25%",
// text: "25%"
// }, {
// value: "26%",
// text: "26%"
// }],
//}}
]
});


// Vvveb.Components.extend("_base", "html/seo", {
// image: "icons/Text.svg",
// name: "Seo Meta Data",
// nodes: ["h1", "h2","h3", "h4","h5","h6"],
// html: '<h3 class="pt-2 pb-2" data-sub-type="sub_element" data-type="builder_element">Seo Title</h3>',
// properties: [{
// name: "Font",
// key: "font-family",
// htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
// col:12,
// inline:true,
// inputtype: SelectInput,
// data: {
// options: [{
// value: "Arial, Helvetica, sans-serif",
// text: "Font"
// }, {
// value: "Arial, Helvetica, sans-serif",
// text: "Arial"
// }, 
// {
// value:"Lucida, Sans-Unicode",
// text: "Lucida Grande"
// }, 
// {
// value: "Georgia, serif",
// text: "Georgia, serif"
// }, {
// value: "Tahoma, Geneva, sans-serif",
// text: "Tahoma"
// }, {
// value: 'Comic, cursive, sans-serif',
// text: 'Comic Sans'
// }, {
// value: 'Verdana, Geneva, sans-serif',
// text: 'Verdana'
// }, 
// {
// value: "Open, Sans",
// text: "Open Sans"
// },{
// value: 'Impact, Charcoal, sans-serif',
// text: 'Impact'
// }, 
// {
// value: 'Palatino, Linotype',
// text: 'Palatino Linotype'
// }]
// }
// }
// ]
// });
Vvveb.Components.extend("_base", "html/slider", {
image: "icons/slider.svg",
name: "Slider",
nodes: ["div"],
html: '<div data-type="builder_element" data-type_sub="slider" id="carouselExampleIndicators" class="carousel slide bg_slider" data-ride="carousel" data-interval="false" style="padding:20px; width:100%;margin-left:auto;margin-right: auto;display: block;"><div class="carousel-inner CaroItemDummy"><div class="carousel-item DummyItem active"><h2 class="slider_questions">Generic Survey</h2><br /><h3 class="pt-2 pb-2 SlideContent">How to start funnel?<br> <p>Click on start now and find your question.</p></h3><a class="carousel-control-next next_button" href="#carouselExampleIndicators" role="button" data-slide="next"><span class="sr-only dummyIcon">START NOW</span></a></div><div data-type="builder_element" data-sub-type="sub_element" class="carousel-item DummyItem"><h2 class="slider_questions">Thanks</h2><br><form name="myForm" action="#" method="get" class="slideForm"><label for="fname">Name:</label><input type="text" id="email" name="email"><br><br><label for="email">Email: </label><input type="text" id="lname" name="lname"><br><br></form><a class="carousel-control-next next_button" href="#carouselExampleIndicators" role="button" data-slide="next"><span class="sr-only dummyIcon3">SUBMIT</span></a></div></div><a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>',
properties: [{
name: "Width",
key: "width",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "50%",
text: "50%"
},
{
value: "60%",
text: "60%"
},
{
value: "70%",
text: "70%"
},
{
value: "80%",
text: "80%"
},
{
value: "90%",
text: "90%"
},
{
value: "100%",
text: "100%"
},]
}
},
{
name: "Number of slides",
key: "number",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: TextInput
},
{
name: "Question",
key: "slide_question",
htmlAttr: "innerHTML",
child: "p",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: TextInput
},
{
name: "Answer Type",
key: "slide_typeAnswer",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: 'Multiple',
text: 'Multiple Choice'
},
{
value: 'Text',
text: 'Text Input'
}]
}
},
{
name: "Number of Answers",
key: "slide_numanswer",
htmlAttr: "slide_numanswer",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: '1',
text: '1'
},
{
value: '2',
text: '2'
},
{
value: '3',
text: '3'
},
{
value: '4',
text: '4'
},
{
value: '5',
text: '5'
}
]
}
},
{
name: "Option 1",
key: "slide_key_answer1",
htmlAttr: "innerHTML",
child: "label",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: TextInput,
},
{
name: "Option 2",
key: "slide_key_answer2",
htmlAttr: "innerHTML",
child: "label",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: TextInput,
},
{
name: "Option 3",
key: "slide_key_answer3",
htmlAttr: "innerHTML",
child: "label",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: TextInput,
},
{
name: "Option 4",
key: "slide_key_answer4",
htmlAttr: "innerHTML",
child: "label",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: TextInput,
},
{
name: "Option 5",
key: "slide_key_answer5",
htmlAttr: "innerHTML",
child: "label",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: TextInput,
},
]
});

/*
Vvveb.Components.extend("_base", "html/slide", {
image: "icons/slider.svg",
name: "Slide",
node: ["div"],
html: '<div data-type="builder_element" data-type-sub="slide_element" data-sub-type="sub_element" class="carousel-item DummyItem"><h2 class="slider_questions">Question #</h2><br/><div class="red SlideContent"><p>Are you a homeowner?</p><form action="#" class="questionFirst1"><input type="radio" id="yes" value="yes" name="question">&nbsp;<label for="yes">Yes</label>&nbsp; &nbsp;<input type="radio" id="no" value="no" name="question">&nbsp;<label for="no">No</label></form></div><a class="carousel-control-next next_button" href="#carouselExampleIndicators" role="button" data-slide="next"><span class="sr-only dummyIcon2">NEXT</span></a></div>',
properties: [{
name: "Question",
key: "question",
htmlAttr: "innerHTML",
child:"p",
sort: base_sort++,
section: style_section,
col:12,
inline:true,
inputtype: TextInput
},
{
name: "Answer Type",
key: "typeAnswer",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col:12,
inline:true,
inputtype: SelectInput,
data: {
options: [{
value: 'Multiple',
text: 'Multiple Choice'
},
{
value: 'Text',
text: 'Text Input'
}]}
}]
}); 
*/
// Vvveb.Components.extend("_base", "html/label", {
//     name: "Label",
//     nodes: ["label"],
//     html: '<label for="" data-type="builder_element">Label</label>',
//     // properties: [{
//     //     name: "For id",
//     //     htmlAttr: "for",
//     //     key: "for",
//     //     inputtype: TextInput
//     // }]
// });
Vvveb.Components.extend("_base", "html/label", {
//image: "icons/Text.svg",
name: "Label",
nodes: ["label"],
html: '<label for="" data-type="builder_element">Label</label>',
properties: [{
name: "Text Options",
key: "font-family",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "Arial, Helvetica, sans-serif",
text: "Arial"
}, {
value: 'Lucida Sans Unicode", "Lucida Grande", sans-serif',
text: 'Lucida Grande'
}, {
value: 'Palatino Linotype", "Book Antiqua", Palatino, serif',
text: 'Palatino Linotype'
}, {
value: '"Times New Roman", Times, serif',
text: 'Times New Roman'
}, {
value: "Georgia, serif",
text: "Georgia, serif"
}, {
value: "Tahoma, Geneva, sans-serif",
text: "Tahoma"
}, {
value: 'Comic Sans MS, cursive, sans-serif',
text: 'Comic Sans'
}, {
value: 'Verdana, Geneva, sans-serif',
text: 'Verdana'
}, {
value: 'Impact, Charcoal, sans-serif',
text: 'Impact'
}, {
value: 'Arial Black, Gadget, sans-serif',
text: 'Arial Black'
}, {
value: 'Trebuchet MS, Helvetica, sans-serif',
text: 'Trebuchet'
}, {
value: 'Courier New", Courier, monospace',
text: 'Courier New", Courier, monospace'
}, {
value: 'Brush Script MT, sans-serif',
text: 'Brush Script'
}, {
value: "Open Sans",
text: "Open Sans"
}, {
value: "font Raleway, Bold",
text: "font Raleway, Bold"
}, {
value: "font PT Sans, Regular",
text: "font PT Sans, Regular"
}, {
value: "Poppins, Light",
text: "Poppins, Light"
},
{
value: "Poppins, medium",
text: "Poppins, medium"
}, {
value: "Poppins, ExtraLight",
text: "Poppins, ExtraLight"
}, {
value: "Open Sans, Bold",
text: "Open Sans, Bold"
}, {
value: "Acumin Pro Condensed, Bold",
text: "Acumin Pro Condensed, Bold"
}, {
value: "font poppins, medium",
text: "font poppins, medium"
}]
}
},
{
name: "Mobile Size",
key: "font-size",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "15px",
text: "Mobile Size:15px"
}, {
value: "16px",
text: "Mobile Size:16px"
}, {
value: "17px",
text: "Mobile Size:17px"
}, {
value: "18px",
text: "Mobile Size:18px"
}, {
value: "19px",
text: "Mobile Size:19px"
}, {
value: "20px",
text: "Mobile Size:20px"
}, {
value: "21px",
text: "Mobile Size:21px"
}, {
value: "22px",
text: "Mobile Size:22px"
}, {
value: "23px",
text: "Mobile Size:23px"
},
{
value: "24px",
text: "Mobile Size:24px"
}, {
value: "25px",
text: "Mobile Size:25px"
}, {
value: "26px",
text: "Mobile Size:26px"
}, {
value: "27px",
text: "Mobile Size:27px"
}, {
value: "28px",
text: "Mobile Size:28px"
}, {
value: "29px",
text: "Mobile Size:29px"
}, {
value: "30px",
text: "Mobile Size:30px"
},
{
value: "31px",
text: "Mobile Size:31px"
}, {
value: "32px",
text: "Mobile Size:32px"
}, {
value: "33px",
text: "Mobile Size:33px"
}, {
value: "34px",
text: "Mobile Size:34px"
}, {
value: "35px",
text: "Mobile Size:35px"
}, {
value: "36px",
text: "Mobile Size:36px"
}, {
value: "37px",
text: "Mobile Size:37px"
},
{
value: "38px",
text: "Mobile Size:38px"
}, {
value: "39px",
text: "Mobile Size:39px"
}, {
value: "40px",
text: "Mobile Size:40px"
}],
}
},

{
// name: "Font weight",
key: "font-weight",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 6,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "100",
text: "Thin"
}, {
value: "200",
text: "Extra-Light"
}, {
value: "300",
text: "Light"
}, {
value: "400",
text: "Normal"
}, {
value: "500",
text: "Medium"
}, {
value: "600",
text: "Semi-Bold"
}, {
value: "700",
text: "Bold"
}, {
value: "800",
text: "Extra-Bold"
}, {
value: "900",
text: "Ultra-Bold"
}],
}
},


{
// name: "Mobile Size",
key: "font-size",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 6,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
},{
value: "10px",
text: "10"
},{
value: "11px",
text: "11"
},{
value: "12px",
text: "12"
}, {
value: "13px",
text: "13"
},{
value: "14px",
text: "14"
},{
value: "15px",
text: "15px"
}, {
value: "16px",
text: "16px"
}, {
value: "17px",
text: "17px"
}, {
value: "18px",
text: "18px"
}, {
value: "19px",
text: "19px"
}, {
value: "20px",
text: "20px"
}, {
value: "21px",
text: "21px"
}, {
value: "22px",
text: "22px"
}, {
value: "23px",
text: "23px"
},
{
value: "24px",
text: "24px"
}, {
value: "25px",
text: "25px"
}, {
value: "26px",
text: "26px"
}, {
value: "27px",
text: "27px"
}, {
value: "28px",
text: "28px"
}, {
value: "29px",
text: "29px"
}, {
value: "30px",
text: "30px"
},
{
value: "31px",
text: "31px"
}, {
value: "32px",
text: "32px"
}, {
value: "33px",
text: "33px"
}, {
value: "34px",
text: "34px"
}, {
value: "35px",
text: "35px"
}, {
value: "36px",
text: "36px"
}, {
value: "37px",
text: "37px"
},
{
value: "38px",
text: "38px"
}, {
value: "39px",
text: "39px"
}, {
value: "40px",
text: "40px"
}],
}
},
{
//name: "Text align",
key: "text-align",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: RadioButtonInput,
data: {
extraclass: "btn-group-sm btn-group-fullwidth",
options: [{
value: "left",
//text: "Left",
title: "Left",
icon: "la la-align-left",
checked: false,
}, {
value: "center",
//text: "Center",
title: "Center",
icon: "la la-align-center",
checked: false,
}, {
value: "right",
//text: "Right",
title: "Right",
icon: "la la-align-right",
checked: false,
}],
}
},
{
//name: "Text decoration",
key: "text-decoration-line",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
inputtype: RadioButtonInput,
data: {
extraclass: "btn-group-sm btn-group-fullwidth",
options: [
{
value: "underline",
//text: "Left",
title: "underline",
icon: "la la-long-arrow-down",
checked: false,
},
{
value: "line-through",
//text: "Right",
title: "Line Through",
icon: "la la-strikethrough",
checked: false,
}],
},
},]
});
//Padding
// Vvveb.Components.extend("_base", "_base", {
// properties: [{
//     key: "paddings_header",
//     inputtype: SectionInput,
//     name:false,
//     sort: base_sort++,
//     section: style_section,
//     data: {header:"Padding", expanded:false},
// }, 
// {
//     // name: "Padding",
//     key: "padding",
//     htmlAttr: "style",
//     sort: base_sort++,
//     section: style_section,
//     col:12,
//     inline:true,
//     // parent:"",
//     inputtype: RangeInput,
//     data:{
//         value: 1,
//         max:40, 
//         min:0,
//         step:1
//     },
// }]
// });


//Margin
Vvveb.Components.extend("_base", "_base", {
properties: [{
key: "margins_header",
inputtype: SectionInput,
name: false,
sort: base_sort++,
section: style_section,
data: { header: "Margin-Top", expanded: false },
},
{
//name: "Margin-Top",
key: "margin-top",
htmlAttr: "style",
sort: base_sort++,
section: style_section,
col: 12,
inline: true,
//parent:"",
inputtype: RangeInput,
data: {
value: 0,
max: 200,
min: 2.5,
step: 1
},
}]
});
//display
//Background image
// Vvveb.Components.extend("_base", "_base", {
//     properties: [{
//        key: "width",
//        inputtype: SectionInput,
//        name:false,
//        sort: base_sort++,
//        section: style_section,
//        data: {header:"Bigger or Smaller Image", expanded:false},
//     },
//     {
//         //name: "Reduce Image Width",
//          key: "width",
//          htmlAttr: "style",
//          sort: base_sort++,
//          section: style_section,
//          col:12,
//          inline:true,
//          parent:"",
//          inputtype:RangeInput,
//          data:{
//              value: 50,
//              max: 100, 
//              min:1,
//              step:1
//         },
//      }
//     ]
// });    

// Vvveb.Components.extend("_base", "_base", {
//     properties: [
//     {
//        key: "display_header1",
//        inputtype: SectionInput,
//        name:false,
//        sort: base_sort++,
//        section: style_section,
//        data: {header:"Appearance"},
//    },
// //    {
// //     name: "Text Color",
// //     key: "color",
// //     sort: base_sort++,
// //     section: style_section,
// //     col:12,
// //     inline:true,
// //     htmlAttr: "style",
// //     inputtype: ColorInput,
// //   },
//   {
//     name: "Bg Color",
//     key: "background-color",
//     sort: base_sort++,
//     section: style_section,
//     col:12,
//     inline:true,
//     htmlAttr: "style",
//     inputtype: ColorInput,
// },
// {
//     name: "Bg Image",
//     key: "Image",
//     sort: base_sort++,
//     section: style_section,
//     col:12,
//     inline:true,
//     htmlAttr: "style",
//     inputtype: ImageInput,
//     init: function(node) {
//         var image = $(node).css("background-image").replace(/^url\(['"]?(.+)['"]?\)/, '$1');
//         return image;
//     },
//     onChange: function(node, value) {
//         $(node).css('background-image', 'url(' + value + ')');    
//         return node;
//     }        
// }, 
// // {
// // name: "Repeat",
// // key: "background-repeat",
// // sort: base_sort++,
// // section: style_section,
// // col:12,
// // inline:true,
// // htmlAttr: "style",
// // inputtype: SelectInput,
// // data: {
// //    options: [{
// //        value: "",
// //        text: "Default"
// //    }, {	
// //        value: "repeat-x",
// //        text: "repeat-x"
// //    }, {
// //        value: "repeat-y",
// //        text: "repeat-y"
// //    }, {
// //        value: "no-repeat",
// //        text: "no-repeat"
// //    }],
// // }
// // },
// {
// name: "Size",
// key: "background-size",
// sort: base_sort++,
// section: style_section,
// col:12,
// inline:true,
// htmlAttr: "style",
// inputtype: SelectInput,
// data: {
//    options: [{
//        value: "",
//        text: "Default"
//    }, {	
//        value: "contain",
//        text: "contain"
//    }, {
//        value: "cover",
//        text: "cover"
//    }],
// }
// },
// {
//     name: "Opacity",
//     key: "Opacity",
//     htmlAttr: "style",
//     sort: base_sort++,
//     section: style_section,
//     col:6,
//     inline:true,
//     inputtype: SelectInput,
//     data: {
//         options: [{
//            value: "0",
//            text: "0"
//        }, {
//            value: "0.1",
//            text: "0.1"
//        }, {
//            value: "0.2",
//            text: "0.2"
//        }, {
//            value: "0.3",
//            text: "0.3"
//        },
//        {
//         value: "0.4",
//         text: "0.4"
//         }, {
//             value: "0.5",
//             text: "0.5"
//         }, {
//             value: "0.6",
//             text: "0.6"
//         }, {
//             value: "0.7",
//             text: "0.7"
//         },{
//             value: "0.8",
//             text: "0.8"
//         },
//         {
//             value: "0.9",
//             text: "0.9"
//         },{
//             value: "1",
//             text: "Var%"
//         }
//     ],
//     }
// },
// {
//      name: "Size",
//      key: "font-size",
//      htmlAttr: "style",
//      sort: base_sort++,
//      section: style_section,
//      col:6,
//      inline:true,
//      inputtype: SelectInput,
//      data: {
//          options: [{
//              value: "20px",
//              text: "20%"
//          }, {
//              value: "21px",
//              text: "21%"
//          }, {
//              value: "22px",
//              text: "22%"
//          }, {
//              value: "23px",
//              text: "23%"
//          },
//          {
//             value: "24px",
//             text: "24%"
//         }, {
//             value: "25px",
//             text: "25%"
//         }, {
//             value: "26px",
//             text: "26%"
//         }, {
//             value: "27px",
//             text: "27%"
//         }, {
//             value: "28px",
//             text: "28%"
//         }, {
//             value: "29px",
//             text: "29%"
//         }, {
//             value: "30px",
//             text: "30%"
//         },
//         {
//             value: "31px",
//             text: "31%"
//         }, {
//             value: "32%",
//             text: "32%"
//         }, {
//             value: "33px",
//             text: "33%"
//         }, {
//             value: "34px",
//             text: "34%"
//         }, {
//             value: "35px",
//             text: "35"
//         }, {
//             value: "36px",
//             text: "36%"
//         }, {
//             value: "37px",
//             text: "37%"
//         },
//         {
//             value: "38px",
//             text: "38%"
//         }, {
//             value: "39px",
//             text: "39%"
//         }, {
//             value: "40px",
//             text: "40%"
//         }],
//      }
// }]
// });   
Vvveb.Components.extend("_base", "html/section", {
classes: ["section"],
nodes: ["section"],
image: "icons/section.svg",
name: "Full Width",
html: '<section name="section" data-type="builder_section" style="padding:0%;margin-left: auto;margin-right: auto;margin-top:0%;"><div class="container text-center" style="margin-left:auto;margin-right:auto; max-width:1170px;color:#fff; padding:1%;"><h2 class="plusBtn"  data-type="add_container" id="myspan">+</h2></div></section>',
properties: [
//  {
//     name: "Type",
//     key: "type",
//     htmlAttr: "class",
//     inputtype: SelectInput,
//     validValues: ["section"],
//     data: {
//         options: [{
//             value: "section",
//             text: "Default"
//         }]
//     }
// },
{
name: "Background Image",
key: "Image",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
htmlAttr: "style",
inputtype: ImageInput,
init: function (node) {
var image = $(node).css("background-image").replace(/^url\(['"]?(.+)['"]?\)/, '$1');
return image;
},
onChange: function (node, value) {
$(node).css('background-image', 'url(' + value + ')');
return node;
}
},
// {
// name: "Repeat",
// key: "background-repeat",
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// htmlAttr: "style",
// inputtype: SelectInput,
// data: {
// options: [{
// value: "",
// text: "Default"
// }, {	
// value: "repeat-x",
// text: "repeat-x"
// }, {
// value: "repeat-y",
// text: "repeat-y"
// }, {
// value: "no-repeat",
// text: "no-repeat"
// }],
// }
// }, 
{
name: "Background Size",
key: "background-size",
col: 12,
inline: true,
// sort: base_sort++,
// section: style_section,
htmlAttr: "style",
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Actual Size"
}, {
value: "contain",
text: "Repeat"
}, {
value: "cover",
text: "Stretch To Fit"
}],
}
},
// {
// name: "Section Width",
// key: "width",
// htmlAttr: "style",
// //  sort: base_sort++,
// //  section: style_section,
// col:12,
// inline:true,
// parent:"",
// inputtype:SelectInput,
// data:{
//     options: [{
//         value: "",
//         text: "Default"
//     }, {	
//         value: "10%",
//         text: "10%"
//     }, {
//         value: "15%",
//         text: "15%"
//     }, {
//         value: "20%",
//         text: "20%"
//     }, {
//         value: "25%",
//         text: "25%"
//     }, {
//         value: "30%",
//         text: "30%"
//     }, {
//         value: "35%",
//         text: "35%"
//     }, {
//         value: "40%",
//         text: "40%"
//     }, {
//         value: "45%",
//         text: "45%"
//     }, {
//         value: "50%",
//         text: "50%"
//     },
//     {
//     value: "55%",
//     text: "55%"
//     }, {
//     value: "60%",
//     text: "65%"
//     }, {
//     value: "70%",
//     text: "70%"
//     }, {
//     value: "75%",
//     text: "75%"
//     }, {
//     value: "80%",
//     text: "80%"
//     }, {
//     value: "85%",
//     text: "85%"
//     }, {
//     value: "90%",
//     text: "95%"
//     },
//     {
//     value: "100%",
//     text: "100%"
//     }],
// },
// },
{
name: "Padding Top",
key: "padding-top",
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
inputtype: RangeInput,
data: {
value: 1,
max: 40,
min: 0,
step: 1
},
},
{
name: "Padding Bottom",
key: "padding-bottom",
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
inputtype: RangeInput,
data: {
value: 1,
max: 40,
min: 0,
step: 1
},
},
// {
//     name: "Settings",
//     // key: "background",
// 	// htmlAttr: "class",
//     // validValues: bgcolorClasses,
//     // inputtype: SelectInput,
//     // data: {
//     //     options: bgcolorSelectOptions
//     // }
// },

// {
//     name: "Stick to page?",
//     key: "active",
//     // col:12,
//     // inline:false,
//     htmlAttr: "class",
//     validValues: ["", "active"],
//     inputtype: ToggleInput,
//     data: {
//         on: "active",
//         off: ""
//     }
// }
// {
//     name: "Text Color",
//     key: "color",
// 	htmlAttr: "style",
//     inputtype: ColorInput,
// }
],
});


Vvveb.Components.extend("_base", "html/image", {
nodes: ["img"],
name: "Image",
html: '<div width="100%" data-type="builder_element" ><img data_type="child" src="' + Vvveb.baseUrl + 'icons/photo.svg" width="50%" class="" style="padding:0%; height:50% ; margin:0 auto;margin-top:5px;margin-bottom:5px;"></div>',
image: "icons/image.svg",
properties: [{
name: "Select Image",
col: 6,
key: "UPLOAD",
htmlAttr: "src",
child: "img",
inline: false,
// key: "src",
inputtype: ImageInput
},
{
//name: "Width",
col: 6,
inline: true,
key: "LIBRARY",
htmlAttr: "style",
inputtype: ImageInput
},
{
name: "Shadow",
key: "box-shadow",
htmlAttr: "class",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
child: "img",
inputtype: SelectInput,
data: {
options: [{
value: "none",
text: "Default"
}, {
value: "soft",
//value: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
text: "Soft"
}, {
value: "Medium",
text: "Medium"
}, {
value: "Hard",
text: "Hard"
}],
},
},




{
name: "Image Position",
key: "position",
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
parent: "",
inputtype: SelectInput,
data: {
options: [{
value: "none",
text: "Default"
}, {
value: "absolute",
text: "absolute"
}, {
value: "static",
text: "static"
}, {
value: "relative",
text: "relative"
}, {
value: "fixed",
text: "fixed"
}, {
value: "sticky",
text: "sticky"
}
],
},
},

{
name: "Placement",
key: "text-align",
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "left",
text: "Left"
}, {
value: "center",
text: "Center"
}, {
value: "right",
text: "Right"
}],
},
},
{
name: "Size",
key: "width",
htmlAttr: "style",
//  sort: base_sort++,
//  section: style_section,
col: 12,
inline: true,
child: "img",
inputtype: RangeInput,
data: {
value: 5,
max: 100,
min: 1,
step: 1
},
}
// {
// name: "Padding Left",
// key: "padding-left",
// htmlAttr: "style",
// //  sort: base_sort++,
// //  section: style_section,
// col:12,
// inline:true,
// parent:"",
// inputtype:RangeInput,
// data:{
// value:5,
// max: 40, 
// min:1,
// step:1
// },
// },
// {
// name: "Padding Right",
// key: "padding-right",
// htmlAttr: "style",
// //  sort: base_sort++,
// //  section: style_section,
// col:12,
// inline:true,
// parent:"",
// inputtype:RangeInput,
// data:{
// value:5,
// max: 40, 
// min:1,
// step:1
// },
// }
// {
//     name: "Color",
//     key: "color",
//     // sort: base_sort++,
//     // section: style_section,
//     col:4,
//     inline:true,
//     htmlAttr: "style",
//     inputtype: ColorInput,
// },
//   {
//     name: "Gradient",
//     key: "color",
//     // sort: base_sort++,
//     // section: style_section,
//     col:4,
//     inline:true,
//     htmlAttr: "style",
//     inputtype: ColorInput,
//   },
//   {
//     name: "Opacity",
//     key: "Opacity",
//     col:4,
//     inline:true,
//     htmlAttr: "style",
//     // sort: base_sort++,
//     // section: style_section,
//     inputtype: SelectInput,
//     data: {
//         options: [{
//            value: "0",
//            text: "0"
//        }, {
//            value: "0.1",
//            text: "0.1"
//        }, {
//            value: "0.2",
//            text: "0.2"
//        }, {
//            value: "0.3",
//            text: "0.3"
//        },
//        {
//         value: "0.4",
//         text: "0.4"
//         }, {
//             value: "0.5",
//             text: "0.5"
//         }, {
//             value: "0.6",
//             text: "0.6"
//         }, {
//             value: "0.7",
//             text: "0.7"
//         },{
//             value: "0.8",
//             text: "0.8"
//         },
//         {
//             value: "0.9",
//             text: "0.9"
//         },{
//             value: "1",
//             text: "20%"
//         }
//     ],
//     }
// }
// // {
// //     name: "Fitting",
// //     key: "src",
// //     // sort: base_sort++,
// //     // section: style_section,
// //     col:12,
// //     inline:true,
// //     htmlAttr: "src",
// //     inputtype: SelectInput,
// //     data: {
// //        options: [{
// //            value: "",
// //            text: "Default"
// //        }, {	
// //            value: "contain",
// //            text: "contain"
// //        }, {
// //            value: "cover",
// //            text: "cover"
// //        }],
// //     }
// //     }
// // {
// //     name: "Height",
// //     key: "height",
// //     htmlAttr: "height",
// //     inputtype: TextInput
// // }, {
// //     name: "Alt",
// //     key: "alt",
// //     htmlAttr: "alt",
// //     inputtype: TextInput
// // }
]
});
// Vvveb.Components.extend("_base", "_base", {
//     properties: [{
//        key: "margins_header",
//        image: "icons/image.svg",
//        inputtype: SectionInput,
//        name:false,
//        sort: base_sort++,
//        section: style_section,
//        data: {header:"Margin-Top", expanded:false},
//    },
// {
//     //name: "Margin-Top",
//     key: "margin-top",
//     htmlAttr: "style",
//     sort: base_sort++,
//     section: style_section,
//     col:12,
//     inline:true,
//     //parent:"",
//     inputtype: RangeInput,
//     data:{
//         value:1,
//         max: 100, 
//         min:1,
//         step:1
// },
//  }]
// });
Vvveb.Components.extend("_base", "html/hr", {
nodes: ["hr"],
name: "Divider",
html: '<div data-type="builder_element" style="padding-top:2%;padding-bottom:2%;margin-top:5px; margin-bottom:5px;margin:0 auto;"><hr data-sub-type="sub_element" style="border-shadow:none;width:100%;margin-top:5px;margin-bottom:5px;"></div>',
image: "icons/hr.svg",
properties: [
{
name: "Divider Color",
key: "border-color",
col: 12,
inline: true,
htmlAttr: "style",
child: "hr",
inputtype: ColorInput,
},
{
name: "Divider Style",
key: "border-style",
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
child: "hr",
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "solid",
text: "Solid"
}, {
value: "dashed",
text: "Dashed"
}],
},
},

{
name: "Divider Width",
key: "border-width",
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
child: "hr",
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "2px",
text: "2px"
}, {
value: "3px",
text: "3px"
}, {
value: "4px",
text: "4px"
}, {
value: "5px",
text: "5px"
}],
},
},
{
name: "Divider Shadow",
key: "box-shadow",
htmlAttr: "style",
child: "hr",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
parent: "",
inputtype: SelectInput,
data: {
options: [{
value: "none",
text: "Default"
}, {
value: "3px 3px 2px #e58989",
text: "Soft"
}, {
value: "6px 6px 4px #e58989",
text: "Medium"
}, {
value: "16px 16px 8px #e58989",
text: "Hard"
}],
},
},
{
name: "Divider Size",
key: "width",
htmlAttr: "style",
child: "hr",
//  sort: base_sort++,
//  section: style_section,
col: 12,
inline: true,
parent: "",
inputtype: RangeInput,
data: {
value: 1,
max: 100,
min: 1,
step: 1
},
}]
});

// Vvveb.Components.add("html/hr", {
//     image: "icons/hr.svg",
//     nodes: ["hr"],
//     //name: "Horizontal Rule",
//     name: "Divider",
//     html: '<hr data-type="builder_element" style="padding:2%;">'
// },
// {
// name: "Video Size",
// key: "width",
// htmlAttr: "style",
// //  sort: base_sort++,
// //  section: style_section,
// col:12,
// inline:true,
// parent:"",
// inputtype:RangeInput,
// data:{
//     value: 50,
//     max: 100, 
//     min:1,
//     step:1
// },
// });

Vvveb.Components.extend("_base", "html/breadcrumbitem", {
classes: ["breadcrumb-item"],
name: "Breadcrumb Item",
html: '<li class="breadcrumb-item"><a href="#">Library</a></li>',
properties: [{
name: "Active",
key: "active",
htmlAttr: "class",
validValues: ["", "active"],
inputtype: ToggleInput,
data: {
on: "active",
off: ""
}
}]
});
Vvveb.Components.extend("_base", "html/pageitem", {
classes: ["page-item"],
html: '<li class="page-item"><a class="page-link" href="#">1</a></li>',
name: "Pagination Item",
properties: [{
name: "Link To",
key: "href",
htmlAttr: "href",
child: ".page-link",
inputtype: TextInput
}, {
name: "Disabled",
key: "disabled",
htmlAttr: "class",
validValues: ["disabled"],
inputtype: ToggleInput,
data: {
on: "disabled",
off: ""
}
}]
});
// Vvveb.Components.extend("_base", "html/form", {
// nodes: ["form"],
// image: "icons/form.svg",
// name: "Input Settings",
// html: '<form data-type="builder_element" style="padding:10px;"><div class="form-group text-center"><input placeholder="Your Name:"  type="text" class="form-control"></div></div></form>',
// properties: [{
// name: "Input Type",
// key: "type",
// htmlAttr: "class",
// col:12,
// inline:true,
// inputtype: SelectInput,
// // key: "style",
// // htmlAttr: "style",
// // // sort: base_sort++,
// // // section: style_section,
// // col:12,
// // inline:true,
// // inputtype: SelectInput,
// data: {
// options: [{
//     value: "Name",
//     text: "Name"
// }, {
//     value: "Email",
//     text: "Email"
// }, {
//     value: "Phone",
//     text: "Phone"
// }, {
//     value: "Custom",
//     text: "Custom"
// }],
// },
// },  
// {
// name: "Placeholder Text",
// key: "placeholder",
// col:12,
// inline:true,
// htmlAttr: "placeholder",
// inputtype: TextInput
// },
// {
// name: "Required?",
// key: "required",
// htmlAttr: "class",
// inputtype: ToggleInput,
// validValues: ["required"],
// data: {
//     on: "required",
//     off: ""
// }
// },
// {
// name: "Style",
// key: "style",
// col:12,
// inline:true,
// htmlAttr: "style",
// //validValues: ["", "form-search", "form-inline", "form-horizontal"],
// inputtype: SelectInput,
// data: {
// options: [{
//     value: "",
//     text: "Default"
// }, 
// // {
// //     value: "form-search",
// //     text: "Search"
// // }, 
// {
//     value: "form-inline",
//     text: "Inline"
// }, {
//     value: "form-horizontal",
//     text: "Horizontal"
// }]
// }
// }
// // {
// // name: "Action",
// // key: "action",
// // htmlAttr: "action",
// // inputtype: TextInput
// // }, {
// // name: "Method",
// // key: "method",
// // htmlAttr: "method",
// // inputtype: TextInput
// // }
// ]
// });

Vvveb.Components.extend("_base", "html/textinput", {
name: "Input Form",
attributes: { "type": "text" },
image: "icons/form.svg",
html: '<div data-type="builder_element" style="padding-top:2%;padding-bottom:2%;margin-top:5px; margin-bottom:5px;margin:0 auto;"><input type="text" class="form-control" placeholder="Your Name Here..." style="margin:0 auto; width:50%;padding-top:2%;padding-bottom:2%;"></div>',
properties: [
{
name: "Input Type",
key: "filler",
htmlAttr: "filler",
col: 12,
inline: true,
child: "input",
inputtype: SelectInput,
data: {
options: [{
value: "name",
text: "Name"
}, {
value: "email",
text: "Email"
}, {
value: "tel",
text: "Phone"
}, {
value: "custom",
text: "Custom"
}]
}
},
{
//name: "Custom Field ID",
key: "custom_type",
col: 12,
inline: true,
child: "input",
htmlAttr: "custom_type",
inputtype: TextInput
},
// {
// name: "Value",
// key: "value",
// htmlAttr: "value",
// inputtype: TextInput
// }, 
{
name: "Placeholder Text",
key: "placeholder",
col: 12,
child: "input",
inline: true,
htmlAttr: "placeholder",
inputtype: TextInput
},
{
name: "Required?",
key: "required",
htmlAttr: "class",
inputtype: ToggleInput,
validValues: ["required"],
data: {
on: "required",
off: ""
}
},
{
name: "Text Align",
key: "text-align",
htmlAttr: "style",
child: "input",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "left",
text: "Left"
}, {
value: "center",
text: "Center"
}, {
value: "right",
text: "Right"
}],
},
},
{
name: "Style",
key: "border",
col: 12,
inline: true,
child: "input",
htmlAttr: "style",
//validValues: ["", "form-search", "form-inline", "form-horizontal"],
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
},
{
value: "2px solid white",
text: "White"
}, {
value: "2px solid grey",
text: "Grey"
},
{
value: "2px solid blue",
text: "Blue outline"
}]
}
},
{
name: "Input Form Size",
key: "width",
child: "input",
htmlAttr: "style",
//  sort: base_sort++,
//  section: style_section,
col: 12,
inline: true,
//parent:"",
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "25%",
text: "Small"
}, {
value: "50%",
text: "Medium"
}, {
value: "100%",
text: "Large"
}],
},
}]
});


Vvveb.Components.extend("_base", "html/link", {
nodes: ["a"],
//name: "Link",
//classes: ["btn"],
name: "Button",
html: '<div data-type="builder_element" style="overflow:hidden;padding-top:2%; padding-bottom:2%;margin-top: 5px;margin-bottom: 5px;"><a href="#" class="pt-3 pb-3"  style="background-color: rgb(66, 133, 244);color: rgb(255, 255, 255);padding-left:1%;padding-right: 1%;border-radius: 6px;display: block;margin:0 auto;text-align: center; width:50%;box-shadow: none; text-decoration: none;"><span>Button</span></a></div>',
image: "icons/button.svg",
properties: [{
name: "Font",
key: "font-family",
htmlAttr: "style",
child: "a",
// sort: base_sort++,
// section: style_section,
col: 8,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "Arial, Helvetica, sans-serif",
text: "Font"
}, {
value: "Arial, Helvetica, sans-serif",
text: "Arial"
},
{
value: "Lucida, Sans-Unicode",
text: "Lucida Grande"
},
// {
//     value: 'Times New Roman, Times, serif',
//     text: 'Times New Roman'
// }, 
{
value: "Georgia, serif",
text: "Georgia, serif"
}, {
value: "Tahoma, Geneva, sans-serif",
text: "Tahoma"
}, {
value: 'Comic, cursive, sans-serif',
text: 'Comic Sans'
}, {
value: 'Verdana, Geneva, sans-serif',
text: 'Verdana'
},
{
value: "Open, Sans",
text: "Open Sans"
}, {
value: 'Impact, Charcoal, sans-serif',
text: 'Impact'
},
// {
//     value: 'Arial Black, Gadget, sans-serif',
//     text: 'Arial Black'
// }, 
// {
//     value: 'Trebuchet MS, Helvetica, sans-serif',
//     text: 'Trebuchet'
// }, 
// {
//     value: 'Courier New", Courier, monospace',
//     text: 'Courier New", Courier, monospace'
// }, {
//     value: 'Brush Script MT, sans-serif',
//     text: 'Brush Script'
// },
{
value: 'Palatino, Linotype',
text: 'Palatino Linotype'
}, {
value: "font Raleway, Bold",
text: "font Raleway, Bold"
}, {
value: "font PT Sans, Regular",
text: "font PT Sans, Regular"
}, {
value: "Poppins, Light",
text: "Poppins, Light"
},
{
value: "Poppins, medium",
text: "Poppins, medium"
}, {
value: "Poppins, ExtraLight",
text: "Poppins, ExtraLight"
}, {
value: "Open Sans, Bold",
text: "Open Sans, Bold"
}, {
value: "Acumin Pro Condensed, Bold",
text: "Acumin Pro Condensed, Bold"
}, {
value: "font poppins, medium",
text: "font poppins, medium"
}]
}
},
{
name: "Size",
key: "font-size",
htmlAttr: "style",
child: "a",
// sort: base_sort++,
// section: style_section,
col: 4,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "10px",
text: "10"
},{
value: "11px",
text: "11"
},{
value: "12px",
text: "12"
},{
value: "13px",
text: "13"
},{
value: "14px",
text: "14"
},{
value: "15px",
text: "15"
}, {
value: "16px",
text: "16"
}, {
value: "17px",
text: "17"
}, {
value: "18px",
text: "18"
}, {
value: "19px",
text: "19"
}, {
value: "20px",
text: "20"
}, {
value: "21px",
text: "21"
}, {
value: "22px",
text: "22"
}, {
value: "23px",
text: "23"
},
{
value: "24px",
text: "24"
}, {
value: "25px",
text: "25"
}, {
value: "26px",
text: "26"
}, {
value: "27px",
text: "27"
}, {
value: "28px",
text: "28"
}, {
value: "29px",
text: "29"
}, {
value: "30px",
text: "30"
},
{
value: "31px",
text: "31"
}, {
value: "32px",
text: "32"
}, {
value: "33px",
text: "33"
}, {
value: "34px",
text: "34"
}, {
value: "35px",
text: "35"
}, {
value: "36px",
text: "36"
}, {
value: "37px",
text: "37"
},
{
value: "38px",
text: "38"
}, {
value: "39px",
text: "39"
}, {
value: "40px",
text: "40"
}],
}
},

// {
// // name: "Font weight",
// key: "font-weight",
// htmlAttr: "style",
// // sort: base_sort++,
// // section: style_section,
// col:8,
// inline:true,
// inputtype: SelectInput,
// data: {
//     options: [{
//         value: "",
//         text: "Default"
//     }, {	
//         value: "100",
//         text: "Thin"
//     }, {
//         value: "200",
//         text: "Extra-Light"
//     }, {
//         value: "300",
//         text: "Light"
//     }, {
//         value: "400",
//         text: "Normal"
//     }, {
//         value: "500",
//         text: "Medium"
//     }, {
//         value: "600",
//         text: "Semi-Bold"
//     }, {
//         value: "700",
//         text: "Bold"
//     }, {
//         value: "800",
//         text: "Extra-Bold"
//     }, {
//         value: "900",
//         text: "Ultra-Bold"
//     }],
// }
// },
// {
// name: "Button Placement",
// key: "float",
// htmlAttr: "style",
// child:"a",    
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// inputtype:SelectInput,
// data:{
// options: [{
// value: "",
// text: "Default"
// }, {	
// value: "left",
// text: "Left"
// }, {
// value: "",
// text: "Center"
// }, {
// value: "right",
// text: "Right"
// }],
// },
// },

{
name: "Font Weight",
key: "font-weight",
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "100",
text: "100"
}, {
value: "200",
text: "200"
}, {
value: "300",
text: "300"
}, {
value: "400",
text: "400"
}, {
value: "500",
text: "500"
}, {
value: "600",
text: "600"
}, {
value: "700",
text: "700"
}, {
value: "800",
text: "800"
},
{
value: "900",
text: "900"
}, {
value: "bold",
text: "bold"
}, {
value: "normal",
text: "normal"
}]
}
},

{
name: "Button Action",
key: "filler",
col: 12,
inline: true,
child: "a",
htmlAttr: "filler",
//inputtype: LinkInput
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "SUBMIT FORM",
text: "Submit Form"
}, {
value: "WEBSITE URL",
text: "Website URL"
}, {
value: "NEXT FUNNEL STEP",
text: "Next Funnel Step"
}],
},
},
{
name: " ",
key: "href",
col: 12,
child: "a",
inline: true,
htmlAttr: "href",
inputtype: LinkInput
},
{
name: "Button Text",
key: "text",
col: 12,
inline: true,
htmlAttr: "innerHTML",
child: "span",
inputtype: TextInput
},
{
name: "Text Placement",
key: "text-align",
htmlAttr: "style",
child: "a",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "left",
text: "Left"
}, {
value: "center",
text: "Center"
}, {
value: "right",
text: "Right"
}],
},
},
// {
// //name: "Text align",
// key: "text-align",
// htmlAttr: "style",
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// inputtype: RadioButtonInput,
// data: {
// extraclass:"btn-group-sm btn-group-fullwidth",
// options: [{
// value: "left",
// //text: "Left",
// title: "Left",
// icon:"la la-align-left",
// checked:false,
// }, {
// value: "center",
// //text: "Center",
// title: "Center",
// icon:"la la-align-center",
// checked:false,
// }, {
// value: "right",
// //text: "Right",
// title: "Right",
// icon:"la la-align-right",
// checked:false,
// }
// {
// value: "justify",
// //text: "Right",
// title: "Justify",
// icon:"la la-align-justify",
// checked:false,
// }
// ],
// }
// },
// {
// //name: "Text decoration",
// key: "text-decoration-line",
// htmlAttr: "style",
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// inputtype: RadioButtonInput,
// data: {
// extraclass:"btn-group-sm btn-group-fullwidth",
// options: [          
// {
// value: "underline",
// //text: "Left",
// title: "underline",
// icon:"la la-underline",
// checked:false,
// },        
// {
// value: "line-through",
// //text: "Right",
// title: "Line Through",
// icon:"la la-strikethrough",
// checked:false,
// }],
// }
// },
// {
// //name: "Text decoration",
// key: "text-transform",
// htmlAttr: "style",
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// inputtype: RadioButtonInput,
// data: {
// extraclass:"btn-group-sm btn-group-fullwidth",
// options: [ 
// {
// value: "uppercase",
// //text: "Left",
// title: "uppercase",
// icon:"la la-Uppercase",
// checked:false,
// },
// {
// value: "lowercase",
// //text: "Left",
// title: "lowercase",
// icon:"la la-lowercase",
// checked:false,
// },
// {
// value: "capitalize",
// //text: "Left",
// title: "capitalize",
// icon:"la la-capitalize",
// checked:false,
// },],
// }
// },
//     properties: [{
//         name: "Url",
//         key: "href",
//         htmlAttr: "href",
//         inputtype: LinkInput
//     },
//    {
//         name: "Target",
//         key: "target",
//         htmlAttr: "target",
//         inputtype: TextInput
//     },
{
name: "Font Color",
key: "color",
col: 12,
inline: true,
child: "a",
htmlAttr: "style",
inputtype: ColorInput,
},
{
name: "Button Fill Color",
key: "background-color",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
child: "a",
htmlAttr: "style",
inputtype: ColorInput,
},
// {
// name: "Opacity",
// key: "Opacity",
// htmlAttr: "style",
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// inputtype: SelectInput,
// data: {
//     options: [{
//         value: "0",
//         text: "0"
//     }, {
//         value: "0.1",
//         text: "0.1"
//     }, {
//         value: "0.2",
//         text: "0.2"
//     }, {
//         value: "0.3",
//         text: "0.3"
//     },
//     {
//     value: "0.4",
//     text: "0.4"
//     }, {
//         value: "0.5",
//         text: "0.5"
//     }, {
//         value: "0.6",
//         text: "0.6"
//     }, {
//         value: "0.7",
//         text: "0.7"
//     },{
//         value: "0.8",
//         text: "0.8"
//     },
//     {
//         value: "0.9",
//         text: "0.9"
//     },{
//         value: "1",
//         text: "1.0"
//     }],
// },
// },
{
name: "Button Width",
key: "width",
htmlAttr: "style",
child: "a",
//  sort: base_sort++,
//  section: style_section,
col: 12,
inline: true,
parent: "",
inputtype: RangeInput,
data: {
value: 1,
max: 100,
min: 1,
step: 1
},
},
{
name: "Button Style",
key: "border-radius",
htmlAttr: "style",
child: "a",
//  sort: base_sort++,
//  section: style_section,
col: 12,
inline: true,
//parent:"",
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "0px",
text: "Square"
}, {
value: "50%",
text: "Round"
},
{
value: "6px",
text: "Round Corners"
},],
},
},
{
name: "Button shadow",
key: "box-shadow",
child: "a",
htmlAttr: "style",
//  sort: base_sort++,
//  section: style_section,
col: 12,
inline: true,
parent: "",
inputtype: SelectInput,
data: {
options: [{
value: "none",
text: "Default"
}, {
value: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
text: "Soft"
}, {
value: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)",
text: "Medium"
}, {
value: "0 16px 32px 0 rgba(0, 0, 0, 0.2), 0 24px 80px 0 rgba(0, 0, 0, 0.19)",
text: "Hard"
}],
},
},
// {
// name: "Button Action",
// key: "href",
// col:12,
// inline:true,
// htmlAttr: "href",
// //inputtype: LinkInput
// inputtype:SelectInput,
// data:{
//     options: [{
//         value: "",
//         text: "Default"
//     }, {
//         value: "Submit Form",
//         text: "Submit Form"
//     }, {
//         value: "Website Url",
//         text: "Website Url"
//     }, {
//         value: "Next Funnel Step",
//         text: "Next Funnel Step"
//     }],
// },
// }
]
});
Vvveb.Components.extend("_base", "html/tablerow", {
nodes: ["tr"],
name: "Table Row",
html: "<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",
properties: [{
name: "Type",
key: "type",
htmlAttr: "class",
inputtype: SelectInput,
validValues: ["", "success", "danger", "warning", "active"],
data: {
options: [{
value: "",
text: "Default"
}, {
value: "success",
text: "Success"
}, {
value: "error",
text: "Error"
}, {
value: "warning",
text: "Warning"
}, {
value: "active",
text: "Active"
}]
}
}]
});
Vvveb.Components.extend("_base", "html/tablecell", {
nodes: ["td"],
name: "Table Cell",
html: "<td>Cell</td>"
});
Vvveb.Components.extend("_base", "html/tableheadercell", {
nodes: ["th"],
name: "Table Header Cell",
html: "<th>Head</th>"
});
Vvveb.Components.extend("_base", "html/tablehead", {
nodes: ["thead"],
name: "Table Head",
html: "<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",
properties: [{
name: "Type",
key: "type",
htmlAttr: "class",
inputtype: SelectInput,
validValues: ["", "success", "danger", "warning", "info"],
data: {
options: [{
value: "",
text: "Default"
}, {
value: "success",
text: "Success"
}, {
value: "anger",
text: "Error"
}, {
value: "warning",
text: "Warning"
}, {
value: "info",
text: "Info"
}]
}
}]
});
Vvveb.Components.extend("_base", "html/tablebody", {
nodes: ["tbody"],
name: "Table Body",
html: "<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"
});




Vvveb.Components.add("html/gridcolumn", {
name: "4 Column",
image: "icons/grid_row.svg",
classesRegex: ["col-"],
html: '<div class="col-sm-3"><h3>col-sm-3</h3></div>',
properties: [{
name: "Column",
key: "column",
inputtype: GridInput,
data: { hide_remove: true },

beforeInit: function (node) {
_class = $(node).attr("class");

var reg = /col-([^-\$ ]*)?-?(\d+)/g;
var match;

while ((match = reg.exec(_class)) != null) {
this.data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
}
},

onChange: function (node, value, input) {
var _class = node.attr("class");

//remove previous breakpoint column size
_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
//add new column size
if (value) _class += ' ' + input.name + '-' + value;
node.attr("class", _class);

return node;
},
}]
});
Vvveb.Components.add("html/gridrow", {
name: "4 Column",
image: "icons/4Columns.svg",
classes: ["row"],
html: '<div class="container text-center" data-type="builder_container" style="margin-left:auto;margin-right:auto; max-width:75rem; color:#fff;padding:1%; margin-top:1%;"><div class="row"><div class="col-lg-3" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-3" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-3" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-3" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div></div></div>',
children: [{
name: "html/gridcolumn",
classesRegex: ["col-"],
}],
beforeInit: function (node) {
properties = [];
var i = 0;
var j = 0;

$(node).find('[class*="col-"]').each(function () {
_class = $(this).attr("class");

var reg = /col-([^-\$ ]*)?-?(\d+)/g;
var match;
var data = {};

while ((match = reg.exec(_class)) != null) {
data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
}

i++;
properties.push({
name: "Column " + i,
key: "column" + i,
//index: i - 1,
columnNode: this,
col: 12,
inline: true,
inputtype: GridInput,
data: data,
onChange: function (node, value, input) {

//column = $('[class*="col-"]:eq(' + this.index + ')', node);
var column = $(this.columnNode);

//if remove button is clicked remove column and render row properties
if (input.nodeName == 'BUTTON') {
column.remove();
Vvveb.Components.render("html/gridrow");
return node;
}

//if select input then change column class
_class = column.attr("class");

//remove previous breakpoint column size
_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
//add new column size
if (value) _class += ' ' + input.name + '-' + value;
column.attr("class", _class);

//console.log(this, node, value, input, input.name);

return node;
},
});
});

//remove all column properties
this.properties = this.properties.filter(function (item) {
return item.key.indexOf("column") === -1;
});

//add remaining properties to generated column properties
properties.push(this.properties[0]);

this.properties = properties;
return node;
},

properties: [{
name: "Column",
key: "column1",
inputtype: GridInput
}, {
name: "Column",
key: "column1",
inline: true,
col: 12,
inputtype: GridInput
}, {
name: "",
key: "addChild",
inputtype: ButtonInput,
data: { text: "Add column", icon: "la la-plus" },
onChange: function (node) {
$(node).append('<div class="col-4">Col-4</div>');

//render component properties again to include the new column inputs
Vvveb.Components.render("html/gridrow");

return node;
}
}]
});


Vvveb.Components.extend("_base", "html/gridrow1", {
classes: ["container", "container-fluid"],
name: "1 Column",
image: "icons/1Column.svg",
html: '<div class="container text-center" data-type="builder_container" style="margin-left:auto;margin-right:auto; max-width:75rem; color:#fff;padding:3%;margin-top:1%;"><div class="row"><div class="col-lg-12" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div></div></div>',
//name: "Container Settings",
properties: [
// {
// name: "Type",
// key: "type",
// htmlAttr: "class",
// inputtype: SelectInput,
// //validValues: ["container", "container-fluid"],
// // data: {
// //     options: [{
// //         value: "container",
// //         text: "Default"
// //     }, {
// //         value: "container-fluid",
// //         text: "Fluid"
// //     }]
// // }
// },
// {
// name: "Background",
// key: "background",
// htmlAttr: "class",
// validValues: bgcolorClasses,
// inputtype: SelectInput,
// data: {
//     options: bgcolorSelectOptions
// }
// },
{
name: "Container Width",
key: "width",
htmlAttr: "style",
//  sort: base_sort++,
//  section: style_section,
col: 12,
inline: true,
parent: "",
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "10%",
text: "10%"
}, {
value: "15%",
text: "15%"
}, {
value: "20%",
text: "20%"
}, {
value: "25%",
text: "25%"
}, {
value: "30%",
text: "30%"
}, {
value: "35%",
text: "35%"
}, {
value: "40%",
text: "40%"
}, {
value: "45%",
text: "45%"
}, {
value: "50%",
text: "50%"
},
{
value: "55%",
text: "55%"
}, {
value: "60%",
text: "65%"
}, {
value: "70%",
text: "70%"
}, {
value: "75%",
text: "75%"
}, {
value: "80%",
text: "80%"
}, {
value: "85%",
text: "85%"
}, {
value: "90%",
text: "95%"
},
{
value: "100%",
text: "100%"
}],
},
},

{
    name: "Shadow",
    key: "box-shadow",
    htmlAttr: "class",
    // sort: base_sort++,
    // section: style_section,
    col: 12,
    inline: true,
    parent: "",
    inputtype: SelectInput,
    data: {
    options: [{
    value: "none",
    text: "Default"
    }, {
    value: "soft",
    //value: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    text: "Soft"
    }, {
    value: "Medium",
    text: "Medium"
    }, {
    value: "Hard",
    text: "Hard"
    }],
    },
    },
{
name: "Background Image",
key: "Image",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
htmlAttr: "style",
inputtype: ImageInput,
init: function (node) {
var image = $(node).css("background-image").replace(/^url\(['"]?(.+)['"]?\)/, '$1');
return image;
},
onChange: function (node, value) {
$(node).css('background-image', 'url(' + value + ')');
return node;
}
},
{
name: "Background Size",
key: "background-size",
col: 12,
inline: true,
// sort: base_sort++,
// section: style_section,
htmlAttr: "style",
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Actual Size"
}, {
value: "contain",
text: "Repeat"
}, {
value: "cover",
text: "Stretch To Fit"
}],
}
},
{
name: "Background Color",
key: "background-color",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
htmlAttr: "style",
inputtype: ColorInput,
},
// {
// name: "Opacity",
// key: "Opacity",
// htmlAttr: "style",
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// inputtype: SelectInput,
// data: {
// options: [{
//     value: "0",
//     text: "0"
// }, {
//     value: "0.1",
//     text: "0.1"
// }, {
//     value: "0.2",
//     text: "0.2"
// }, {
//     value: "0.3",
//     text: "0.3"
// },
// {
// value: "0.4",
// text: "0.4"
// }, {
//     value: "0.5",
//     text: "0.5"
// }, {
//     value: "0.6",
//     text: "0.6"
// }, {
//     value: "0.7",
//     text: "0.7"
// },{
//     value: "0.8",
//     text: "0.8"
// },
// {
//     value: "0.9",
//     text: "0.9"
// },{
//     value: "1",
//     text: "1.0"
// }],
// },
// },

{
name: "Opacity",
key: "opacity",
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
parent: "",
inputtype: RangeInput,
data: {
max: 1, //max zoom level
min: 0,
step: 0.1
},
},
// {
// name: "Padding Top",
// key: "padding-top",
// htmlAttr: "style",
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// inputtype: RangeInput,
// data:{
// value: 1,
// max:40, 
// min:1,
// step:1
// },
//},
// {
// name: "Padding Bottom",
// key: "padding-bottom",
// htmlAttr: "style",
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// inputtype: RangeInput,
// data:{
// value: 1,
// max:40, 
// min:1,
// step:1
// },
// }

],
});
// Vvveb.Components.add("html/gridrow1", {
//     name: "1 Column",
//     image: "icons/grid_row.svg",
//     classes: ["row"],
//     html: '<div class="text-center" data-type="builder_container" style="margin-left:auto;margin-right:auto; max-width:75rem;color:#fff; padding:10px;"><div class="row"><div class="col-lg-12"><h2 class="plusBtn" data-type="add_element">+</h2></div></div></div>',
//     children :[{
// 		name: "html/gridcolumn1",
// 		classesRegex: ["col-"],
// 	}],
// 	beforeInit: function (node)
// 	{
// 		properties = [];
// 		var i = 0;
// 		var j = 0;

// 		$(node).find('[class*="col-"]').each(function() {
// 			_class = $(this).attr("class");

// 			var reg = /col-([^-\$ ]*)?-?(\d+)/g; 
// 			var match;
// 			var data = {};

// 			while ((match = reg.exec(_class)) != null) {
// 				data["col" + ((match[1] != undefined)?"_" + match[1]:"")] = match[2];
// 			}

// 			i++;
// 			properties.push({
// 				name: "Column " + i,
// 				key: "column" + i,
// 				//index: i - 1,
// 				columnNode: this,
// 				col:12,
// 				inline:true,
// 				inputtype: GridInput,
// 				data: data,
// 				onChange: function(node, value, input) {

// 					//column = $('[class*="col-"]:eq(' + this.index + ')', node);
// 					var column = $(this.columnNode);

// 					//if remove button is clicked remove column and render row properties
// 					if (input.nodeName == 'BUTTON')
// 					{
// 						column.remove();
// 						Vvveb.Components.render("html/gridrow1");
// 						return node;
// 					}

// 					//if select input then change column class
// 					_class = column.attr("class");

// 					//remove previous breakpoint column size
// 					_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
// 					//add new column size
// 					if (value) _class +=  ' ' + input.name + '-' + value;
// 					column.attr("class", _class);

// 					//console.log(this, node, value, input, input.name);

// 					return node;
// 				},	
// 			});
// 		});

// 		//remove all column properties
// 		this.properties = this.properties.filter(function(item) {
// 			return item.key.indexOf("column") === -1;
// 		});

// 		//add remaining properties to generated column properties
// 		properties.push(this.properties[0]);

// 		this.properties = properties;
// 		return node;
// 	},  
//     properties: [{
//         name: "Column",
//         key: "column1",
//         inputtype: GridInput
// 	}, {
//         name: "Column",
//         key: "column1",
//         inline:true,
//         col:12,
//         inputtype: GridInput
// 	}, {
//         name: "",
//         key: "addChild",
//         inputtype: ButtonInput,
//         data: {text:"Add column", icon:"la la-plus"},
//         onChange: function(node)
//         {
// 			 $(node).append('<div class="col-12">Col-12</div>');

// 			 //render component properties again to include the new column inputs
// 			 Vvveb.Components.render("html/gridrow1");

// 			 return node;
// 		}
// 	}]
// });
Vvveb.Components.add("html/gridrow2", {
name: "2 Column",
image: "icons/2Columns.svg",
classes: ["row"],
html: '<div class="container text-center" data-type="builder_container" style="margin-left:auto;margin-right:auto; max-width:75rem; color:#fff;padding:3%;margin-top:1%;"><div class="row"><div class="col-lg-6" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-6" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div></div></div>',
children: [{
name: "html/gridcolumn2",
classesRegex: ["col-"],
}],
beforeInit: function (node) {
properties = [];
var i = 0;
var j = 0;

$(node).find('[class*="col-"]').each(function () {
_class = $(this).attr("class");

var reg = /col-([^-\$ ]*)?-?(\d+)/g;
var match;
var data = {};

while ((match = reg.exec(_class)) != null) {
data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
}

i++;
properties.push({
name: "Column " + i,
key: "column" + i,
//index: i - 1,
columnNode: this,
col: 12,
inline: true,
inputtype: GridInput,
data: data,
onChange: function (node, value, input) {

//column = $('[class*="col-"]:eq(' + this.index + ')', node);
var column = $(this.columnNode);

//if remove button is clicked remove column and render row properties
if (input.nodeName == 'BUTTON') {
column.remove();
Vvveb.Components.render("html/gridrow2");
return node;
}

//if select input then change column class
_class = column.attr("class");

//remove previous breakpoint column size
_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
//add new column size
if (value) _class += ' ' + input.name + '-' + value;
column.attr("class", _class);

//console.log(this, node, value, input, input.name);

return node;
},
});
});

//remove all column properties
this.properties = this.properties.filter(function (item) {
return item.key.indexOf("column") === -1;
});

//add remaining properties to generated column properties
properties.push(this.properties[0]);

this.properties = properties;
return node;
},

properties: [{
name: "Column",
key: "column1",
inputtype: GridInput
}, {
name: "Column",
key: "column1",
inline: true,
col: 12,
inputtype: GridInput
}, {
name: "",
key: "addChild",
inputtype: ButtonInput,
data: { text: "Add column", icon: "la la-plus" },
onChange: function (node) {
$(node).append('<div class="col-6">Col-6</div>');

//render component properties again to include the new column inputs
Vvveb.Components.render("html/gridrow2");

return node;
}
}]
});
Vvveb.Components.add("html/gridrow3", {
name: "3 Column",
image: "icons/3Columns.svg",
classes: ["row"],
html: '<div class="container text-center" data-type="builder_container" style="margin-left:auto;margin-right:auto; max-width:75rem; color:#fff;padding:3%;margin-top:1%;"><div class="row"><div class="col-lg-4" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-4" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-4" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div></div></div>',
children: [{
name: "html/gridcolumn3",
classesRegex: ["col-"],
}],
beforeInit: function (node) {
properties = [];
var i = 0;
var j = 0;

$(node).find('[class*="col-"]').each(function () {
_class = $(this).attr("class");

var reg = /col-([^-\$ ]*)?-?(\d+)/g;
var match;
var data = {};

while ((match = reg.exec(_class)) != null) {
data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
}

i++;
properties.push({
name: "Column " + i,
key: "column" + i,
//index: i - 1,
columnNode: this,
col: 12,
inline: true,
inputtype: GridInput,
data: data,
onChange: function (node, value, input) {

//column = $('[class*="col-"]:eq(' + this.index + ')', node);
var column = $(this.columnNode);

//if remove button is clicked remove column and render row properties
if (input.nodeName == 'BUTTON') {
column.remove();
Vvveb.Components.render("html/gridrow3");
return node;
}

//if select input then change column class
_class = column.attr("class");

//remove previous breakpoint column size
_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
//add new column size
if (value) _class += ' ' + input.name + '-' + value;
column.attr("class", _class);

//console.log(this, node, value, input, input.name);

return node;
},
});
});

//remove all column properties
this.properties = this.properties.filter(function (item) {
return item.key.indexOf("column") === -1;
});

//add remaining properties to generated column properties
properties.push(this.properties[0]);

this.properties = properties;
return node;
},

properties: [{
name: "Column",
key: "column1",
inputtype: GridInput
}, {
name: "Column",
key: "column1",
inline: true,
col: 12,
inputtype: GridInput
}, {
name: "",
key: "addChild",
inputtype: ButtonInput,
data: { text: "Add column", icon: "la la-plus" },
onChange: function (node) {
$(node).append('<div class="col-4">Col-4</div>');

//render component properties again to include the new column inputs
Vvveb.Components.render("html/gridrow3");

return node;
}
}]
});

Vvveb.Components.add("html/gridrow4", {
name: "5 Column",
image: "icons/5Columns.svg",
classes: ["row"],
html: '<div class="container text-center" data-type="builder_container" style="margin-left:auto;margin-right:auto; max-width:75rem; color:#fff;padding:3%; margin-top:1%;"><div class="row"><div class="col" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+ </h2></div><div class="col" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h3></div><div class="col" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+ </h2></div></div></div>',
children: [{
name: "html/gridcolumn4",
classesRegex: ["col-"],
}],
beforeInit: function (node) {
properties = [];
var i = 0;
var j = 0;

$(node).find('[class*="col-"]').each(function () {
_class = $(this).attr("class");

var reg = /col-([^-\$ ]*)?-?(\d+)/g;
var match;
var data = {};

while ((match = reg.exec(_class)) != null) {
data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
}

i++;
properties.push({
name: "Column " + i,
key: "column" + i,
//index: i - 1,
columnNode: this,
col: 12,
inline: true,
inputtype: GridInput,
data: data,
onChange: function (node, value, input) {

//column = $('[class*="col-"]:eq(' + this.index + ')', node);
var column = $(this.columnNode);

//if remove button is clicked remove column and render row properties
if (input.nodeName == 'BUTTON') {
column.remove();
Vvveb.Components.render("html/gridrow4");
return node;
}

//if select input then change column class
_class = column.attr("class");

//remove previous breakpoint column size
_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
//add new column size
if (value) _class += ' ' + input.name + '-' + value;
column.attr("class", _class);

//console.log(this, node, value, input, input.name);

return node;
},
});
});

//remove all column properties
this.properties = this.properties.filter(function (item) {
return item.key.indexOf("column") === -1;
});

//add remaining properties to generated column properties
properties.push(this.properties[0]);

this.properties = properties;
return node;
},

properties: [{
name: "Column",
key: "column1",
inputtype: GridInput
}, {
name: "Column",
key: "column1",
inline: true,
col: 12,
inputtype: GridInput
}, {
name: "",
key: "addChild",
inputtype: ButtonInput,
data: { text: "Add column", icon: "la la-plus" },
onChange: function (node) {
$(node).append('<div class="col-2">Col-2</div>');

//render component properties again to include the new column inputs
Vvveb.Components.render("html/gridrow4");

return node;
}
}]
});
Vvveb.Components.add("html/gridrow5", {
name: "6 Column",
image: "icons/6Columns.svg",
classes: ["row"],
html: '<div class="container text-center" data-type="builder_container" style="margin-left:auto;margin-right:auto; max-width:75rem; color:#fff;padding:3%; margin-top:1%;"><div class="row"><div class="col-lg-2" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-2" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+ </h2></div><div class="col-lg-2" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-2" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-2" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div><div class="col-lg-2" data-type="add_gridrow"><h2 class="plusBtn" data-type="add_element">+</h2></div></div></div>',
children: [{
name: "html/gridcolumn5",
classesRegex: ["col-"],
}],
beforeInit: function (node) {
properties = [];
var i = 0;
var j = 0;

$(node).find('[class*="col-"]').each(function () {
_class = $(this).attr("class");

var reg = /col-([^-\$ ]*)?-?(\d+)/g;
var match;
var data = {};

while ((match = reg.exec(_class)) != null) {
data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
}

i++;
properties.push({
name: "Column " + i,
key: "column" + i,
//index: i - 1,
columnNode: this,
col: 12,
inline: true,
inputtype: GridInput,
data: data,
onChange: function (node, value, input) {

//column = $('[class*="col-"]:eq(' + this.index + ')', node);
var column = $(this.columnNode);

//if remove button is clicked remove column and render row properties
if (input.nodeName == 'BUTTON') {
column.remove();
Vvveb.Components.render("html/gridrow5");
return node;
}

//if select input then change column class
_class = column.attr("class");

//remove previous breakpoint column size
_class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
//add new column size
if (value) _class += ' ' + input.name + '-' + value;
column.attr("class", _class);

//console.log(this, node, value, input, input.name);

return node;
},
});
});

//remove all column properties
this.properties = this.properties.filter(function (item) {
return item.key.indexOf("column") === -1;
});

//add remaining properties to generated column properties
properties.push(this.properties[0]);

this.properties = properties;
return node;
},

properties: [{
name: "Column",
key: "column1",
inputtype: GridInput
}, {
name: "Column",
key: "column1",
inline: true,
col: 12,
inputtype: GridInput
}, {
name: "",
key: "addChild",
inputtype: ButtonInput,
data: { text: "Add column", icon: "la la-plus" },
onChange: function (node) {
$(node).append('<div class="col-1">Col-1</div>');

//render component properties again to include the new column inputs
Vvveb.Components.render("html/gridrow5");

return node;
}
}]
});
Vvveb.Components.extend("_base", "html/video", {
nodes: ["iframe"],
name: "Video",
// html: '<iframe data-sub-type="sub_element" data-type="builder_element" loop autoplay  style="width:250px; border-radius:10px;padding:0%;border: none;margin-left:auto;margin-right:auto;" src= "https://player.vimeo.com/video/169550755" autoplay="1"></iframe>',
html: '<iframe data-sub-type="sub_element" data-type="builder_element" width="100%"  height=auto src="https://www.youtube-nocookie.com/embed/iYEr6zxSZAI?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=0" frameborder="0" allowfullscreen style="border-style:solid;margin-top:5px;margin-bottom:5px;border-radius:10px; width: 75%; height: 464.94px;"></iframe>',
// html:'<div data-type="builder_element" style="padding-top:2%; padding-bottom:2%;margin:0 auto;margin-top:2.5%;margin-bottom:2.5%;"><iframe loop autoplay  style="padding:0%;border: none;margin-left:auto;margin-right:auto;" src= "https://player.vimeo.com/video/169550755" autoplay="1" frameborder="0" allowfullscreen></iframe> </div>',
//dragHtml: '<img  width="320" height="240" src="' + Vvveb.baseUrl + 'icons/video.svg">',
image: "icons/video.svg",
properties: [{
name: "Video URL",
//child: "source",
key: "src",
//child:"iframe",    
col: 12,
inline: true,
htmlAttr: "src",
inputtype: LinkInput
},
// {
// name: "Border",
// key: "border",
// col:12,
// //child:"iframe",   
// inline:true,
// htmlAttr: "style",
// //validValues: ["", "form-search", "form-inline", "form-horizontal"],
// inputtype: SelectInput,
// data: {
// options: [{
// value: "none",
// text: "Default"
// },  
// {
// value: "2px solid black",
// text: "Black Border"
// }, {
// value: "2px solid blue",
// text: "Blue Border"
// },
// {
// value: "2px solid white",
// text: "White Border"
// },{
// value: "2px solid red",
// text: "Red Border"
// }]
// }
// },
{
name: "Border Corner",
key: "border-radius",
//child:"iframe",    
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "None"
}, {
value: "0px",
text: "Square"
}, {
value: "10px",
text: "Rounded"
}]
}
},
{
name: "Border Shadow",
key: "box-shadow",
htmlAttr: "class",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
//child:"iframe",
inputtype: SelectInput,
data: {
options: [{
value: "none",
text: "Default"
}, {
value: "soft",
text: "Soft"
}, {
value: "Medium",
text: "Medium"
}, {
value: "Hard",
text: "Hard"
}],
},
},
{
name: "Auto Play",
key: "autoplay",
//child:"iframe",    
htmlAttr: "autoplay",
inputtype: CheckboxInput
},
{
name: "Border Color",
key: "border-color",
// sort: base_sort++,
// section: style_section,
col: 6,
inline: true,
htmlAttr: "style",
inputtype: ColorInput,
},
{
name: "Size",
key: "border-width",
htmlAttr: "style",
//child:"iframe",    
// sort: base_sort++,
// section: style_section,
col: 6,
inline: true,
inputtype: SelectInput,
data: {
options: [{
value: "",
text: "Default"
}, {
value: "1px",
text: "1px"
}, {
value: "2px",
text: "2px"
}, {
value: "3px",
text: "3px"
}, {
value: "4px",
text: "4px"
}, {
value: "5px",
text: "5px"
}, {
value: "6px",
text: "6px"
}, {
value: "7px",
text: "7px"
}, {
value: "8px",
text: "9px"
}, {
value: "10px",
text: "10px"
}]
}
},

{
name: "Video Size",
key: "width",
htmlAttr: "style",
// sort: base_sort++,
// section: style_section,
col: 12,
inline: true,
inputtype: RangeInput,
data: {
value: 1,
max: 100,
min: 51,
step: 1
}
},


// {
// name: "Padding",
// key: "padding",
// htmlAttr: "style",
// // sort: base_sort++,
// // section: style_section,
// col:12,
// inline:true,
// // parent:"",
// inputtype: RangeInput,
// data:{
//     value: 1,
//     max:40, 
//     min:0,
//     step:1
// },
// }
]
});


// {
//     name: "Margin",
//     key: "margin-top",
//     htmlAttr: "style",
//     sort: base_sort++,
//     section: style_section,
//     col:12,
//     inline:true,
//      parent:"",
//     inputtype: CssUnitInput,
//     data:{
//         max: 40, 
//         min:0,
//         step:1
//    },
// },
// {
//     name: "Text Options",
//     key: "size",
//     inputtype: SelectInput,

//     onChange: function(node, value) {

// 		return changeNodeName(node, "h" + value);
// 	},	

//     init: function(node) {
//         var regex;
//         regex = /H(\d)/.exec(node.nodeName);
//         if (regex && regex[1]) {
//             return regex[1]
//         }
//         return 1
//     },

//     data:{
// 		options: [{
//             value: "1",
//             text: "1"
//         }, {
//             value: "2",
//             text: "2"
//         }, {
//             value: "3",
//             text: "3"
//         }, {
//             value: "4",
//             text: "4"
//         }, {
//             value: "5",
//             text: "5"
//         }, {
//             value: "6",
//             text: "6"
//         }]
//    },

// }

// Vvveb.Components.add("_base", {
//     name: "Element",
// 	properties: [{
//         key: "element_header",
//         inputtype: SectionInput,
//         name:false,
//         sort:base_sort++,
//         data: {header:"General"},
//     } 
//     // {
//     //     name: "Id",
//     //     key: "id",
//     //     htmlAttr: "id",
//     //     sort: base_sort++,
//     //     inline:true,
//     //     col:6,
//     //     inputtype: TextInput
//     // }, {
//     //     name: "Class",
//     //     key: "class",
//     //     htmlAttr: "class",
//     //     sort: base_sort++,
//     //     inline:true,
//     //     col:6,
//     //     inputtype: TextInput
//     // }
//    ]
// });    

// Vvveb.Components.extend("_base", "_base", {
// 	 properties: [
//      {
//         key: "display_header",
//         inputtype: SectionInput,
//         name:false,
//         sort: base_sort++,
// 		section: style_section,
//         data: {header:"Text Options"},
//     },
//     //  {
//     //     name: "Display",
//     //     key: "display",
//     //     htmlAttr: "style",
//     //     sort: base_sort++,
// 	// 	section: style_section,
//     //     col:6,
// 	// 	inline:true,
//     //     inputtype: SelectInput,
//     //     validValues: ["block", "inline", "inline-block", "none"],
//     //     data: {
//     //         options: [{
//     //             value: "block",
//     //             text: "Block"
//     //         }, {
//     //             value: "inline",
//     //             text: "Inline"
//     //         }, {
//     //             value: "inline-block",
//     //             text: "Inline Block"
//     //         }, {
//     //             value: "none",
//     //             text: "none"
//     //         }]
//     //     }
//     // },
//     //  {
//     //     name: "Position",
//     //     key: "position",
//     //     htmlAttr: "style",
//     //     sort: base_sort++,
// 	// 	section: style_section,
//     //     col:6,
// 	// 	inline:true,
//     //     inputtype: SelectInput,
//     //     validValues: ["static", "fixed", "relative", "absolute"],
//     //     data: {
//     //         options: [{
//     //             value: "static",
//     //             text: "Static"
//     //         }, {
//     //             value: "fixed",
//     //             text: "Fixed"
//     //         }, {
//     //             value: "relative",
//     //             text: "Relative"
//     //         }, {
//     //             value: "absolute",
//     //             text: "Absolute"
//     //         }]
//     //     }
//     // }, {
//     //     name: "Top",
//     //     key: "top",
// 	// 	htmlAttr: "style",
//     //     sort: base_sort++,
// 	// 	section: style_section,
//     //     col:6,
// 	// 	inline:true,
//     //     parent:"",
//     //     inputtype: CssUnitInput
// 	// }, {
//     //     name: "Left",
//     //     key: "left",
// 	// 	htmlAttr: "style",
//     //     sort: base_sort++,
// 	// 	section: style_section,
//     //     col:6,
// 	// 	inline:true,
//     //     parent:"",
//     //     inputtype: CssUnitInput
//     // }, {
//     //     name: "Bottom",
//     //     key: "bottom",
// 	// 	htmlAttr: "style",
//     //     sort: base_sort++,
// 	// 	section: style_section,
//     //     col:6,
// 	// 	inline:true,
//     //     parent:"",
//     //     inputtype: CssUnitInput
// 	// }, {
//     //     name: "Right",
//     //     key: "right",
// 	// 	htmlAttr: "style",
//     //     sort: base_sort++,
// 	// 	section: style_section,
//     //     col:6,
// 	// 	inline:true,
//     //     parent:"",
//     //     inputtype: CssUnitInput
//     // },{
//     //     name: "Float",
//     //     key: "float",
//     //     htmlAttr: "style",
//     //     sort: base_sort++,
// 	// 	section: style_section,
//     //     col:12,
//     //     inline:true,
//     //     inputtype: RadioButtonInput,
//     //     data: {
// 	// 		extraclass:"btn-group-sm btn-group-fullwidth",
//     //         options: [{
//     //             value: "none",
//     //             icon:"la la-close",
//     //             //text: "None",
//     //             title: "None",
//     //             checked:true,
//     //         }, {
//     //             value: "left",
//     //             //text: "Left",
//     //             title: "Left",
//     //             icon:"la la-align-left",
//     //             checked:false,
//     //         }, {
//     //             value: "right",
//     //             //text: "Right",
//     //             title: "Right",
//     //             icon:"la la-align-right",
//     //             checked:false,
//     //         }],
//     //      }
//     // },

//     {
//         //name: "Font family",
//         key: "font-family",
//     	htmlAttr: "style",
//         sort: base_sort++,
//     	section: style_section,
//         col:12,
//     	inline:true,
//         inputtype: SelectInput,
//         data: {
//     		options: [{
//     			value: "",
//     			text: "Default"
//     		}, {
//     			value: "Arial, Helvetica, sans-serif",
//     			text: "Arial"
//     		}, {
//     			value: 'Lucida Sans Unicode", "Lucida Grande", sans-serif',
//     			text: 'Lucida Grande'
//     		}, {
//     			value: 'Palatino Linotype", "Book Antiqua", Palatino, serif',
//     			text: 'Palatino Linotype'
//     		}, {
//     			value: '"Times New Roman", Times, serif',
//     			text: 'Times New Roman'
//     		}, {
//     			value: "Georgia, serif",
//     			text: "Georgia, serif"
//     		}, {
//     			value: "Tahoma, Geneva, sans-serif",
//     			text: "Tahoma"
//     		}, {
//     			value: 'Comic Sans MS, cursive, sans-serif',
//     			text: 'Comic Sans'
//     		}, {
//     			value: 'Verdana, Geneva, sans-serif',
//     			text: 'Verdana'
//     		}, {
//     			value: 'Impact, Charcoal, sans-serif',
//     			text: 'Impact'
//     		}, {
//     			value: 'Arial Black, Gadget, sans-serif',
//     			text: 'Arial Black'
//     		}, {
//     			value: 'Trebuchet MS, Helvetica, sans-serif',
//     			text: 'Trebuchet'
//     		}, {
//     			value: 'Courier New", Courier, monospace',
//     			text: 'Courier New", Courier, monospace'
//     		}, {
//     			value: 'Brush Script MT, sans-serif',
//     			text: 'Brush Script'
//     		},{
//                 value: "Open Sans",
//                 text: "Open Sans"
//             }]
//         }
//     },
//     {
//         // name: "Font weight",
//          key: "font-size",
//          htmlAttr: "style",
//          sort: base_sort++,
//          section: style_section,
//          col:4,
//          inline:true,
//          inputtype: SelectInput,
//          data: {
//              options: [{
//                  value: "",
//                  text: "Default"
//              }, {	
//                  value: "15px",
//                  text: "15"
//              }, {
//                  value: "16px",
//                  text: "16"
//              }, {
//                  value: "17px",
//                  text: "17"
//              }, {
//                  value: "18px",
//                  text: "18"
//              }, {
//                  value: "19px",
//                  text: "19"
//              }, {
//                  value: "20px",
//                  text: "20"
//              }, {
//                  value: "21px",
//                  text: "21"
//              }, {
//                  value: "22px",
//                  text: "22"
//              }, {
//                  value: "23px",
//                  text: "23"
//              },
//              {
//                 value: "24px",
//                 text: "24"
//             }, {
//                 value: "25px",
//                 text: "25"
//             }, {
//                 value: "26px",
//                 text: "26"
//             }, {
//                 value: "27px",
//                 text: "27"
//             }, {
//                 value: "28px",
//                 text: "28"
//             }, {
//                 value: "29px",
//                 text: "29"
//             }, {
//                 value: "30px",
//                 text: "30"
//             },
//             {
//                 value: "31px",
//                 text: "31"
//             }, {
//                 value: "32px",
//                 text: "32"
//             }, {
//                 value: "33px",
//                 text: "33"
//             }, {
//                 value: "34px",
//                 text: "34"
//             }, {
//                 value: "35px",
//                 text: "35"
//             }, {
//                 value: "36px",
//                 text: "36"
//             }, {
//                 value: "37px",
//                 text: "37"
//             },
//             {
//                 value: "38px",
//                 text: "38"
//             }, {
//                 value: "39px",
//                 text: "39"
//             }, {
//                 value: "40px",
//                 text: "40"
//             }],
//          }
//      },
//      {
//        // name: "Font weight",
//         key: "font-weight",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:8,
// 		inline:true,
//         inputtype: SelectInput,
//         data: {
// 			options: [{
// 				value: "",
// 				text: "Default"
// 			}, {	
// 				value: "100",
// 				text: "Thin"
// 			}, {
// 				value: "200",
// 				text: "Extra-Light"
// 			}, {
// 				value: "300",
// 				text: "Light"
// 			}, {
// 				value: "400",
// 				text: "Normal"
// 			}, {
// 				value: "500",
// 				text: "Medium"
// 			}, {
// 				value: "600",
// 				text: "Semi-Bold"
// 			}, {
// 				value: "700",
// 				text: "Bold"
// 			}, {
// 				value: "800",
// 				text: "Extra-Bold"
// 			}, {
// 				value: "900",
// 				text: "Ultra-Bold"
// 			}],
// 		}
//     },
//     {
//         //name: "Text align",
//         key: "text-align",
//         htmlAttr: "style",
//         sort: base_sort++,
//         section: style_section,
//         col:12,
//         inline:true,
//         inputtype: RadioButtonInput,
//         data: {
//             extraclass:"btn-group-sm btn-group-fullwidth",
//             options: [{
//                 value: "left",
//                 //text: "Left",
//                 title: "Left",
//                 icon:"la la-align-left",
//                 checked:false,
//             }, {
//                 value: "center",
//                 //text: "Center",
//                 title: "Center",
//                 icon:"la la-align-center",
//                 checked:false,
//             }, {
//                 value: "right",
//                 //text: "Right",
//                 title: "Right",
//                 icon:"la la-align-right",
//                 checked:false,
//             }],
//         }
//     },
//  {
//         //name: "Text decoration",
//         key: "text-decoration-line",
//         htmlAttr: "style",
//         sort: base_sort++,
//         section: style_section,
//         col:12,
//         inline:true,
//         inputtype: RadioButtonInput,
//         data: {
//             extraclass:"btn-group-sm btn-group-fullwidth",
//             options: [
//             // {
//             //     value: "none",
//             //     icon:"la la-close",
//             //     //text: "None",
//             //     title: "None",
//             //     checked:true,
//             // }, 

//             {
//                 value: "underline",
//                 //text: "Left",
//                 title: "underline",
//                 icon:"la la-long-arrow-down",
//                 checked:false,
//             }, 
//             // {
//             //     value: "overline",
//             //     //text: "Right",
//             //     title: "overline",
//             //     icon:"la la-long-arrow-up",
//             //     checked:false,
//             // }, 
//             {
//                 value: "line-through",
//                 //text: "Right",
//                 title: "Line Through",
//                 icon:"la la-strikethrough",
//                 checked:false,
//             }
//             //  {

//             //     value: "underline overline",
//             //     //text: "justify",
//             //     title: "Underline Overline",
//             //     icon:"la la-arrows-v",
//             //     checked:false,
//             // }
//         ],
//         },
//     },

// ]
// });   


//  {
//     name: "Section Width",
//     key: "max-width",
//     htmlAttr: "style",
//     sort: base_sort++,
//     section: style_section,
//     col:12,
//     inline:true,
//     inputtype: RangeInput,
//     data:{
//                  max: 160, 
//                  min:100,
//                  step:1
//             },


// data: {
//     options: [{
//         value: "",
//         text: "Default"
//     }, {	
//         value: "160rem",
//         text: "Full Width"
//     }, {
//         value: "103rem",
//         text: "Wide"
//     }, {
//         value: "85rem",
//         text: "Medium"
//     }, {
//         value: "70rem",
//         text: "Small"
//     }],
// }
// }    
//   {
//    name: "Position x",
//    key: "background-position-x",
//    sort: base_sort++,
//    section: style_section,
//    htmlAttr: "style",
//    col:6,
//    inline:true,
//    inputtype: SelectInput,
//    data: {
//        options: [{
//            value: "",
//            text: "Default"
//        }, {	
//            value: "center",
//            text: "center"
//        }, {	
//            value: "right",
//            text: "right"
//        }, {
//            value: "left",
//            text: "left"
//        }],
//    }
//   }, {
//    name: "Position y",
//    key: "background-position-y",
//    sort: base_sort++,
//    section: style_section,
//    htmlAttr: "style",
//    col:6,
//    inline:true,
//    inputtype: SelectInput,
//    data: {
//        options: [{
//            value: "",
//            text: "Default"
//        }, {	
//            value: "center",
//            text: "center"
//        }, {	
//            value: "top",
//            text: "top"
//        }, {
//            value: "bottom",
//            text: "bottom"
//        }],
//    }
// },

// {
//     name: "Color",
//     key: "color",
//     sort: base_sort++,
//     section: style_section,
//     col:4,
//     inline:true,
//     htmlAttr: "style",
//     inputtype: ColorInput,
//   },
// {
//     name: "Opacity",
//     key: "opacity",
//     htmlAttr: "style",
//     sort: base_sort++,
//     section: style_section,
//     col:6,
//     inline:true,
//     parent:"",
//     inputtype: RangeInput,
//     data:{
//         max: 1, //max zoom level
//         min:0,
//         step:0.1
//     },
// },   
// Vvveb.Components.extend("_base", "_base", {
//     properties: [
//     {
//        key: "display_header2",
//        inputtype: SectionInput,
//        name:false,
//        sort: base_sort++,
//        section: style_section,
//        data: {header:"Button Action"},
//    },


//    {
//     // name: "Font weight",
//      key: "button-action",
//      htmlAttr: "style",
//      sort: base_sort++,
//      section: style_section,
//      col:12,
//      inline:true,
//      inputtype: SelectInput,
//      data: {
//          options: [{
//              value: "",
//              text: "Select"
//          }, {	
//              value: "1",
//              text: "Select"

//          },
//          {	
//             value: "2",
//             text: "Select"

//         }
//         ],
//      }
//  }

// //   {
// //     name: "Button Fill Color",
// //     key: "background-color",
// //     sort: base_sort++,
// //     section: style_section,
// //     col:12,
// //     inline:true,
// //     htmlAttr: "style",
// //     inputtype: ColorInput,
// // }

// ]
// });    



// Vvveb.Components.extend("_base", "_base", {
//     properties: [
//     {
//        key: "display_header",
//        inputtype: SectionInput,
//        name:false,
//        sort: base_sort++,
//        section: style_section,
//        data: {header:"Appearence"},
//    },
// {
//     name: "Decoration Color",
//     key: "text-decoration-color",
//     sort: base_sort++,
//     section: style_section,
//     col:6,
//     inline:true,
//     htmlAttr: "style",
//     inputtype: ColorInput,
// }, {
//     name: "Decoration style",
//     key: "text-decoration-style",
//     htmlAttr: "style",
//     sort: base_sort++,
//     section: style_section,
//     col:6,
//     inline:true,
//     inputtype: SelectInput,
//     data: {
//         options: [{
//             value: "",
//             text: "Default"
//         }, {	
//             value: "solid",
//             text: "Solid"
//         }, {
//             value: "wavy",
//             text: "Wavy"
//         }, {
//             value: "dotted",
//             text: "Dotted"
//         }, {
//             value: "dashed",
//             text: "Dashed"
//         }, {
//             value: "double",
//             text: "Double"
//         }],
//     }
// }]
// });


//Typography
// Vvveb.Components.extend("_base", "_base", {
// 	 properties: [
//      {
// 		key: "typography_header",
// 		inputtype: SectionInput,
// 		name:false,
// 		sort: base_sort++,
// 		section: style_section,
// 		data: {header:"Appearance"},
//     }, 
// {
//     name: "Font family",
//     key: "font-family",
// 	htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:6,
// 	inline:true,
//     inputtype: SelectInput,
//     data: {
// 		options: [{
// 			value: "",
// 			text: "Default"
// 		}, {
// 			value: "Arial, Helvetica, sans-serif",
// 			text: "Arial"
// 		}, {
// 			value: 'Lucida Sans Unicode", "Lucida Grande", sans-serif',
// 			text: 'Lucida Grande'
// 		}, {
// 			value: 'Palatino Linotype", "Book Antiqua", Palatino, serif',
// 			text: 'Palatino Linotype'
// 		}, {
// 			value: '"Times New Roman", Times, serif',
// 			text: 'Times New Roman'
// 		}, {
// 			value: "Georgia, serif",
// 			text: "Georgia, serif"
// 		}, {
// 			value: "Tahoma, Geneva, sans-serif",
// 			text: "Tahoma"
// 		}, {
// 			value: 'Comic Sans MS, cursive, sans-serif',
// 			text: 'Comic Sans'
// 		}, {
// 			value: 'Verdana, Geneva, sans-serif',
// 			text: 'Verdana'
// 		}, {
// 			value: 'Impact, Charcoal, sans-serif',
// 			text: 'Impact'
// 		}, {
// 			value: 'Arial Black, Gadget, sans-serif',
// 			text: 'Arial Black'
// 		}, {
// 			value: 'Trebuchet MS, Helvetica, sans-serif',
// 			text: 'Trebuchet'
// 		}, {
// 			value: 'Courier New", Courier, monospace',
// 			text: 'Courier New", Courier, monospace'
// 		}, {
// 			value: 'Brush Script MT, sans-serif',
// 			text: 'Brush Script'
// 		}]
// 	}
// }, 
// {
//     name: "Font weight",
//     key: "font-weight",
// 	htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:6,
// 	inline:true,
//     inputtype: SelectInput,
//     data: {
// 		options: [{
// 			value: "",
// 			text: "Default"
// 		}, {	
// 			value: "100",
// 			text: "Thin"
// 		}, {
// 			value: "200",
// 			text: "Extra-Light"
// 		}, {
// 			value: "300",
// 			text: "Light"
// 		}, {
// 			value: "400",
// 			text: "Normal"
// 		}, {
// 			value: "500",
// 			text: "Medium"
// 		}, {
// 			value: "600",
// 			text: "Semi-Bold"
// 		}, {
// 			value: "700",
// 			text: "Bold"
// 		}, {
// 			value: "800",
// 			text: "Extra-Bold"
// 		}, {
// 			value: "900",
// 			text: "Ultra-Bold"
// 		}],
// 	}
// }, {
//     name: "Text align",
//     key: "text-align",
//     htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:12,
//     inline:true,
//     inputtype: RadioButtonInput,
//     data: {
// 		extraclass:"btn-group-sm btn-group-fullwidth",
//         options: [{
//             value: "none",
//             icon:"la la-close",
//             //text: "None",
//             title: "None",
//             checked:true,
//         }, {
//             value: "left",
//             //text: "Left",
//             title: "Left",
//             icon:"la la-align-left",
//             checked:false,
//         }, {
//             value: "center",
//             //text: "Center",
//             title: "Center",
//             icon:"la la-align-center",
//             checked:false,
//         }, {
//             value: "right",
//             //text: "Right",
//             title: "Right",
//             icon:"la la-align-right",
//             checked:false,
//         }, {
//             value: "justify",
//             //text: "justify",
//             title: "Justify",
//             icon:"la la-align-justify",
//             checked:false,
//         }],
//     },
// }, {
//     name: "Line height",
//     key: "line-height",
// 	htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:6,
// 	inline:true,
//     inputtype: CssUnitInput
// }, {
//     name: "Letter spacing",
//     key: "letter-spacing",
// 	htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:6,
// 	inline:true,
//     inputtype: CssUnitInput
// }, {
//     name: "Text decoration",
//     key: "text-decoration-line",
//     htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:12,
//     inline:true,
//     inputtype: RadioButtonInput,
//     data: {
// 		extraclass:"btn-group-sm btn-group-fullwidth",
//         options: [{
//             value: "none",
//             icon:"la la-close",
//             //text: "None",
//             title: "None",
//             checked:true,
//         }, {
//             value: "underline",
//             //text: "Left",
//             title: "underline",
//             icon:"la la-long-arrow-down",
//             checked:false,
//         }, {
//             value: "overline",
//             //text: "Right",
//             title: "overline",
//             icon:"la la-long-arrow-up",
//             checked:false,
//         }, {
//             value: "line-through",
//             //text: "Right",
//             title: "Line Through",
//             icon:"la la-strikethrough",
//             checked:false,
//         }, {
//             value: "underline overline",
//             //text: "justify",
//             title: "Underline Overline",
//             icon:"la la-arrows-v",
//             checked:false,
//         }],
//     },
// },

//     {
//         name: "Decoration Color",
//         key: "text-decoration-color",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
// 		htmlAttr: "style",
//         inputtype: ColorInput,
// 	}, {
//         name: "Decoration style",
//         key: "text-decoration-style",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: SelectInput,
//         data: {
// 			options: [{
// 				value: "",
// 				text: "Default"
// 			}, {	
// 				value: "solid",
// 				text: "Solid"
// 			}, {
// 				value: "wavy",
// 				text: "Wavy"
// 			}, {
// 				value: "dotted",
// 				text: "Dotted"
// 			}, {
// 				value: "dashed",
// 				text: "Dashed"
// 			}, {
// 				value: "double",
// 				text: "Double"
// 			}],
// 		}
//   }]
// })

//Size
// Vvveb.Components.extend("_base", "_base", {
// 	 properties: [{
// 		key: "size_header",
// 		inputtype: SectionInput,
// 		name:false,
// 		sort: base_sort++,
// 		section: style_section,
// 		data: {header:"Size", expanded:false},
// 	}, {
//         name: "Width",
//         key: "width",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
// 	}, {
//         name: "Height",
//         key: "height",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
// 	}, {
//         name: "Min Width",
//         key: "min-width",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
// 	}, {
//         name: "Min Height",
//         key: "min-height",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
// 	}, {
//         name: "Max Width",
//         key: "max-width",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
// 	}, {
//         name: "Max Height",
//         key: "max-height",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
//     }]
// });
// {
//     name: "Top",
//     key: "padding-top",
// 	htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:6,
// 	inline:true,
//     inputtype: CssUnitInput
// }, {
//     name: "Right",
//     key: "padding-right",
// 	htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:6,
// 	inline:true,
//     inputtype: CssUnitInput
// }, {
//     name: "Bottom",
//     key: "padding-bottom",
// 	htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:6,
// 	inline:true,
//     inputtype: CssUnitInput
// }, {
//     name: "Left",
//     key: "padding-left",
// 	htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:6,
// 	inline:true,
//     inputtype: CssUnitInput
// }
//Border
// Vvveb.Components.extend("_base", "_base", {
// 	 properties: [{
// 		key: "border_header",
// 		inputtype: SectionInput,
// 		name:false,
// 		sort: base_sort++,
// 		section: style_section,
// 		data: {header:"Border", expanded:false},
//      }, 
//  {        
//     name: "Style",
//     key: "border-style",
// 	htmlAttr: "style",
//     sort: base_sort++,
// 	section: style_section,
//     col:12,
// 	inline:true,
//     inputtype: SelectInput,
//     data: {
// 		options: [{
// 			value: "",
// 			text: "Default"
// 		}, {	
// 			value: "solid",
// 			text: "Solid"
// 		}, {
// 			value: "dotted",
// 			text: "Dotted"
// 		}, {
// 			value: "dashed",
// 			text: "Dashed"
// 		}],
// 	}
// }, 
//     {
//         name: "Size",
//         key: "border-width",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
//    	}, {
//         name: "Color",
//         key: "border-color",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
// 		htmlAttr: "style",
//         inputtype: ColorInput,
// 	}]
// });    



//Border radius
// Vvveb.Components.extend("_base", "_base", {
// 	 properties: [{
// 		key: "border_radius_header",
// 		inputtype: SectionInput,
// 		name:false,
// 		sort: base_sort++,
// 		section: style_section,
// 		data: {header:"Border radius", expanded:false},
// 	}, {
//         name: "Top Left",
//         key: "border-top-left-radius",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
// 	}, {
//         name: "Top Right",
//         key: "border-top-right-radius",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
//     }, {
//         name: "Bottom Left",
//         key: "border-bottom-left-radius",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
//     }, {
//         name: "Bottom Right",
//         key: "border-bottom-right-radius",
// 		htmlAttr: "style",
//         sort: base_sort++,
// 		section: style_section,
//         col:6,
// 		inline:true,
//         inputtype: CssUnitInput
//     }]
// });


// Vvveb.Components.extend("_base", "html/section1", {
//     classes: ["section1"],
//     image: "icons/section.svg",
//     html: '<section name="section" data-type="builder_section" style="max-width: 103rem;margin-left: auto; margin-right: auto; padding:20px;" class="wideContainer"><div class="container text-center" style="margin-left:auto;margin-right:auto; max-width:1055px;color:#fff; padding:7px;"><div class="row"><div class="col-lg-12"><h3 class="plusBtn" data-type="add_container">+</h3></div></section>',
//     name: "Wide",
//     properties: [
//      {
//         name: "Type",
//         key: "type",
//         htmlAttr: "class",
//         inputtype: SelectInput,
//         validValues: ["section"],
//         data: {
//             options: [{
//                 value: "section",
//                 text: "Default"
//             }]
//         }
//     },
// 	{
//         name: "Background",
//         key: "background",
// 		htmlAttr: "class",
//         validValues: bgcolorClasses,
//         inputtype: SelectInput,
//         data: {
//             options: bgcolorSelectOptions
//         }
//     },
// 	{
//         name: "Background Color",
//         key: "background-color",
// 		htmlAttr: "style",
//         inputtype: ColorInput,
//     },
// 	{
//         name: "Text Color",
//         key: "color",
// 		htmlAttr: "style",
//         inputtype: ColorInput,
//     }],
// });


// Vvveb.Components.extend("_base", "html/section2", {
//     classes: ["section"],
//     image: "icons/section.svg",
//     html: '<section name="section" data-type="builder_section" style="max-width:85rem;margin-left: auto;margin-right:auto; padding:20px;" class="midWideContainer"><div class="container text-center" style="margin-left:auto;margin-right:auto; max-width:900px;color:#fff; padding:7px;"><div class="row"><div class="col-lg-12"><h3 class="plusBtn" data-type="add_container">+</h3></div></div></div></section>',
//     name: "Medium",
//     properties: [
//      {
//         name: "Type",
//         key: "type",
//         htmlAttr: "class",
//         inputtype: SelectInput,
//         validValues: ["section"],
//         data: {
//             options: [{
//                 value: "section",
//                 text: "Default"
//             }]
//         }
//     },
// 	{
//         name: "Background",
//         key: "background",
// 		htmlAttr: "class",
//         validValues: bgcolorClasses,
//         inputtype: SelectInput,
//         data: {
//             options: bgcolorSelectOptions
//         }
//     },
// 	{
//         name: "Background Color",
//         key: "background-color",
// 		htmlAttr: "style",
//         inputtype: ColorInput,
//     },
// 	{
//         name: "Text Color",
//         key: "color",
// 		htmlAttr: "style",
//         inputtype: ColorInput,
//     }],
// });

// Vvveb.Components.extend("_base", "html/section3", {
//     classes: ["section"],
//     image: "icons/section.svg",
//     html: '<section name="section" data-type="builder_section" style="min-height:95px; padding:5px;" class="container midContainer"><div class="container text-center" style="margin-left:auto;margin-right:auto;color:#fff; padding:7px;"><div class="row"><div class="col-lg-12"><h3 class="plusBtn" data-type="add_container">+</h3></div></div></div></section>',
//     name: "Small",
//     properties: [
//      {
//         name: "Type",
//         key: "type",
//         htmlAttr: "class",
//         inputtype: SelectInput,
//         validValues: ["section"],
//         data: {
//             options: [{
//                 value: "section",
//                 text: "Default"
//             }]
//         }
//     },
// 	{
//         name: "Background",
//         key: "background",
// 		htmlAttr: "class",
//         validValues: bgcolorClasses,
//         inputtype: SelectInput,
//         data: {
//             options: bgcolorSelectOptions
//         }
//     },
// 	{
//         name: "Background Color",
//         key: "background-color",
// 		htmlAttr: "style",
//         inputtype: ColorInput,
//     },
// 	{
//         name: "Text Color",
//         key: "color",
// 		htmlAttr: "style",
//         inputtype: ColorInput,
//     }],
// });
// Vvveb.Components.extend("_base", "html/button", {
// classes: ["btn", "btn-link"],
// name: "Button",
// image: "icons/button.svg",
// html: '<div class="customBtn p-3" data-type="builder_element"><button type="button" class="btn btn-primary" style="margin:0 auto; display: block; width: 45%;">Button</button></div>',
// properties: [{
// name: "Link To",
// key: "href",
// htmlAttr: "href",
// inputtype: LinkInput
// }, {
// name: "Type",
// key: "type",
// htmlAttr: "class",
// inputtype: SelectInput,
// validValues: ["btn-default", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-info", "btn-light", "btn-dark", "btn-outline-primary", "btn-outline-info", "btn-outline-success", "btn-outline-warning", "btn-outline-info", "btn-outline-light", "btn-outline-dark", "btn-link"],
// data: {
//     options: [{
//         value: "btn-default",
//         text: "Default"
//     }, {
//         value: "btn-primary",
//         text: "Primary"
//     }, {
//         value: "btn btn-info",
//         text: "Info"
//     }, {
//         value: "btn-success",
//         text: "Success"
//     }, {
//         value: "btn-warning",
//         text: "Warning"
//     }, {
//         value: "btn-info",
//         text: "Info"
//     }, {
//         value: "btn-light",
//         text: "Light"
//     }, {
//         value: "btn-dark",
//         text: "Dark"
//     }, {
//         value: "btn-outline-primary",
//         text: "Primary outline"
//     }, {
//         value: "btn btn-outline-info",
//         text: "Info outline"
//     }, {
//         value: "btn-outline-success",
//         text: "Success outline"
//     }, {
//         value: "btn-outline-warning",
//         text: "Warning outline"
//     }, {
//         value: "btn-outline-info",
//         text: "Info outline"
//     }, {
//         value: "btn-outline-light",
//         text: "Light outline"
//     }, {
//         value: "btn-outline-dark",
//         text: "Dark outline"
//     }, {
//         value: "btn-link",
//         text: "Link"
//     }]
// }
// }, {
// name: "Size",
// key: "size",
// htmlAttr: "class",
// inputtype: SelectInput,
// validValues: ["btn-lg", "btn-sm"],
// data: {
//     options: [{
//         value: "",
//         text: "Default"
//     }, {
//         value: "btn-lg",
//         text: "Large"
//     }, {
//         value: "btn-sm",
//         text: "Small"
//     }]
// }
// }, {
// name: "Target",
// key: "target",
// htmlAttr: "target",
// inputtype: TextInput
// }, {
// name: "Disabled",
// key: "disabled",
// htmlAttr: "class",
// inputtype: ToggleInput,
// validValues: ["disabled"],
// data: {
//     on: "disabled",
//     off: ""
// }
// }]
// });
// Vvveb.Components.extend("_base", "ngroup", {
//     classes: ["btn-group"],
//     name: "Button Group",
//     image: "icons/button_group.svg",
//     html: '<div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-secondary">Left</button><button type="button" class="btn btn-secondary">Middle</button> <button type="button" class="btn btn-secondary">Right</button></div>',
// 	properties: [{
// 	    name: "Size",
//         key: "size",
//         htmlAttr: "class",
//         inputtype: SelectInput,
//         validValues: ["btn-group-lg", "btn-group-sm"],
//         data: {
//             options: [{
//                 value: "",
//                 text: "Default"
//             }, {
//                 value: "btn-group-lg",
//                 text: "Large"
//             }, {
//                 value: "btn-group-sm",
//                 text: "Small"
//             }]
//         }
//     }, {
// 	    name: "Alignment",
//         key: "alignment",
//         htmlAttr: "class",
//         inputtype: SelectInput,
//         validValues: ["btn-group", "btn-group-vertical"],
//         data: {
//             options: [{
//                 value: "",
//                 text: "Default"
//             }, {
//                 value: "btn-group",
//                 text: "Horizontal"
//             }, {
//                 value: "btn-group-vertical",
//                 text: "Vertical"
//             }]
//         }
//     }]
// });
// Vvveb.Components.extend("_base", "html/buttontoolbar", {
//     classes: ["btn-toolbar"],
//     name: "Button Toolbar",
//     image: "icons/button_toolbar.svg",
//     html: '<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
// 		  <div class="btn-group mr-2" role="group" aria-label="First group">\
// 			<button type="button" class="btn btn-secondary">1</button>\
// 			<button type="button" class="btn btn-secondary">2</button>\
// 			<button type="button" class="btn btn-secondary">3</button>\
// 			<button type="button" class="btn btn-secondary">4</button>\
// 		  </div>\
// 		  <div class="btn-group mr-2" role="group" aria-label="Second group">\
// 			<button type="button" class="btn btn-secondary">5</button>\
// 			<button type="button" class="btn btn-secondary">6</button>\
// 			<button type="button" class="btn btn-secondary">7</button>\
// 		  </div>\
// 		  <div class="btn-group" role="group" aria-label="Third group">\
// 			<button type="button" class="btn btn-secondary">8</button>\
// 		  </div>\
// 		</div>'
// });
// Vvveb.Components.extend("_base","html/alert", {
//     classes: ["alert"],
//     name: "Alert",
//     image: "icons/alert.svg",
//     html: '<div class="alert alert-warning alert-dismissible fade show" role="alert">\
// 		  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
// 			<span aria-hidden="true">&times;</span>\
// 		  </button>\
// 		  <strong>Holy guacamole!</strong> You should check in on some of those fields below.\
// 		</div>',
//     properties: [{
//         name: "Type",
//         key: "type",
//         htmlAttr: "class",
//         validValues: ["alert-primary", "alert-secondary", "alert-success", "alert-danger", "alert-warning", "alert-info", "alert-light", "alert-dark"],
//         inputtype: SelectInput,
//         data: {
//             options: [{
//                 value: "alert-primary",
//                 text: "Default"
//             }, {
//                 value: "alert-secondary",
//                 text: "Secondary"
//             }, {
//                 value: "alert-success",
//                 text: "Success"
//             }, {
//                 value: "alert-danger",
//                 text: "Danger"
//             }, {
//                 value: "alert-warning",
//                 text: "Warning"
//             }, {
//                 value: "alert-info",
//                 text: "Info"
//             }, {
//                 value: "alert-light",
//                 text: "Light"
//             }, {
//                 value: "alert-dark",
//                 text: "Dark"
//             }]
//         }
//     }]
// });
// Vvveb.Components.extend("_base", "html/badge", {
//     classes: ["badge"],
//     image: "icons/badge.svg",
//     name: "Badge",
//     html: '<span class="badge badge-primary">Primary badge</span>',
//     properties: [{
//         name: "Color",
//         key: "color",
//         htmlAttr: "class",
//         validValues:["badge-primary", "badge-secondary", "badge-success", "badge-danger", "badge-warning", "badge-info", "badge-light", "badge-dark"],
//         inputtype: SelectInput,
//         data: {
//             options: [{
//                 value: "",
//                 text: "Default"
//             }, {
//                 value: "badge-primary",
//                 text: "Primary"
//             }, {
//                 value: "badge-secondary",
//                 text: "Secondary"
//             }, {
//                 value: "badge-success",
//                 text: "Success"
//             }, {
//                 value: "badge-warning",
//                 text: "Warning"
//             }, {
//                 value: "badge-danger",
//                 text: "Danger"
//             }, {
//                 value: "badge-info",
//                 text: "Info"
//             }, {
//                 value: "badge-light",
//                 text: "Light"
//             }, {
//                 value: "badge-dark",
//                 text: "Dark"
//             }]
//         }
//      }]
// });
// Vvveb.Components.extend("_base", "html/card", {
//     classes: ["card"],
//     image: "icons/panel.svg",
//     name: "Card",
//     html: '<div class="card">\
// 		  <img class="card-img-top" src="../libs/builder/icons/image.svg" alt="Card image cap" width="128" height="128">\
// 		  <div class="card-body">\
// 			<h4 class="card-title">Card title</h4>\
// 			<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\
// 			<a href="#" class="btn btn-primary">Go somewhere</a>\
// 		  </div>\
// 		</div>'
// });
// Vvveb.Components.extend("_base", "html/listgroup", {
//     name: "List Group",
//     image: "icons/list_group.svg",
//     classes: ["list-group"],
//     html: '<ul data_type="builder_element" class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>'
// 
// });

// Vvveb.Components.extend("_base", "html/listgroup", {
//     name: "List Group",
//     image: "icons/list_group.svg",
//     classes: ["list-group"],
//     html: '<ul data_type="builder_element" class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>'
// 
// });

// Vvveb.Components.extend("_base", "html/listgroup", {
//     name: "List Group",
//     image: "icons/list_group.svg",
//     classes: ["list-group"],
//     html: '<ul data_type="builder_element" class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>'
// 
// });
// Vvveb.Components.extend("_base", "html/listitem", {
//     name: "List Item",
//     classes: ["list-group-item"],
//     html: '<li class="list-group-item"><span class="badge">14</span> Cras justo odio</li>'
// });
// Vvveb.Components.extend("_base", "html/breadcrumbs", {
//     classes: ["breadcrumb"],
//     name: "Breadcrumbs",
//     image: "icons/breadcrumbs.svg",
//     html: '<ol class="breadcrumb">\
// 		  <li class="breadcrumb-item active"><a href="#">Home</a></li>\
// 		  <li class="breadcrumb-item active"><a href="#">Library</a></li>\
// 		  <li class="breadcrumb-item active">Data 3</li>\
// 		</ol>'
// });
// Vvveb.Components.extend("_base", "html/pagination", {
//     classes: ["pagination"],
//     name: "Pagination",
//     image: "icons/pagination.svg",
//     html: '<nav aria-label="Page navigation example">\
// 	  <ul class="pagination">\
// 		<li class="page-item"><a class="page-link" href="#">Previous</a></li>\
// 		<li class="page-item"><a class="page-link" href="#">1</a></li>\
// 		<li class="page-item"><a class="page-link" href="#">2</a></li>\
// 		<li class="page-item"><a class="page-link" href="#">3</a></li>\
// 		<li class="page-item"><a class="page-link" href="#">Next</a></li>\
// 	  </ul>\
// 	</nav>',

//     properties: [{
//         name: "Size",
//         key: "size",
//         htmlAttr: "class",
//         inputtype: SelectInput,
//         validValues: ["btn-lg", "btn-sm"],
//         data: {
//             options: [{
//                 value: "",
//                 text: "Default"
//             }, {
//                 value: "btn-lg",
//                 text: "Large"
//             }, {
//                 value: "btn-sm",
//                 text: "Small"
//             }]
//         }
//     },{
//         name: "Alignment",
//         key: "alignment",
//         htmlAttr: "class",
//         inputtype: SelectInput,
//         validValues: ["justify-content-center", "justify-content-end"],
//         data: {
//             options: [{
//                 value: "",
//                 text: "Default"
//             }, {
//                 value: "justify-content-center",
//                 text: "Center"
//             }, {
//                 value: "justify-content-end",
//                 text: "Right"
//             }]
//         }
//     }]	
// });
// Vvveb.Components.extend("_base", "html/progress", {
//     classes: ["progress"],
//     name: "Progress Bar",
//     image: "icons/progressbar.svg",
//     html: '<div class="progress"><div class="progress-bar w-25"></div></div>',
//     properties: [{
//         name: "Background",
//         key: "background",
// 		htmlAttr: "class",
//         validValues: bgcolorClasses,
//         inputtype: SelectInput,
//         data: {
//             options: bgcolorSelectOptions
//         }
//     },
//     {
//         name: "Progress",
//         key: "background",
//         child:".progress-bar",
// 		htmlAttr: "class",
//         validValues: ["", "w-25", "w-50", "w-75", "w-100"],
//         inputtype: SelectInput,
//         data: {
//             options: [{
//                 value: "",
//                 text: "None"
//             }, {
//                 value: "w-25",
//                 text: "25%"
//             }, {
//                 value: "w-50",
//                 text: "50%"
//             }, {
//                 value: "w-75",
//                 text: "75%"
//             }, {
//                 value: "w-100",
//                 text: "100%"
//             }]
//         }
//     }, 
//     {
//         name: "Progress background",
//         key: "background",
//         child:".progress-bar",
// 		htmlAttr: "class",
//         validValues: bgcolorClasses,
//         inputtype: SelectInput,
//         data: {
//             options: bgcolorSelectOptions
//         }
//     }, {
//         name: "Striped",
//         key: "striped",
//         child:".progress-bar",
//         htmlAttr: "class",
//         validValues: ["", "progress-bar-striped"],
//         inputtype: ToggleInput,
//         data: {
//             on: "progress-bar-striped",
//             off: "",
//         }
//     }, {
//         name: "Animated",
//         key: "animated",
//         child:".progress-bar",
//         htmlAttr: "class",
//         validValues: ["", "progress-bar-animated"],
//         inputtype: ToggleInput,
//         data: {
//             on: "progress-bar-animated",
//             off: "",
//         }
//     }]
// });
// Vvveb.Components.extend("_base", "html/jumbotron", {
//     classes: ["jumbotron"],
//     image: "icons/jumbotron.svg",
//     name: "Jumbotron",
//     html: '<div class="jumbotron">\
// 		  <h1 class="display-3">Hello, world!</h1>\
// 		  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>\
// 		  <hr class="my-4">\
// 		  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>\
// 		  <p class="lead">\
// 			<a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>\
// 		  </p>\
// 		</div>'
// });
// Vvveb.Components.extend("_base", "html/navbar", {
//     classes: ["navbar"],
//     image: "icons/navbar.svg",
//     name: "Nav Bar",
//     html: '<nav class="navbar navbar-expand-lg navbar-light bg-light">\
// 		  <a class="navbar-brand" href="#">Navbar</a>\
// 		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
// 			<span class="navbar-toggler-icon"></span>\
// 		  </button>\
// 		\
// 		  <div class="collapse navbar-collapse" id="navbarSupportedContent">\
// 			<ul class="navbar-nav mr-auto">\
// 			  <li class="nav-item active">\
// 				<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>\
// 			  </li>\
// 			  <li class="nav-item">\
// 				<a class="nav-link" href="#">Link</a>\
// 			  </li>\
// 			  <li class="nav-item">\
// 				<a class="nav-link disabled" href="#">Disabled</a>\
// 			  </li>\
// 			</ul>\
// 			<form class="form-inline my-2 my-lg-0">\
// 			  <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">\
// 			  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>\
// 			</form>\
// 		  </div>\
// 		</nav>',

//     properties: [{
//         name: "Color theme",
//         key: "color",
//         htmlAttr: "class",
//         validValues: ["navbar-light", "navbar-dark"],
//         inputtype: SelectInput,
//         data: {
//             options: [{
//                 value: "",
//                 text: "Default"
//             }, {
//                 value: "navbar-light",
//                 text: "Light"
//             }, {
//                 value: "navbar-dark",
//                 text: "Dark"
//             }]
//         }
//     },{
//         name: "Background color",
//         key: "background",
//         htmlAttr: "class",
//         validValues: bgcolorClasses,
//         inputtype: SelectInput,
//         data: {
//             options: bgcolorSelectOptions
//         }
//     }, {
//         name: "Placement",
//         key: "placement",
//         htmlAttr: "class",
//         validValues: ["fixed-top", "fixed-bottom", "sticky-top"],
//         inputtype: SelectInput,
//         data: {
//             options: [{
//                 value: "",
//                 text: "Default"
//             }, {
//                 value: "fixed-top",
//                 text: "Fixed Top"
//             }, {
//                 value: "fixed-bottom",
//                 text: "Fixed Bottom"
//             }, {
//                 value: "sticky-top",
//                 text: "Sticky top"
//             }]
//         }
//     }]
// });
// Vvveb.Components.extend("_base", "html/textinput", {
//     name: "Text Input",
// 	attributes: {"type":"text"},
//     image: "icons/text_input.svg",
//     html: '<div class="form-group"><label>Text</label><input type="text" class="form-control"></div></div>',
//     properties: [{
//         name: "Value",
//         key: "value",
//         htmlAttr: "value",
//         inputtype: TextInput
//     }, {
//         name: "Placeholder",
//         key: "placeholder",
//         htmlAttr: "placeholder",
//         inputtype: TextInput
//     }]
// });

// Vvveb.Components.extend("_base", "html/selectinput", {
// 	nodes: ["select"],
//     name: "Select Input",
//     image: "icons/select_input.svg",
//     html: '<div class="form-group"><label>Choose an option </label><select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select></div>',

// 	beforeInit: function (node)
// 	{
// 		properties = [];
// 		var i = 0;

// 		$(node).find('option').each(function() {

// 			data = {"value": this.value, "text": this.text};

// 			i++;
// 			properties.push({
// 				name: "Option " + i,
// 				key: "option" + i,
// 				//index: i - 1,
// 				optionNode: this,
// 				inputtype: TextValueInput,
// 				data: data,
// 				onChange: function(node, value, input) {

// 					option = $(this.optionNode);

// 					//if remove button is clicked remove option and render row properties
// 					if (input.nodeName == 'BUTTON')
// 					{
// 						option.remove();
// 						Vvveb.Components.render("html/selectinput");
// 						return node;
// 					}

// 					if (input.name == "value") option.attr("value", value); 
// 					else if (input.name == "text") option.text(value);

// 					return node;
// 				},	
// 			});
// 		});

// 		//remove all option properties
// 		this.properties = this.properties.filter(function(item) {
// 			return item.key.indexOf("option") === -1;
// 		});

// 		//add remaining properties to generated column properties
// 		properties.push(this.properties[0]);

// 		this.properties = properties;
// 		return node;
// 	},

//     properties: [{
//         name: "Option",
//         key: "option1",
//         inputtype: TextValueInput
// 	}, {
//         name: "Option",
//         key: "option2",
//         inputtype: TextValueInput
// 	}, {
//         name: "",
//         key: "addChild",
//         inputtype: ButtonInput,
//         data: {text:"Add option", icon:"la-plus"},
//         onChange: function(node)
//         {
// 			 $(node).append('<option value="value">Text</option>');

// 			 //render component properties again to include the new column inputs
// 			 Vvveb.Components.render("html/selectinput");

// 			 return node;
// 		}
// 	}]
// });
// Vvveb.Components.extend("_base", "html/heading", {

//     name: "Text",
//     nodes: ["heading"],
//     image: "icons/Text.svg",
//     html: '<h1 class="text-center pt-4 pb-4" data-type="builder_element" style="color:#fff;">Your Heading Here</h1>' 

// });




// Vvveb.Components.extend("_base", "html/radiobutton", {
//     name: "Radio Button",
// 	attributes: {"type":"radio"},
//     image: "icons/radio.svg",
//     html: '<label class="radio"><input type="radio"> Radio</label>',
//     properties: [{
//         name: "Name",
//         key: "name",
//         htmlAttr: "name",
//         inputtype: TextInput
//     }]
// });
// Vvveb.Components.extend("_base", "html/checkbox", {
//     name: "Checkbox",
//     attributes: {"type":"checkbox"},
//     image: "icons/checkbox.svg",
//     html: '<label class="checkbox"><input type="checkbox"> Checkbox</label>',
//     properties: [{
//         name: "Name",
//         key: "name",
//         htmlAttr: "name",
//         inputtype: TextInput
//     }]
// });
// Vvveb.Components.extend("_base", "html/fileinput", {
//     name: "Input group",
// 	attributes: {"type":"file"},
//     image: "icons/text_input.svg",
//     html: '<div class="form-group">\
// 			  <input type="file" class="form-control">\
// 			</div>'
// });
// Vvveb.Components.extend("_base", "html/table", {
//     nodes: ["table"],
//     classes: ["table"],
//     image: "icons/table.svg",
//     name: "Table",
//     html: '<table class="table">\
// 		  <thead>\
// 			<tr>\
// 			  <th>#</th>\
// 			  <th>First Name</th>\
// 			  <th>Last Name</th>\
// 			  <th>Username</th>\
// 			</tr>\
// 		  </thead>\
// 		  <tbody>\
// 			<tr>\
// 			  <th scope="row">1</th>\
// 			  <td>Mark</td>\
// 			  <td>Otto</td>\
// 			  <td>@mdo</td>\
// 			</tr>\
// 			<tr>\
// 			  <th scope="row">2</th>\
// 			  <td>Jacob</td>\
// 			  <td>Thornton</td>\
// 			  <td>@fat</td>\
// 			</tr>\
// 			<tr>\
// 			  <th scope="row">3</th>\
// 			  <td>Larry</td>\
// 			  <td>the Bird</td>\
// 			  <td>@twitter</td>\
// 			</tr>\
// 		  </tbody>\
// 		</table>',
//     properties: [
// 	{
//         name: "Type",
//         key: "type",
// 		htmlAttr: "class",
//         validValues: ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark", "table-white"],
//         inputtype: SelectInput,
//         data: {
//             options: [{
// 				value: "Default",
// 				text: ""
// 			}, {
// 				value: "table-primary",
// 				text: "Primary"
// 			}, {
// 				value: "table-secondary",
// 				text: "Secondary"
// 			}, {
// 				value: "table-success",
// 				text: "Success"
// 			}, {
// 				value: "table-danger",
// 				text: "Danger"
// 			}, {
// 				value: "table-warning",
// 				text: "Warning"
// 			}, {
// 				value: "table-info",
// 				text: "Info"
// 			}, {
// 				value: "table-light",
// 				text: "Light"
// 			}, {
// 				value: "table-dark",
// 				text: "Dark"
// 			}, {
// 				value: "table-white",
// 				text: "White"
// 			}]
//         }
//     },
// 	{
//         name: "Responsive",
//         key: "responsive",
//         htmlAttr: "class",
//         validValues: ["table-responsive"],
//         inputtype: ToggleInput,
//         data: {
//             on: "table-responsive",
//             off: ""
//         }
//     },   
// 	{
//         name: "Small",
//         key: "small",
//         htmlAttr: "class",
//         validValues: ["table-sm"],
//         inputtype: ToggleInput,
//         data: {
//             on: "table-sm",
//             off: ""
//         }
//     },   
// 	{
//         name: "Hover",
//         key: "hover",
//         htmlAttr: "class",
//         validValues: ["table-hover"],
//         inputtype: ToggleInput,
//         data: {
//             on: "table-hover",
//             off: ""
//         }
//     },   
// 	{
//         name: "Bordered",
//         key: "bordered",
//         htmlAttr: "class",
//         validValues: ["table-bordered"],
//         inputtype: ToggleInput,
//         data: {
//             on: "table-bordered",
//             off: ""
//         }
//     },   
// 	{
//         name: "Striped",
//         key: "striped",
//         htmlAttr: "class",
//         validValues: ["table-striped"],
//         inputtype: ToggleInput,
//         data: {
//             on: "table-striped",
//             off: ""
//         }
//     },   
// 	{
//         name: "Inverse",
//         key: "inverse",
//         htmlAttr: "class",
//         validValues: ["table-inverse"],
//         inputtype: ToggleInput,
//         data: {
//             on: "table-inverse",
//             off: ""
//         }
//     },   
//     {
//         name: "Head options",
//         key: "head",
//         htmlAttr: "class",
//         child:"thead",
//         inputtype: SelectInput,
//         validValues: ["", "thead-inverse", "thead-default"],
//         data: {
//             options: [{
//                 value: "",
//                 text: "None"
//             }, {
//                 value: "thead-default",
//                 text: "Default"
//             }, {
//                 value: "thead-inverse",
//                 text: "Inverse"
//             }]
//         }
//     }]
// });
// Vvveb.Components.extend("_base", "html/paragraph", {
//     nodes: ["p"],
//     name: "Paragraph",
// 	image: "icons/paragraph.svg",
// 	html: '<p>Lorem ipsum</p>',
//     properties: [{
//         name: "Text align",
//         key: "text-align",
//         htmlAttr: "class",
//         inputtype: SelectInput,
//         validValues: ["", "text-left", "text-center", "text-right"],
//         inputtype: RadioButtonInput,
//         data: {
// 			extraclass:"btn-group-sm btn-group-fullwidth",
//             options: [{
//                 value: "",
//                 icon:"la la-close",
//                 //text: "None",
//                 title: "None",
//                 checked:true,
//             }, {
//                 value: "left",
//                 //text: "Left",
//                 title: "text-left",
//                 icon:"la la-align-left",
//                 checked:false,
//             }, {
//                 value: "text-center",
//                 //text: "Center",
//                 title: "Center",
//                 icon:"la la-align-center",
//                 checked:false,
//             }, {
//                 value: "text-right",
//                 //text: "Right",
//                 title: "Right",
//                 icon:"la la-align-right",
//                 checked:false,
//             }],
//         },
// 	}]
// });

//{
//     name: "Muted",
//     key: "muted",
//     htmlAttr: "muted",
//     inputtype: CheckboxInput
// },{
//     name: "Loop",
//     key: "loop",
//     htmlAttr: "loop",
//     inputtype: CheckboxInput
// },
// {
//     name: "Plays inline",
//     key: "playsinline",
//     htmlAttr: "playsinline",
//     inputtype: CheckboxInput
// },{
//     name: "Controls",
//     key: "controls",
//     htmlAttr: "controls",
//     inputtype: CheckboxInput
// }

// Vvveb.Components.extend("_base", "html/button", {
//     nodes: ["button"],
//     name: "Html Button",
//     image: "icons/button.svg",
//     html: '<button data-type="builder_element">Button</button>',
//     properties: [{
//         name: "Text",
//         key: "text",
//         htmlAttr: "innerHTML",
//         inputtype: TextInput
//     }, {
//         name: "Name",
//         key: "name",
//         htmlAttr: "name",
//         inputtype: TextInput
//     }, {
//         name: "Type",
//         key: "type",
// 		htmlAttr: "type",
//         inputtype: SelectInput,
//         data: {
// 			options: [{
// 				value: "button",
// 				text: "button"
// 			}, {	
// 				value: "reset",
// 				text: "reset"
// 			}, {
// 				value: "submit",
// 				text: "submit"
// 			}],
// 		}
//    	},{
//         name: "Autofocus",
//         key: "autofocus",
//         htmlAttr: "autofocus",
//         inputtype: CheckboxInput
//    	},{
//         name: "Disabled",
//         key: "disabled",
//         htmlAttr: "disabled",
//         inputtype: CheckboxInput
//     }]
// });   

// Vvveb.Components.extend("_base", "_base", {
// 	 properties: [
// 	 {
//         name: "Font family",
//         key: "font-family",
// 		htmlAttr: "style",
//         sort: base_sort++,
//         col:6,
// 		inline:true,
//         inputtype: SelectInput,
//         data: {
// 			options: [{
// 				value: "",
// 				text: "extended"
// 			}, {
// 				value: "Ggoogle ",
// 				text: "google"
// 			}]
// 		}
//     }]
// });
