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
