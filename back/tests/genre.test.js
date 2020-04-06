const http = require('http');


test('Get genres return 200', () => {
    http.get('http://localhost:3100/genre/', function(res) {
        expect(res.statusCode).toBe(200);
    }).on('error', function(e) {
        console.error(e);
    });
});

test('Get a genre return 200', () => {
    http.get('http://localhost:3100/genre/5e79d7c7999ff74c5221e07f', function(res) {
        expect(res.statusCode).toBe(200);
    }).on('error', function(e) {
        console.error(e);
    });
});

test('Search genres return 200', () => {
    http.get('http://localhost:3100/genre/?genre=bombede&limit=2', function(res) {
        expect(res.statusCode).toBe(200);
    }).on('error', function(e) {
        console.error(e);
    });
});

test('Create a genre return 200', () => {
    var post_req = http.get('http://localhost:3100/genre/create', { method: 'POST' }, function(res) {
        res.on('end', function(){
            expect(res.statusCode).toBe(200);
        })
    }).on('error', function(e) {
        console.error(e);
    });
    post_req.end({genre: "bobobo"});
});

test('Update a genre return 200', () => {
    var post_req = http.get('http://localhost:3100/genre/5e79d7c7999ff74c5221e07f', { method: 'PUT' }, function(res) {
        res.on('end', function() {
            expect(res.statusCode).toBe(200);
        })
    }).on('error', function(e) {
        console.error(e);
    });
    post_req.end({genre: "bobobo"});
});

test('Delete a genre return 200', () => {
    http.get('http://localhost:3100/genre/2', { method: 'DELETE' }, function(res) {
        expect(res.statusCode).toBe(200);
    }).on('error', function(e) {
        console.error(e);
    });
});