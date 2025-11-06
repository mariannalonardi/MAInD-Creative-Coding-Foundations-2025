# Assignment 01

## Brief

Starting from the concept of a pinboard, implement a web page that:

- is responsive (properly layout for smartphone, tablet, and desktop)
- allows the user to add and remove elements
- allows the user to coustomize elements (i.e. colors, size)
- allows the switch between two views (at least)

## Screenshots

! [First screenshot](DOCS/Screenshot_1.png)


! [Second screenshot](DOCS/Screenshot_2.png)


! [Third screenshot](DOCS/Screenshot_3.png)


! [Fourth screenshot](DOCS/Screenshot_4.png)


! [Fifth screenshot](DOCS/Screenshot_5.png)



## Short project description 

A responsive travel memories web page where users can add and remove photo cards of places visited, view them in grid or list layout, tag each with a description and country, and sort them alphabetically.

## List function

- Function: countrySelect change listener
    - Arguments: none
    - Description: Checks if the user selected “Other” in the country select. If yes, shows the input field to write the country and focuses it; otherwise hides the input and clears its value.
    - Returns: undefined

- Function: addBtn click listener
    - Arguments: none
    - Description: Validates that the user inserted a photo, description, and country. Reads the photo using FileReader, creates a new card with image, description, country, and a remove button, and appends it to the board.
    - Returns: undefined

- Function: reader load listener (inside addBtn click)
    - Arguments: none
    - Description: Executed when the FileReader finishes loading the image. Creates the card elements, appends description, country, image, and remove button to the card, then appends the card to the board.
    - Returns: undefined

- Function: removeBtn click listener (inside reader load)
    - Arguments: none
    - Description: Removes the card from the board when the remove button is clicked.
    - Returns: undefined

- Function: sortBtn click listener
    - Arguments: none
    - Description: Switches the board layout between grid and list view by adding/removing the list-view class and updating the button text.
    - Returns: undefined

- Function: sortSelect change listener
    - Arguments: none
    - Description: Sorts all cards alphabetically by country name in ascending or descending order. It uses a while loop to swap elements until they are in the correct order.
    - Returns: undefined
