## New Features

### Big

- Make a mircoservice that uses evenets to get data files and send them to db
- Make top performes charts (by product & by source)
- Replace product and source dropdown with searchbars
  - Serve suggestions and autocomplete to searchbars
  - Multiselect with search
  - Validate input
- Make "byProduct" charts (only bySource right now)
- Structure data(in backend) into a dictionary to make it easier & more effectient on frontend
- Add trends/averages charts

### Small

- Highlight correlating bars on/between charts
- Give charts better styles
- Add update & delete endpoint

## Tasks

- Cleanup/refactor
- Cleanup unused queries/routes(graphQL) in backend
- Add cypress and jest testing
- Validate & remove date(look for dublicates & incorrectly formated/missing)
- More validation in general
- Add error handling to fetch call
- Add types everywhere
- Move types into interfaces file
- Use sass or css modules instead of makeStyle
- Cleanup TODOs scattered around project
- Validate the end date is always after the start date
- Make docker profiles for local dev.
  - For local dev share npm packages, could also make everything build at once instead of one at a time like docker compose.

## Bugs

- Hide "Next" button if there are no more records
- Don't show empty charts (This is happening because "sources" is being mapped over to render charts)
  - Fix: using a multiselect dropdown for sources should fix this because then we could use "selectedSources"
