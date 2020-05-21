# articleous

### dummy tool supposed to assist you in learning article grammar

Demo with non-persistent redis memory is hosted [here](https://articleous.herokuapp.com)

## Run locally

### Prerequisites
Binaries:
* [node](https://nodejs.org/)
* [redis](https://redis.io/)

Python deps:
* [bs4](https://www.crummy.com/software/BeautifulSoup/)
* [spacy](https://spacy.io/)

### Setup
```bash
git clone -–depth 1 https://github.com/andrhua/articleous.git && cd articleous
redis-server
wget "https://dumps.wikimedia.org/enwiki/latest/enwiki-latest-pages-articles1.xml-p1p30303.bz2" -O dump.bz2
python WikiExtractor.py -b 100M -o extracted dump.bz2 # extract articles in xml
python tag.py # article tagging
python gen_redis_proto.py | redis-cli --pipe # insert training sentences to redis
npm run dev
```

Built with [Sapper](https://sapper.svelte.dev/) + [Svelte](https://svelte.dev/)
