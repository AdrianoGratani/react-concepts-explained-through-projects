# React Apps and Components, explained by me. #


### 1. Accordion component ###

TOPIC(S): useState() hook, .map(), ternary operators.

TASKS.
  - create an accordion component, using React. An accordion is a UI pattern which reveals, or hide, its content, based on user interaction (usually by clicking on the item).
  - the accordion is made of two sections: the title and the content. the title has to be always visible while the content is hidden by default.
  - this particular accordion has to enable two different modes: SINGLE SELECTION and MULTIPLE SELECTION: one which enables single selections (you can only collapse one item at the time), the latter which allows multiple selections;
  - ( dummy data, for the title and content of the accordion, is provided from external file located at ./accordion/data.js )

PSEUDOCODE.
  - every title has an event listener for user interaction.
  - IF the user clicks on an item, AND `single selection` is currently `true` (useState() is needed for this), AND the id of the item is NOT stored in a useState() `selectedItem`: make the content of that specific item collapse.
  - ELSE IF the user clicks on an item, `single selection` is currently `true` but the `id` IS already stored inside `selectedItem`: hide the content and reset the `selectedItem` to default (`null`);
  - the same tasks have to be performed when multiple selection is enabled.
  - a button toggler on top, for the user to choose between multiple selection and single selection. 
    
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

  - below, we find the accordion container. we want to render by default each title, and hide by default every content as well.
  - the .map() method iterates over each object stored in the ./data.js object. for each item found will display a <div> container to display the title.
  - intuitively, whenever the user clicks on the title, we want another `<div>` for the content to appear below the title. So we attach an
    `onClick()` to the title as well. the resulting action must take into account if the user chose for multiple of for single selection, in that case we set as argument of the `onClick()` a ternary operator: based on the value stored in useState() enableMultipleSelection, we trigger `handleMultipleSelection()` (if `true`) or `handleMultipleSelection()` (if `false`)
  - handleMultipleSelection(), is used to update useState() `selected` with the current data. this handler function() takes an argument, the `id` of the current item clicked (remember, we are currently iterating over ./data.js, which contains this `id` key). Since this function handles the SINGLE selection, is quite straightforward: it calls useState setSelected() and provides a ternary operator as argument, to check if the current id is already there or no ( = checks IF the id of the item we just clicked IS ALREADY STORED in the useState(), by comparing `id` with `selected`. if this is true, useState will be re-set to initial value (`? null` = close the current content, return to initial state), otherwise, the current `id` will be stored in useState(). ).
    - `handleMultipleSelection()` works similarly, but is more complex. It takes the current `Id` of the element triggered by the user click, and perform a comparison over the useState array `multipleSelectedItems` (this array stores the `Id` of every item currently collapsed): if the current `Id` argument is NOT in the array (we use the `indexOf()` js method to find it out), we `push()` it in the array. Otherwise we `pop()` it.
    - (NOTE: to avoid data corruption, is better performing array manipulation over a copy of the array, that's why I chose to impement a spread operator and only after every evaluation the useState `multipleSelectedItems` array is set with the copy).
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

### 2. Random Color Picker ###

TOPIC(S): Math.random(), useState hook, ternary operators, event listeners, return statements;

TASKS: 
  - create a React component which generates random colors, based on user interactions;


