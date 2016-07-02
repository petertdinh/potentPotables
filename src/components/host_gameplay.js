import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { activateButtons, hostJoins } from '../sockets_client';
import HostCategory from './host_category';

class HostGamePlay extends Component {
  constructor(props){
    super(props)
    this.state = {categories: [], clues: []}
    this.handleQuestionLength= this.handleQuestionLength.bind(this);
  }

  componentWillMount() {
    // hostJoins(this.props.room);
  }

  componentWillReceiveProps() {
    if(this.props.categories !== null){
      let clues = this.props.clues;
      let tempCategories= this.props.categories.map((category) => {
          return <HostCategory 
                  key={category}
                  category={category}
                  clues={clues.splice(0,5)}/>
      });
      this.setState({categories: tempCategories});
    }
  }
  handleClick(){
    activateButtons(this.props.room);
  }
  handleQuestionLength(){
    var tempQuestion= this.props.activeClue.question.split(' ');
    var flag= false;
    if (tempQuestion.length === 1 && tempQuestion[0].indexOf(',') !== -1){
      tempQuestion= this.props.activeClue.question.split(',');
      flag= true;
    }
    var results= [];
    var tempResults= [];
    if (tempQuestion.length < 7){
      if (flag){
      return tempQuestion.join(', ');
      }
      return tempQuestion.join(' ');
    }
    else{
      for (var i= 0; i< tempQuestion.length; i++){
        tempResults.push(tempQuestion[i]);
        if (tempResults.length % 7 === 0){
          results.push(<div>{tempResults.join(' ')}<br/></div>);
          tempResults= [];
        }
      }
      if (tempResults.length > 0){
        results.push(<div>{tempResults.join(' ')}</div>);
      }
      return results;
    }
  }
  render(){
    // let clues = this.props.clues;
    // const categories = this.state.categories.map((category) => {
    //   return <HostCategory 
    //           key={category}
    //           clues={clues.splice(0,5)}/>
    // });

    return (
      <div className= 'gameplay-view'>
      {this.props.isGameActive === false ?
        <div className="waitingGame animated infinite flash">
          Waiting for game to Begin...
        </div> :
        this.state.categories.length > 0 ?
        <div className="waitingClue animated infinite flash">
          {this.state.categories}
        </div> :
        <div></div>
      }
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log('isGameActive', state.gameplay.isGameActive);
  return {
    isGameActive: state.gameplay.isGameActive,
    activeClue: state.gameplay.activeClue,
    room: state.linkAuth.linkCode,
    categories: state.gameboard.categories,
    clues: state.gameboard.clues,
  };
}


export default connect(mapStateToProps)(HostGamePlay)

