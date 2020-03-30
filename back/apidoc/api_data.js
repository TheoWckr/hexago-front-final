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
  },
  {
    "type": "get",
    "url": "/gamedetails?name=xxx&author=xxx&editor=xxx&distributor=xxx&releaseDate=xxx&popularity=xxx&nbPlayer=xxx&gameLengthDesired=xxx&minAge=xxx&whatToSortBy=xxx&sortValue=xxx&limit=xxx&offset=xxx",
    "title": "Request game information",
    "name": "GET_gamedetails",
    "group": "gamedetails",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of a game</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>Name of the author of a game</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "editor",
            "description": "<p>Name of the editor of a game</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "distributor",
            "description": "<p>Name of the distributor of a game</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "releaseDate",
            "description": "<p>Date of the release of a game</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "popularity",
            "description": "<p>Popularity score of a game</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nbPlayer",
            "description": "<p>Number of player desired which will compare playerMin and playerMax values</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gameLengthDesired",
            "description": "<p>Time value in minutes which will compare gameLengthMin and gameLengthMax values</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "minAge",
            "description": "<p>Minimum age advised to play the game</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "whatToSortBy",
            "description": "<p>what field to use for sorting</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sortValue",
            "description": "<p>1 for ascending sort or -1 for descending sort</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Required for pagination, set the number of entries per page</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Required for pagination, select the page desired (first one is 0)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3100/gamedetails?limit=2&offset=1&whatToSortBy=popularity&sortValue=-1",
        "type": "curl"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"content\": [\n        {\n            \"genre\": [],\n            \"_id\": \"5e7a26929852d524bcfdffb3\",\n            \"name\": \"Terraforming Mars\",\n            \"author\": \"Jacob Fryxelius\",\n            \"editor\": \"Intrafin\",\n            \"distributor\": \"Intrafin\",\n            \"releaseDate\": \"2016-04-01T00:00:00.000Z\",\n            \"popularity\": 13,\n            \"playerMin\": 1,\n            \"playerMax\": 5,\n            \"gameLengthMin\": 60,\n            \"gameLengthMax\": 120,\n            \"minAge\": 12,\n            \"description\": \"L'ère de la domestication de Mars a commencé. Dans Terraforming Mars, de puissantes corporations travaillent pour rendre la Planète Rouge habitable. La température, l'oxygène et les océans sont les trois axes de développement principaux. Mais pour triompher, il faudra aussi construire des infrastructures pour les générations futures.\"\n        },\n        {\n            \"genre\": [],\n            \"_id\": \"5e7a26929852d524bcfdffb1\",\n            \"name\": \"Bunny Kingdom\",\n            \"author\": \"Richard Garfield\",\n            \"editor\": \"Iello\",\n            \"distributor\": \"Iello\",\n            \"releaseDate\": \"2018-01-01T00:00:00.000Z\",\n            \"popularity\": 12,\n            \"playerMin\": 2,\n            \"playerMax\": 4,\n            \"gameLengthMin\": 30,\n            \"gameLengthMax\": 60,\n            \"minAge\": 14,\n            \"description\": \"Incarnez des seigneurs lapins et partez à la conquête d’un nouveau monde pour le compte du roi des lapins. Installez vos fiefs aux endroits stratégiques, exploitez les Ressources, bâtissez des Cités et préparez vos Missions secrètes pour voler à vos adversaires la victoire à la dernière minute. Chaque choix peut vous apporter les lauriers de la victoire ou l’ ombre de la défaite. Bunny Kingdom est un jeu de draft(sélection de cartes) et de placement qui se joue en 4 manches. Lors de chaque manche, les joueurs vont étendre leurs fiefs, augmenter leur Puissance et leur Richesse en construisant des Cités et en exploitant de nouvelles Ressources.Choisissez vos actions de chaque tour parmi les cartes que vous avez en main, avant de passer celles que vous ne jouez pas à vos adversaires. Chaque Manche se termine par un décompte de points dépendant de la Puissance et de la Richesse de vos Fiefs.Des Missions secrètes commandées par le roi des lapins au cours de la partie viendront sans doute perturber ce qui vous semblait établi avant le décompte final. À la fin de la partie, le joueur qui aura le plus fait prospérer son territoire sera nommé gouverneur du Nouveau Monde par le roi des lapins. Contient le plateau de jeu en version XL.\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/gameDetails.js",
    "groupTitle": "gamedetails"
  },
  {
    "type": "post",
    "url": "/genre/create",
    "title": "Request genre information",
    "name": "Create_a_genre",
    "group": "genres",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "genre",
            "description": "<p>name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"content\": {\n          \"gameGenreId\": \"5e6654ecdb12dc2e340f7680\",\n          \"genre\": \"TEST\"\n      },\n      \"msg\": \"genre created successfully.\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/genre.js",
    "groupTitle": "genres"
  },
  {
    "type": "delete",
    "url": "/genre/:id",
    "title": "Request genre information",
    "name": "Delete_a_genre",
    "group": "genres",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "genre",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"msg\": \"genre deleted successfully.\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/genre.js",
    "groupTitle": "genres"
  },
  {
    "type": "get",
    "url": "/genre/5e79d8996b247d4d872c67f8",
    "title": "Request genre information",
    "name": "Get_a_genre",
    "group": "genres",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "genre",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      {\n        \"_id\": \"5e79d8996b247d4d872c67f8\",\n        \"genre\": \"bombe\",\n        \"createdAt\": \"2020-03-24T09:53:29.598Z\",\n        \"updatedAt\": \"2020-03-24T09:53:29.598Z\",\n        \"__v\": 0\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/genre.js",
    "groupTitle": "genres"
  },
  {
    "type": "get",
    "url": "/genre/genre=bombede&limit=3",
    "title": "Request genre information",
    "name": "Get_genre_by_string_or_get_all_if_empty",
    "group": "genres",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "genre",
            "description": "<p>searchname</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"content\": [\n        {\n            \"_id\": \"5e79d7c7999ff74c5221e07f\",\n            \"genre\": \"bombedeballe\",\n            \"createdAt\": \"2020-03-24T09:49:59.375Z\",\n            \"updatedAt\": \"2020-03-24T09:49:59.375Z\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5e79d7f9e2c5394d079259e4\",\n            \"genre\": \"bombedeballe\",\n            \"createdAt\": \"2020-03-24T09:50:49.438Z\",\n            \"updatedAt\": \"2020-03-24T09:50:49.438Z\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5e79d803e2c5394d079259e5\",\n            \"genre\": \"bombedeball\",\n            \"createdAt\": \"2020-03-24T09:50:59.222Z\",\n            \"updatedAt\": \"2020-03-24T09:50:59.222Z\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5e79d80ae2c5394d079259e6\",\n            \"genre\": \"bombedebal\",\n            \"createdAt\": \"2020-03-24T09:51:06.525Z\",\n            \"updatedAt\": \"2020-03-24T09:51:06.525Z\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5e79d8996b247d4d872c67f8\",\n            \"genre\": \"bombe\",\n            \"createdAt\": \"2020-03-24T09:53:29.598Z\",\n            \"updatedAt\": \"2020-03-24T09:53:29.598Z\",\n            \"__v\": 0\n        }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/genre.js",
    "groupTitle": "genres"
  },
  {
    "type": "put",
    "url": "/genre/:id",
    "title": "Request genre information",
    "name": "Update_a_genre",
    "group": "genres",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "genre",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"content\": {\n        \"_id\": \"5e79d8996b247d4d872c67f8\",\n        \"genre\": \"bombe\",\n        \"createdAt\": \"2020-03-24T09:53:29.598Z\",\n        \"updatedAt\": \"2020-03-24T09:53:29.598Z\",\n        \"__v\": 0\n      },\n      \"msg\": \"genre updated successfully.\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/genre.js",
    "groupTitle": "genres"
  }
] });
