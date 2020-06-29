const http = require('http');

test('Get users return 200', () => {
    http.get('http://localhost:3100/users/', function(res) {
        expect(res.statusCode).toBe(200);
    }).on('error', function(e) {
        console.error(e);
    });
});

test('Create a user return 200', () => {
    var post_req = http.get('http://localhost:3100/users/signup', { method: 'POST' }, function(res) {
        res.on('end', function(){
            expect(res.statusCode).toBe(200);
        })
        }).on('error', function(e) {
            console.error(e);
        });
        post_req.end({
            username: 'Pipo',
            phone: "000000000",
            firstname: "bob",
            lastname: "Bobby",
            password: "baboulinet",
            email: "bob@bob.fr",
            isActive:"true",
            dateCreation:"2020-03-09T14:37:56.192Z",
            dateLastConnection:"2020-03-09T14:37:56.192Z",
            dateOfBirth:"2020-03-09T14:37:56.192Z",
            userProfileId:"12345",
            roleId:"123456"
        });
});

test('Login user return 200', () => {
    var post_req = http.get('http://localhost:3100/users/login', { method: 'POST' }, function(res) {
        res.on('end', function(){
            expect(res.data).toBe("stest")
            //console.warn(res);
            //jwt = res.data.token;
            //expect(res.statusCode).toBe(200);
        })
    }).on('error', function(e) {
        console.error(e);
    });
    post_req.end({
        email:"bob@bob.fr",
        password:"baboulinet",
    });
});

// test('Get a user return 200', () => {
//     http.get('http://localhost:3100/user/me', {headers: {"token": jwt}}, function(res) {
//         expect(res.statusCode).toBe(200);
//         console.log(res);
//         expect(res.username).toBe("Pip")
//     }).on('error', function(e) {
//         console.error(e);
//     });
// });

// test('Update a user return 200', () => {
//     var post_req = http.get('http://localhost:3100/user/5e79d7c7999ff74c5221e07f', { method: 'PATCH' }, {headers: {"token": jwt}}, function(res) {
//         res.on('end', function() {
//             expect(res.statusCode).toBe(200);
//         })
//     }).on('error', function(e) {
//         console.error(e);
//     });
//     post_req.end({
//         username:"Pipette",
//         phone:"000000001",
//         firstname:"bobb",
//         lastname:"Bobbite",
//         password:"baboulinettte",
//         email:"bob@bobette.fr",
//         isActive:"true",
//         dateCreation:"2020-03-09T14:37:56.192Z",
//         dateLastConnection:"2020-03-09T14:37:56.192Z",
//         dateOfBirth:"2020-03-09T14:37:56.192Z",
//         userProfileId:"12345",
//         roleId:"123456"
//     });
// });

// test('Get a user return 200', () => {
//     http.get('http://localhost:3100/user/me', {headers: {"token": jwt}}, function(res) {
//         expect(res.statusCode).toBe(200);
//         console.log(res);
//         expect(res.username).toBe("Pipette")
//     }).on('error', function(e) {
//         console.error(e);
//     });
// });

// test('Delete a user return 200', () => {
//     http.get('http://localhost:3100/user', { method: 'DELETE' }, function(res) {
//         expect(res.statusCode).toBe(200);
//     }).on('error', function(e) {
//         console.error(e);
//     });
// });