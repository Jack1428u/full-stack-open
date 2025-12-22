```mermaid
sequenceDiagram
    participant browser
    participant server

    browser ->> server : GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server -->> browser: The HTML code
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: The CSS file
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server -->> browser: File spa.js
    deactivate server

    Note right of browser: The browser execute the JS code and make the request of data.json

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server    
    server -->> browser: The data.json 
    deactivate server

    Note over browser: The browser execute the callback function and show the notes.