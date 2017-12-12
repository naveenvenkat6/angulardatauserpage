# angulardatauserpage
an app that displays all users from json file, and a user details page 
## Specification

  - an app that displays all users (#/users) from /data/users.json file, and a user details page (#/users/{id}). 
  - The File fetched once the app starts.
  - The table is an Angular directive and each row have checkboxs to select a row.
  - Every row have 3 actions
       *  Show - modal that displays '{firstName} {lastName}, age:{calculateAgeHere}' (use https://angular-ui.github.io/bootstrap/#/modal)
       *  Delete - removes a user from the table
       *  Edit - Opens user detail page
   *  The table displays 10 items per page and have previous-current-next buttons on the bottom.
   *  On the top of the table, there are  2 buttons. The buttons are disabled while nothing is selected.
        * Delete - removes selected item(s)
        * Download - downloads marked item as a csv file (use ; as separator)
