# Form customization (PCCE React Challenge)

This project was build using Next.js bootstrapped with [`create-next-app`].
The purpose of this project was to create simple form adapting the component Autocomplete Load on Open from MaterialUI using it along with React-Hook-Form.
In this project was used the library json-server, to simulate endpoints to populate the component and it's return, and Zod to validate the schema form.

## Dependencies

```
Node 20.11.0 LTS
React 18
```

## Installing

1. Clone the project

```console
$ git clone git@github.com:atilafb/pcce-nextjs-challenge.git
$ cd pcce-nextjs-challenge
```

2. Install the dependencies and run the project 

```console
$ npm install
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Getting Started

1. After installing all dependencies of the project, it's necessary to simulate the data used to renderize the list displayed inside the component as well as the return data from it. Open another terminal and run this command

```console
$ npx json-server --watch data/db.json --port 8000
```
