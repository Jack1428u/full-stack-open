```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User write the note and push 'Save'
    Note right of browser: The JS captures the event, prevents the page reload,adds the note to the local list, and re-renders.

    browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: Payload: {"content": "new_note", "date":"..."}
    server -->> browser: HTTP 201 created
    deactivate server

    Note right of browser: The application remains on the same page, no further requests are required.