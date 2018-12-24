describe('display-btn click', function () {
  const data = [
    { name: 'David', password: 'test' },
    { name: 'Marry', password: 'test2' }
  ];

  let server;

  beforeEach(function () {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  it('displays the first user on click', function () {
    server.respondWith('GET', '/users', [
      200, { 'Content-Type': 'application/json' }, JSON.stringify(data)
    ]);

    $('#display-btn').trigger('click');

    server.respond();

    expect($('#content').text()).to.equal('David');
  });
});