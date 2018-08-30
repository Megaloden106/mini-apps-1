console.log('App is connected');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Homepage',
      button: 'Checkout',
      forms: [],
      confirm: false,
      summary: {}
    }
    this.data = {};
    this.server = '/forms';
  }

  handleButton(event) {
    event.preventDefault();
    
    let { page } = this.state;
    if (page === 'Homepage') {
      this.setState({
        page: 'Account Info',
        button: 'Next',
        forms: ['Name', 'Email', 'Password']
      });
    } else if (page === 'Account Info') {
      this.post('/account')
      this.setState({
        page: 'Shipping Info',
        forms: ['Address', 'line 2', 'City', 'State', 'Zip Code']
      });
    } else if (page === 'Shipping Info') {
      this.post('/shipping')
      this.setState({
        page: 'Billing Info',
        forms: ['Credit Card #', 'Exp Date', 'CVV', 'Billing Zip Code']
      });
    } else if (page === 'Billing Info') {
      this.post('/billing')
        .then(() => this.get())
        .then((data) => {
          this.setState({
            page: 'Confirmation',
            button: 'Purchase',
            forms: [],
            confirm: true,
            summary: data
          });
        })
    } else if (page === 'Confirmation') {
      this.setState({
        page: 'Homepage',
        button: 'Checkout',
        forms: [],
        confirm: false
      });
    }
  }

  handleFormChange(event) {
    let key = event.target.id.split(' ')[0].toLowerCase();
    this.data[key] = event.target.value;
  }

  get() {
    return fetch('/forms')
      .then(response => response.json())
  }

  post(pathname) {
    return fetch(`${this.server}${pathname}`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(this.data),
      headers: {
        "Content-Type": "application/json",
      }
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.page}</h1>
        <Summary 
          render={this.state.confirm}
          data={this.state.summary}
        />
        <form>
          <Form 
            forms={this.state.forms}
            handleFormChange={this.handleFormChange.bind(this)}
          /><br/>
          <button onClick={this.handleButton.bind(this)}>{this.state.button}</button>
        </form>
      </div>
    );
  }
};

const Form = ({ forms, handleFormChange }) => (
  <div>
    {forms.map(form => 
      <Input 
        form={form} 
        key={form}
        handleFormChange={handleFormChange}
      />)
    }
  </div>
);

const Input = ({ form, handleFormChange }) => (
  <div>
    {form}: <br/>
    <input 
      type='text'
      onChange={handleFormChange}
      id={form}
    ></input><br/>
  </div>
);

const Summary = ({ render, data }) => {
  if (render && data) {
    return (
      <div>
        <h1>Account Info</h1>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Password: {data.password}</p>
        <h1>Shipping Info</h1>
        <p>Address: {`${data.address} ${data.line}`}</p>
        <p>City: {data.city}</p>
        <p>State: {data.state}</p>
        <p>Zip Code: {data.zip}</p>
        <h1>Billing Info</h1>
        <p>CC# {data.credit}</p>
        <p>Exp Date: {data.exp}</p>
        <p>CVV: {data.cvv}</p>
        <p>Zip Code: {data.billing}</p>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

ReactDOM.render(
  <App/>, 
  document.getElementById('app')
);