# Classtime : Class Streaming Service

> A class streaming service for internal use in Kirirom Institute of Technology

**Classtime** is a _class streaming service_ that students, lecturers and staff can use to stream from their webcams as well as devices in **Kirirom Institute of Technology** campuses. This service allows everyone to tune into and streaming classes remotely from anywhere conveniently.

**Classtime** is a joint collaboration between **Zeal** and **FLIb**.

![Classtime Homepage](https://i.imgur.com/zoQgvt8.jpg)

## Technologies Used

We used the **MEVN** (**MongoDB**, **Express.js**, **Vue.js**, **Node.js**) stack for developing **Classtime**.

### Frontend

---

- **Vuejs** library is used with the **Vue CLI3** framework along with **Vuetify** plugin
  - We also used **Vuex** for state management and **VueRouter** for route management
- **Axios** and **Socket.IO** is used for requesting data from the backend
- **Jitsi Meet Wrapper** is used to display streams

### Backend

---

- **Nodejs** is used with **Express** for creating the server and handling requests from the frontend
- **Axios** is used to handle request between the backend servers
- **Bcrypt** and **JWT** is used for user authentication
- **Mongoose** is used for database calls between the database and the server

### Database

---

- We use **MongoDB** as the database for the streams, users and devices

## Installation

### Prerequisites

---

We will need to install:

- **Node.js**
- **MongoDB**

### Node.js

To install **Node.js**, simply open up your **terminal** and run the following command

```sh
sudo apt install nodejs
```

To ensure that Node.js is installed correctly on the server, run the following command

```sh
node -v
```

### MongoDB (_if MongoDB is deployed locally_)

[Source](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#import-the-public-key-used-by-the-package-management-system)

#### 1. Import the public key used by the package management system

From a terminal, issue the following command to import the MongoDB public GPG Key from https://www.mongodb.org/static/pgp/server-4.2.asc:

```sh
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
```

#### 2. Create a list file for MongoDB

Run the following command to create a list file for MongoDB:

```sh
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
```

#### 3. Reload local package database

Run the following command to reload the database:

```sh
sudo apt-get update
```

#### 4. Install MongoDB packages

Run the following command to install MongoDB:

```sh
sudo apt-get install -y mongodb-org
```

### Frontend

Navigate to the **base directory** of the front end and open **config.js** with a text editor of your choice, then edit the **URL**, **SERVER_PORT**, and **CHAT_PORT** of your choice.

![img](https://lh3.googleusercontent.com/Xo8o7rlF3OEPPa6Az4pxuEAxykPaeDsK671ZNj3rhF6D7Q8PIjxkOtBHzuBAxFL7wLvWPB1GoFRv0T7RjlhJbXd-eeYMiSjP1ko55kyuxK7XkL3UPEIrg6Y1wf5F5x-PAN3jHYtp)

### Backend

The backend is divided into 2 modules being **Chats** and **Server**. You will need to change the **config.js** files of both as well.

#### Chats

Navigate to the **base directory** of **Chats** and open **config.js** with a text editor of your choice, then edit the **DBCONNECTION**, **CHATSERVER**, and **SERVER**to the database, chat server and server URL of your choice.

![img](https://lh3.googleusercontent.com/ozJk976raQdOx9q0M_Ax2NwPmM7QzPdEafgoIN6pODE98Mmv2VJfxUR_sSzDYIXgoWZm0xDmVURbQ9gHwt0QnYKlVH1jXKK_TWcALdMguoAVLe36M6hqKRO4UiHa2Q9Oj8i_VMk6)

#### Server

Navigate to the **base directory** of **Server** and open **config.js** with a text editor of your choice, then edit the **DBCONNECTION**, **CHATSERVER**, and **SERVER**to the database, chat server and server URL of your choice

![img](https://lh3.googleusercontent.com/foES14ctjB2oaOiAhuNlxZK233N2yc0_trR5t9OHjwzt756-rjfvtjrCZLM_a5n-PwkgbOXC6ihwIjsSTywKNOiCW1ziUq8cSLEgv85IcYed7g264kzR83hgogymlbLw3F1JwU7c)

### Next Steps

---

For both the Frontend and Backend, you will need to install necessary dependencies. Those dependencies can be installed with the **npm i** command.

### Frontend

---

Run the command line terminal in the directory of the front end and run the following command

```sh
npm i
npm run serve
```

### Backend:

---

For the backend, it is a different story. **Classtime**'s backend relies on multiple modules so you will need to get into each folder individually and run the following command. Those folders are **Server**, **Chat**, and **Device**.

```sh
npm i
npm start
```

## Users

The streaming service has 3 types of users:

- **Student**
- **Lecturer**
- **Admin**

Each user type has their own level of control in the system.

### Student

---

**Students** are able to:

- Personal profile editing
- Watch streams
- Start streams using their own webcams

### Lecturer

---

**Lecturers** are able to:

- Personal profile editing
- Watch streams
- Start streams using their own webcams as well as devices in the campus
- Basic access to device management

### Admin

---

**Admins** are able to:

- Personal profile editing
- Watch streams
- Start streams using their own webcams as well as devices in the campus
- Complete access to device management
- User management for every user registered
- Stream management for every stream

## Usage

Here are the instructions on how to use this streaming service

### Login

---

![Classtime Homepage](https://i.imgur.com/wX36B8K.gif)

You can **login** by filling your email and password in the text fields and press login.

**Registering** will register you with a student account.

> _For lecturers and admins, please contact the development team or any admin to give you appropriate roles._

### Streaming

---

![Classtime Streaming](https://i.imgur.com/sWhVIM0.gif)

You can **start streaming** by pressing the **Start Stream** button on the Navigation Bar. Options can be selected in the dialog popup. You can either stream from your **webcam** or from a dedicated **device** in the campus. You can also **cast the stream to devices in the campus** by ticking on the checkbox dialog.

You can **stop streaming** by pressing on the red **Stop Stream** button on the Navigation Bar when you are streaming.

### Profile

---

![Classtime Profile](https://i.imgur.com/JpKEiwr.gif)

You can navigate to the **Profile** section by clicking on the **Navigation Drawer** toggle next to the logo clicking on the **Profile** button.

In the **Profile** section, you can:

- Change your password and username
- Change your profile picture
- Change your cover picture

### Admin

---

You gain access to the **User Management** and **Stream Management** sections.

#### User Management

![Classtime User Management](https://i.imgur.com/iTpshie.gif)

As **Admin**, you can change the username of users as well as their roles.

#### Stream Management

![Classtime Stream Management](https://i.imgur.com/Lcdm89l.gif)

You can end any stream when the stream is on. You can also edit the details of the streams.

## Release History

- 0.1.0

  **Initial Release for UI 0.1 compatible with Server 0.1.1**

  - Renovation with UI & Color Scheme
  - Better Profile Tab
  - Thumbnails & Profile Images
  - User's Historical Activities

- 0.1.1

  **Easier modification to server URL and Port in Config.js**
