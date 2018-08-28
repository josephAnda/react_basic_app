//  Encapsulates employee information

const employee = {
  firstName: 'Joseph',
  lastName: 'Anda',
  dayNumber: 2,
  AID: 'A1411503'
};


const targetDiv = document.getElementById('target');  // Found in index.html

//  Functions can be used in JSX to operate on JavaScript constructions.  The
//  one defined below can be used in JSX curly braces when a class of react components
//  is defined.

function formatName(employee) {
  return employee.firstName + ' ' + employee.lastName;
}

//  Below is a functional component, which is a component that is literally defined by
// a JavaScript function.
function UserInfo(props) {
  return (
    <p>In this example, we are displaying information from a user-defined
      functional component.  The name is set as a property (in this case, Hello {props.name}).
      We can also set additional properties with each instance of the component such as
      AID (in this case, the AID is {props.AID})
    </p>
  );
}

const Header = React.createClass({

  render: function() {
    return(
      <h1>Hello, {formatName(employee)} . . . This is a sample display item rendered via React!
      Your AID is {employee.AID}
      </h1>
    );
  }
});
// The introParagraph is a workaround for the syntax highlighting bugs, and the
// alternative would be to keep the syntax highlighting within the render function.

var introParagraph = "(If you've been keeping track of the days), you'll know it is \
Day " + employee.dayNumber + ".  The main advantage of using React is the ability \
to encapsulate components and specific properties inside of other components.\
You'll also notice that the text here can be concatenated with variables,\
constants, and other valid JavaScript constructions using JSX.  \
The 'button' component below is a simple functional component";

// var Intro = React.createClass({
//
//   render: function() {
//     return(
//       <p>{introParagraph}</p>
//     );
//   }
// });


//  The code below is the current implementation of the commented version above
class Intro extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>{introParagraph}</p>
    );
  }
}

// var Button = function(props) {
//     return (
//       <button>
//         Liked:  {props.count} Times
//       </button>
//     );
// }

// Below we redo the commented code above to integrate state, which is private to the component

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


var MainComponent = React.createClass({

  render: function(){
    return (
      <div className="mainDisplay">
        <Header />
        <Intro />
        <Button />
        <UserInfo name={employee.firstName} AID={employee.AID} />
        <UserInfo name='John Doe' AID={12345} />
        <UserInfo name='Jane Doe' AID={6789} />
      </div>
    );
  },
});

ReactDOM.render(
  <MainComponent />,
  targetDiv
);
