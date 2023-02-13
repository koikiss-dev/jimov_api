# JIMOV - Media Content API

![image description](.gitbook/assets/JIMOV\_logo.png)

## **Overview**

This project is an open-source API for retrieving multimedia content such as anime, movies and series, news, and manga in both Spanish and English. The API is built using JavaScript and the Express.js framework. The API allows users to search for content by keywords and retrieve detailed information about the content such as title, description, and language. The API also allows users to filter results by language and content type.

## **Installation**

To use the API, you will need to have Node.js and npm installed on your machine. Once you have these, you can clone the repository and install the dependencies by running the following commands:

```bash
git clone https://github.com/koikiss-dev/jimov_api.git
cd jimov_api
npm install
```

## **Usage**

The API can be started by running the following command:

```bash
npm run server
```

## **API Routes Explained**

#### AnimeFlv

| URL                         | Description                                                                                      | Example                             |
| --------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------- |
| /anime/flv/:name            | Gets anime show title,show description (query by anime show name)                                | /anime/flv/one-piece-tv             |
| /anime/flv/episode/:episode | Gets episode info, link to episode,and shows previous and next episode (query by episode number) | /anime/flv/episode/one-piece-tv-100 |
| /anime/flv/browse/filter    | Filter certain anime shows based on show title                                                   |                                     |

#### AnimeLatinoHD

| URL                                          | Description                                                                                                 | Example |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| /anime/animelatinohd/search/:search          | Gets show title that are anime based in Latin America (query by show name)                                  |         |
| /anime/animelatinohd/:title                  | Queries by the title of the anime show and returns the show information and the list of episodes that exist |         |
| /anime/animelatinohd/:title/episode/:episode | Queries by show title and returns the episode info                                                          |         |

#### Zoro

| URL                           | Description                                                                        | Example |
| ----------------------------- | ---------------------------------------------------------------------------------- | ------- |
| /anime/zoro/name/:name        | Returns the info on the show and the synopsis, queried by show title name          |         |
| /anime/zoro/servers/:name/:id | Returns episode synopsis queried by name and episode number (based on server info) |         |
| /anime/zoro/iframe/:id        | Returns all the internal data info returned by server                              |         |

## **Technologies Used**

* JavaScript: The primary programming language used for building the API.
* Express.js: The framework used for building the API. It is a fast and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## **How to Contribute**

If you are interested in contributing to the project follow these instructions:

1. Fork the repository.
2. Make changes and test.
3. Submit a pull request.

## **LICENSE**

Copyright (c) 2023 JIMOV

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
