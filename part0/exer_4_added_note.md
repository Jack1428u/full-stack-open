```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: The user write the note and make click in "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server: The server save the note in the array "notes"
    server-->>browser: HTTP 302 Redirect to "/notes"
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: The document HTML
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The file CSS
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The code JavaScript
    deactivate server

    Note right of browser: The browser execute the JS that request the JSON 

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "new note","date": "2025-12-22..." }, ... ]
    deactivate server

    Note over browser: The browser renders the notes using the received data.