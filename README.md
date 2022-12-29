# Swift-Ranking

## Build Docker-Image

`docker build -t swift-ranking --build-arg PORT=3080 --build-arg SPOTIFY_CLIENT_ID=x --build-arg SPOTIFY_CLIENT_SECRET=x .`

## Run Docker-Image

`docker run -p 3080:3080 swift-ranking`
