//  Encapsulates employee information

const employee = {
  firstName: 'Joseph',
  lastName: 'Anda',
  dayNumber: 3,
  AID: 'A1411503'
};


const targetDiv = document.getElementById('target');  // Found in index.html

//  Functions can be used in JSX to operate on JavaScript constructions.  The
//  one defined below can be used in JSX curly braces when a class of react components
//  is defined.

function formatName(employee) {
  return employee.firstName + ' ' + employee.lastName;
}



//  Old School React:

// const Header = React.createClass({
//   render() {
//     return (
//       <h1>
//         Hello, {formatName(employee)}--This is a sample display item rendered via React!
//         Your AID is {employee.AID}
//       </h1>
//     );
//   }
// });

//  Vs. ES6 Class component declaration:

// class Header extends React.Component {
//   render() {
//     return (
//       <h1>
//         Hello, {formatName(employee)}--This is a sample display item rendered via React!
//         Your AID is {employee.AID}
//       </h1>
//     );
//   }
// }

//  Vs. a stateless functional component, (which works if there is no state to track)

// function Header(props) {
//   return (
//     <h1>
//     Hello, {formatName(employee)}--This is a sample display item rendered via React!
//     Your AID is {employee.AID}
//     </h1>
//   );
// }

//  Vs ES6 arrow function (again, only works for stateless functional components (?))
const Header = (props) => (
  <h1>
    Hello, {formatName(employee)}.  This is a sample display item rendered via React!
    your AID is {props.AID}
  </h1>
);

const Intro = (props) => (
  <p>{introParagraph}</p>
);

const UserInfo = (props) => (
  <p>
    In this next sample, we are displaying information from a user-defined
    functional component.  The name is set as a property (in this case, Hello {props.name}).
    We can also set additional properties with each instance of the component such as
    AID (in this case, the AID is {props.AID})
  </p>
);


const Footer = (props) => (
  <p className="footer">
    This is the footer, which is a simple stateless functional component.
    (Written by {props.name}).
  </p>
);
// The introParagraph is a workaround for the syntax highlighting bugs, and the
// alternative would be to keep the syntax highlighting within the render function.
// Note the use of template literals with `` (ie back-ticks or accent graves) and
// ${expression} (i.e. placeholders).

var introParagraph = `(If you've been keeping track of the days), you'll know it is
Day ${employee.dayNumber}.  The main advantage of using React is the ability
to encapsulate components and specific properties inside of other components.
You'll also notice that the text here can be concatenated with variables,
constants, and other valid JavaScript constructions using JSX.
The 'button' component below is a simple functional component`;

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      date: new Date()
    };

    //  This binding is necessary to make 'this' work in the callback
    this.handleClick = this.handleClick.bind(this);
  }


  //  Note that 'state' and 'props' can be changed asynchronously, so referencing state or
  //  props requires a 'prevState' or similar argument that holds the state of the component before
  //  The call was made (see https://reactjs.org/docs/state-and-lifecycle.html) for more details
  handleClick() {
    this.setState( prevState => ({
      count: ++prevState.count
    }));
  }
  //  The method below is a default method called a lifecycle hook, which is designed to
  //  manage state as the component is rendered and re-rendered.  componentDidMount() will
  //  automatically run when the component is rendered.
  //  "Mounting" is when a component is rendered to the DOM, and "Unmouting" occurs when that
  //  component is removed.

  componentDidMount() {
    //  Note that timerID is defined and called at the same time.  For this reason,
    //  Placing it inside of a different function to be called at the desired time is necessary.
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  //  The method below is a good place to do things like clear timers, because
  //  componentWillUnmount() is automatically run when a component is destroyed/updated
  //  In the ReactDOM.
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="buttonArea">
        <button onClick={this.handleClick}>Liked:  {this.state.count} Times </button>
        <p>It is currently {this.state.date.toLocaleTimeString()}</p>
      </div>
    );
  }
}

var MainComponent = (props) => (
  <div className="mainDisplay">
    <Header AID={props.AID}/>
    <Intro />
    <Button />
    <UserInfo name={employee.firstName} AID={props.AID} />
    <Footer name={props.name} />
  </div>
);

ReactDOM.render(
  <MainComponent AID={employee.AID} name={employee.firstName} />,
  targetDiv
);
