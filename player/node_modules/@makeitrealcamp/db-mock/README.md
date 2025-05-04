# Database Mock

Simulates a database with one table that allow simple CRUD operations (Create, Read, Update, Delete).

Objects that are stored in memory and can represent anything (e.g. people, places, blog posts, invoices, movies, customers, products, etc.).

Mocks in programming are used to simulate other parts of a system. In this case we are simulating a database engine. It is not a real database engine because data is not persisted and lacks all the features that database engines offer.

## Usage

First install the library:

```
npm install --save @makeitrealcamp/db-mock
```

Then require and use it in your code. For example:

```js
// import table from "@makeitrealcamp/db-mock"
const table = require("@makeitrealcamp/db-mock")

// insert records - it returns the record with an id property
const r1 = table.insert({ name: "Pedro Perez" }) // { id: 1, name: "Pedro Perez" }
const r2 = table.insert({ name: "Maria Gomez" }) // { id: 2, name: "Maria Gomez" }

// find all records
const records = table.findAll() // returns an array with all the records

// find by id
const record = table.findById(1) // returns the record with id 1
```

## API

This package exposes the following methods: `findAll`, `findById`, `insert`, `update` and `remove`.

### `findAll`

Returns all the records that have been inserted. For example:

```js
const records = table.findAll()
```

### `findById(id)`

Receives an id and returns the record with that id. If no record exists returns null. 

For example:

```js
const record = table.find(1)
```

### `insert`

Receives an object and returns a shallow copy of the object with an `id` property. The `id` is a number that starts with 1 and is incremented every time a record is inserted.

For example:

```js
const record = table.insert({ name: "Pedro" })
```

### `update`

Receives and object and replaces the record in the table. If the record doesn't have an `id` or the `id` is not found an error is raised.

This method doesn't return anything.

For example, assuming a record was already inserted, we can replace it:

```js
table.update({ id: 1, name: "Maria" })
```

### `remove`

Receives an `id` and deletes the record with that `id`. 

This method doesn't return anything.

For example, if a record was already inserted, we can delete it:

```js
table.delete(1)
```

## TODO

We need to add some tests.