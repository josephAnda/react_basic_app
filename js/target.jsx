//  Encapsulates employee information

const employee = {
  firstName: 'Joseph',
  lastName: 'Anda',
  dayNumber: 2,
  AID: 'A1411503'
};

const targetDiv = document.getElementById('target');  // Found in index.html

//  Functions can be used in JSX to operate on JavaScript constructions
function formatName(employee) {
  return employee.firstName + ' ' + employee.lastName;
}


const Header = React.createClass({

  render: function() {
    return(
      <h1>Hello, {formatName(employee)} . . . This is a sample display item rendered via React!
      Your AID is {employee.AID}</h1>
    )
  }
});
// The introParagraph is a workaround for the syntax highlighting bugs, and the
// alternative would be to keep the syntax highlighting within the render function.

var introParagraph = "(If you've been keeping track of the days), you'll know it is \
Day " + employee.dayNumber + ".  The main advantage of using React is the ability \
to encapsulate components and specific properties inside of other components.\
You'll also notice that the text here can be concatenated with variables,\
constants, and other valid JavaScript constructions using JSX.  \
One example component is the 'button' component rendered below:";

var Intro = React.createClass({

  render: function() {
    return(
      <p>{introParagraph}</p>
    )
  }
});

//  There are two ways to render a component like the one below.  You could
//  1)  Write the component using the createClass pattern in JSX, then reference
// it using a tag such as <Button />, or you could
//  2)  Simply return the tag(s) as the content of the variable and then either
//  Reference that variable directly in a render function (i.e. as just Button)
//  OR within curly braces { } if it is evaluated within a variable.  For now we'll
//  go with method (1) to keep it fundamental.

var Button = React.createClass({

  render: function() {
    return (
      <button onClick={() => this.setState({ liked: true })}>
        Like
      </button>
    );
  }
});

var MainComponent = React.createClass({

  render: function(){
    return (
      <div className="mainDisplay">
        <Header />
        <Intro />
        <Button />
      </div>
    );
  },
});

ReactDOM.render(
  <MainComponent />,
  targetDiv
);
