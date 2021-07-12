# Inventar
An inventory control application built in the MERN stack

<h1>Features</h1>
<ol>
<li>
Login and registration
</li>
<li>
Storage
</li>
<li>
Categories and attributes
</li>
<li>
Products
</li>
<li>
Permissions
</li>
<li>
History of changes
</li>
<li>
Chat
</li>
</ol>
<h2>Notes</h2>
<p>This application supports 2 main types of users, Managers(company owners), and the workers of these companies.</p>
<h2>Login and registration</h2>
<p>Registration is only available to managers and consists of 2 steps: </p>
<ul>
<li>User registration</li>
<li>Company registration</li>
</ul>
<p>
After registering, a new company is created, along with the manager's account.
The manager has an option to create user accounts for workers of his company.
Login works the same for both types of users.
</p>

## Storage

<p>
Initially there are no warehouses. A manager may create any number of them, entering their name and address.
</p>
<p>
The warehouse dashboard renders a card for each warehouse, which contains dynamic information, 
such as the total number of different products and the total quantity of products stored in the warehouse.
In addition to that, there is a donut chart generated using the <code>Chart.js</code> library
showing a visual representation of how the quantity of products is divided between warehouses
</p>


## Categories and attributes

<p>
The manager can define product categories, which can have any number of attributes, which can then have any number of values
</p>
<p>
A typical use case would be:
</p>
<ul>
<li>
Category: Mobile phone
<ul>
  <li>
  Attribute 1: Manufacturer
  <ul>
    <li>
    Value 1: Apple
    </li>
    <li>
    Value 2: Samsung
    </li>
    </ul>
  </li>
  <li>Attribute 2: Camera quality

* Value 1: 5Mpx
* Value 2: 10Mpx
</li></ul></li></ul>

## Products

### Adding and editing products

---

<p>
Adding and editing products can be initiated by both user types. It involves a form to be filled with lot of information,
so it is split up into 4 smaller forms:
</p>
<ul>
<li>
Basic information - name, price
</li>
<li>
Category - a dynamic <code>select</code> element with varying number of sub-elements whose values correspond to values defined by the manager in the <em>Category</em> section.
</li>
<li>

Quantity - a dynamic collection of  <code>number input</code> elements for each of the warehouses defined by the manager. These are <b>disabled</b> for workers with insufficient permission.
</li>
<li>
Other info - Description and pictures
</li>
</ul>

### Table of products  

---

  All of the products in the company can be browsed in this table, all columns can be sorted, and can be easily searched.  
  Clicking on a row  will open it's corresponding's product's edit form.

### Quick actions  

---

Each row includes 3 buttons, each will open a <code>modal</code> for the corresponding product:  

- Quick add
- Quick remove
- Statistics 
  - shows a donut graph representing the distribution of quantity of the selected product across the company's warehouses and a
  - line graph tracking changes in the quantity across all warehouses, over time

>From a usability standpoint it made sense to add quick add/remove as a way to quickly increment/decrement the quantity of products  
>as an alternative to the edit window, in which a user would need to input the total quantity after the modification

---
> //readme not finished yet, features are implemented

### Permissions

### History of changes

### Chat
























