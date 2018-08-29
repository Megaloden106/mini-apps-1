class App {
  constructor() {
    this.server = 'http://localhost:3000/data';
  }

  init() {
    $('#submit').click((event) => {
      event.preventDefault();
      let file = $('#file-input')[0].files[0];
      let query = $('#filter').val();
      this.post(file, query);
    });
  }

  post(data, query) {
    $.ajax({
      url: this.server,
      type: 'POST',
      contentType: false,
      processData: false,
      data: data,
      success: () => {
        this.get(query);
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  get(query) {
    $.ajax({
      url: this.server,
      type: 'GET',
      data: { query },
      contentType: 'application/json',
      success: (data) => {
        data = data.replace(/,/g, '    |   ');
        data = data.replace(/\n/g, '<br>');
        $('#csv').empty();
        $('#csv').append(data);
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