# Descriptor

As the internet is continuously growing at a swift pace, the amount of information distributed has skyrocketed. This is both a positive and a negative. The access to instant information has brought an influx of content, however, this information may be cluttered with filler. This may become a problem when you need to understand an article but are distracted by unrelated information in it. Descriptor provides an easy and intuitive solution to this. Descriptor uses state-of-the-art Natural Language Processing algorithms to take an input Youtube video or text document and extract the most important information from it. Due to the input being a video or text document, Descriptor can be applied to a variety of use cases such as school lectures and research.

### Setup

Clone the repository
```
git clone https://github.com/taylorallen0913/descriptor
```

Enter the repository
```
cd descriptor
```

Install npm dependencies
```
npm install
```

Install python dependencies
```
cd server && pip install -r requirements.txt && cd ..
```

Use google cloud credentials
```
export GOOGLE_APPLICATION_CREDENTIALS={PATH TO KEY FILE}
```

Start dev server
```
npm run dev
```
