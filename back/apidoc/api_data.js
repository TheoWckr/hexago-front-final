define({ "api": [
  {
    "type": "post",
    "url": "/users/create",
    "title": "Request User information",
    "name": "Create_User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isActive",
            "description": "<p>User account is active or not</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>User unique ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User nickname for the service</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "salt",
            "description": "<p>Password encryption key</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "dateCreation",
            "description": "<p>User account creation date</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "dateLastConnection",
            "description": "<p>User last connection to account date</p>"
          },
          {
            "group": "Parameter",
            "type": "date",
            "optional": false,
            "field": "dateOfBirth",
            "description": "<p>User date of birth</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userProfileId",
            "description": "<p>Id which links to user profile table entry</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roleId",
            "description": "<p>Id which determines what roles user has</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"user\": {\n        \"isActive\": true,\n        \"_id\": \"5e6654ecdb12dc2e340f7680\",\n        \"username\": \"Pip\",\n        \"phone\": \"000000000\",\n        \"firstName\": \"bob\",\n        \"lastName\": \"Bobby\",\n        \"password\": \"baboulinet\",\n        \"salt\": \"jjjj\",\n        \"email\": \"bob@bob.fr\",\n        \"dateCreation\": \"2020-03-09T14:37:56.192Z\",\n        \"dateLastConnection\": \"2020-03-09T14:37:56.192Z\",\n        \"userProfileId\": 12345,\n        \"roleId\": 123456,\n        \"birthdate\": \"2020-03-09T14:38:36.495Z\",\n        \"createdAt\": \"2020-03-09T14:38:36.497Z\",\n        \"updatedAt\": \"2020-03-09T14:38:36.497Z\",\n        \"__v\": 0\n    },\n    \"msg\": \"User created successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  }
] });
