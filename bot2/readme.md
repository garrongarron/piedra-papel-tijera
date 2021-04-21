### ChatBot Twitch

**Docker section**

To install the project

```sudo docker run -it --rm --name tmp-name -v "$PWD":/usr/src/app -w /usr/src/app node:10 npm install```


Run the project

```sudo docker run -it --rm --name tmp-name -p "3000:3000" -v "$PWD":/usr/src/app -w /usr/src/app node:10 npm run start```

