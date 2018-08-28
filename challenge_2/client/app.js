class App {
  constructor() {
    this.server = 'http://localhost:3000/data';
  }

  init() {
    $('#submit').click((event) => {
      event.preventDefault();
      this.post($('#file-input')[0].files[0]);
    });
  }

  post(data) {
    $.ajax({
      url: this.server,
      type: 'POST',
      contentType: false,
      processData: false,
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