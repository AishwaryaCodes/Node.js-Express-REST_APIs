# REST API (Node.js + Express)

A simple and modular **REST API** CRUD operations.  
focusing on maintainability, clear routing, layered architecture, and extensibility for production use.

---

### HTTP Methods Used

- **POST** → Create resources 
- **GET** → Retrieve data (list + detail endpoints)
- **PUT** → Update fields of an existing resource
- **DELETE** → Soft/Hard delete depending on logic

---

###  HTTP Status Codes Implemented

**200 OK** — Request was successful (used in GET/PUT/DELETE responses)

**201 Created** — A new resource was created successfully (used after POST)

**204 No Content** — Successful request but no response body returned (optional for update/delete operations)


**404 Not Found** — Resource does not exist or incorrect ID provided

**500 Internal Server Error** — Server-side failure, handled through global error middleware

---

### Optimizations 

- **Pagination** - Using Page, Limit query parameters 
- **Searching** - Search any field, using query parameters 
- **Sorting** - Using SortBy, asc/desc query parameters
- **Global Error Handler** - Consistent error responses
- Clean routing flow + structured request validation   
- Modular code designed for future DB integration (Mongo/Postgres)

---


