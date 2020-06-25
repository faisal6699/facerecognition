import React from "react";
import "./SpeechToText.css";

const SpeechRecogntion =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecogntion();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

class SpeechToText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }

  toggleListen() {
    this.setState(
      {
        listening: !this.state.listening,
      },
      this.handleListen
    );
  }

  handleListen() {
    console.log("listening?", this.state.listening);

    if (this.state.listening) {
      recognition.start();
      document.getElementById("interim").innerHTML =
        "ok, You are ready to speak";
      recognition.onend = () => {
        console.log("...continue listening...");
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        document.getElementById("interim").innerHTML =
          "Press the speak button to start talking";
        console.log("Stopped listening per click");
      };
    }

    recognition.onstart = () => {
      console.log("Listening!");
    };

    let finalTranscript = "";
    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        else interimTranscript += transcript;
      }

      document.getElementById("final").innerHTML = finalTranscript;

      //-------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(" ");
      const stopCmd = transcriptArr.slice(-3, -1);
      console.log("stopCmd", stopCmd);

      if (stopCmd[0] === "stop" && stopCmd[1] === "listening") {
        recognition.stop();
        recognition.onend = () => {
          console.log("Stopped listening per command");
          document.getElementById("interim").innerHTML =
            "Stopped listening by voice command";
          const finalText = transcriptArr.slice(0, -3).join(" ");
          document.getElementById("final").innerHTML = finalText;
        };
      }
    };

    //-----------------------------------------------------------------------

    recognition.onerror = (event) => {
      console.log("Error occurred in recognition: " + event.error);
    };
  }

  refreshText(){
    //console.log('refresh')
    document.getElementById("final").innerHTML = '';
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
        <div className="container-fluid text-center">
          <div className="row content">
            <div className="col-sm-4">
              <div
                className="card text-white bg-info mb-5"
                style={{ maxWidth: "25rem" }}
              >
                <div className="card-header">Instructions</div>
                <div className="card-body">
                  <ul className="list pl0">
                    <li className="pa1 pa2-ns bb b--black-10">
                      <b className="db f5 mb1">When you can speak</b>
                      <span className="f7 db lh-copy measure">
                        See the box under the speaker button. If it says "ok, You are ready to speak" then you can record your speech.
                      </span>
                    </li>

                    <li className="pa1 pa2-ns bb b--black-10">
                      <b className="db f5 mb1">How to pause and restart</b>
                      <span className="f7 db lh-copy measure">
                        Press the speaker button. Then if the box under the button says "Press the speak button to start talking". That means you are in pause mode.
                        To restart speaking press the speaker button again.
                      </span>
                    </li>

                    <li className="pa1 pa2-ns bb b--black-10">
                      <b className="db f5 mb1">How can I stop speaking using voice</b>
                      <span className="f7 db lh-copy measure">
                        You can stop speaking by saying "stop listening". By double clicking the speaker button you can restart.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div style={container} className="col-sm-8">
            <div className='white f5'>
                    {`${this.props.name}, talk about your dreams. I will convert it into text.`}
                </div>
              <button className="Button" onClick={this.toggleListen}>
                <i className="fa fa-microphone"></i>
              </button>
              <div id="interim" style={interim}></div>
              <div id="final" style={final}></div>
              <button className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-purple" 
              onClick = {() => this.refreshText()}>Refresh</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //const { onRouteChange} = this.props;
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  interim: {
    color: "red",
    border: "#ccc 1px solid",
    padding: "1em",
    margin: "1em",
    width: "300px",
  },
  final: {
    color: "black",
    border: "#ccc 1px solid",
    padding: "1em",
    margin: "1em",
    width: "400px",
  },
};

const { container, button, interim, final } = styles;

export default SpeechToText;
