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
    
/// /// /// ///

### 2. Random Color Picker ###

TOPIC(S): Math.random(), useState hook, ternary operators, event listeners, return statements, addition assignment;

TASKS: 
  - create a React component which generates and displays random colors on the screen, based on user interactions. User can choose between HEX colors and RGB colors. It should also display the color code of last generated color;

TOOLS/PSEUDOCODE:
- two useState() hooks. one which stores the selected color numbering (it basically toggles between 'hex' and 'rbg' strings), another to store the generated color code. useState is imported from the React library, it stores data based on user choices/interactions, and updates the data when a re-rendering is triggered.
- a function to generate random HEX colors. this function has to variables, one is a char array, storing every hexadecimal value from '0' to 'F', the other, `hexColor` stores the '#' character (when we return the whole color code randomly generated, we need to attach this character so that CSS understands this as HEX color). 
then we add six chars to the '#' in order to make the color code. we need a for loop to repeat the following: ADD (`+=`) to `hexColor` a randomly chosen value from the `hexValuesArray`:
  (explanation: for each step of the loop, we want to access a random partition of the array, so instead of `array[i]`, we use another function which takes the `length` of the char array and `return` to `color = charArray[]` a random number between 0 and the argument = a random partition.
  `Math.random()` is not enough, because it returns floating points, to avoid that we use `Math.floor()`).  When the for loop is over, we set the useState `colorGenerated` to `hexColor`;
- another function to generate random RGB color. Set three `let` variables, `r` `g` `b`, each of these storing a call function to the same random number picker we used before. this time we don't need arrays for HEX, we just send the integer `256`: the function will pick a random number between 0 and this argument, and will return it. So: `r` `g` `b` store the integer returned. Lastly, a template literal to generate code accessible by CSS: this variable access the values stored in `r` `g` `b`  (`${}` is the template literal sintax needed to access javascript variables within a string.  `rgb()` is the CSS sintax. RESULT: ``"rgb(${r}, ${g}, ${b})"`` ). now the `rgbColor` variable contains a RGB color code, we set the useState `colorGenerated` with that color;

LAYOUT: 
- the div container background color is set to the useState `colorGenerated`, which is white by default;
- one button to generate the color, implementing logical ternary operators: IF useState current color is set to 'hex' it calls the hex color-code-generator function, previously discussed. this function randomly generates a HEX numbering iterating over a hex numbers char array for six times, sets useState for current color with this newly generated color, then the CSS will make the color appear as background of the container;
ELSE IF the current useState for color type is NOT set to 'hex'. in that case the RGB color generator function previously discussed is called.

- at the bottom, an h1 tag displays the name of color type selected, using ternary operators: IF the useState for selected color type is 'hex', 'HEX' is displayed, otherwise 'RGB' is displayed.

- another h1 diplays the color code.

/// /// /// ///

### 3. React Modal Component ##

{ definition: a 'Modal' is a UI element which displays on the screen, with maximum priority over any other elements: it basically 'covers' them. It is used to drive user's attention towards important piece of information/actions/marketing etc... }

TOPICS: React props, props drilling, Modularity (component logic distributed over multiple JSX files), function handlers, event handlers.

TASKS: 
  - the user is presented with a Button component, once it clicks on the button some content is displayed/hidden.
  - This content has to be rendered from a child component rendered, imported from the same directory: `Modal.jsx`.
  - The child commponent has to receive the parent's logic, included useState, as props, in order to display some data in its containers.

TOOLS/PSEUDOCODE:
  Basically, the logic of this component is distributed over two files.
  - `ModalTest.jsx` is the container component. The useState to keep the current user choice ("show modal" is `true` and "not show modal" is `false`), a function `handleToggleModal()` which sets the previous useState by calling its setter with an argument which reverts the current value stored in showModal.
(in the 'LAYOUT' section we'll explore in details how to implement this logic in the UI.)

  - `Modal.jsx` is the second component. is imported/nested/called inside `ModalTest` component. This component receives props data from its parent component and uses it to perform conditional rendering within its div containers.

LAYOUT:
  - `ModalTest`, the parent component, stores UI elements: a `<button>` and the `<Modal />`. When the user clicks the button, an event listener is triggered and calls the function `handleToggleModal`
  - `Modal`, the child component receives props data from its parent and renders it in separate `<div>`containers. Before even attempting to render props data, we must check if we received props arguments, to avoid 404 errors. We can solve this by implementing ternary operators: if the prop is true (which means: it is currently storing some data arguments sent from `ModalTest` ), then render it. Otherwise render preset fallback UI text.

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS: 
  -useEffect(), useEffect() dependency array, useEffect() cleanups through `return`;
  - DOM object data retrieval/manipulation;
  - data fetching, asynchronous Java script (`async`, `await`), `try` ...`catch` blocks, error handling;

TASK: This React component displays multiple products, fetched from an API. Because of the high number of products fetched, the height of the body exceed the viewport height. For a better User Experience, create a visual scroll indicator, so that the user knows  how many products are left to see, and to immediately get insight about the whole size of fetched products.

TOOLS/PSEUDOCODE:
  - data fetching: create an `async` function. this function takes an argumen: the url of the API we want to fetch data from. This function is made of two parts:
    - first part is the `try` block, where we try to fetch data from the url and we convert this data in JSON format. Then we set a useState array 'data' to store the `.products` from fetched data JSON object we just created.
    - second part is the `catch` block, which takes an argument, the error from data fetching (in case it failed). `try ...catch` block prevents our component from crashing. Unexpected errors are prevented and handled accordingly;
   
  - We need data from the DOM to calculate the size of the user's scrolled area. This function is `handleScrollPercentage()` and to make this calculation, it retrieves three properties from the DOM object:
    - 1. `document.documentElement.ScrollTop` = (integer) the pixels scrolled by the user, from top to bottom;
    - 2. `document.documentElement.scrollHeight` = (integer) the full height of the HTML (`documentElement`) element: the full size of the elemnt.
    - 3. `document.documentElement.clientHeight` = (integer) the USER viewport height: "what the user can see", based on browser page/ device;
Now it's time to calculate the exact percentage of scrolled amount.
Let's say that user scrolled 10px from top, that ScrollHeight is equal to 100px and ClientHeight to 80px, this would mean that the user has 20px of scrollable space and it already scrolled 10px, so it's halfway through, the percentage is 50%.
So if we calculate the following:
a) .scrollHeight - .clientHeight we get 20.
b) .scrollTop / 20 we get .5;
c) .5 * 100 we get 50%;

This function just retrieved the scrolled percentage, this data is ready to be used.

- the useEffect() hook, to retrieve data from the API.
  - we declared `handleScrollPercentage`, now it's time to call it. This hook handles collateral effects and performs some tasks based on rendering or some useState mutation. useEffect() takes two arguments: the first argument is a function, the second is an array, which is called by convention the 'dependency array'. This second array is not imperative, it is optional. if useEffect() has no array, it means that it will be triggered at every render of the DOM, without exception
( i.e. suppose your component has a useState() counter set to 0, and a useEffect which has NO dependency array, with a setTimeout at 1000ms which increase the count by callling setCount. Timeout triggers the useState, useState triggers a rerendering when update, the re rendering triggers useEffect, this leads to an infinite loop )

  

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS: 

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///

# 4. React Scroll Progress Indicator #

TOPICS:

TASK:

TOOLS/PSEUDOCODE:

LAYOUT:

/// /// /// ///
