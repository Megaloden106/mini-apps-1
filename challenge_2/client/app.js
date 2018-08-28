console.log('App.js is connected');

class App {
  constructor() {
    console.log('App was instantiated')
    this.server = 'http://localhost:3000/data';
  }

  init() {
    $('#submit').click((event) => {
      event.preventDefault();
      this.post($('#input').val());
    });
  }

  post(data) {
    // console.log('data: ', data)

    $.ajax({
      url: this.server,
      type: 'POST',
      contentType: 'application/json',
      data: data,
      success: () => {
        this.get();
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  get(input) {
    $.ajax({
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        data = data.split('\n');
        $('#csv').empty();
        for (let elem of data) {
          $('#csv').append(`${elem}<br>`);
        }
      },
      error: (data) => {
        console.log(data);
      }
    });
  }
};

const app = new App();

$( document ).ready(() =>{
  app.init();
});