# Code Challenge Choice Explanations

## Frontend

- Used `useCallback` hooks to memo-ize functions and prevent unnecessary calls.
- Introduced a `State` type to handle when the component is loading, successful, or has errored.
- Used pre-existing UI libraries Tailwind and NextUI for styling.
- The `'mode': 'no-cors'` issue:
  - Removed this option to fetch as it disables the browser's JS runtime from being able to access the response's body (see [this](https://stackoverflow.com/a/43268098/16245971)).
  - Opted to not create a server-side or reverse proxy as it adds more complexity than just removing the `no-cors` option.
- Added mobile breakpoints by using Tailwind's breakpoint shorthands.
- Use React Context to have a global app state and allow for things like optimistic updating.

## Backend

- Implemented CRUD operations
- Sort by `updatedAt` descending to get results sorted with newest on the top
- Use standard REST practices with HTTP verbs "DELETE", "PUT", "POST", "GET"
