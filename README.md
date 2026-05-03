# FreeAPI Random Cat Viewer

A random cat image viewer with breed info, built with vanilla JavaScript.

## Features

- Fetch & display random cat images
- Image fade-in animation
- Breed name, temperament tags, origin & description
- Save cats to a local gallery (in-memory)
- Click gallery thumbnail to view full image in modal
- Loading placeholder & error handling

## Tech Stack

- HTML, CSS, JavaScript (no frameworks)
- Tailwind CSS (CDN)
- FreeAPI Random Cat endpoint

## API Endpoint Used

```
GET https://api.freeapi.app/api/v1/public/cats/cat/random
```

## Live Demo

[View Live](https://freeapi-cat-viewer.vercel.app/)

## Run Locally

```bash
npx serve .
```

Open `http://localhost:3000`