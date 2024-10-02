# React Apps and Components, explained by me. #


### 1. Accordion component ###

TASK.
  - create an accordion component, using React. An accordion is a UI pattern which reveals, or hide, its content, based on user interaction (usually by clicking on the item).
  - the accordion is made of two sections: the title and the content. the title has to be always visible.
  - this particular accordion has to enable two different modes: one which enables single selections (you can only collapse one item at the time), and the other which allows multiple selections;
  - dummy data, for the title and content of the accordion, is provided from external file located at ./accordion/data.js;
    
STEP BY STEP.
HOOKS: useState() keeps track of user actions. useState takes an initial value as argument and returns an array with two elements:
  - the current value of the state;
  - a function() to re-set the state when change occurs;
  - for this project we only need useState() hook since we must store multiple 'states': when the user clicks on one of the accordion-titles we want to keep the id (static, from data object) of selected item, and refresh this data when user clicks on the next one;
  - also, if the user enables the multiple selection, we want to keep track of that;
  - last, if the user has chosen for multiple selection, it means that conditional rendering of the content of each selected items needs the current selected items. So we might need one more useState initialized to an empty array;

LAYOUT
  - a button which toggles on/off multiple selection: it has the `onClick()` event listener, and when the user clicks, it will trigger the stateSetter function for enableMultipleSelection. this useState can hold two values, true or false,
    The button element holds some text, which has to be rendered dynamically, based on current value of the useState() multipleSelection.
    if this is true, it will ask to click to enable the single selection.
    


